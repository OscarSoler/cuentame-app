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
  {
    icon: SparklesIcon,
    pillar: "Supervivencia",
    desc: "Lo esencial",
    color: "#2D5016",
  },
  {
    icon: FlowerPotIcon,
    pillar: "Opcional",
    desc: "Gustos y caprichos",
    color: "#8B9E7C",
  },
  {
    icon: Book01Icon,
    pillar: "Cultura",
    desc: "Crecimiento personal",
    color: "#D4A574",
  },
  {
    icon: Coins01Icon,
    pillar: "Extras",
    desc: "Lo inesperado",
    color: "#A67B5B",
  },
];

export function PhilosophyStep({ onNext }: StepProps) {
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-12 px-6">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
        Filosofía Kakebo
      </div>

      <div className="flex flex-col items-center gap-7 w-full">
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
          <div className="relative w-18 h-18 rounded-full bg-accent/40 flex items-center justify-center shadow-[0_4px_20px_rgba(45,80,22,0.12)]">
            <HugeiconsIcon
              icon={Yoga01Icon}
              size={36}
              className="text-primary"
              strokeWidth={1.5}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-heading text-3xl leading-tight text-foreground">
            El método Kakebo
            <br />
            <span className="text-primary">nació en Japón en 1904</span>
          </h2>

          <p className="text-muted-foreground text-base max-w-72 leading-relaxed">
            Un diario financiero que te invita a reflexionar sobre cada gasto y
            entender tu relación con el dinero.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 w-full max-w-80">
          {pillars.map((item) => (
            <div
              key={item.pillar}
              className="relative overflow-hidden flex flex-col items-start gap-2 bg-white/70 backdrop-blur-sm rounded-2xl px-3.5 py-3 text-left border border-border/15 shadow-[0_1px_3px_rgba(45,80,22,0.04)]"
            >
              <span
                className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-15 blur-xl"
                style={{ backgroundColor: item.color }}
              />
              <div
                className="relative w-9 h-9 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${item.color}1f`,
                  boxShadow: `0 2px 6px ${item.color}1a`,
                }}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  size={16}
                  style={{ color: item.color }}
                  strokeWidth={1.75}
                />
              </div>
              <div className="relative">
                <div className="text-sm font-semibold text-foreground leading-tight">
                  {item.pillar}
                </div>
                <div className="text-[11px] text-muted-foreground/80 mt-0.5 leading-snug">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={onNext} className="w-full">
        Continuar
      </Button>
    </div>
  );
}
