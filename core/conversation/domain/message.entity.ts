export type MessageRole = "user" | "assistant" | "system";

export interface MessageConfig {
  id: string;
  conversationId: string;
  role: MessageRole;
  parts: unknown;
  createdAt?: Date | null;
}

export class Message {
  readonly id: string;
  readonly conversationId: string;
  readonly role: MessageRole;
  readonly parts: unknown;
  readonly createdAt: Date | null;

  constructor(config: MessageConfig) {
    this.id = config.id;
    this.conversationId = config.conversationId;
    this.role = config.role;
    this.parts = config.parts;
    this.createdAt = config.createdAt ?? null;
  }
}
