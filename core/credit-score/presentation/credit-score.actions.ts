"use server";

import { requireSession, wrapAction } from "@/core/_shared/action";
import { assertLedgerOwnership } from "@/core/_shared/ownership";
import { DrizzleLedgerRepository } from "@/core/ledger/infrastructure/drizzle-ledger.repository";
import { DrizzleTransactionRepository } from "@/core/transaction/infrastructure/drizzle-transaction.repository";
import { CalculateScore } from "../application/calculate-score";

export async function getCreditScoreAction(
  ledgerId: string,
  windowMonths?: number,
) {
  return wrapAction(async () => {
    const session = await requireSession();
    await assertLedgerOwnership(session.user.id, ledgerId);

    const useCase = new CalculateScore({
      ledgerRepository: new DrizzleLedgerRepository(),
      transactionRepository: new DrizzleTransactionRepository(),
    });

    const score = await useCase.execute({ ledgerId, windowMonths });
    return {
      business: score.business,
      indicators: score.indicators,
      usage: score.usage,
      evaluation: score.evaluation,
      windowMonths: score.windowMonths,
      generatedAt: score.generatedAt.toISOString(),
    };
  });
}
