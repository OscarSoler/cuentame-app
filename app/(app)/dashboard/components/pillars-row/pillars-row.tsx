import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { PillarsRowEmpty } from "./pillars-row-empty";

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`;
  return `$${(n / 1000).toFixed(0)}k`;
}

export interface PillarData {
  key: string;
  label: string;
  spent: number;
  budget: number;
  icon: IconSvgElement;
  color: string;
}

interface PillarsRowProps {
  pillars: PillarData[];
  isBusiness: boolean;
}

export function PillarsRow({ pillars, isBusiness }: PillarsRowProps) {
  if (pillars.length === 0) {
    return <PillarsRowEmpty isBusiness={isBusiness} />;
  }

  return (
    <div>
      <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
        {isBusiness ? "Categorías" : "Pilares"}
      </h2>
      <div className="grid grid-cols-4 gap-2.5">
        {pillars.map((p) => {
          const percent = Math.min(Math.round((p.spent / p.budget) * 100), 100);
          const over = p.spent > p.budget;
          return (
            <div key={p.key} className="flex flex-col items-center gap-2 bg-white rounded-xl px-2 pt-3 pb-2.5 shadow-sm">
              <div className="relative w-14 h-14">
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
                <span className="text-[9px] text-muted-foreground/50 mt-0.5 block">{fmt(p.spent)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
