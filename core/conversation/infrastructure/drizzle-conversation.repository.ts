import { db } from "@/lib/db";
import { conversations, ledgers, messages } from "@/lib/db/schema";
import { and, asc, desc, eq, gte, sql } from "drizzle-orm";
import { Conversation } from "../domain/conversation.entity";
import { Message, toMessageRole } from "../domain/message.entity";
import {
  ConversationRepository,
  CreateConversationData,
  PersistedMessage,
} from "../domain/conversation.repository";

type ConversationRow = typeof conversations.$inferSelect;
type MessageRow = typeof messages.$inferSelect;

function toMessage(row: MessageRow): Message {
  return new Message({
    id: row.id,
    conversationId: row.conversationId,
    seq: row.seq,
    role: toMessageRole(row.role),
    parts: row.parts,
    createdAt: row.createdAt,
  });
}

function toConversation(row: ConversationRow, msgs: Message[] = []): Conversation {
  return new Conversation({
    id: row.id,
    ledgerId: row.ledgerId,
    title: row.title ?? null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    messages: msgs,
  });
}

export class DrizzleConversationRepository implements ConversationRepository {
  async getById(id: string): Promise<Conversation | null> {
    const [row] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, id))
      .limit(1);
    return row ? toConversation(row) : null;
  }

  async getByIdWithMessages(id: string): Promise<Conversation | null> {
    const [row] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, id))
      .limit(1);
    if (!row) return null;

    const msgRows = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, id))
      .orderBy(asc(messages.seq));

    return toConversation(row, msgRows.map(toMessage));
  }

  async getByIdForUser(id: string, userId: string): Promise<Conversation | null> {
    const [row] = await db
      .select({
        id: conversations.id,
        ledgerId: conversations.ledgerId,
        title: conversations.title,
        createdAt: conversations.createdAt,
        updatedAt: conversations.updatedAt,
      })
      .from(conversations)
      .innerJoin(ledgers, eq(ledgers.id, conversations.ledgerId))
      .where(and(eq(conversations.id, id), eq(ledgers.userId, userId)))
      .limit(1);

    return row ? toConversation(row) : null;
  }

  async listByLedgerId(ledgerId: string): Promise<Conversation[]> {
    const rows = await db
      .select()
      .from(conversations)
      .where(eq(conversations.ledgerId, ledgerId))
      .orderBy(desc(conversations.updatedAt));
    return rows.map((r) => toConversation(r));
  }

  async latestByLedgerId(ledgerId: string): Promise<Conversation | null> {
    const [row] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.ledgerId, ledgerId))
      .orderBy(desc(conversations.updatedAt))
      .limit(1);
    return row ? toConversation(row) : null;
  }

  async create(data: CreateConversationData): Promise<Conversation> {
    const [row] = await db
      .insert(conversations)
      .values({
        ledgerId: data.ledgerId,
        title: data.title ?? null,
      })
      .returning();
    return toConversation(row);
  }

  async saveMessages(
    conversationId: string,
    msgs: PersistedMessage[],
  ): Promise<void> {
    await db.transaction(async (tx) => {
      if (msgs.length > 0) {
        await tx
          .insert(messages)
          .values(
            msgs.map((m) => ({
              conversationId,
              seq: m.seq,
              role: m.role,
              parts: m.parts,
            })),
          )
          .onConflictDoUpdate({
            target: [messages.conversationId, messages.seq],
            set: {
              role: sql`excluded.role`,
              parts: sql`excluded.parts`,
            },
          });
        await tx
          .delete(messages)
          .where(
            and(
              eq(messages.conversationId, conversationId),
              gte(messages.seq, msgs.length),
            ),
          );
      } else {
        await tx
          .delete(messages)
          .where(eq(messages.conversationId, conversationId));
      }
      await tx
        .update(conversations)
        .set({ updatedAt: new Date() })
        .where(eq(conversations.id, conversationId));
    });
  }

  async updateTitle(id: string, title: string): Promise<void> {
    await db
      .update(conversations)
      .set({ title, updatedAt: new Date() })
      .where(eq(conversations.id, id));
  }

  async delete(id: string): Promise<void> {
    const rows = await db
      .delete(conversations)
      .where(eq(conversations.id, id))
      .returning({ id: conversations.id });
    if (rows.length === 0) throw new Error("Conversación no encontrada");
  }
}
