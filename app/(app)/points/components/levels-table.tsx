import { HugeiconsIcon } from "@hugeicons/react";
import { CheckmarkCircle02Icon, LockedIcon } from "@hugeicons/core-free-icons";
import { LEVELS, levelLabel } from "@/core/transaction/domain/scoring";
import type { LedgerType } from "@/lib/context/ledger-context";

interface LevelsTableProps {
  ledgerType: LedgerType;
  score: number;
}

export function LevelsTable({ ledgerType, score }: LevelsTableProps) {
  const isBusiness = ledgerType === "business";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between px-1">
        <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
          Niveles
        </h2>
        <span className="text-[10px] text-muted-foreground/50">
          {isBusiness ? "Empresa" : "Personal"}
        </span>
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y divide-border/30">
        {LEVELS.map((level, i) => {
          const reached = score >= level.min;
          const next = LEVELS[i + 1];
          const isCurrent = reached && (!next || score < next.min);
          return (
            <div
              key={level.min}
              className={`flex items-center gap-3 px-4 py-2.5 ${
                isCurrent ? "bg-primary/5" : ""
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-semibold tabular-nums ${
                  reached
                    ? "bg-primary text-primary-foreground"
                    : "bg-border/30 text-muted-foreground/60"
                }`}
              >
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-[13px] font-semibold text-foreground leading-tight truncate">
                    {levelLabel(level, ledgerType)}
                  </p>
                  {isCurrent && (
                    <span className="text-[9px] font-semibold text-primary uppercase tracking-wider">
                      Actual
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground/70 tabular-nums mt-0.5">
                  Desde {level.min.toLocaleString()} pts
                </p>
              </div>
              <HugeiconsIcon
                icon={reached ? CheckmarkCircle02Icon : LockedIcon}
                size={14}
                className={reached ? "text-primary" : "text-muted-foreground/40"}
                strokeWidth={1.75}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
