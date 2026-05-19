import { redirect } from "next/navigation";
import { BottomTabs } from "@/components/navigation/bottom-tabs";
import { InkGlow } from "@/components/ink-glow";
import { LedgerProvider } from "@/lib/context/ledger-context";
import type { Ledger } from "@/lib/ledger/types";
import { readStoredLedgerType } from "@/lib/ledger/preference.server";
import { getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const result = await getUserLedgersAction();

  if (!result.success || result.data.length === 0) {
    redirect("/");
  }

  const ledgers: Ledger[] = result.data;
  const storedType = await readStoredLedgerType();
  const initialLedger =
    (storedType && ledgers.find((l) => l.type === storedType)) ??
    ledgers.find((l) => l.type === "personal") ??
    ledgers[0];

  return (
    <LedgerProvider ledgers={ledgers} initialLedger={initialLedger}>
      <div className="relative flex flex-col h-dvh w-full container mx-auto shadow-xl bg-transparent overflow-hidden">
        <InkGlow className="absolute -top-32 -right-40 w-[640px] h-[640px] opacity-[0.10] pointer-events-none text-accent z-0" />
        <div className="relative z-10 flex-1 overflow-y-auto" data-scroll-container>
          {children}
        </div>
        <BottomTabs />
      </div>
    </LedgerProvider>
  );
}
