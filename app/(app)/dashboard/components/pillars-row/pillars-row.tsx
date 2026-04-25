import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { formatCurrencyCompact } from "@/lib/utils";
import { PillarsRowEmpty } from "./pillars-row-empty";

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

  const total = pillars.reduce((sum, p) => sum + p.spent, 0);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider">
          {isBusiness ? "Categorías" : "Pilares"}
        </h2>
        {total > 0 && (
          <span className="text-[10px] text-muted-foreground/50">
            Total {formatCurrencyCompact(total)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {pillars.map((p) => {
          const percent = total > 0 ? Math.round((p.spent / total) * 100) : 0;
          return <PillarCard key={p.key} pillar={p} percent={percent} />;
        })}
      </div>
    </div>
  );
}

function PillarCard({
  pillar,
  percent,
}: {
  pillar: PillarData;
  percent: number;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-border/10 p-2.5 flex flex-col justify-between min-h-[110px]">
      <span
        className="absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-15 blur-2xl"
        style={{ backgroundColor: pillar.color }}
      />

      <div className="relative flex items-start justify-between gap-1">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            backgroundColor: `${pillar.color}1f`,
            boxShadow: `0 2px 6px ${pillar.color}1a`,
          }}
        >
          <HugeiconsIcon
            icon={pillar.icon}
            size={14}
            style={{ color: pillar.color }}
            strokeWidth={1.75}
          />
        </div>
        <div
          className="rounded-full px-1.5 py-0.5 text-[9px] font-semibold tabular-nums leading-none"
          style={{
            backgroundColor: `${pillar.color}1a`,
            color: pillar.color,
          }}
        >
          {percent}%
        </div>
      </div>

      <div className="relative mt-1.5">
        <p className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-0.5 truncate">
          {pillar.label}
        </p>
        <p className="text-[13px] font-semibold text-foreground tabular-nums leading-tight">
          {formatCurrencyCompact(pillar.spent)}
        </p>
        <div className="mt-1.5 h-1 rounded-full bg-border/30 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percent}%`,
              backgroundColor: pillar.color,
            }}
          />
        </div>
      </div>
    </div>
  );
}
