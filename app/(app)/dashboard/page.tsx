"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { useLedger, type LedgerType } from "@/lib/context/ledger-context";
import { BalanceHeader } from "./components/balance-header";
import { LedgerTabs } from "./components/ledger-tabs";
import { ScoreWidget } from "./components/score-widget";
import { WeeklyChart } from "./components/weekly-chart";
import { PillarsRow, type PillarData } from "./components/pillars-row";
import {
  RecentTransactions,
  type TransactionData,
} from "./components/recent-transactions";

export default function DashboardPage() {
  const [month, setMonth] = useState(3);
  const { activeLedger, setActiveLedger } = useLedger();

  const isBusiness = activeLedger.type === "business";
  const income = 0;
  const expenses = 0;
  const chartData: { name: string; ingresos: number; gastos: number }[] = [];
  const pillars: PillarData[] = [];
  const transactions: TransactionData[] = [];
  const categoryIcons: Record<string, IconSvgElement> = {};

  const handleLedgerChange = (type: LedgerType) => {
    setActiveLedger({
      id: `${type}-default`,
      type,
      name: type === "business" ? "Negocio" : "Personal",
    });
  };

  return (
    <div className="flex flex-col gap-5 px-5 pt-6 pb-4">
      <BalanceHeader
        income={income}
        expenses={expenses}
        month={month}
        isBusiness={isBusiness}
        onMonthChange={setMonth}
      />
      <LedgerTabs active={activeLedger.type} onChange={handleLedgerChange} />
      <ScoreWidget ledgerType={activeLedger.type} />

      {/* Income / Expense summary */}
      <div className="flex gap-2.5">
        <div className="flex items-center gap-2.5 flex-1 bg-white rounded-xl px-3.5 py-3 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={12}
              className="text-primary"
            />
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground/70 block leading-none">
              Ingresos
            </span>
            <span className="text-sm font-semibold text-foreground">
              ${(income / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-1 bg-white rounded-xl px-3.5 py-3 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <HugeiconsIcon
              icon={ArrowUp01Icon}
              size={12}
              className="text-destructive/70"
            />
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground/70 block leading-none">
              {isBusiness ? "Egresos" : "Gastos"}
            </span>
            <span className="text-sm font-semibold text-foreground">
              ${(expenses / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>
      </div>

      <WeeklyChart data={chartData} />
      <PillarsRow pillars={pillars} isBusiness={isBusiness} />
      <RecentTransactions
        transactions={transactions}
        categoryIcons={categoryIcons}
      />
    </div>
  );
}
