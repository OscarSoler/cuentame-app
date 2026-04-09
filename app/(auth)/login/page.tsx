"use client";

import { useRouter } from "next/navigation";
import { PhoneAuthStep } from "@/app/(onboarding)/components/phone-auth-step";
import { getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";

export default function LoginPage() {
  const router = useRouter();

  const handleSuccess = async () => {
    const result = await getUserLedgersAction();
    const hasLedgers = result.success && result.data && result.data.length > 0;
    router.push(hasLedgers ? "/dashboard" : "/");
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-linear-to-b from-[#FAF7F2] via-[#F5F0E8] to-[#E8E0D0]">
      <PhoneAuthStep onSuccess={handleSuccess} />
    </div>
  );
}
