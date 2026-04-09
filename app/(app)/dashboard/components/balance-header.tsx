"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  return `$${(n / 1000).toFixed(0)}k`;
}

interface BalanceHeaderProps {
  income: number;
  expenses: number;
  month: number;
  isBusiness: boolean;
  onMonthChange: (month: number) => void;
}

export function BalanceHeader({ income, expenses, month, isBusiness, onMonthChange }: BalanceHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-0.5">
          {isBusiness ? "Flujo de caja" : "Tu balance"}
        </p>
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">
          {fmt(income - expenses)}
        </h1>
      </div>
      <div className="flex items-center gap-0.5 mb-1">
        <button
          type="button"
          onClick={() => onMonthChange(month > 0 ? month - 1 : 11)}
          className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={12} className="text-muted-foreground/50" />
        </button>
        <span className="text-[11px] font-medium text-muted-foreground min-w-14 text-center">
          {months[month]} 2026
        </span>
        <button
          type="button"
          onClick={() => onMonthChange(month < 11 ? month + 1 : 0)}
          className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="text-muted-foreground/50" />
        </button>
      </div>
    </div>
  );
}
