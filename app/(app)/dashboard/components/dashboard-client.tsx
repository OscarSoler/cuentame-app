"use client";

import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { formatCurrencyCompact } from "@/lib/utils";
import type { Ledger, LedgerType } from "@/lib/context/ledger-context";
import { BalanceHeader } from "./balance-header";
import { LedgerTabs } from "./ledger-tabs";
import { ScoreWidget } from "./score-widget";
import { WeeklyChart } from "./weekly-chart";
import { PillarsRow, type PillarData } from "./pillars-row";
import {
  RecentTransactions,
  type TransactionData,
} from "./recent-transactions";

interface ChartEntry {
  name: string;
  ingresos: number;
  gastos: number;
}

interface DashboardClientProps {
  ledgers: Ledger[];
  activeLedger: Ledger;
  month: number;
  currentMonth: number;
  income: number;
  expenses: number;
  pillars: PillarData[];
  chartData: ChartEntry[];
  transactions: TransactionData[];
}

export function DashboardClient({
  ledgers,
  activeLedger,
  month,
  currentMonth,
  income,
  expenses,
  pillars,
  chartData,
  transactions,
}: DashboardClientProps) {
  const router = useRouter();
  const isBusiness = activeLedger.type === "business";

  const pushParams = (next: { ledger?: LedgerType; month?: number }) => {
    const params = new URLSearchParams();
    const ledgerType = next.ledger ?? activeLedger.type;
    const m = next.month ?? month;
    if (ledgerType !== "personal") params.set("ledger", ledgerType);
    if (m !== currentMonth) params.set("month", String(m));
    const qs = params.toString();
    router.push(qs ? `/dashboard?${qs}` : "/dashboard");
  };

  const handleLedgerChange = (type: LedgerType) => {
    if (type === activeLedger.type) return;
    if (!ledgers.some((l) => l.type === type)) return;
    pushParams({ ledger: type });
  };

  const handleMonthChange = (next: number) => {
    if (next === month) return;
    pushParams({ month: next });
  };

  return (
    <div className="flex flex-col gap-5 px-5 pt-6 pb-4">
      <BalanceHeader
        income={income}
        expenses={expenses}
        month={month}
        isBusiness={isBusiness}
        onMonthChange={handleMonthChange}
      />
      <LedgerTabs
        active={activeLedger.type}
        onChange={handleLedgerChange}
        availableTypes={ledgers.map((l) => l.type)}
      />
      <ScoreWidget ledgerType={activeLedger.type} />

      <div className="flex gap-2.5">
        <div className="flex items-center gap-2.5 flex-1 bg-white rounded-xl px-3.5 py-3 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-primary" />
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground/70 block leading-none">Ingresos</span>
            <span className="text-sm font-semibold text-foreground">
              {formatCurrencyCompact(income)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-1 bg-white rounded-xl px-3.5 py-3 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={ArrowUp01Icon} size={12} className="text-destructive/70" />
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground/70 block leading-none">
              {isBusiness ? "Egresos" : "Gastos"}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {formatCurrencyCompact(expenses)}
            </span>
          </div>
        </div>
      </div>

      <WeeklyChart data={chartData} />
      <PillarsRow pillars={pillars} isBusiness={isBusiness} />
      <RecentTransactions transactions={transactions} />
    </div>
  );
}
