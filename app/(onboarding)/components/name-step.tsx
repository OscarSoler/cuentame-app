import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { User02Icon } from "@hugeicons/core-free-icons";
import type { NameStepProps } from "./types";

export function NameStep({ onNext, name, onNameChange }: NameStepProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Personalización
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center">
          <HugeiconsIcon icon={User02Icon} size={28} className="text-primary" strokeWidth={1.5} />
        </div>

        <h2 className="font-heading text-2xl leading-snug text-foreground">
          ¿Cómo te llamamos?
        </h2>

        <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
          Tu nombre nos ayuda a personalizar tu experiencia.
        </p>

        <Input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="max-w-65 h-11 rounded-xl bg-card/60 backdrop-blur-sm border-border/50 text-center text-sm placeholder:text-muted-foreground/50"
        />
      </div>

      <Button onClick={onNext} disabled={!name.trim()} className="w-full">
        Continuar
      </Button>
    </div>
  );
}
