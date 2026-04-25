import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { BubbleChatIcon } from "@hugeicons/core-free-icons";

export function RecentTransactionsEmpty() {
  return (
    <div>
      <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
        Recientes
      </h2>

      <div className="relative flex flex-col gap-1.5">
        <div className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2.5 border border-dashed border-border/60">
          <div className="w-9 h-9 rounded-xl bg-accent/20 shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="h-2 w-2/3 rounded-full bg-border/40" />
            <div className="h-1.5 w-1/3 rounded-full bg-border/30" />
          </div>
          <div className="h-2 w-12 rounded-full bg-border/40 shrink-0" />
        </div>
        <div className="flex items-center gap-3 bg-white/40 rounded-xl px-3 py-2.5 border border-dashed border-border/40 opacity-70">
          <div className="w-9 h-9 rounded-xl bg-accent/10 shrink-0" />
          <div className="flex-1 flex flex-col gap-1.5">
            <div className="h-2 w-1/2 rounded-full bg-border/30" />
            <div className="h-1.5 w-1/4 rounded-full bg-border/20" />
          </div>
          <div className="h-2 w-10 rounded-full bg-border/30 shrink-0" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Link
            href="/chat"
            className="pointer-events-auto flex items-center gap-2.5 bg-primary text-primary-foreground rounded-full pl-2.5 pr-4 py-2 shadow-md hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0">
              <HugeiconsIcon icon={BubbleChatIcon} size={13} strokeWidth={2} />
            </div>
            <span className="text-[12px] font-medium leading-none">
              Cuéntame tu primer gasto
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
