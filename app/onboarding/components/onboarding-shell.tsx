"use client";

import { MobileFrameShell } from "@/components/mobile-frame-shell";
import { OnboardingNarrative } from "./onboarding-narrative";

export function OnboardingShell({
  step,
  children,
}: {
  step: number;
  children: React.ReactNode;
}) {
  return (
    <MobileFrameShell narrative={<OnboardingNarrative step={step} />}>
      {children}
    </MobileFrameShell>
  );
}
