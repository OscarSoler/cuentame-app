"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { WelcomeStep } from "./components/welcome-step";
import { PhilosophyStep } from "./components/philosophy-step";
import { NameStep } from "./components/name-step";
import { LedgerTypeStep } from "./components/ledger-type-step";
import { BusinessSetupStep } from "./components/business-setup-step";
import { PhoneAuthStep } from "./components/phone-auth-step";
import { ReadyStep } from "./components/ready-step";
import type { LedgerKind } from "./components/types";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [ledgerTypes, setLedgerTypes] = useState<LedgerKind[]>([]);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const hasBusiness = ledgerTypes.includes("business");
  // pasos: welcome, philosophy, name, ledgerType, [business], phoneAuth, ready
  const totalSteps = hasBusiness ? 7 : 6;

  const toggleLedgerType = (type: LedgerKind) => {
    setLedgerTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  // después de ledgerType: si hay business va al 4, si no al 5 (phoneAuth)
  const handleLedgerNext = () => setStep(hasBusiness ? 4 : 5);

  const handlePhoneAuthSuccess = async () => {
    // Guardar datos del onboarding para procesarlos en el dashboard
    const types = ledgerTypes.length > 0 ? ledgerTypes : ["personal" as const];
    sessionStorage.setItem(
      "onboarding",
      JSON.stringify({
        name,
        types,
        businessName,
        businessType,
      }),
    );
    setStep(6);
  };

  return (
    <div className="flex flex-col h-dvh w-full bg-transparent ">
      <div className="flex justify-center gap-2 pt-5">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === step
                ? "w-5 bg-primary"
                : i < step
                  ? "w-1.5 bg-primary/30"
                  : "w-1.5 bg-border/60"
            }`}
          />
        ))}
      </div>

      {step === 0 && <WelcomeStep onNext={() => setStep(1)} />}
      {step === 1 && <PhilosophyStep onNext={() => setStep(2)} />}
      {step === 2 && (
        <NameStep
          onNext={() => setStep(3)}
          name={name}
          onNameChange={setName}
        />
      )}
      {step === 3 && (
        <LedgerTypeStep
          onNext={handleLedgerNext}
          ledgerTypes={ledgerTypes}
          onToggleLedgerType={toggleLedgerType}
        />
      )}
      {step === 4 && hasBusiness && (
        <BusinessSetupStep
          onNext={() => setStep(5)}
          businessName={businessName}
          onBusinessNameChange={setBusinessName}
          businessType={businessType}
          onBusinessTypeChange={setBusinessType}
        />
      )}
      {step === 5 && <PhoneAuthStep onSuccess={handlePhoneAuthSuccess} />}
      {step === 6 && (
        <ReadyStep name={name} onStart={() => router.push("/setup")} />
      )}
    </div>
  );
}
