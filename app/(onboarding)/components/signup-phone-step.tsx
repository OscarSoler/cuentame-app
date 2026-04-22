"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { PhoneAuthForm } from "@/components/auth/phone-auth-form";
import { hasUserLedgers } from "@/components/auth/has-user-ledgers";

interface SignupPhoneStepProps {
  name: string;
  onNeedsSetup: () => Promise<void> | void;
}

export function SignupPhoneStep({ name, onNeedsSetup }: SignupPhoneStepProps) {
  const router = useRouter();

  const handleVerified = async () => {
    if (await hasUserLedgers()) {
      router.replace("/dashboard");
      return;
    }
    const trimmed = name.trim();
    if (trimmed) {
      const { error } = await authClient.updateUser({ name: trimmed });
      if (error) console.error("No se pudo guardar el nombre del usuario", error);
    }
    await onNeedsSetup();
  };

  return <PhoneAuthForm onVerified={handleVerified} />;
}
