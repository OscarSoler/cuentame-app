import { ConversationRepository } from "../domain/conversation.repository";

interface DeleteConversationConfig {
  repository: ConversationRepository;
}

export class DeleteConversation {
  constructor(private config: DeleteConversationConfig) {}

  async execute(id: string): Promise<void> {
    if (!id?.trim()) throw new Error("El id es requerido");
    await this.config.repository.delete(id);
  }
}
