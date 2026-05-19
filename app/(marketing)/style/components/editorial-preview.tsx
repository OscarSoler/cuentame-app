import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StyleSection } from "./style-section";

function ThemePreviewCard({ label, themeName }: { label: string; themeName: string }) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          {themeName}
        </span>
      </div>
      <div className="rounded-2xl bg-background ring-1 ring-foreground/10 p-6 space-y-5">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/40 text-accent-foreground px-2.5 py-1 text-[10px] tracking-wide uppercase">
            <Sparkles className="size-3" />
            Beta
          </span>
          <h3 className="font-heading text-3xl leading-[1.05] font-medium tracking-tight">
            Separa tu plata del{" "}
            <span className="italic font-normal text-primary">negocio</span>.
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            El diario financiero para emprendedores que quieren claridad.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">Empezar</Button>
          <Button size="sm" variant="ghost">
            Leer historia
          </Button>
        </div>
        <div className="rounded-xl bg-card/70 backdrop-blur-sm border border-border/30 p-3 flex items-center gap-3">
          <div className="size-9 rounded-full bg-accent-warm/15 flex items-center justify-center">
            <span className="text-accent-warm font-mono text-xs">$</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-heading text-sm font-medium">$ 24.500</p>
            <p className="text-xs text-muted-foreground">Café · Supervivencia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditorialPreview() {
  return (
    <StyleSection
      title="Comparativa de temas"
      description="Mismo bloque renderizado con ambos temas. Independiente del tema activo de la app."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <ThemePreviewCard
          label="Zen"
          themeName="Kakebo · Bricolage + Geist"
        />
        <div className="theme-editorial">
          <ThemePreviewCard
            label="Editorial"
            themeName="Fraunces + Inter"
          />
        </div>
        <div className="theme-vibrant">
          <ThemePreviewCard
            label="Vibrante"
            themeName="Neobanco · Space Grotesk + Geist"
          />
        </div>
        <div className="theme-aurora">
          <ThemePreviewCard
            label="Aurora"
            themeName="Zen + navy · Fraunces + Geist"
          />
        </div>
      </div>
    </StyleSection>
  );
}
