import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { Coins01Icon } from "@hugeicons/core-free-icons";
import { RecentTransactionsEmpty } from "./recent-transactions-empty";

function fmt(n: number) {
  return `$${n.toLocaleString()}`;
}

export interface TransactionData {
  id: string;
  note: string;
  amount: number;
  category: string;
  emoji: string;
  date: string;
  type: "income" | "expense";
}

interface RecentTransactionsProps {
  transactions: TransactionData[];
  categoryIcons: Record<string, IconSvgElement>;
}

export function RecentTransactions({ transactions, categoryIcons }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return <RecentTransactionsEmpty />;
  }

  return (
    <div>
      <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
        Recientes
      </h2>
      <div className="flex flex-col gap-1.5">
        {transactions.map((tx) => {
          const Icon = categoryIcons[tx.category] ?? Coins01Icon;
          const isIncome = tx.type === "income";
          return (
            <div key={tx.id} className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 shadow-sm">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isIncome ? "bg-primary/10" : "bg-accent/20"}`}>
                <HugeiconsIcon icon={Icon} size={16} className={isIncome ? "text-primary" : "text-foreground/50"} strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] font-medium text-foreground block truncate">{tx.note}</span>
                <span className="text-[10px] text-muted-foreground/70">{tx.date}</span>
              </div>
              <div className="text-right shrink-0">
                <span className={`text-[12px] font-semibold block ${isIncome ? "text-primary" : "text-foreground"}`}>
                  {isIncome ? "+" : "-"}{fmt(tx.amount)}
                </span>
                <span className="text-xs">{tx.emoji}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
