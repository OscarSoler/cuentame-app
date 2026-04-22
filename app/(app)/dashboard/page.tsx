"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
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
} from "@hugeicons/core-free-icons";
import { useLedger, type LedgerType } from "@/lib/context/ledger-context";
import { BalanceHeader } from "./components/balance-header";
import { LedgerTabs } from "./components/ledger-tabs";
import { ScoreWidget } from "./components/score-widget";
import { WeeklyChart } from "./components/weekly-chart";
import { PillarsRow, type PillarData } from "./components/pillars-row";
import {
  RecentTransactions,
  type TransactionData,
} from "./components/recent-transactions";

// ── Mock data ──────────────────────────────────────────────

const chartData = [
  { name: "S1", ingresos: 1050000, gastos: 480000 },
  { name: "S2", ingresos: 1200000, gastos: 620000 },
  { name: "S3", ingresos: 900000, gastos: 560000 },
  { name: "S4", ingresos: 1350000, gastos: 520000 },
];

const personalPillars: PillarData[] = [
  {
    key: "survival",
    label: "Supervivencia",
    spent: 980000,
    budget: 1200000,
    icon: SparklesIcon,
    color: "#2D5016",
  },
  {
    key: "optional",
    label: "Opcional",
    spent: 650000,
    budget: 500000,
    icon: FlowerPotIcon,
    color: "#8B9E7C",
  },
  {
    key: "culture",
    label: "Cultura",
    spent: 320000,
    budget: 400000,
    icon: Book01Icon,
    color: "#D4A574",
  },
  {
    key: "extras",
    label: "Extras",
    spent: 230000,
    budget: 300000,
    icon: Coins01Icon,
    color: "#A67B5B",
  },
];

const businessPillars: PillarData[] = [
  {
    key: "operacion",
    label: "Operación",
    spent: 1800000,
    budget: 2000000,
    icon: Building01Icon,
    color: "#2D5016",
  },
  {
    key: "inversion",
    label: "Inversión",
    spent: 500000,
    budget: 800000,
    icon: ChartLineData01Icon,
    color: "#8B9E7C",
  },
  {
    key: "variable",
    label: "Variable",
    spent: 920000,
    budget: 1000000,
    icon: Package01Icon,
    color: "#D4A574",
  },
  {
    key: "imprevisto",
    label: "Imprevisto",
    spent: 150000,
    budget: 200000,
    icon: Alert02Icon,
    color: "#A67B5B",
  },
];

const personalTransactions: TransactionData[] = [
  {
    id: "1",
    note: "Café y pan de bono",
    amount: 15000,
    category: "café",
    emoji: "😊",
    date: "Hoy",
    type: "expense",
  },
  {
    id: "2",
    note: "Uber al trabajo",
    amount: 12000,
    category: "transporte",
    emoji: "😐",
    date: "Hoy",
    type: "expense",
  },
  {
    id: "3",
    note: "Libro de diseño",
    amount: 85000,
    category: "libros",
    emoji: "🤩",
    date: "Ayer",
    type: "expense",
  },
  {
    id: "4",
    note: "Mercado semanal",
    amount: 180000,
    category: "mercado",
    emoji: "😐",
    date: "Ayer",
    type: "expense",
  },
];

const businessTransactions: TransactionData[] = [
  {
    id: "1",
    note: "Venta del día",
    amount: 850000,
    category: "ventas",
    emoji: "😊",
    date: "Hoy",
    type: "income",
  },
  {
    id: "2",
    note: "Arriendo local",
    amount: 1200000,
    category: "arriendo",
    emoji: "😐",
    date: "Hoy",
    type: "expense",
  },
  {
    id: "3",
    note: "Compra insumos",
    amount: 320000,
    category: "insumos",
    emoji: "😐",
    date: "Ayer",
    type: "expense",
  },
  {
    id: "4",
    note: "Servicios web",
    amount: 450000,
    category: "servicios",
    emoji: "🤩",
    date: "Ayer",
    type: "income",
  },
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

// ── Page ───────────────────────────────────────────────────

export default function DashboardPage() {
  const [month, setMonth] = useState(3);
  const { activeLedger, setActiveLedger } = useLedger();

  const isBusiness = activeLedger.type === "business";
  const income = isBusiness ? 5200000 : 4500000;
  const expenses = isBusiness ? 3370000 : 2180000;

  const handleLedgerChange = (type: LedgerType) => {
    setActiveLedger({
      id: `${type}-default`,
      type,
      name: type === "business" ? "Negocio" : "Personal",
    });
  };

  return (
    <div className="flex flex-col gap-5 px-5 pt-6 pb-4">
      <BalanceHeader
        income={income}
        expenses={expenses}
        month={month}
        isBusiness={isBusiness}
        onMonthChange={setMonth}
      />
      <LedgerTabs active={activeLedger.type} onChange={handleLedgerChange} />
      <ScoreWidget ledgerType={activeLedger.type} />

      {/* Income / Expense summary */}
      <div className="flex gap-2.5">
        <div className="flex items-center gap-2.5 flex-1 bg-white rounded-xl px-3.5 py-3 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <HugeiconsIcon
              icon={ArrowDown01Icon}
              size={12}
              className="text-primary"
            />
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground/70 block leading-none">
              Ingresos
            </span>
            <span className="text-sm font-semibold text-foreground">
              ${(income / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5 flex-1 bg-white rounded-xl px-3.5 py-3 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
            <HugeiconsIcon
              icon={ArrowUp01Icon}
              size={12}
              className="text-destructive/70"
            />
          </div>
          <div>
            <span className="text-[9px] text-muted-foreground/70 block leading-none">
              {isBusiness ? "Egresos" : "Gastos"}
            </span>
            <span className="text-sm font-semibold text-foreground">
              ${(expenses / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>
      </div>

      <WeeklyChart data={chartData} />
      <PillarsRow
        pillars={isBusiness ? businessPillars : personalPillars}
        isBusiness={isBusiness}
      />
      <RecentTransactions
        transactions={isBusiness ? businessTransactions : personalTransactions}
        categoryIcons={
          isBusiness ? businessCategoryIcons : personalCategoryIcons
        }
      />
    </div>
  );
}
