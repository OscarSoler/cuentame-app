import { Ledger, LedgerConfig } from "./ledger.entity";

export interface LedgerRepository {
  getByUserId(userId: string): Promise<Ledger[]>;
  create(data: Omit<LedgerConfig, "id" | "createdAt">): Promise<Ledger>;
}
