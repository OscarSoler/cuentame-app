import { Ledger, LedgerConfig } from "./ledger.entity";

export interface LedgerRepository {
  getByUserId(userId: string): Promise<Ledger[]>;
  existsForUser(ledgerId: string, userId: string): Promise<boolean>;
  create(data: Omit<LedgerConfig, "id" | "createdAt">): Promise<Ledger>;
}
