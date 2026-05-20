import { MessageRole, toMessageRole } from "../domain/message.entity";
import { ConversationRepository } from "../domain/conversation.repository";

interface SaveMessagesConfig {
  repository: ConversationRepository;
}

export interface SaveMessagesInput {
  conversationId: string;
  messages: Array<{ role: MessageRole; parts: unknown }>;
}

export function toSaveMessagesInput(
  conversationId: string,
  uiMessages: Array<{ role: string; parts: unknown }>,
): SaveMessagesInput {
  return {
    conversationId,
    messages: uiMessages.map((m) => ({
      role: toMessageRole(m.role),
      parts: m.parts,
    })),
  };
}

export class SaveMessages {
  constructor(private config: SaveMessagesConfig) {}

  async execute(input: SaveMessagesInput): Promise<void> {
    if (!input.conversationId?.trim()) {
      throw new Error("El conversationId es requerido");
    }

    const numbered = input.messages.map((m, i) => ({
      seq: i,
      role: m.role,
      parts: m.parts,
    }));

    await this.config.repository.saveMessages(input.conversationId, numbered);
  }
}
