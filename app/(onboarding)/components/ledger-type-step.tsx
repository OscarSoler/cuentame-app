import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Wallet01Icon,
  Home01Icon,
  Store01Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import type { LedgerTypeStepProps } from "./types";

const options = [
  {
    type: "personal" as const,
    icon: Home01Icon,
    title: "Finanzas personales",
    desc: "Controla tus ingresos y gastos del día a día",
  },
  {
    type: "business" as const,
    icon: Store01Icon,
    title: "Negocio o emprendimiento",
    desc: "Gestiona las finanzas de tu negocio",
  },
];

export function LedgerTypeStep({ onNext, ledgerTypes, onToggleLedgerType }: LedgerTypeStepProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-12 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Tu perfil
      </div>

      <div className="flex flex-col items-center gap-7 w-full">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
          <div className="relative w-18 h-18 rounded-full bg-accent/40 flex items-center justify-center shadow-[0_4px_20px_rgba(45,80,22,0.12)]">
            <HugeiconsIcon icon={Wallet01Icon} size={36} className="text-primary" strokeWidth={1.5} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-3xl leading-tight text-foreground">
            ¿Qué tipo de finanzas
            <br />
            <span className="text-primary">quieres gestionar?</span>
          </h2>

          <p className="text-muted-foreground text-base max-w-72 leading-relaxed">
            Puedes elegir ambas. Podrás añadir más libretas después.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-80">
          {options.map((option) => {
            const selected = ledgerTypes.includes(option.type);
            return (
              <button
                key={option.type}
                type="button"
                onClick={() => onToggleLedgerType(option.type)}
                className={`flex items-center gap-3.5 rounded-2xl px-4 py-4 text-left transition-all cursor-pointer ${
                  selected ? "bg-primary/10 ring-1.5 ring-primary" : "bg-card/60 backdrop-blur-sm hover:bg-card/80"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${selected ? "bg-primary text-primary-foreground" : "bg-accent/50"}`}>
                  <HugeiconsIcon
                    icon={option.icon}
                    size={22}
                    className={selected ? "text-primary-foreground" : "text-primary"}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-foreground leading-tight">{option.title}</div>
                  <div className="text-xs text-muted-foreground/80 mt-0.5 leading-snug">{option.desc}</div>
                </div>
                <div className={`w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? "border-primary bg-primary" : "border-border"}`}>
                  {selected && (
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} className="text-primary-foreground" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Button onClick={onNext} disabled={ledgerTypes.length === 0} className="w-full h-12 text-base">
        Continuar
      </Button>
    </div>
  );
}
