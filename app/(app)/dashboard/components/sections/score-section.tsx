import { getActivityStatsAction } from "@/core/transaction/presentation/transaction.actions";
import type { LedgerType } from "@/lib/context/ledger-context";
import { ScoreWidget } from "../score-widget";

interface ScoreSectionProps {
  ledgerId: string;
  ledgerType: LedgerType;
}

export async function ScoreSection({ ledgerId, ledgerType }: ScoreSectionProps) {
  const result = await getActivityStatsAction(ledgerId);

  if (!result.success) {
    return <ScoreWidget ledgerType={ledgerType} />;
  }

  return (
    <ScoreWidget
      ledgerType={ledgerType}
      score={result.data.score}
      streak={result.data.currentStreak}
      activeDays={new Set(result.data.activeDaysThisWeek)}
    />
  );
}
