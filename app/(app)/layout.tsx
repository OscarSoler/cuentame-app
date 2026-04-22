import { BottomTabs } from "@/components/navigation/bottom-tabs";
import { LedgerProvider } from "@/lib/context/ledger-context";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LedgerProvider>
      <div className="flex flex-col h-dvh w-full">
        <div className="flex-1 overflow-y-auto" data-scroll-container>{children}</div>
        <BottomTabs />
      </div>
    </LedgerProvider>
  );
}
