"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { formatCurrency } from "@/lib/utils";
import { useLedger } from "@/lib/context/ledger-context";
import { IncomeDetailDrawer } from "./income-detail-drawer";

const categoryLabels: Record<string, string> = {
  ventas: "Ventas",
  servicios: "Servicios",
  otros_ingresos: "Otros ingresos",
};

interface IncomeCardProps {
  id?: string;
  toolCallId?: string;
  amount: number;
  category: string;
  note: string;
  date: string;
  ivaAmount: number;
  onEdited?: (toolCallId: string, patch: Record<string, unknown>) => void;
  onDeleted?: (toolCallId: string) => void;
}

export function IncomeCard({
  id,
  toolCallId,
  amount,
  category,
  note,
  date,
  ivaAmount,
  onEdited,
  onDeleted,
}: IncomeCardProps) {
  const { activeLedger } = useLedger();
  const showIva = activeLedger.type === "business" && ivaAmount > 0;
  return (
    <IncomeDetailDrawer
      income={{
        id,
        amount,
        category,
        note,
        date,
        ivaAmount: showIva ? ivaAmount : 0,
      }}
      onEdited={
        toolCallId && onEdited
          ? (patch) => onEdited(toolCallId, patch)
          : undefined
      }
      onDeleted={
        toolCallId && onDeleted ? () => onDeleted(toolCallId) : undefined
      }
    >
      <div
        role="button"
        tabIndex={0}
        className="bg-card/70 backdrop-blur-sm border border-primary/15 rounded-xl p-3.5 max-w-60 text-left cursor-pointer hover:bg-card/90 transition-colors"
      >
        <div className="flex items-center gap-2 mb-2.5">
          <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={14}
              className="text-primary"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-primary font-medium leading-none">
              Ingreso registrado
            </span>
            <span className="text-[9px] text-muted-foreground/60 mt-0.5">
              {date}
            </span>
          </div>
        </div>

        <div className="mb-1.5">
          <span className="text-xl font-semibold text-primary">
            +{formatCurrency(amount)}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mb-2.5 leading-relaxed">
          {note}
        </p>

        <div className="flex items-center gap-1.5">
          <div className="bg-primary/10 rounded-full px-2 py-0.5">
            <span className="text-[10px] text-primary font-medium">
              {categoryLabels[category] ?? category}
            </span>
          </div>
          {showIva && (
            <div className="bg-muted/60 rounded-full px-2 py-0.5">
              <span className="text-[10px] text-muted-foreground">
                IVA {formatCurrency(ivaAmount)}
              </span>
            </div>
          )}
        </div>
      </div>
    </IncomeDetailDrawer>
  );
}
