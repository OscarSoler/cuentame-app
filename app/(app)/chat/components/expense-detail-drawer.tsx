"use client";

import { useState } from "react";
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
import { pillarConfig, type Pillar } from "./expense-card";
import { useLedger } from "@/lib/context/ledger-context";

const personalPillarKeys: Pillar[] = ["survival", "optional", "culture", "extras"];
const businessPillarKeys: Pillar[] = ["operacion", "inversion", "variable", "imprevisto"];

const emotions = [
  { value: "happy", emoji: "😊" },
  { value: "neutral", emoji: "😐" },
  { value: "sad", emoji: "😔" },
  { value: "guilty", emoji: "😬" },
  { value: "proud", emoji: "🤩" },
] as const;

interface ExpenseData {
  amount: number;
  category: string;
  note: string;
  pillar: Pillar;
  date: string;
  emotion?: string;
}

interface ExpenseDetailDrawerProps {
  expense: ExpenseData;
  children: React.ReactNode;
}

export function ExpenseDetailDrawer({
  expense,
  children,
}: ExpenseDetailDrawerProps) {
  const { activeLedger } = useLedger();
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(expense.amount.toString());
  const [category, setCategory] = useState(expense.category);
  const [note, setNote] = useState(expense.note);
  const [pillar, setPillar] = useState<Pillar>(expense.pillar);
  const [emotion, setEmotion] = useState(expense.emotion ?? "");

  const pillarKeys = activeLedger.type === "business" ? businessPillarKeys : personalPillarKeys;

  const handleSave = () => {
    // TODO: persist changes
    setOpen(false);
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
                const p = pillarConfig[key];
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
                  onClick={() => setEmotion(e.value)}
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

          {/* Actions */}
          <div className="flex gap-2.5 pt-1">
            <Button variant="destructive" onClick={() => setOpen(false)} className="flex-1">
              <HugeiconsIcon icon={Delete02Icon} size={14} />
              Eliminar
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Guardar
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
