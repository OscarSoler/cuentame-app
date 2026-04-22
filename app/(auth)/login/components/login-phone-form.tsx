"use client";

import { useRouter } from "next/navigation";
import { PhoneAuthForm } from "@/components/auth/phone-auth-form";
import { hasUserLedgers } from "@/components/auth/has-user-ledgers";

export function LoginPhoneForm() {
  const router = useRouter();
  return (
    <PhoneAuthForm
      onVerified={async () => {
        const exists = await hasUserLedgers();
        router.replace(exists ? "/dashboard" : "/");
      }}
    />
  );
}
