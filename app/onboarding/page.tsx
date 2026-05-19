"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { OnboardingShell } from "./components/onboarding-shell";
import { NameStep } from "./components/name-step";
import { LedgerTypeStep } from "./components/ledger-type-step";
import { BusinessSetupStep } from "./components/business-setup-step";
import { SignupPhoneStep } from "./components/signup-phone-step";
import type { LedgerKind } from "./components/types";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [ledgerTypes, setLedgerTypes] = useState<LedgerKind[]>([]);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");

  const hasBusiness = ledgerTypes.includes("business");
  const totalSteps = hasBusiness ? 4 : 3;

  const toggleLedgerType = (type: LedgerKind) => {
    setLedgerTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleLedgerNext = () => setStep(hasBusiness ? 2 : 3);

  const showLoginShortcut = step >= 0 && step < totalSteps - 1;

  return (
    <OnboardingShell step={step}>
      <div className="flex flex-col h-full md:h-full w-full bg-transparent">
        <div className="relative flex justify-center items-center gap-2 pt-5 md:pt-10 px-6">
          <div className="flex gap-2">
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
          {showLoginShortcut && (
            <Button
              variant="secondary"
              size="xs"
              onClick={() => router.push("/login")}
              className="absolute right-6"
            >
              Ya tengo cuenta
            </Button>
          )}
        </div>

        {step === 0 && (
          <NameStep
            onNext={() => setStep(1)}
            name={name}
            onNameChange={setName}
          />
        )}
        {step === 1 && (
          <LedgerTypeStep
            onNext={handleLedgerNext}
            ledgerTypes={ledgerTypes}
            onToggleLedgerType={toggleLedgerType}
          />
        )}
        {step === 2 && hasBusiness && (
          <BusinessSetupStep
            onNext={() => setStep(3)}
            businessName={businessName}
            onBusinessNameChange={setBusinessName}
            businessType={businessType}
            onBusinessTypeChange={setBusinessType}
          />
        )}
        {step === 3 && (
          <SignupPhoneStep
            name={name}
            ledgerTypes={ledgerTypes}
            businessName={businessName}
            businessType={businessType}
          />
        )}
      </div>
    </OnboardingShell>
  );
}
