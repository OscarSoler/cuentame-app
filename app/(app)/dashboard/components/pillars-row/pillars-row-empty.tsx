import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plant01Icon } from "@hugeicons/core-free-icons";

function GhostPillar({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="flex flex-col items-center gap-2 bg-white/60 rounded-2xl px-2 pt-3 pb-2.5 border border-dashed border-border/50"
      style={{ opacity }}
    >
      <div className="relative w-14 h-14">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle cx="18" cy="18" r="15" fill="none" stroke="#E8E0D0" strokeWidth="2.5" />
        </svg>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="h-1.5 w-8 rounded-full bg-border/40" />
        <div className="h-1 w-6 rounded-full bg-border/30" />
      </div>
    </div>
  );
}

interface PillarsRowEmptyProps {
  isBusiness: boolean;
}

export function PillarsRowEmpty({ isBusiness }: PillarsRowEmptyProps) {
  return (
    <div>
      <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
        {isBusiness ? "Categorías" : "Pilares"}
      </h2>
      <div className="relative">
        <div className="grid grid-cols-4 gap-2.5">
          <GhostPillar opacity={1} />
          <GhostPillar opacity={0.85} />
          <GhostPillar opacity={0.7} />
          <GhostPillar opacity={0.55} />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Link
            href="/chat"
            className="pointer-events-auto flex items-center gap-2.5 bg-primary text-primary-foreground rounded-full pl-2.5 pr-4 py-2 shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0">
              <HugeiconsIcon icon={Plant01Icon} size={13} strokeWidth={2} />
            </div>
            <span className="text-[12px] font-medium leading-none">
              {isBusiness ? "Crecerán con tu negocio" : "Florecen con tus gastos"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
