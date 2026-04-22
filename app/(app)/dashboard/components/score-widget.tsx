"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { FireIcon, Award01Icon } from "@hugeicons/core-free-icons";
import type { LedgerType } from "@/lib/context/ledger-context";

const levels = [
  { min: 0,    personal: "Semilla",          business: "Emprendedor" },
  { min: 200,  personal: "Brote",            business: "Negocio en marcha" },
  { min: 500,  personal: "Planta",           business: "Operación estable" },
  { min: 1000, personal: "Árbol",            business: "Negocio sólido" },
  { min: 2500, personal: "Bosque",           business: "Empresa consciente" },
];

function getLevel(score: number, type: LedgerType) {
  const level = [...levels].reverse().find((l) => score >= l.min) ?? levels[0];
  const index = levels.indexOf(level);
  const next = levels[index + 1];
  const label = type === "business" ? level.business : level.personal;
  const progress = next
    ? Math.round(((score - level.min) / (next.min - level.min)) * 100)
    : 100;
  return { label, index, progress, nextMin: next?.min ?? null };
}

// Mock data — se reemplazará con datos reales
const MOCK_SCORE = 340;
const MOCK_STREAK = 5;
const MOCK_TODAY_DONE = true;

interface ScoreWidgetProps {
  ledgerType: LedgerType;
}

export function ScoreWidget({ ledgerType }: ScoreWidgetProps) {
  const { label, index, progress, nextMin } = getLevel(MOCK_SCORE, ledgerType);

  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];
  // Mock: los últimos N días tienen registro
  const activeDays = new Set([0, 1, 2, 3, 4]); // lunes a viernes

  return (
    <div className="bg-white rounded-xl px-3.5 py-2.5 flex items-center gap-3 shadow-sm">
      {/* Score */}
      <div className="flex items-center gap-1.5 shrink-0">
        <HugeiconsIcon icon={Award01Icon} size={13} className="text-primary" strokeWidth={1.5} />
        <span className="text-sm font-semibold text-foreground">{MOCK_SCORE.toLocaleString()}</span>
        <span className="text-[9px] text-muted-foreground/70">pts</span>
      </div>

      {/* Level + progress */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-muted-foreground/70 truncate">Nv.{index + 1} · {label}</span>
          {nextMin && (
            <span className="text-[9px] text-muted-foreground/60 shrink-0 ml-1">{nextMin - MOCK_SCORE} pts</span>
          )}
        </div>
        <div className="h-1 bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Streak */}
      <div className="flex items-center gap-1 bg-orange-50 rounded-full px-2 py-0.5 shrink-0">
        <HugeiconsIcon icon={FireIcon} size={11} className="text-orange-400" strokeWidth={1.5} />
        <span className="text-[11px] font-semibold text-orange-500">{MOCK_STREAK}</span>
      </div>

      {/* Week dots */}
      <div className="flex items-center gap-0.5 shrink-0">
        {weekDays.map((day, i) => (
          <div
            key={day}
            className={`w-4 h-4 rounded-sm flex items-center justify-center text-[7px] font-medium transition-colors ${
              activeDays.has(i)
                ? "bg-primary text-primary-foreground"
                : "bg-border/20 text-muted-foreground/60"
            }`}
          >
            {activeDays.has(i) ? "✓" : day}
          </div>
        ))}
      </div>
    </div>
  );
}
