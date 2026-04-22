import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Plant03Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import type { ReadyStepProps } from "./types";

export function ReadyStep({ name, onStart }: ReadyStepProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Todo listo
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm" />
          <HugeiconsIcon icon={Plant03Icon} size={56} className="text-primary relative z-10" strokeWidth={1.5} />
        </div>

        <h2 className="font-heading text-2xl leading-snug text-foreground">
          {name}, tu santuario
          <br />
          está listo
        </h2>

        <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
          Cada anotación es un paso hacia la consciencia financiera.
        </p>

        <div className="flex items-center gap-1.5 bg-accent/40 text-accent-foreground px-3 py-1.5 rounded-full text-xs">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={12} />
          <span>Tu camino comienza hoy</span>
        </div>
      </div>

      <Button onClick={onStart} className="w-full">
        Comenzar
      </Button>
    </div>
  );
}
