"use client";

import { PhoneAuthForm } from "@/components/auth/phone-auth-form";
import { loginPhoneAction } from "@/core/auth/presentation/auth.actions";

export function LoginPhoneForm() {
  return (
    <PhoneAuthForm
      onVerify={async (phoneNumber, code) => {
        const result = await loginPhoneAction({ phoneNumber, code });
        return result;
      }}
    />
  );
}
