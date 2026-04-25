"use server";

import { requireSession, wrapAction } from "@/core/_shared/action";
import { assertLedgerOwnership } from "@/core/_shared/ownership";
import { DrizzleConversationRepository } from "../infrastructure/drizzle-conversation.repository";
import {
  AppendMessage,
  AppendMessages,
  DeleteConversation,
  GetConversation,
  GetOrCreateLatest,
  ReplaceMessages,
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

export interface AppendMessageInput {
  conversationId: string;
  role: MessageRole;
  parts: unknown;
}

export async function appendMessageAction(input: AppendMessageInput) {
  return wrapAction(async () => {
    const session = await requireSession();
    await requireConversationFor(session.user.id, input.conversationId);

    const message = await new AppendMessage({ repository: repo() }).execute(input);
    return { id: message.id };
  });
}

export interface AppendMessagesInput {
  conversationId: string;
  messages: Array<{ role: MessageRole; parts: unknown }>;
}

export async function appendMessagesAction(input: AppendMessagesInput) {
  return wrapAction(async () => {
    const session = await requireSession();
    await requireConversationFor(session.user.id, input.conversationId);

    await new AppendMessages({ repository: repo() }).execute(input);
    return { id: input.conversationId };
  });
}

export interface ReplaceMessagesInput {
  conversationId: string;
  messages: Array<{ role: MessageRole; parts: unknown }>;
}

export async function replaceMessagesAction(input: ReplaceMessagesInput) {
  return wrapAction(async () => {
    const session = await requireSession();
    await requireConversationFor(session.user.id, input.conversationId);

    await new ReplaceMessages({ repository: repo() }).execute(input);
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

