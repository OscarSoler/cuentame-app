"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const months = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  return `$${(n / 1000).toFixed(0)}k`;
}

// Mock — se reemplazará con datos reales del usuario
const MOCK_NAME = "Oscar";

interface BalanceHeaderProps {
  income: number;
  expenses: number;
  month: number;
  isBusiness: boolean;
  onMonthChange: (month: number) => void;
}

export function BalanceHeader({ income, expenses, month, isBusiness, onMonthChange }: BalanceHeaderProps) {
  const balance = income - expenses;

  return (
    <div className="flex items-center justify-between">
      {/* Saludo + balance */}
      <div>
        <p className="text-xl font-semibold leading-none mb-1.5">
          Cuéntame, <span className="text-primary">{MOCK_NAME}</span>
        </p>
        <p className="text-sm text-muted-foreground/60 leading-none">
          {fmt(balance)} este mes
        </p>
      </div>

      {/* Navegación de mes */}
      <div className="flex items-center gap-0.5">
        <button
          type="button"
          onClick={() => onMonthChange(month > 0 ? month - 1 : 11)}
          className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={12} className="text-muted-foreground/70" />
        </button>
        <span className="text-[11px] font-medium text-muted-foreground min-w-14 text-center">
          {months[month]} 2026
        </span>
        <button
          type="button"
          onClick={() => onMonthChange(month < 11 ? month + 1 : 0)}
          className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="text-muted-foreground/70" />
        </button>
      </div>
    </div>
  );
}
