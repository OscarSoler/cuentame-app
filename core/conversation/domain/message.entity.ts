export type MessageRole = "user" | "assistant" | "system";

const ROLES: readonly MessageRole[] = ["user", "assistant", "system"];

export function toMessageRole(value: unknown): MessageRole {
  if (typeof value === "string" && (ROLES as readonly string[]).includes(value)) {
    return value as MessageRole;
  }
  throw new Error(`Rol de mensaje inválido: ${String(value)}`);
}

export interface MessageConfig {
  id: string;
  conversationId: string;
  seq: number;
  role: MessageRole;
  parts: unknown;
  createdAt?: Date | null;
}

export class Message {
  readonly id: string;
  readonly conversationId: string;
  readonly seq: number;
  readonly role: MessageRole;
  readonly parts: unknown;
  readonly createdAt: Date | null;

  constructor(config: MessageConfig) {
    this.id = config.id;
    this.conversationId = config.conversationId;
    this.seq = config.seq;
    this.role = config.role;
    this.parts = config.parts;
    this.createdAt = config.createdAt ?? null;
  }
}
