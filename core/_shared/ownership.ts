import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { ledgers, transactions } from "@/lib/db/schema";
import { DrizzleLedgerRepository } from "@/core/ledger/infrastructure/drizzle-ledger.repository";

/**
 * Garantiza que el ledger pertenece al usuario. Lanza si no.
 * Barrier único para autorización de operaciones atadas a un ledger.
 */
export async function assertLedgerOwnership(userId: string, ledgerId: string): Promise<void> {
  const ok = await new DrizzleLedgerRepository().existsForUser(ledgerId, userId);
  if (!ok) throw new Error("Ledger no autorizado");
}

/**
 * Garantiza que la transacción pertenece a un ledger del usuario. Lanza si no.
 * Resuelve la cadena transaction → ledger → userId en una sola query.
 */
export async function assertTransactionOwnership(
  userId: string,
  transactionId: string,
): Promise<void> {
  const [row] = await db
    .select({ id: transactions.id })
    .from(transactions)
    .innerJoin(ledgers, eq(ledgers.id, transactions.ledgerId))
    .where(and(eq(transactions.id, transactionId), eq(ledgers.userId, userId)))
    .limit(1);
  if (!row) throw new Error("Transacción no autorizada");
}
