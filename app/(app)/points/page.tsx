import { redirect } from "next/navigation";
import { getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";
import { getActivityStatsAction } from "@/core/transaction/presentation/transaction.actions";
import { isLedgerType } from "@/lib/ledger/types";
import { readStoredLedgerType } from "@/lib/ledger/preference.server";
import { PointsHeader } from "./components/points-header";
import { PointsSummary } from "./components/points-summary";
import { PointsRules } from "./components/points-rules";
import { LevelsTable } from "./components/levels-table";
import { PointsTips } from "./components/points-tips";

interface PointsPageProps {
  searchParams?: Promise<{ ledger?: string }>;
}

export default async function PointsPage({ searchParams }: PointsPageProps) {
  const params = (await searchParams) ?? {};

  const ledgersResult = await getUserLedgersAction();
  if (!ledgersResult.success || ledgersResult.data.length === 0) {
    redirect("/");
  }
  const ledgers = ledgersResult.data;

  const storedType = await readStoredLedgerType();
  const requestedType = isLedgerType(params.ledger)
    ? params.ledger
    : (storedType ?? "personal");
  const activeLedger =
    ledgers.find((l) => l.type === requestedType) ?? ledgers[0];

  const statsResult = await getActivityStatsAction(activeLedger.id);
  const score = statsResult.success ? statsResult.data.score : 0;
  const streak = statsResult.success ? statsResult.data.currentStreak : 0;

  return (
    <div className="flex flex-col gap-4 px-4 pt-12 pb-6">
      <PointsHeader />
      <PointsSummary
        ledgerType={activeLedger.type}
        score={score}
        streak={streak}
      />
      <PointsRules />
      <LevelsTable ledgerType={activeLedger.type} score={score} />
      <PointsTips />
    </div>
  );
}
