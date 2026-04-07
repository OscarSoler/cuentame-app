import { BottomTabs } from "@/components/bottom-tabs";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-dvh w-full bg-linear-to-b from-[#FAF7F2] via-[#F5F0E8] to-[#E8E0D0]">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomTabs />
    </div>
  );
}
