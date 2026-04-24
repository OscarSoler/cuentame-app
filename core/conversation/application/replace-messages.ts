import { ConversationRepository, NewMessageData } from "../domain/conversation.repository";

interface ReplaceMessagesConfig {
  repository: ConversationRepository;
}

interface ReplaceMessagesInput {
  conversationId: string;
  messages: NewMessageData[];
}

export class ReplaceMessages {
  constructor(private config: ReplaceMessagesConfig) {}

  async execute(input: ReplaceMessagesInput): Promise<void> {
    if (!input.conversationId?.trim()) throw new Error("El conversationId es requerido");
    await this.config.repository.replaceMessages(input.conversationId, input.messages);
  }
}
