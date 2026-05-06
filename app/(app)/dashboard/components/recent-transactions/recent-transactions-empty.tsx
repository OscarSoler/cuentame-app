import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { BubbleChatIcon } from "@hugeicons/core-free-icons";

export function RecentTransactionsEmpty() {
  return (
    <div>
      <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider mb-3">
        Recientes
      </h2>

      <Link
        href="/chat"
        className="flex items-center gap-3 rounded-2xl border border-dashed border-border/60 bg-transparent px-4 py-4 hover:bg-accent/20 transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-accent/30 flex items-center justify-center shrink-0">
          <HugeiconsIcon
            icon={BubbleChatIcon}
            size={16}
            className="text-primary"
            strokeWidth={1.75}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-foreground leading-tight">
            Cuéntame tu primer gasto
          </p>
          <p className="text-[11px] text-muted-foreground/70 mt-0.5">
            Empieza una conversación y yo lo registro
          </p>
        </div>
      </Link>
    </div>
  );
}
