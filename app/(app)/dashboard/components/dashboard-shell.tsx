"use client";

import { useRouter } from "next/navigation";
import type { Ledger, LedgerType } from "@/lib/context/ledger-context";
import { useLedger } from "@/lib/context/ledger-context";
import { BalanceHeader } from "./balance-header";
import { LedgerTabs } from "./ledger-tabs";

interface DashboardShellProps {
  ledgers: Ledger[];
  activeLedger: Ledger;
  month: number;
  year: number;
  currentYear: number;
  currentMonth: number;
  children: React.ReactNode;
}

export function DashboardShell({
  ledgers,
  activeLedger,
  month,
  year,
  currentYear,
  currentMonth,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const { switchType } = useLedger();

  const pushParams = (next: {
    ledger?: LedgerType;
    year?: number;
    month?: number;
  }) => {
    const params = new URLSearchParams();
    const ledgerType = next.ledger ?? activeLedger.type;
    const nextYear = next.year ?? year;
    const nextMonth = next.month ?? month;
    if (ledgerType !== "personal") params.set("ledger", ledgerType);
    if (nextYear !== currentYear) params.set("year", String(nextYear));
    if (nextMonth !== currentMonth) params.set("month", String(nextMonth));
    const qs = params.toString();
    router.push(qs ? `/dashboard?${qs}` : "/dashboard");
  };

  const handleLedgerChange = (type: LedgerType) => {
    if (type === activeLedger.type) return;
    if (!ledgers.some((l) => l.type === type)) return;
    switchType(type);
    pushParams({ ledger: type });
  };

  const handlePeriodChange = (nextYear: number, nextMonth: number) => {
    if (nextYear === year && nextMonth === month) return;
    pushParams({ year: nextYear, month: nextMonth });
  };

  return (
    <div className="flex flex-col gap-5 px-5 pt-6 pb-4">
      <BalanceHeader
        month={month}
        year={year}
        currentYear={currentYear}
        currentMonth={currentMonth}
        onPeriodChange={handlePeriodChange}
      />
      <LedgerTabs
        active={activeLedger.type}
        onChange={handleLedgerChange}
        availableTypes={ledgers.map((l) => l.type)}
      />
      {children}
    </div>
  );
}
