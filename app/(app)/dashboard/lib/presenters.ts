import type { IconSvgElement } from "@hugeicons/react";
import {
  SparklesIcon,
  FlowerPotIcon,
  Book01Icon,
  Coins01Icon,
  Building01Icon,
  ChartLineData01Icon,
  Package01Icon,
  Alert02Icon,
} from "@hugeicons/core-free-icons";
import type { PillarData } from "../components/pillars-row";
import type { TransactionData } from "../components/recent-transactions";

type Pillar = "survival" | "optional" | "culture" | "extras";
type BusinessPillar = "operacion" | "inversion" | "variable" | "imprevisto";

interface PillarMeta {
  key: string;
  label: string;
  icon: IconSvgElement;
  color: string;
}

const personalPillarMeta: Record<Pillar, PillarMeta> = {
  survival: { key: "survival", label: "Supervivencia", icon: SparklesIcon, color: "#2D5016" },
  optional: { key: "optional", label: "Opcional", icon: FlowerPotIcon, color: "#8B9E7C" },
  culture: { key: "culture", label: "Cultura", icon: Book01Icon, color: "#D4A574" },
  extras: { key: "extras", label: "Extras", icon: Coins01Icon, color: "#A67B5B" },
};

const businessPillarMeta: Record<BusinessPillar, PillarMeta> = {
  operacion: { key: "operacion", label: "Operación", icon: Building01Icon, color: "#2D5016" },
  inversion: { key: "inversion", label: "Inversión", icon: ChartLineData01Icon, color: "#8B9E7C" },
  variable: { key: "variable", label: "Variable", icon: Package01Icon, color: "#D4A574" },
  imprevisto: { key: "imprevisto", label: "Imprevisto", icon: Alert02Icon, color: "#A67B5B" },
};

export function buildPillars(
  isBusiness: boolean,
  spentByKey: Record<string, number>,
): PillarData[] {
  const meta: Record<string, PillarMeta> = isBusiness
    ? businessPillarMeta
    : personalPillarMeta;
  return Object.keys(meta).map((k) => ({
    key: meta[k].key,
    label: meta[k].label,
    icon: meta[k].icon,
    color: meta[k].color,
    spent: spentByKey[k] ?? 0,
    budget: 0,
  }));
}

export function emotionToEmoji(emotion: string | null): string {
  if (emotion === "happy") return "😊";
  if (emotion === "sad") return "😕";
  return "😐";
}

export function relativeDateLabel(iso: string): string {
  const date = new Date(iso + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.getTime() === today.getTime()) return "Hoy";
  if (date.getTime() === yesterday.getTime()) return "Ayer";

  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

export function buildRecentTransactions(
  raw: Array<{
    id: string;
    amount: number;
    type: "income" | "expense";
    date: string;
    category: string | null;
    emotion: string | null;
    note: string | null;
  }>,
): TransactionData[] {
  return raw.map((tx) => ({
    id: tx.id,
    note: tx.note ?? tx.category ?? "Transacción",
    amount: tx.amount,
    category: tx.category ?? "otros",
    emoji: emotionToEmoji(tx.emotion),
    date: relativeDateLabel(tx.date),
    type: tx.type,
  }));
}

export function buildChartData(
  weeks: Array<{ weekIndex: number; income: number; expenses: number }>,
) {
  const byIndex = new Map(weeks.map((w) => [w.weekIndex, w]));
  return [1, 2, 3, 4, 5]
    .map((i) => ({
      name: `S${i}`,
      ingresos: byIndex.get(i)?.income ?? 0,
      gastos: byIndex.get(i)?.expenses ?? 0,
    }))
    .filter((w) => w.ingresos > 0 || w.gastos > 0);
}
