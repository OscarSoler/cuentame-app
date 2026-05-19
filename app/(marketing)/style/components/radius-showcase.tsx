import { StyleSection } from "./style-section";

const RADII = [
  { name: "rounded-sm", varName: "--radius-sm", calc: "calc(.75rem * 0.6)", roundedClass: "rounded-sm" },
  { name: "rounded-md", varName: "--radius-md", calc: "calc(.75rem * 0.8)", roundedClass: "rounded-md" },
  { name: "rounded-lg", varName: "--radius-lg", calc: "0.75rem", roundedClass: "rounded-lg" },
  { name: "rounded-xl", varName: "--radius-xl", calc: "calc(.75rem * 1.4)", roundedClass: "rounded-xl" },
  { name: "rounded-2xl", varName: "--radius-2xl", calc: "calc(.75rem * 1.8)", roundedClass: "rounded-2xl" },
  { name: "rounded-3xl", varName: "--radius-3xl", calc: "calc(.75rem * 2.2)", roundedClass: "rounded-3xl" },
  { name: "rounded-4xl", varName: "--radius-4xl", calc: "calc(.75rem * 2.6)", roundedClass: "rounded-4xl" },
];

export function RadiusShowcase() {
  return (
    <StyleSection
      title="Radios"
      description="Escala derivada de --radius (0.75rem) — todos los componentes UI heredan de esta base."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
        {RADII.map((r) => (
          <div key={r.name} className="flex flex-col gap-2 items-center">
            <div
              className={`size-20 bg-accent ring-1 ring-foreground/10 ${r.roundedClass}`}
            />
            <div className="space-y-0.5 text-center">
              <p className="font-medium text-sm">{r.name}</p>
              <p className="font-mono text-xs text-muted-foreground">
                {r.varName}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground">
                {r.calc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </StyleSection>
  );
}
