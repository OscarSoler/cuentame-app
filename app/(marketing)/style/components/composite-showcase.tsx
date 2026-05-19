import {
  ArrowDownLeft,
  ArrowUpRight,
  Coffee,
  Heart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { StyleSection } from "./style-section";

const QUICK_ACTIONS = [
  { icon: Coffee, label: "Gasto rápido" },
  { icon: Heart, label: "Pillar afecto" },
  { icon: TrendingUp, label: "Ingreso" },
  { icon: Sparkles, label: "Reflexión" },
];

const FEATURES = [
  {
    icon: Coffee,
    title: "Diario consciente",
    description:
      "Anota cada gasto con la emoción que lo acompaña. Detecta patrones invisibles.",
  },
  {
    icon: TrendingUp,
    title: "Score de claridad",
    description:
      "Recibe un puntaje semanal basado en cómo separas tu plata personal del negocio.",
  },
  {
    icon: Sparkles,
    title: "Aliados financieros",
    description:
      "Accede a convenios con cooperativas que sí prestan a las PYMEs colombianas.",
  },
];

export function CompositeShowcase() {
  return (
    <StyleSection
      title="Patrones compuestos"
      description="Combinaciones reales usadas en el producto. Inline para referencia — no son componentes exportables."
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-medium">
            Transaction card
          </h3>
          <p className="text-xs text-muted-foreground">
            Patrón usado en chat (expense-card.tsx, income-card.tsx).
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <article className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl p-3.5 flex items-start gap-3">
              <div className="size-10 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                <ArrowUpRight className="size-5 text-destructive" />
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-heading text-base font-medium">$ 24.500</p>
                  <span className="text-xs text-muted-foreground">Hoy</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  Café con Mateo en el centro
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="rounded-full bg-accent/50 text-accent-foreground px-2 py-0.5 text-xs">
                    Supervivencia
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    😌 Tranquilo
                  </span>
                </div>
              </div>
            </article>

            <article className="bg-card/70 backdrop-blur-sm border border-border/20 rounded-xl p-3.5 flex items-start gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <ArrowDownLeft className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-heading text-base font-medium">
                    $ 1.200.000
                  </p>
                  <span className="text-xs text-muted-foreground">Ayer</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  Factura cliente — Marzo
                </p>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="rounded-full bg-accent/50 text-accent-foreground px-2 py-0.5 text-xs">
                    Negocio
                  </span>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    IVA 19%
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading text-lg font-medium">
            Quick action pills
          </h3>
          <p className="text-xs text-muted-foreground">
            Patrón usado en chat-quick-pills.tsx.
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="bg-accent/30 hover:bg-accent/50 rounded-full pl-1.5 pr-4 py-1.5 flex items-center gap-2 shrink-0 transition-colors"
              >
                <span className="size-7 rounded-full bg-accent flex items-center justify-center">
                  <Icon className="size-4 text-accent-foreground" />
                </span>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="font-heading text-lg font-medium">Feature card</h3>
          <p className="text-xs text-muted-foreground">
            Patrón usado en landing/features-section.tsx.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-3xl p-6 bg-card ring-1 ring-foreground/10 space-y-4"
              >
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon className="size-6 text-primary" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-heading text-lg font-medium">{title}</h4>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyleSection>
  );
}
