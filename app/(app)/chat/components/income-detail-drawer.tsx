"use client";

import { useState, useTransition } from "react";
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
  ReceiptDollarIcon,
} from "@hugeicons/core-free-icons";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { formatCurrency } from "@/lib/utils";
import {
  deleteTransactionAction,
  updateTransactionAction,
} from "@/core/transaction/presentation/transaction.actions";

const categoryOptions = [
  { value: "ventas", label: "Ventas" },
  { value: "servicios", label: "Servicios" },
  { value: "otros_ingresos", label: "Otros ingresos" },
] as const;

interface IncomeData {
  id?: string;
  amount: number;
  category: string;
  note: string;
  date: string;
  ivaAmount: number;
}

interface IncomeDetailDrawerProps {
  income: IncomeData;
  children: React.ReactNode;
  onDeleted?: () => void;
}

export function IncomeDetailDrawer({
  income,
  children,
  onDeleted,
}: IncomeDetailDrawerProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(income.amount.toString());
  const [category, setCategory] = useState(income.category);
  const [note, setNote] = useState(income.note);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!income.id) {
      setError("Falta el id de la transacción");
      return;
    }
    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError("El monto debe ser mayor a 0");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await updateTransactionAction(income.id!, {
        amount: parsedAmount,
        category: category.trim() || null,
        note: note.trim() || null,
      });
      if (!result.success) {
        setError(result.error);
        return;
      }
      setOpen(false);
    });
  };

  const handleDelete = () => {
    if (!income.id) {
      setError("Falta el id de la transacción");
      return;
    }
    setError(null);
    startTransition(async () => {
      const result = await deleteTransactionAction(income.id!);
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
          <DrawerTitle>Detalle del ingreso</DrawerTitle>
        </VisuallyHidden>

        <div className="flex flex-col gap-5 px-5 pt-2 pb-8 max-h-[80dvh] overflow-y-auto">
          <div className="flex flex-col items-center gap-1 pt-2">
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
              Ingreso
            </span>
            <div className="flex items-center gap-1">
              <span className="text-3xl font-semibold text-primary">+$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-3xl font-semibold text-primary bg-transparent outline-none w-40 text-center"
              />
            </div>
            {income.ivaAmount > 0 && (
              <span className="text-[11px] text-muted-foreground/60 mt-1">
                Incluye IVA {formatCurrency(income.ivaAmount)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-3">
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

            <div className="flex items-center gap-3 bg-white/50 rounded-xl px-3.5 py-3">
              <HugeiconsIcon
                icon={Calendar01Icon}
                size={16}
                className="text-muted-foreground/40 shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-sm text-foreground">{income.date}</span>
            </div>

            {income.ivaAmount > 0 && (
              <div className="flex items-center gap-3 bg-white/50 rounded-xl px-3.5 py-3">
                <HugeiconsIcon
                  icon={ReceiptDollarIcon}
                  size={16}
                  className="text-muted-foreground/40 shrink-0"
                  strokeWidth={1.5}
                />
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider leading-none">
                    IVA incluido
                  </span>
                  <span className="text-sm text-foreground mt-0.5">
                    {formatCurrency(income.ivaAmount)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-2.5">
              <HugeiconsIcon
                icon={Tag01Icon}
                size={12}
                className="text-muted-foreground/50"
                strokeWidth={1.5}
              />
              <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
                Categoría
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {categoryOptions.map((opt) => {
                const active = category === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCategory(opt.value)}
                    className={`py-2.5 rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                      active
                        ? "bg-primary/10 ring-1 ring-primary/30 text-primary"
                        : "bg-white/40 hover:bg-white/60 text-muted-foreground/70"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="text-[11px] text-destructive text-center">{error}</p>
          )}

          <div className="flex gap-2.5 pt-1">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending || !income.id}
              className="flex-1"
            >
              <HugeiconsIcon icon={Delete02Icon} size={14} />
              Eliminar
            </Button>
            <Button
              onClick={handleSave}
              disabled={isPending || !income.id}
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
