import { HugeiconsIcon } from "@hugeicons/react";
import { Award01Icon, FireIcon } from "@hugeicons/core-free-icons";
import { getLevel } from "@/core/transaction/domain/scoring";
import type { LedgerType } from "@/lib/context/ledger-context";

interface PointsSummaryProps {
  ledgerType: LedgerType;
  score: number;
  streak: number;
}

export function PointsSummary({ ledgerType, score, streak }: PointsSummaryProps) {
  const { label, index, progress, nextMin } = getLevel(score, ledgerType);
  const pointsToNext = nextMin ? nextMin - score : 0;

  return (
    <div className="bg-white rounded-xl px-4 py-3.5 shadow-sm flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-muted-foreground/60 uppercase tracking-wider leading-none">
            Tus puntos
          </span>
          <div className="flex items-baseline gap-1">
            <HugeiconsIcon
              icon={Award01Icon}
              size={16}
              className="text-primary"
              strokeWidth={1.75}
            />
            <span className="text-xl font-semibold tabular-nums text-foreground leading-none">
              {score.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted-foreground/60">pts</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-orange-50 rounded-full px-2.5 py-1">
          <HugeiconsIcon
            icon={FireIcon}
            size={13}
            className="text-orange-400"
            strokeWidth={1.5}
          />
          <span className="text-[12px] font-semibold text-orange-500 leading-none">
            {streak}
            <span className="ml-0.5 text-[10px] font-medium text-orange-400/80">
              {streak === 1 ? "día" : "días"}
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground/70">
            Nv.{index + 1} · {label}
          </span>
          {nextMin && (
            <span className="text-[10px] text-muted-foreground/60 tabular-nums">
              {pointsToNext} pts al siguiente nivel
            </span>
          )}
        </div>
        <div className="h-1.5 bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
