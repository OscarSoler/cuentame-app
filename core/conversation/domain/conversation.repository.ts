import { Conversation, ConversationConfig } from "./conversation.entity";
import { Message, MessageRole } from "./message.entity";

export type CreateConversationData = Omit<ConversationConfig, "id" | "createdAt" | "updatedAt" | "messages">;

export interface NewMessageData {
  role: MessageRole;
  parts: unknown;
}

export interface ConversationRepository {
  getById(id: string): Promise<Conversation | null>;
  getByIdWithMessages(id: string): Promise<Conversation | null>;
  getByIdForUser(id: string, userId: string): Promise<Conversation | null>;
  listByLedgerId(ledgerId: string): Promise<Conversation[]>;
  latestByLedgerId(ledgerId: string): Promise<Conversation | null>;
  create(data: CreateConversationData): Promise<Conversation>;
  appendMessage(conversationId: string, data: NewMessageData): Promise<Message>;
  appendMessages(conversationId: string, messages: NewMessageData[]): Promise<void>;
  replaceMessages(conversationId: string, messages: NewMessageData[]): Promise<void>;
  updateTitle(id: string, title: string): Promise<void>;
  delete(id: string): Promise<void>;
}
