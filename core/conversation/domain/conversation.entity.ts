import { Message } from "./message.entity";

export interface ConversationConfig {
  id: string;
  ledgerId: string;
  title?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
  messages?: Message[];
}

export class Conversation {
  readonly id: string;
  readonly ledgerId: string;
  readonly title: string | null;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
  readonly messages: Message[];

  constructor(config: ConversationConfig) {
    this.id = config.id;
    this.ledgerId = config.ledgerId;
    this.title = config.title ?? null;
    this.createdAt = config.createdAt ?? null;
    this.updatedAt = config.updatedAt ?? null;
    this.messages = config.messages ?? [];
  }
}
