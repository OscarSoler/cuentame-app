import { Message, MessageRole } from "../domain/message.entity";
import { ConversationRepository } from "../domain/conversation.repository";

interface AppendMessageConfig {
  repository: ConversationRepository;
}

interface AppendMessageInput {
  conversationId: string;
  role: MessageRole;
  parts: unknown;
}

export class AppendMessage {
  constructor(private config: AppendMessageConfig) {}

  async execute(input: AppendMessageInput): Promise<Message> {
    if (!input.conversationId?.trim()) throw new Error("El conversationId es requerido");
    if (input.parts == null) throw new Error("parts es requerido");

    return this.config.repository.appendMessage(input.conversationId, {
      role: input.role,
      parts: input.parts,
    });
  }
}
