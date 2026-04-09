import { BottomTabs } from "@/components/bottom-tabs";
import { LedgerProvider } from "@/lib/context/ledger-context";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LedgerProvider>
      <div className="flex flex-col h-dvh w-full bg-linear-to-b from-[#FAF7F2] via-[#F5F0E8] to-[#E8E0D0]">
        <div className="flex-1 overflow-y-auto">{children}</div>
        <BottomTabs />
      </div>
    </LedgerProvider>
  );
}
