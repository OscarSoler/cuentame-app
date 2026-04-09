import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Yoga01Icon,
  SparklesIcon,
  FlowerPotIcon,
  Book01Icon,
  Coins01Icon,
} from "@hugeicons/core-free-icons";
import type { StepProps } from "./types";

const pillars = [
  { icon: SparklesIcon, pillar: "Supervivencia", desc: "Lo esencial" },
  { icon: FlowerPotIcon, pillar: "Opcional", desc: "Gustos y caprichos" },
  { icon: Book01Icon, pillar: "Cultura", desc: "Crecimiento personal" },
  { icon: Coins01Icon, pillar: "Extras", desc: "Lo inesperado" },
];

export function PhilosophyStep({ onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-10 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Filosofía Kakebo
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-accent/40 flex items-center justify-center">
          <HugeiconsIcon icon={Yoga01Icon} size={28} className="text-primary" strokeWidth={1.5} />
        </div>

        <h2 className="font-heading text-2xl leading-snug text-foreground">
          El método Kakebo
          <br />
          nació en Japón en 1904
        </h2>

        <p className="text-muted-foreground text-sm max-w-65 leading-relaxed">
          Un diario financiero que te invita a reflexionar sobre cada gasto y
          entender tu relación con el dinero.
        </p>

        <div className="flex flex-col gap-2 w-full max-w-65">
          {pillars.map((item) => (
            <div
              key={item.pillar}
              className="flex items-center gap-2.5 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2.5 text-left"
            >
              <div className="w-7 h-7 rounded-md bg-accent/50 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={item.icon} size={14} className="text-primary" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-xs font-medium text-foreground">{item.pillar}</div>
                <div className="text-[11px] text-muted-foreground">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full max-w-65 h-11 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 cursor-pointer"
      >
        Continuar
      </Button>
    </div>
  );
}
