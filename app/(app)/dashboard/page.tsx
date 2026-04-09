"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Coffee01Icon,
  Car01Icon,
  ShoppingBag01Icon,
  SparklesIcon,
  FlowerPotIcon,
  Book01Icon,
  Coins01Icon,
  Building01Icon,
  ChartLineData01Icon,
  Package01Icon,
  Alert02Icon,
  Home01Icon,
  Store01Icon,
} from "@hugeicons/core-free-icons";
import { useLedger, type LedgerType } from "@/lib/context/ledger-context";
import { ScoreWidget } from "@/components/dashboard/score-widget";

const months = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

// Semanas que suman ~4.5M ingresos y ~2.18M gastos
const chartData = [
  { name: "S1", ingresos: 1050000, gastos: 480000 },
  { name: "S2", ingresos: 1200000, gastos: 620000 },
  { name: "S3", ingresos: 900000, gastos: 560000 },
  { name: "S4", ingresos: 1350000, gastos: 520000 },
];

// ── Personal data ──
const personalPillars = [
  { key: "survival", label: "Supervivencia", spent: 980000, budget: 1200000, icon: SparklesIcon, color: "#2D5016" },
  { key: "optional", label: "Opcional", spent: 650000, budget: 500000, icon: FlowerPotIcon, color: "#8B9E7C" },
  { key: "culture", label: "Cultura", spent: 320000, budget: 400000, icon: Book01Icon, color: "#D4A574" },
  { key: "extras", label: "Extras", spent: 230000, budget: 300000, icon: Coins01Icon, color: "#A67B5B" },
];

const personalTransactions = [
  { id: "1", note: "Café y pan de bono", amount: 15000, category: "café", emoji: "😊", date: "Hoy", type: "expense" },
  { id: "2", note: "Uber al trabajo", amount: 12000, category: "transporte", emoji: "😐", date: "Hoy", type: "expense" },
  { id: "3", note: "Libro de diseño", amount: 85000, category: "libros", emoji: "🤩", date: "Ayer", type: "expense" },
  { id: "4", note: "Mercado semanal", amount: 180000, category: "mercado", emoji: "😐", date: "Ayer", type: "expense" },
];

// ── Business data ──
const businessPillars = [
  { key: "operacion", label: "Operación", spent: 1800000, budget: 2000000, icon: Building01Icon, color: "#2D5016" },
  { key: "inversion", label: "Inversión", spent: 500000, budget: 800000, icon: ChartLineData01Icon, color: "#8B9E7C" },
  { key: "variable", label: "Variable", spent: 920000, budget: 1000000, icon: Package01Icon, color: "#D4A574" },
  { key: "imprevisto", label: "Imprevisto", spent: 150000, budget: 200000, icon: Alert02Icon, color: "#A67B5B" },
];

const businessTransactions = [
  { id: "1", note: "Venta del día", amount: 850000, category: "ventas", emoji: "😊", date: "Hoy", type: "income" },
  { id: "2", note: "Arriendo local", amount: 1200000, category: "arriendo", emoji: "😐", date: "Hoy", type: "expense" },
  { id: "3", note: "Compra insumos", amount: 320000, category: "insumos", emoji: "😐", date: "Ayer", type: "expense" },
  { id: "4", note: "Servicios web", amount: 450000, category: "servicios", emoji: "🤩", date: "Ayer", type: "income" },
];

const personalCategoryIcons: Record<string, IconSvgElement> = {
  café: Coffee01Icon,
  transporte: Car01Icon,
  libros: Book01Icon,
  mercado: ShoppingBag01Icon,
};

const businessCategoryIcons: Record<string, IconSvgElement> = {
  ventas: ArrowDown01Icon,
  arriendo: Building01Icon,
  insumos: Package01Icon,
  servicios: Building01Icon,
};

const ledgerTabs: { type: LedgerType; label: string; icon: IconSvgElement }[] = [
  { type: "personal", label: "Personal", icon: Home01Icon },
  { type: "business", label: "Negocio", icon: Store01Icon },
];

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  return `$${(n / 1000).toFixed(0)}k`;
}

function WeeklyBars() {
  const max = Math.max(...chartData.flatMap((d) => [d.ingresos, d.gastos]));
  const H = 72; // altura total de barras en px

  return (
    <div className="flex items-end justify-between gap-2">
      {chartData.map((d) => {
        const incomeH = Math.round((d.ingresos / max) * H);
        const expenseH = Math.round((d.gastos / max) * H);
        return (
          <div key={d.name} className="flex flex-col items-center gap-1.5 flex-1">
            <div className="flex items-end gap-0.5 w-full justify-center" style={{ height: H }}>
              {/* Ingreso */}
              <div
                className="w-3 rounded-t-sm bg-primary/70"
                style={{ height: incomeH }}
              />
              {/* Gasto */}
              <div
                className="w-3 rounded-t-sm bg-destructive/30"
                style={{ height: expenseH }}
              />
            </div>
            <span className="text-[9px] text-muted-foreground/40">{d.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const [month, setMonth] = useState(3);
  const { activeLedger, setActiveLedger } = useLedger();

  const isBusiness = activeLedger.type === "business";
  const income = isBusiness ? 5200000 : 4500000;
  const expenses = isBusiness ? 3370000 : 2180000;
  const pillars = isBusiness ? businessPillars : personalPillars;
  const transactions = isBusiness ? businessTransactions : personalTransactions;
  const categoryIcons = isBusiness ? businessCategoryIcons : personalCategoryIcons;

  return (
    <div className="flex flex-col gap-5 px-5 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-0.5">
            {isBusiness ? "Flujo de caja" : "Tu balance"}
          </p>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            {fmt(income - expenses)}
          </h1>
        </div>
        <div className="flex items-center gap-0.5 mb-1">
          <button
            type="button"
            onClick={() => setMonth((m) => (m > 0 ? m - 1 : 11))}
            className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={12} className="text-muted-foreground/50" />
          </button>
          <span className="text-[11px] font-medium text-muted-foreground min-w-14 text-center">
            {months[month]} 2026
          </span>
          <button
            type="button"
            onClick={() => setMonth((m) => (m < 11 ? m + 1 : 0))}
            className="w-6 h-6 rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/30 transition-colors"
          >
            <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="text-muted-foreground/50" />
          </button>
        </div>
      </div>

      {/* Ledger tabs */}
      <div className="flex bg-white/40 rounded-xl p-1 gap-1">
        {ledgerTabs.map((tab) => {
          const active = activeLedger.type === tab.type;
          return (
            <button
              key={tab.type}
              type="button"
              onClick={() => setActiveLedger({ id: `${tab.type}-default`, type: tab.type, name: tab.label })}
              className={`flex items-center justify-center gap-1.5 flex-1 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                active
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground/50 hover:text-foreground/60"
              }`}
            >
              <HugeiconsIcon icon={tab.icon} size={13} strokeWidth={active ? 1.8 : 1.5} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Score widget */}
      <ScoreWidget ledgerType={activeLedger.type} />

      {/* Income / Expense */}
      <div className="flex gap-2.5">
        <div className="flex items-center gap-2.5 flex-1 bg-white/50 rounded-xl px-3.5 py-3">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={ArrowDown01Icon} size={12} className="text-primary" />
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground/50 block leading-none">
              {isBusiness ? "Ingresos" : "Ingresos"}
            </span>
            <span className="text-sm font-semibold text-foreground">{fmt(income)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-1 bg-white/50 rounded-xl px-3.5 py-3">
          <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={ArrowUp01Icon} size={12} className="text-destructive/70" />
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground/50 block leading-none">
              {isBusiness ? "Egresos" : "Gastos"}
            </span>
            <span className="text-sm font-semibold text-foreground">{fmt(expenses)}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/30 rounded-xl px-4 pt-3 pb-2.5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">Este mes</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-primary/70" />
              <span className="text-[9px] text-muted-foreground/50">Ingresos</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-sm bg-destructive/30" />
              <span className="text-[9px] text-muted-foreground/50">Gastos</span>
            </div>
          </div>
        </div>
        <WeeklyBars />
      </div>

      {/* Pillars */}
      <div>
        <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
          {isBusiness ? "Categorías" : "Pilares"}
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-5 px-5 scrollbar-none">
          {pillars.map((p) => {
            const percent = Math.min(Math.round((p.spent / p.budget) * 100), 100);
            const over = p.spent > p.budget;
            return (
              <div key={p.key} className="flex flex-col items-center gap-2.5 min-w-18 shrink-0">
                <div className="relative w-16 h-16">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="#E8E0D0" strokeWidth="2.5" />
                    <circle
                      cx="18" cy="18" r="15" fill="none"
                      stroke={over ? "#B44040" : p.color}
                      strokeWidth="2.5" strokeLinecap="round"
                      strokeDasharray={`${percent * 0.942} 94.2`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HugeiconsIcon icon={p.icon} size={16} className="text-foreground/60" strokeWidth={1.5} />
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-medium text-foreground/70 block leading-none">{p.label}</span>
                  <span className="text-[9px] text-muted-foreground/40 mt-0.5 block">{fmt(p.spent)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
          Recientes
        </h2>
        <div className="flex flex-col gap-1.5">
          {transactions.map((tx) => {
            const Icon = categoryIcons[tx.category] ?? Coins01Icon;
            const isIncome = tx.type === "income";
            return (
              <div key={tx.id} className="flex items-center gap-3 bg-white/50 rounded-xl px-3 py-2.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isIncome ? "bg-primary/10" : "bg-accent/20"}`}>
                  <HugeiconsIcon icon={Icon} size={16} className={isIncome ? "text-primary" : "text-foreground/50"} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[12px] font-medium text-foreground block truncate">{tx.note}</span>
                  <span className="text-[10px] text-muted-foreground/40">{tx.date}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-[12px] font-semibold block ${isIncome ? "text-primary" : "text-foreground"}`}>
                    {isIncome ? "+" : "-"}${tx.amount.toLocaleString()}
                  </span>
                  <span className="text-xs">{tx.emoji}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
