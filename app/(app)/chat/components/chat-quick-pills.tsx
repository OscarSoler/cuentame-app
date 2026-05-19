"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { getQuickActions } from "./quick-actions";
import type { LedgerType } from "@/lib/context/ledger-context";

interface ChatQuickPillsProps {
  ledgerType: LedgerType;
  isLoading: boolean;
  onSelect: (prompt: string) => void;
}

export function ChatQuickPills({
  ledgerType,
  isLoading,
  onSelect,
}: ChatQuickPillsProps) {
  const actions = getQuickActions(ledgerType);

  return (
    <div className="px-4 py-1">
      <div className="flex gap-1.5 overflow-x-auto -mx-1 px-1 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        {actions.map((a) => (
          <button
            key={a.id}
            type="button"
            disabled={isLoading}
            onClick={() => onSelect(a.prompt)}
            className="flex items-center gap-1.5 bg-white border border-primary/25 hover:border-primary/50 hover:bg-primary/[0.04] rounded-full pl-1.5 pr-3 py-1 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <div className="w-5 h-5 rounded-full bg-primary/12 flex items-center justify-center">
              <HugeiconsIcon
                icon={a.icon}
                size={11}
                className="text-primary"
                strokeWidth={1.8}
              />
            </div>
            <span className="text-[11px] font-medium text-primary whitespace-nowrap">
              {a.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
