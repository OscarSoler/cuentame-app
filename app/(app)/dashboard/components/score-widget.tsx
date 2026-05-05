"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { FireIcon, Award01Icon } from "@hugeicons/core-free-icons";
import type { LedgerType } from "@/lib/context/ledger-context";
import { getLevel } from "@/core/transaction/domain/scoring";

interface ScoreWidgetProps {
  ledgerType: LedgerType;
  score?: number;
  streak?: number;
  activeDays?: Set<number>;
}

export function ScoreWidget({
  ledgerType,
  score = 0,
  streak = 0,
  activeDays = new Set(),
}: ScoreWidgetProps) {
  const { label, index, progress, nextMin } = getLevel(score, ledgerType);

  const weekDays = ["L", "M", "X", "J", "V", "S", "D"];

  return (
    <Link
      href="/points"
      className="bg-white rounded-xl px-3.5 py-2.5 flex items-center gap-3 shadow-sm transition-colors hover:bg-white/80 active:bg-accent/30"
      aria-label="Ver cómo ganas puntos"
    >
      {/* Score */}
      <div className="flex items-center gap-1.5 shrink-0">
        <HugeiconsIcon icon={Award01Icon} size={13} className="text-primary" strokeWidth={1.5} />
        <span className="text-sm font-semibold text-foreground">{score.toLocaleString()}</span>
        <span className="text-[9px] text-muted-foreground/70">pts</span>
      </div>

      {/* Level + progress */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-[9px] text-muted-foreground/70 truncate">Nv.{index + 1} · {label}</span>
          {nextMin && (
            <span className="text-[9px] text-muted-foreground/60 shrink-0 ml-1">{nextMin - score} pts</span>
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
        <span className="text-[11px] font-semibold text-orange-500 leading-none">
          {streak}
          <span className="ml-0.5 text-[9px] font-medium text-orange-400/80">
            {streak === 1 ? "día" : "días"}
          </span>
        </span>
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
    </Link>
  );
}
