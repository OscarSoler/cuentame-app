import { Ledger, LedgerConfig } from "../domain/ledger.entity";
import { LedgerRepository } from "../domain/ledger.repository";

interface CreateLedgerConfig {
  repository: LedgerRepository;
}

type CreateLedgerInput = Omit<LedgerConfig, "id" | "createdAt">;

export class CreateLedger {
  constructor(private config: CreateLedgerConfig) {}

  async execute(input: CreateLedgerInput): Promise<Ledger> {
    if (!input.name?.trim()) throw new Error("El nombre es requerido");
    if (!input.userId?.trim()) throw new Error("El userId es requerido");

    return this.config.repository.create(input);
  }
}
