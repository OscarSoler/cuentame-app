import { MONTHS_ES_ABBR } from "@/lib/months";
import { getPillarMetaFor } from "@/lib/pillars";
import type { TransactionPillar } from "@/core/transaction/domain/transaction.entity";
import type { PillarData } from "../components/pillars-row";
import type { TransactionData } from "../components/recent-transactions";

export function buildPillars(
  isBusiness: boolean,
  spentByKey: Record<string, number>,
): PillarData[] {
  if (Object.keys(spentByKey).length === 0) return [];
  return getPillarMetaFor(isBusiness).map((m) => ({
    key: m.key,
    label: m.label,
    icon: m.icon,
    color: m.color,
    spent: spentByKey[m.key] ?? 0,
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

  return `${date.getDate()} ${MONTHS_ES_ABBR[date.getMonth()].toLowerCase()}`;
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
    pillar: TransactionPillar | null;
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
    pillar: tx.pillar,
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

const DAY_INITIALS_ES = ["D", "L", "M", "X", "J", "V", "S"] as const;

export function buildDailyChartData(
  daily: Array<{ date: string; income: number; expenses: number }>,
  days = 7,
): Array<{ name: string; ingresos: number; gastos: number; isToday: boolean }> {
  const byDate = new Map(daily.map((d) => [d.date, d]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = isoDate(today);

  const result: Array<{ name: string; ingresos: number; gastos: number; isToday: boolean }> = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = isoDate(d);
    const entry = byDate.get(key);
    result.push({
      name: DAY_INITIALS_ES[d.getDay()],
      ingresos: entry?.income ?? 0,
      gastos: entry?.expenses ?? 0,
      isToday: key === todayKey,
    });
  }
  return result;
}

function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
