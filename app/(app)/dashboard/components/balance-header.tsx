"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { useSession } from "@/lib/auth-client";
import { MONTHS_ES_ABBR } from "@/lib/months";
import { MonthPicker, isFuturePeriod } from "./month-picker";

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

function shiftPeriod(year: number, month: number, delta: number) {
  const total = year * 12 + month + delta;
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
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

  const prev = shiftPeriod(year, month, -1);
  const next = shiftPeriod(year, month, 1);
  const nextDisabled = isFuturePeriod(next.year, next.month, currentYear, currentMonth);

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-accent text-xl font-semibold leading-none mb-1.5">
          {displayName ? (
            <>Cuéntame, <span className="text-primary">{displayName}</span></>
          ) : (
            "Cuéntame"
          )}
        </p>
        <p className="text-sm text-muted-foreground/60 leading-none">
          Tu {MONTHS_ES_ABBR[month].toLowerCase()}
        </p>
      </div>

      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => onPeriodChange(prev.year, prev.month)}
          className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors"
          aria-label="Mes anterior"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={12} className="text-muted-foreground/70" />
        </button>
        <MonthPicker
          month={month}
          year={year}
          currentYear={currentYear}
          currentMonth={currentMonth}
          onChange={onPeriodChange}
        />
        <button
          type="button"
          disabled={nextDisabled}
          onClick={() => onPeriodChange(next.year, next.month)}
          className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          aria-label="Mes siguiente"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="text-muted-foreground/70" />
        </button>
      </div>
    </div>
  );
}
