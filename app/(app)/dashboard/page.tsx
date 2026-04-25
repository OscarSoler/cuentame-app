import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";
import { isLedgerType } from "@/lib/ledger/types";
import { readStoredLedgerType } from "@/lib/ledger/preference.server";
import { DashboardShell } from "./components/dashboard-shell";
import { ScoreSection } from "./components/sections/score-section";
import { SummarySection } from "./components/sections/summary-section";
import { ChartSection } from "./components/sections/chart-section";
import { PillarsSection } from "./components/sections/pillars-section";
import { RecentSection } from "./components/sections/recent-section";
import { ScoreSkeleton } from "./components/skeletons/score-skeleton";
import { SummarySkeleton } from "./components/skeletons/summary-skeleton";
import { ChartSkeleton } from "./components/skeletons/chart-skeleton";
import { PillarsSkeleton } from "./components/skeletons/pillars-skeleton";
import { RecentSkeleton } from "./components/skeletons/recent-skeleton";

interface DashboardPageProps {
  searchParams?: Promise<{
    ledger?: string;
    month?: string;
    year?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
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

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const jsMonthRaw = Number(params.month);
  const jsMonth =
    Number.isFinite(jsMonthRaw) && jsMonthRaw >= 0 && jsMonthRaw <= 11
      ? jsMonthRaw
      : currentMonth;
  const yearRaw = Number(params.year);
  const year = Number.isFinite(yearRaw) && yearRaw >= 1970 ? yearRaw : currentYear;
  const humanMonth = jsMonth + 1;

  const isBusiness = activeLedger.type === "business";
  const isCurrentMonth = year === currentYear && jsMonth === currentMonth;
  const suspenseKey = `${activeLedger.id}-${year}-${jsMonth}`;

  const pendingFallback = (
    <>
      {isCurrentMonth && <ScoreSkeleton />}
      <SummarySkeleton />
      {isCurrentMonth && <ChartSkeleton />}
      <PillarsSkeleton />
      <RecentSkeleton />
    </>
  );

  return (
    <DashboardShell
      ledgers={ledgers}
      activeLedger={activeLedger}
      month={jsMonth}
      year={year}
      currentYear={currentYear}
      currentMonth={currentMonth}
      pendingFallback={pendingFallback}
    >
      {isCurrentMonth && (
        <Suspense key={`score-${activeLedger.id}`} fallback={<ScoreSkeleton />}>
          <ScoreSection ledgerId={activeLedger.id} ledgerType={activeLedger.type} />
        </Suspense>
      )}

      <Suspense key={`summary-${suspenseKey}`} fallback={<SummarySkeleton />}>
        <SummarySection
          ledgerId={activeLedger.id}
          year={year}
          month={humanMonth}
          isBusiness={isBusiness}
        />
      </Suspense>

      {isCurrentMonth && (
        <Suspense key={`chart-${activeLedger.id}`} fallback={<ChartSkeleton />}>
          <ChartSection ledgerId={activeLedger.id} />
        </Suspense>
      )}

      <Suspense key={`pillars-${suspenseKey}`} fallback={<PillarsSkeleton />}>
        <PillarsSection
          ledgerId={activeLedger.id}
          year={year}
          month={humanMonth}
          isBusiness={isBusiness}
        />
      </Suspense>

      <Suspense key={`recent-${suspenseKey}`} fallback={<RecentSkeleton />}>
        <RecentSection ledgerId={activeLedger.id} year={year} month={humanMonth} />
      </Suspense>
    </DashboardShell>
  );
}
