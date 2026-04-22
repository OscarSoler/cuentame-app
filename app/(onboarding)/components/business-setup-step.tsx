import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Store01Icon,
  Restaurant01Icon,
  Briefcase01Icon,
  LaptopIcon,
  Coins01Icon,
} from "@hugeicons/core-free-icons";
import type { BusinessSetupStepProps } from "./types";

const businessTypes = [
  { key: "tienda", label: "Tienda", icon: Store01Icon },
  { key: "restaurante", label: "Restaurante", icon: Restaurant01Icon },
  { key: "servicios", label: "Servicios", icon: Briefcase01Icon },
  { key: "freelancer", label: "Freelancer", icon: LaptopIcon },
  { key: "otro", label: "Otro", icon: Coins01Icon },
];

export function BusinessSetupStep({
  onNext,
  businessName,
  onBusinessNameChange,
  businessType,
  onBusinessTypeChange,
}: BusinessSetupStepProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Tu negocio
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center">
          <HugeiconsIcon icon={Store01Icon} size={28} className="text-primary" strokeWidth={1.5} />
        </div>

        <h2 className="font-heading text-2xl leading-snug text-foreground">
          Cuéntanos de
          <br />
          tu negocio
        </h2>

        <Input
          type="text"
          placeholder="Nombre del negocio"
          value={businessName}
          onChange={(e) => onBusinessNameChange(e.target.value)}
          className="max-w-65 h-11 rounded-xl bg-card/60 backdrop-blur-sm border-border/50 text-center text-sm placeholder:text-muted-foreground/50"
        />

        <div className="flex flex-wrap justify-center gap-2 max-w-72">
          {businessTypes.map((bt) => (
            <button
              key={bt.key}
              type="button"
              onClick={() => onBusinessTypeChange(bt.key)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-left transition-all cursor-pointer ${
                businessType === bt.key ? "bg-primary/10 ring-1.5 ring-primary" : "bg-card/60 backdrop-blur-sm hover:bg-card/80"
              }`}
            >
              <HugeiconsIcon
                icon={bt.icon}
                size={14}
                className={businessType === bt.key ? "text-primary" : "text-muted-foreground/60"}
                strokeWidth={1.5}
              />
              <span className={`text-xs font-medium ${businessType === bt.key ? "text-primary" : "text-foreground/70"}`}>
                {bt.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Button onClick={onNext} disabled={!businessName.trim() || !businessType} className="w-full">
        Continuar
      </Button>
    </div>
  );
}
