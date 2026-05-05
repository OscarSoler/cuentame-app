import type { LedgerType } from "@/lib/context/ledger-context";

export const POINTS_PER_TRANSACTION = 10;
export const POINTS_PER_STREAK_DAY = 5;

export interface Level {
  min: number;
  personal: string;
  business: string;
}

export const LEVELS: Level[] = [
  { min: 0,    personal: "Semilla",  business: "Emprendedor" },
  { min: 200,  personal: "Brote",    business: "Negocio en marcha" },
  { min: 500,  personal: "Planta",   business: "Operación estable" },
  { min: 1000, personal: "Árbol",    business: "Negocio sólido" },
  { min: 2500, personal: "Bosque",   business: "Empresa consciente" },
];

export function getLevel(score: number, type: LedgerType) {
  const level = [...LEVELS].reverse().find((l) => score >= l.min) ?? LEVELS[0];
  const index = LEVELS.indexOf(level);
  const next = LEVELS[index + 1];
  const label = type === "business" ? level.business : level.personal;
  const progress = next
    ? Math.round(((score - level.min) / (next.min - level.min)) * 100)
    : 100;
  return { label, index, progress, nextMin: next?.min ?? null };
}

export function levelLabel(level: Level, type: LedgerType): string {
  return type === "business" ? level.business : level.personal;
}
