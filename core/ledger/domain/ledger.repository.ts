import { Ledger, LedgerConfig } from "./ledger.entity";

export interface LedgerRepository {
  getById(ledgerId: string): Promise<Ledger | null>;
  getByUserId(userId: string): Promise<Ledger[]>;
  existsForUser(ledgerId: string, userId: string): Promise<boolean>;
  create(data: Omit<LedgerConfig, "id" | "createdAt">): Promise<Ledger>;
}
