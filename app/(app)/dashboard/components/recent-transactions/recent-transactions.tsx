import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { formatCurrency } from "@/lib/utils";
import { PILLAR_META } from "@/lib/pillars";
import type { TransactionPillar } from "@/core/transaction/domain/transaction.entity";
import { RecentTransactionsEmpty } from "./recent-transactions-empty";

export interface TransactionData {
  id: string;
  note: string;
  amount: number;
  category: string;
  emoji: string;
  date: string;
  type: "income" | "expense";
  pillar: TransactionPillar | null;
}

interface RecentTransactionsProps {
  transactions: TransactionData[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return <RecentTransactionsEmpty />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
          Recientes
        </h2>
        <span className="text-[10px] text-muted-foreground/50">
          {transactions.length} movimiento{transactions.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {transactions.map((tx) => {
          const isIncome = tx.type === "income";
          const meta = tx.pillar ? PILLAR_META[tx.pillar] : null;
          const Icon = meta?.icon ?? (isIncome ? ArrowDown01Icon : ArrowUp01Icon);
          const accentColor = meta?.color ?? (isIncome ? "#2D5016" : "#A67B5B");

          return (
            <div
              key={tx.id}
              className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-border/10"
            >
              <span
                className="absolute -right-8 -top-8 w-20 h-20 rounded-full opacity-[0.06]"
                style={{ backgroundColor: accentColor }}
              />

              <div className="relative flex items-center gap-3 px-3.5 py-3">
                <div className="relative shrink-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${accentColor}14` }}
                  >
                    <HugeiconsIcon
                      icon={Icon}
                      size={17}
                      style={{ color: accentColor }}
                      strokeWidth={1.75}
                    />
                  </div>
                  {tx.emoji && (
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center text-[10px] leading-none">
                      {tx.emoji}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-foreground leading-tight truncate">
                    {tx.note}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {meta && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-1.5 py-[1px]"
                        style={{ backgroundColor: `${accentColor}1a` }}
                      >
                        <HugeiconsIcon
                          icon={meta.icon}
                          size={9}
                          style={{ color: accentColor }}
                          strokeWidth={2}
                        />
                        <span
                          className="text-[9px] font-medium"
                          style={{ color: accentColor }}
                        >
                          {meta.label}
                        </span>
                      </span>
                    )}
                    <span className="text-[10px] text-muted-foreground/60">
                      {tx.date}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[14px] font-semibold block tabular-nums ${
                      isIncome ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {isIncome ? "+" : "−"}
                    {formatCurrency(tx.amount)}
                  </span>
                  <span className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">
                    {isIncome ? "Ingreso" : "Gasto"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
