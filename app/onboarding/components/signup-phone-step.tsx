"use client";

import { PhoneAuthForm } from "@/components/auth/phone-auth-form";
import { signupPhoneAction } from "@/core/auth/presentation/auth.actions";
import type { LedgerKind } from "./types";

interface SignupPhoneStepProps {
  name: string;
  ledgerTypes: LedgerKind[];
  businessName: string;
  businessType: string;
}

export function SignupPhoneStep({
  name,
  ledgerTypes,
  businessName,
  businessType,
}: SignupPhoneStepProps) {
  return (
    <PhoneAuthForm
      onVerify={async (phoneNumber, code) => {
        return await signupPhoneAction({
          phoneNumber,
          code,
          name,
          ledgerTypes,
          businessName,
          businessType,
        });
      }}
    />
  );
}
