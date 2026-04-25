"use client";

import { useRouter } from "next/navigation";
import { PhoneAuthForm } from "@/components/auth/phone-auth-form";
import { signupPhoneAction } from "@/core/auth/presentation/auth.actions";

interface SignupPhoneStepProps {
  name: string;
  onNeedsSetup: () => Promise<void> | void;
}

export function SignupPhoneStep({ name, onNeedsSetup }: SignupPhoneStepProps) {
  const router = useRouter();

  return (
    <PhoneAuthForm
      onVerify={async (phoneNumber, code) => {
        return await signupPhoneAction({ phoneNumber, code, name });
      }}
      onSuccess={async ({ hasLedgers }) => {
        if (hasLedgers) {
          router.replace("/dashboard");
          return;
        }
        await onNeedsSetup();
      }}
    />
  );
}
