"use server";

import { requireSession, wrapAction } from "@/core/_shared/action";
import { assertLedgerOwnership } from "@/core/_shared/ownership";
import { DrizzleConversationRepository } from "../infrastructure/drizzle-conversation.repository";
import {
  DeleteConversation,
  GetConversation,
  GetOrCreateLatest,
  SaveMessages,
} from "../application";
import type { Conversation } from "../domain/conversation.entity";
import type { MessageRole } from "../domain/message.entity";

function repo() {
  return new DrizzleConversationRepository();
}

async function requireConversationFor(userId: string, conversationId: string): Promise<Conversation> {
  const conversation = await repo().getByIdForUser(conversationId, userId);
  if (!conversation) throw new Error("Conversación no encontrada");
  return conversation;
}

function serializeMessage(m: { id: string; role: string; parts: unknown; createdAt: Date | null }) {
  return {
    id: m.id,
    role: m.role as MessageRole,
    parts: m.parts,
    createdAt: m.createdAt?.toISOString() ?? null,
  };
}

export async function getOrCreateLatestConversationAction(ledgerId: string) {
  return wrapAction(async () => {
    const session = await requireSession();
    await assertLedgerOwnership(session.user.id, ledgerId);

    const conversation = await new GetOrCreateLatest({ repository: repo() }).execute(ledgerId);
    return { id: conversation.id, ledgerId: conversation.ledgerId };
  });
}

export async function getConversationMessagesAction(conversationId: string) {
  return wrapAction(async () => {
    const session = await requireSession();
    await requireConversationFor(session.user.id, conversationId);

    const conversation = await new GetConversation({ repository: repo() }).byIdWithMessages(conversationId);
    if (!conversation) throw new Error("Conversación no encontrada");

    return {
      id: conversation.id,
      ledgerId: conversation.ledgerId,
      title: conversation.title,
      messages: conversation.messages.map(serializeMessage),
    };
  });
}

export async function listConversationsAction(ledgerId: string) {
  return wrapAction(async () => {
    const session = await requireSession();
    await assertLedgerOwnership(session.user.id, ledgerId);

    const conversations = await new GetConversation({ repository: repo() }).listByLedger(ledgerId);
    return conversations.map((c) => ({
      id: c.id,
      title: c.title,
      updatedAt: c.updatedAt?.toISOString() ?? null,
    }));
  });
}

export interface SaveMessagesInput {
  conversationId: string;
  messages: Array<{ role: MessageRole; parts: unknown }>;
}

export async function saveMessagesAction(input: SaveMessagesInput) {
  return wrapAction(async () => {
    const session = await requireSession();
    await requireConversationFor(session.user.id, input.conversationId);

    await new SaveMessages({ repository: repo() }).execute(input);
    return { id: input.conversationId };
  });
}

export async function deleteConversationAction(id: string) {
  return wrapAction(async () => {
    const session = await requireSession();
    await requireConversationFor(session.user.id, id);

    await new DeleteConversation({ repository: repo() }).execute(id);
    return { id };
  });
}
