"use client";

import { useTransition } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { formatCurrency } from "@/lib/utils";
import { PILLAR_META } from "@/lib/pillars";
import type {
  TransactionEmotion,
  TransactionPillar,
} from "@/core/transaction/domain/transaction.entity";
import { updateTransactionEmotionAction } from "@/core/transaction/presentation/transaction.actions";
import { ExpenseDetailDrawer } from "./expense-detail-drawer";

export type Pillar = TransactionPillar;

const EMOTIONS: { value: TransactionEmotion; emoji: string; label: string }[] = [
  { value: "happy", emoji: "😊", label: "Feliz" },
  { value: "neutral", emoji: "😐", label: "Neutral" },
  { value: "sad", emoji: "😕", label: "Triste" },
];

interface ExpenseCardProps {
  id?: string;
  toolCallId?: string;
  amount: number;
  category: string;
  note: string;
  pillar: Pillar;
  date: string;
  emotion?: TransactionEmotion | null;
  onEdited?: (toolCallId: string, patch: Record<string, unknown>) => void;
  onDeleted?: (toolCallId: string) => void;
}

export function ExpenseCard({
  id,
  toolCallId,
  amount,
  category,
  note,
  pillar,
  date,
  emotion = null,
  onEdited,
  onDeleted,
}: ExpenseCardProps) {
  const config = PILLAR_META[pillar];
  const [, startTransition] = useTransition();

  const handleEmotionSelect = (next: TransactionEmotion) => {
    if (!id || next === emotion) return;
    if (toolCallId && onEdited) onEdited(toolCallId, { emotion: next });
    startTransition(async () => {
      const result = await updateTransactionEmotionAction(id, next);
      if (!result.success) {
        console.error("[ExpenseCard] emotion update failed:", result.error);
        if (toolCallId && onEdited) onEdited(toolCallId, { emotion });
      }
    });
  };

  return (
    <ExpenseDetailDrawer
      expense={{ id, amount, category, note, pillar, date, emotion }}
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

        <div className="flex items-center gap-1.5 mb-2.5">
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

        {id && (
          <div className="flex items-center gap-1.5 pt-2 border-t border-border/20">
            <span className="text-[10px] text-muted-foreground/60 mr-0.5">
              ¿Cómo te sentiste?
            </span>
            {EMOTIONS.map((e) => {
              const active = emotion === e.value;
              return (
                <button
                  key={e.value}
                  type="button"
                  aria-label={e.label}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleEmotionSelect(e.value);
                  }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-sm leading-none transition-all ${
                    active
                      ? "bg-primary/15 scale-110"
                      : "opacity-40 hover:opacity-100 hover:scale-105"
                  }`}
                >
                  {e.emoji}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </ExpenseDetailDrawer>
  );
}
