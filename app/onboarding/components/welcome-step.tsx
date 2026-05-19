"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Leaf01Icon, Tree06Icon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import type { StepProps } from "./types";

export function WelcomeStep({ onNext }: StepProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Cuéntame
      </div>

      <div className="flex flex-col items-center gap-5">
        <h1 className="font-heading text-3xl leading-snug text-foreground">
          Bienvenido a tu
          <br />
          <span className="font-bold text-4xl">Santuario Financiero</span>
        </h1>

        <div className="flex items-center gap-1.5 bg-accent/40 text-accent-foreground px-3 py-1.5 rounded-full text-xs">
          <HugeiconsIcon icon={Leaf01Icon} size={12} />
          <span>Happy Spending</span>
        </div>

        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm" />
          <HugeiconsIcon
            icon={Tree06Icon}
            size={56}
            className="text-primary relative z-10"
            strokeWidth={1.5}
          />
        </div>

        <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
          Domina el arte japonés del ahorro. Transforma tus gastos en rituales
          de prosperidad.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 w-full max-w-65">
        <Button onClick={onNext} className="w-full">
          Empezar Mi Camino
        </Button>
        <Button variant="secondary" onClick={() => router.push("/login")} className="w-full">
          Ya tengo una cuenta
        </Button>
      </div>
    </div>
  );
}
