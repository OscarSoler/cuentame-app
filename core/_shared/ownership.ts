import { DrizzleLedgerRepository } from "@/core/ledger/infrastructure/drizzle-ledger.repository";

/**
 * Garantiza que el ledger pertenece al usuario. Lanza si no.
 * Barrier único para autorización de operaciones atadas a un ledger.
 */
export async function assertLedgerOwnership(userId: string, ledgerId: string): Promise<void> {
  const ok = await new DrizzleLedgerRepository().existsForUser(ledgerId, userId);
  if (!ok) throw new Error("Ledger no autorizado");
}
