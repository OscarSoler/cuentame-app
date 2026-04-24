import { redirect } from "next/navigation";
import { getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";
import {
  getMonthSummaryAction,
  getPillarsSpentAction,
  getRecentTransactionsAction,
  getWeeklyTotalsAction,
} from "@/core/transaction/presentation/transaction.actions";
import type { LedgerType } from "@/lib/context/ledger-context";
import { DashboardClient } from "./components/dashboard-client";
import {
  buildChartData,
  buildPillars,
  buildRecentTransactions,
} from "./lib/presenters";

interface DashboardPageProps {
  searchParams?: Promise<{
    ledger?: string;
    month?: string;
  }>;
}

function isLedgerType(value: string | undefined): value is LedgerType {
  return value === "personal" || value === "business";
}

function unwrap<T, F>(
  result: { success: true; data: T } | { success: false; error: string },
  fallback: F,
): T | F {
  return result.success ? result.data : fallback;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = (await searchParams) ?? {};

  const ledgersResult = await getUserLedgersAction();
  if (!ledgersResult.success || ledgersResult.data.length === 0) {
    redirect("/");
  }
  const ledgers = ledgersResult.data;

  const requestedType = isLedgerType(params.ledger) ? params.ledger : "personal";
  const activeLedger =
    ledgers.find((l) => l.type === requestedType) ?? ledgers[0];

  const now = new Date();
  const monthRaw = Number(params.month);
  const month =
    Number.isFinite(monthRaw) && monthRaw >= 0 && monthRaw <= 11
      ? monthRaw
      : now.getMonth();
  const year = now.getFullYear();

  const [summaryRes, pillarsRes, weeklyRes, recentRes] = await Promise.all([
    getMonthSummaryAction(activeLedger.id, year, month + 1),
    getPillarsSpentAction(activeLedger.id, year, month + 1),
    getWeeklyTotalsAction(activeLedger.id, year, month + 1),
    getRecentTransactionsAction(activeLedger.id, 6),
  ]);

  const summary = unwrap(summaryRes, { income: 0, expenses: 0 });
  const pillarsSpent = unwrap(pillarsRes, []);
  const weekly = unwrap(weeklyRes, []);
  const recent = unwrap(recentRes, []);

  const spentByKey: Record<string, number> = {};
  for (const p of pillarsSpent) spentByKey[p.pillar] = p.spent;

  const isBusiness = activeLedger.type === "business";
  const hasAnySpent = Object.keys(spentByKey).length > 0;

  return (
    <DashboardClient
      ledgers={ledgers}
      activeLedger={activeLedger}
      month={month}
      currentMonth={now.getMonth()}
      income={summary.income}
      expenses={summary.expenses}
      pillars={hasAnySpent ? buildPillars(isBusiness, spentByKey) : []}
      chartData={buildChartData(weekly)}
      transactions={buildRecentTransactions(recent)}
    />
  );
}
