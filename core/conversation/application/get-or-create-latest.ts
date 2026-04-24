import { Conversation } from "../domain/conversation.entity";
import { ConversationRepository } from "../domain/conversation.repository";

interface GetOrCreateLatestConfig {
  repository: ConversationRepository;
}

export class GetOrCreateLatest {
  constructor(private config: GetOrCreateLatestConfig) {}

  async execute(ledgerId: string): Promise<Conversation> {
    if (!ledgerId?.trim()) throw new Error("El ledgerId es requerido");

    const latest = await this.config.repository.latestByLedgerId(ledgerId);
    if (latest) return latest;

    return this.config.repository.create({ ledgerId, title: null });
  }
}
