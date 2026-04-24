import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { getMonthSummaryAction } from "@/core/transaction/presentation/transaction.actions";
import { unwrap } from "@/core/_shared/action";
import { formatCurrencyCompact } from "@/lib/utils";

interface SummarySectionProps {
  ledgerId: string;
  year: number;
  month: number;
  isBusiness: boolean;
}

export async function SummarySection({
  ledgerId,
  year,
  month,
  isBusiness,
}: SummarySectionProps) {
  const { income, expenses } = unwrap(
    await getMonthSummaryAction(ledgerId, year, month),
    { income: 0, expenses: 0 },
  );

  return (
    <div className="flex gap-2.5">
      <div className="flex items-center gap-2.5 flex-1 bg-white rounded-xl px-3.5 py-3 shadow-sm">
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-primary" />
        </div>
        <div>
          <span className="text-[9px] text-muted-foreground/70 block leading-none">
            Ingresos
          </span>
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
  );
}
