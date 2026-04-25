import { Conversation } from "../domain/conversation.entity";
import { ConversationRepository } from "../domain/conversation.repository";

interface GetConversationConfig {
  repository: ConversationRepository;
}

export class GetConversation {
  constructor(private config: GetConversationConfig) {}

  async byId(id: string): Promise<Conversation | null> {
    if (!id?.trim()) throw new Error("El id es requerido");
    return this.config.repository.getById(id);
  }

  async byIdWithMessages(id: string): Promise<Conversation | null> {
    if (!id?.trim()) throw new Error("El id es requerido");
    return this.config.repository.getByIdWithMessages(id);
  }

  async listByLedger(ledgerId: string): Promise<Conversation[]> {
    if (!ledgerId?.trim()) throw new Error("El ledgerId es requerido");
    return this.config.repository.listByLedgerId(ledgerId);
  }

  async latestByLedger(ledgerId: string): Promise<Conversation | null> {
    if (!ledgerId?.trim()) throw new Error("El ledgerId es requerido");
    return this.config.repository.latestByLedgerId(ledgerId);
  }
}
