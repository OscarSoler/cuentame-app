"use client";

import { useRouter } from "next/navigation";
import { PhoneAuthStep } from "@/app/(onboarding)/components/phone-auth-step";

export default function LoginPage() {
  const router = useRouter();

  // Después de verificar OTP, el proxy redirige según la sesión.
  // Navegamos a /dashboard — si el proxy detecta que no hay ledgers
  // el dashboard se encarga de redirigir al onboarding.
  const handleSuccess = async () => {
    router.push("/setup");
  };

  return (
    <div className="flex flex-col h-dvh w-full">
      <PhoneAuthStep onSuccess={handleSuccess} />
    </div>
  );
}
