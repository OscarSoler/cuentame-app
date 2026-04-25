import { Ledger } from "../domain/ledger.entity";
import { LedgerRepository } from "../domain/ledger.repository";

interface GetLedgerConfig {
  repository: LedgerRepository;
}

export class GetLedger {
  constructor(private config: GetLedgerConfig) {}

  async byUserId(userId: string): Promise<Ledger[]> {
    if (!userId?.trim()) throw new Error("El userId es requerido");
    return this.config.repository.getByUserId(userId);
  }
}
