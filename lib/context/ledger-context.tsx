"use client";

import { createContext, useContext, useState } from "react";

export type LedgerType = "personal" | "business";

interface Ledger {
  id: string;
  type: LedgerType;
  name: string;
}

interface LedgerContextValue {
  activeLedger: Ledger;
  setActiveLedger: (ledger: Ledger) => void;
}

const defaultLedger: Ledger = {
  id: "personal-default",
  type: "personal",
  name: "Personal",
};

const LedgerContext = createContext<LedgerContextValue>({
  activeLedger: defaultLedger,
  setActiveLedger: () => {},
});

export function LedgerProvider({ children }: { children: React.ReactNode }) {
  const [activeLedger, setActiveLedger] = useState<Ledger>(defaultLedger);

  return (
    <LedgerContext.Provider value={{ activeLedger, setActiveLedger }}>
      {children}
    </LedgerContext.Provider>
  );
}

export function useLedger() {
  return useContext(LedgerContext);
}
