import { Button } from "@/components/ui/button";
import { StyleSection } from "./style-section";

const SIDES = [
  { name: "top", description: "side='top' — anclado sobre el trigger." },
  { name: "bottom", description: "side='bottom' — por defecto, debajo." },
  { name: "left", description: "side='left' — a la izquierda." },
  { name: "right", description: "side='right' — a la derecha." },
];

const SNIPPET = `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="center">
    <PopoverHeader>
      <PopoverTitle>Título</PopoverTitle>
      <PopoverDescription>Descripción</PopoverDescription>
    </PopoverHeader>
    {/* contenido */}
  </PopoverContent>
</Popover>`;

export function PopoverShowcase() {
  return (
    <StyleSection
      title="Popover"
      description="Burbuja posicionada con w-72, shadow-md y ring sutil."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <h3 className="font-heading text-lg font-medium">Posiciones</h3>
          <div className="space-y-3">
            {SIDES.map((s) => (
              <div
                key={s.name}
                className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-sm capitalize">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.description}
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Abrir
                </Button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic">
            Triggers desactivados — el contenido visual del popover se muestra a
            la derecha.
          </p>
        </div>

        <div className="space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <h3 className="font-heading text-lg font-medium">Contenido</h3>
          <div className="w-72 flex flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10">
            <div className="flex flex-col gap-0.5 text-sm">
              <p className="font-medium">Título del popover</p>
              <p className="text-muted-foreground">
                Descripción corta del contenido. Hereda el ancho fijo de 18rem.
              </p>
            </div>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
            <code className="font-mono">{SNIPPET}</code>
          </pre>
        </div>
      </div>
    </StyleSection>
  );
}
