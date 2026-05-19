import { Button } from "@/components/ui/button";
import { StyleSection } from "./style-section";

const DIRECTIONS = [
  {
    name: "bottom",
    description: "Por defecto. Sube desde abajo con handle visual.",
  },
  { name: "top", description: "Baja desde arriba." },
  { name: "left", description: "Aparece desde la izquierda — w-3/4 max-w-sm." },
  { name: "right", description: "Aparece desde la derecha — w-3/4 max-w-sm." },
];

const SNIPPET = `<Drawer direction="bottom">
  <DrawerTrigger asChild>
    <Button variant="outline">Abrir</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Título</DrawerTitle>
      <DrawerDescription>Descripción</DrawerDescription>
    </DrawerHeader>
    {/* contenido */}
    <DrawerFooter>
      <Button>Confirmar</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`;

export function DrawerShowcase() {
  return (
    <StyleSection
      title="Drawer"
      description="Panel deslizable basado en vaul. 4 direcciones disponibles."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <h3 className="font-heading text-lg font-medium">Direcciones</h3>
          <div className="space-y-3">
            {DIRECTIONS.map((d) => (
              <div
                key={d.name}
                className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-sm capitalize">{d.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.description}
                  </p>
                </div>
                <Button variant="outline" size="sm" disabled>
                  Abrir
                </Button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground italic">
            Triggers desactivados en la guía — la apertura real requiere un
            Client Component.
          </p>
        </div>

        <div className="space-y-3 rounded-xl bg-card p-6 ring-1 ring-foreground/10">
          <h3 className="font-heading text-lg font-medium">Uso</h3>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs">
            <code className="font-mono">{SNIPPET}</code>
          </pre>
        </div>
      </div>
    </StyleSection>
  );
}
