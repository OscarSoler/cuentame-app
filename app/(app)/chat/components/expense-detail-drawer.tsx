"use client";

import { useEffect, useState, useTransition } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Tag01Icon,
  Note01Icon,
  Calendar01Icon,
  Delete02Icon,
} from "@hugeicons/core-free-icons";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PILLAR_META } from "@/lib/pillars";
import type {
  TransactionEmotion,
  TransactionPillar as Pillar,
} from "@/core/transaction/domain/transaction.entity";
import { useLedger } from "@/lib/context/ledger-context";
import {
  deleteTransactionAction,
  updateTransactionAction,
} from "@/core/transaction/presentation/transaction.actions";

const personalPillarKeys: Pillar[] = ["survival", "optional", "culture", "extras"];
const businessPillarKeys: Pillar[] = ["operacion", "inversion", "variable", "imprevisto"];

const emotions: { value: TransactionEmotion; emoji: string }[] = [
  { value: "happy", emoji: "😊" },
  { value: "neutral", emoji: "😐" },
  { value: "sad", emoji: "😔" },
];

interface ExpenseData {
  id?: string;
  amount: number;
  category: string;
  note: string;
  pillar: Pillar;
  date: string;
  emotion?: TransactionEmotion | null;
}

interface ExpenseDetailDrawerProps {
  expense: ExpenseData;
  children: React.ReactNode;
  onEdited?: (patch: {
    amount: number;
    category: string;
    note: string;
    pillar: Pillar;
    emotion: TransactionEmotion | null;
  }) => void;
  onDeleted?: () => void;
}

export function ExpenseDetailDrawer({
  expense,
  children,
  onEdited,
  onDeleted,
}: ExpenseDetailDrawerProps) {
  const { activeLedger } = useLedger();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.category);
  const [note, setNote] = useState(expense.note);
  const [pillar, setPillar] = useState<Pillar>(expense.pillar);
  const [emotion, setEmotion] = useState<TransactionEmotion | "">(
    expense.emotion ?? "",
  );
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    setAmount(expense.amount.toString());
    setCategory(expense.category);
    setNote(expense.note);
    setPillar(expense.pillar);
    setEmotion(expense.emotion ?? "");
    setError(null);
  }, [
    open,
    expense.amount,
    expense.category,
    expense.note,
    expense.pillar,
    expense.emotion,
  ]);

  const pillarKeys =
    activeLedger.type === "business" ? businessPillarKeys : personalPillarKeys;

  const handleSave = () => {
    if (!expense.id) {
      setError("Falta el id de la transacción");
      return;
    }
    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("El monto debe ser mayor a 0");
      return;
    }
    setError(null);
    const trimmedCategory = category.trim();
    const trimmedNote = note.trim();
    const nextEmotion: TransactionEmotion | null = emotion === "" ? null : emotion;
    startTransition(async () => {
      const result = await updateTransactionAction(expense.id!, {
        amount: parsedAmount,
        category: trimmedCategory || null,
        note: trimmedNote || null,
        pillar,
        emotion: nextEmotion,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      onEdited?.({
        amount: parsedAmount,
        category: trimmedCategory,
        note: trimmedNote,
        pillar,
        emotion: nextEmotion,
      });
      setOpen(false);
    });
  };

  const handleDelete = () => {
    if (!expense.id) {
      setError("Falta el id de la transacción");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await deleteTransactionAction(expense.id!);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setOpen(false);
      onDeleted?.();
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="bg-linear-to-b from-[#FAF7F2] to-[#F0EBE0]">
        <VisuallyHidden>
          <DrawerTitle>Detalle del gasto</DrawerTitle>
        </VisuallyHidden>

        <div className="flex flex-col gap-5 px-5 pt-2 pb-8 max-h-[80dvh] overflow-y-auto">
          {/* Amount */}
          <div className="flex flex-col items-center gap-1 pt-2">
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
              Monto
            </span>
            <div className="flex items-center gap-1">
              <span className="text-3xl font-semibold text-foreground">$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-3xl font-semibold text-foreground bg-transparent outline-none w-40 text-center"
              />
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-3">
            {/* Note */}
            <div className="flex items-center gap-3 bg-white/50 rounded-xl px-3.5 py-3">
              <HugeiconsIcon
                icon={Note01Icon}
                size={16}
                className="text-muted-foreground/40 shrink-0"
                strokeWidth={1.5}
              />
              <Input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Descripción"
                className="border-0 bg-transparent p-0 h-auto text-sm shadow-none focus-visible:ring-0"
              />
            </div>

            {/* Category */}
            <div className="flex items-center gap-3 bg-white/50 rounded-xl px-3.5 py-3">
              <HugeiconsIcon
                icon={Tag01Icon}
                size={16}
                className="text-muted-foreground/40 shrink-0"
                strokeWidth={1.5}
              />
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Categoría"
                className="border-0 bg-transparent p-0 h-auto text-sm shadow-none focus-visible:ring-0"
              />
            </div>

            {/* Date */}
            <div className="flex items-center gap-3 bg-white/50 rounded-xl px-3.5 py-3">
              <HugeiconsIcon
                icon={Calendar01Icon}
                size={16}
                className="text-muted-foreground/40 shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-sm text-foreground">{expense.date}</span>
            </div>
          </div>

          {/* Pillar selector */}
          <div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider block mb-2.5">
              {activeLedger.type === "business" ? "Categoría" : "Pilar Kakebo"}
            </span>
            <div className="grid grid-cols-4 gap-2">
              {pillarKeys.map((key) => {
                const p = PILLAR_META[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPillar(key)}
                    className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                      pillar === key
                        ? "bg-primary/10 ring-1 ring-primary/30"
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        pillar === key
                          ? "bg-primary text-primary-foreground"
                          : "bg-accent/30"
                      }`}
                    >
                      <HugeiconsIcon
                        icon={p.icon}
                        size={14}
                        className={
                          pillar === key
                            ? "text-primary-foreground"
                            : "text-primary"
                        }
                        strokeWidth={1.5}
                      />
                    </div>
                    <span
                      className={`text-[9px] font-medium ${
                        pillar === key
                          ? "text-primary"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Emotion */}
          <div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider block mb-2.5">
              ¿Cómo te sentiste?
            </span>
            <div className="flex justify-center gap-3">
              {emotions.map((e) => (
                <button
                  key={e.value}
                  type="button"
                  onClick={() =>
                    setEmotion((prev) => (prev === e.value ? "" : e.value))
                  }
                  className={`w-11 h-11 flex items-center justify-center rounded-full text-lg transition-all cursor-pointer ${
                    emotion === e.value
                      ? "bg-primary/10 ring-1.5 ring-primary/30 scale-110"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                >
                  {e.emoji}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-[11px] text-destructive text-center">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending || !expense.id}
              className="flex-1"
            >
              <HugeiconsIcon icon={Delete02Icon} size={14} />
              Eliminar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending || !expense.id}
              className="flex-1"
            >
              {isPending ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
