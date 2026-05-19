import { StyleSection } from "./style-section";

const HEADING_WEIGHTS = [
  { label: "Regular 400", className: "font-normal" },
  { label: "Medium 500", className: "font-medium" },
  { label: "Semibold 600", className: "font-semibold" },
  { label: "Bold 700", className: "font-bold" },
  { label: "Extrabold 800", className: "font-extrabold" },
];

const TYPE_SCALE = [
  { className: "text-xs", label: "text-xs" },
  { className: "text-sm", label: "text-sm" },
  { className: "text-base", label: "text-base" },
  { className: "text-lg", label: "text-lg" },
  { className: "text-xl", label: "text-xl" },
  { className: "text-2xl", label: "text-2xl" },
  { className: "text-3xl", label: "text-3xl" },
  { className: "text-4xl", label: "text-4xl" },
];

export function TypographyShowcase() {
  return (
    <StyleSection
      title="Tipografía"
      description="Bricolage Grotesque para títulos, Geist Sans para cuerpo."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-heading text-7xl font-semibold leading-none">
              Aa
            </span>
            <div className="text-right space-y-0.5">
              <p className="font-medium text-sm">Bricolage Grotesque</p>
              <p className="font-mono text-xs text-muted-foreground">
                font-heading
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-border pt-4">
            {HEADING_WEIGHTS.map((w) => (
              <div
                key={w.className}
                className="flex items-baseline justify-between gap-4"
              >
                <span className={`font-heading text-lg ${w.className}`}>
                  Tu Coach Financiero
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {w.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-sans text-7xl font-semibold leading-none">
              Aa
            </span>
            <div className="text-right space-y-0.5">
              <p className="font-medium text-sm">Geist Sans</p>
              <p className="font-mono text-xs text-muted-foreground">
                font-sans
              </p>
            </div>
          </div>
          <div className="space-y-2 border-t border-border pt-4">
            {TYPE_SCALE.map((s) => (
              <div
                key={s.className}
                className="flex items-baseline justify-between gap-4"
              >
                <span className={s.className}>El método Kakebo</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-card p-6 ring-1 ring-foreground/10 space-y-4">
        <p className="text-xs text-muted-foreground font-mono">
          Ejemplos de uso combinado
        </p>
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-semibold">
            Domina tus finanzas
          </h1>
          <p className="text-base text-muted-foreground max-w-xl">
            El diario financiero para emprendedores. Separa tu plata personal de
            la del negocio y gana claridad cada día.
          </p>
        </div>
        <div className="space-y-1.5 pt-4 border-t border-border">
          <h3 className="font-heading text-lg font-medium">Sección</h3>
          <p className="text-sm text-muted-foreground">
            Texto secundario en Geist Sans tamaño sm con color muted-foreground.
          </p>
        </div>
      </div>
    </StyleSection>
  );
}
