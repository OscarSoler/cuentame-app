"use client";

import { createContext, useContext, useState } from "react";
import type { Ledger, LedgerType } from "@/lib/ledger/types";

export type { Ledger, LedgerType } from "@/lib/ledger/types";
export { isLedgerType } from "@/lib/ledger/types";

interface LedgerContextValue {
  ledgers: Ledger[];
  activeLedger: Ledger;
  switchType: (type: LedgerType) => void;
}

const LedgerContext = createContext<LedgerContextValue | null>(null);

interface LedgerProviderProps {
  ledgers: Ledger[];
  initialLedger: Ledger;
  children: React.ReactNode;
}

export function LedgerProvider({
  ledgers,
  initialLedger,
  children,
}: LedgerProviderProps) {
  const [activeLedger, setActiveLedger] = useState<Ledger>(initialLedger);

  const switchType = (type: LedgerType) => {
    const next = ledgers.find((l) => l.type === type);
    if (next && next.id !== activeLedger.id) setActiveLedger(next);
  };

  return (
    <LedgerContext.Provider value={{ ledgers, activeLedger, switchType }}>
      {children}
    </LedgerContext.Provider>
  );
}

export function useLedger() {
  const ctx = useContext(LedgerContext);
  if (!ctx) throw new Error("useLedger debe usarse dentro de LedgerProvider");
  return ctx;
}
