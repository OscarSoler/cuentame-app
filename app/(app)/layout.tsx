import { redirect } from "next/navigation";
import { BottomTabs } from "@/components/navigation/bottom-tabs";
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
      <div className="flex flex-col h-dvh w-full container mx-auto   shadow-xl bg-transparent">
        <div className="flex-1 overflow-y-auto" data-scroll-container>
          {children}
        </div>
        <BottomTabs />
      </div>
    </LedgerProvider>
  );
}
