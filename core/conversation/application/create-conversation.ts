import { Conversation } from "../domain/conversation.entity";
import {
  ConversationRepository,
  CreateConversationData,
} from "../domain/conversation.repository";

interface CreateConversationConfig {
  repository: ConversationRepository;
}

export class CreateConversation {
  constructor(private config: CreateConversationConfig) {}

  async execute(input: CreateConversationData): Promise<Conversation> {
    if (!input.ledgerId?.trim()) throw new Error("El ledgerId es requerido");
    return this.config.repository.create(input);
  }
}
