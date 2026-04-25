import { ConversationRepository, NewMessageData } from "../domain/conversation.repository";

interface AppendMessagesConfig {
  repository: ConversationRepository;
}

interface AppendMessagesInput {
  conversationId: string;
  messages: NewMessageData[];
}

export class AppendMessages {
  constructor(private config: AppendMessagesConfig) {}

  async execute(input: AppendMessagesInput): Promise<void> {
    if (!input.conversationId?.trim()) throw new Error("El conversationId es requerido");
    if (input.messages.length === 0) return;
    await this.config.repository.appendMessages(input.conversationId, input.messages);
  }
}
