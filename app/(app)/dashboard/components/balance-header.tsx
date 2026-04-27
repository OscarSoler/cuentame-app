"use client";

import { useSession } from "@/lib/auth-client";
import { MonthPicker } from "./month-picker";

function firstName(fullName?: string | null) {
  return fullName?.trim().split(/\s+/)[0] ?? "";
}

interface BalanceHeaderProps {
  month: number;
  year: number;
  currentYear: number;
  currentMonth: number;
  onPeriodChange: (year: number, month: number) => void;
}

export function BalanceHeader({
  month,
  year,
  currentYear,
  currentMonth,
  onPeriodChange,
}: BalanceHeaderProps) {
  const { data: session } = useSession();
  const displayName = firstName(session?.user.name);

  return (
    <div className="flex items-center justify-between">
      <p className="font-heading text-xl font-semibold leading-none">
        {displayName ? (
          <>Cuéntame, <span className="text-primary">{displayName}</span></>
        ) : (
          "Cuéntame"
        )}
      </p>

      <MonthPicker
        month={month}
        year={year}
        currentYear={currentYear}
        currentMonth={currentMonth}
        onChange={onPeriodChange}
      />
    </div>
  );
}
