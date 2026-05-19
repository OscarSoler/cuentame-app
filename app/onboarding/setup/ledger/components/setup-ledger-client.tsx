"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LedgerTypeStep } from "@/app/onboarding/components/ledger-type-step";
import { BusinessSetupStep } from "@/app/onboarding/components/business-setup-step";
import { createLedgerAction } from "@/core/ledger/presentation/ledger.actions";
import type { LedgerKind } from "@/app/onboarding/components/types";

interface SetupLedgerClientProps {
  defaultName: string;
}

type SubStep = "type" | "business" | "creating";

export function SetupLedgerClient({ defaultName }: SetupLedgerClientProps) {
  const router = useRouter();
  const [subStep, setSubStep] = useState<SubStep>("type");
  const [ledgerTypes, setLedgerTypes] = useState<LedgerKind[]>([]);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [error, setError] = useState("");

  const hasBusiness = ledgerTypes.includes("business");

  const toggleLedgerType = (type: LedgerKind) => {
    setLedgerTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const createLedgers = async () => {
    setSubStep("creating");
    setError("");
    const results = await Promise.all(
      ledgerTypes.map((type) =>
        createLedgerAction({
          name: type === "business" ? businessName || defaultName : defaultName,
          type,
          businessName: type === "business" ? businessName : undefined,
          businessType: type === "business" ? businessType : undefined,
        }),
      ),
    );
    const failed = results.find((r) => !r.success);
    if (failed) {
      setError(failed.success ? "" : failed.error);
      setSubStep(hasBusiness ? "business" : "type");
      return;
    }
    router.replace("/chat");
  };

  if (subStep === "creating") {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        </div>
        <p className="text-base text-muted-foreground">Creando tus libros...</p>
      </div>
    );
  }

  if (subStep === "business") {
    return (
      <div className="flex flex-col h-dvh w-full">
        <BusinessSetupStep
          onNext={createLedgers}
          businessName={businessName}
          onBusinessNameChange={setBusinessName}
          businessType={businessType}
          onBusinessTypeChange={setBusinessType}
        />
        {error && (
          <p className="text-center text-sm text-destructive pb-4">{error}</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-dvh w-full">
      <LedgerTypeStep
        onNext={() => (hasBusiness ? setSubStep("business") : createLedgers())}
        ledgerTypes={ledgerTypes}
        onToggleLedgerType={toggleLedgerType}
      />
      {error && (
        <p className="text-center text-sm text-destructive pb-4">{error}</p>
      )}
    </div>
  );
}
