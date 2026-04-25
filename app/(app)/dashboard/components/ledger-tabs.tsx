"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon, Store01Icon } from "@hugeicons/core-free-icons";
import type { LedgerType } from "@/lib/context/ledger-context";
import { cn } from "@/lib/utils";

const tabs: { type: LedgerType; label: string; icon: typeof Home01Icon }[] = [
  { type: "personal", label: "Personal", icon: Home01Icon },
  { type: "business", label: "Negocio", icon: Store01Icon },
];

interface LedgerTabsProps {
  active: LedgerType;
  onChange: (type: LedgerType) => void;
  availableTypes?: LedgerType[];
}

export function LedgerTabs({ active, onChange, availableTypes }: LedgerTabsProps) {
  return (
    <div className="flex bg-black/5 rounded-xl p-1 gap-1">
      {tabs.map((tab) => {
        const isActive = active === tab.type;
        const isAvailable = !availableTypes || availableTypes.includes(tab.type);
        return (
          <button
            key={tab.type}
            type="button"
            onClick={() => isAvailable && onChange(tab.type)}
            disabled={!isAvailable}
            className={cn(
              "flex items-center justify-center gap-1.5 flex-1 h-8 rounded-lg text-xs font-medium transition-all",
              !isAvailable && "text-muted-foreground/30 cursor-not-allowed",
              isAvailable && isActive && "bg-white shadow-sm text-foreground cursor-pointer",
              isAvailable && !isActive && "text-muted-foreground/50 hover:text-foreground/60 cursor-pointer",
            )}
          >
            <HugeiconsIcon icon={tab.icon} size={13} strokeWidth={isActive ? 1.8 : 1.5} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
