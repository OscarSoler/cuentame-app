"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { formatCurrency } from "@/lib/utils";
import { PILLAR_META } from "@/lib/pillars";
import type { TransactionPillar } from "@/core/transaction/domain/transaction.entity";
import { ExpenseDetailDrawer } from "./expense-detail-drawer";

export type Pillar = TransactionPillar;

interface ExpenseCardProps {
  amount: number;
  category: string;
  note: string;
  pillar: Pillar;
  date: string;
}

export function ExpenseCard({
  amount,
  category,
  note,
  pillar,
  date,
}: ExpenseCardProps) {
  const config = PILLAR_META[pillar];

  return (
    <ExpenseDetailDrawer expense={{ amount, category, note, pillar, date }}>
      <button
        type="button"
        className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl p-3.5 max-w-60 text-left cursor-pointer hover:bg-card/90 transition-colors"
      >
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              size={14}
              className="text-primary"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-primary font-medium leading-none">
              Gasto registrado
            </span>
            <span className="text-[9px] text-muted-foreground/60 mt-0.5">
              {date}
            </span>
          </div>
        </div>

        <div className="mb-1.5">
          <span className="text-xl font-semibold text-foreground">
            {formatCurrency(amount)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mb-2.5 leading-relaxed">
          {note}
        </p>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-accent/40 rounded-full px-2 py-0.5">
            <HugeiconsIcon
              icon={config.icon}
              size={10}
              className="text-primary"
            />
            <span className="text-[10px] text-accent-foreground font-medium">
              {config.label}
            </span>
          </div>
          <div className="bg-muted/60 rounded-full px-2 py-0.5">
            <span className="text-[10px] text-muted-foreground">
              #{category}
            </span>
          </div>
        </div>
      </button>
    </ExpenseDetailDrawer>
  );
}
