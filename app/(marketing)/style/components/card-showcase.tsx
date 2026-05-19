import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StyleSection } from "./style-section";

export function CardShowcase() {
  return (
    <StyleSection
      title="Cards"
      description="Contenedor principal con dos tamaños (default, sm) y slots composables."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Card default</CardTitle>
            <CardDescription>
              Padding py-4, gap-4. Útil para contenido principal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              El cuerpo de la card vive aquí. Hereda el tipo de letra base y
              respeta los gaps del contenedor.
            </p>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Card sm</CardTitle>
            <CardDescription>
              Padding py-3, gap-3. Título más pequeño automáticamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Usar cuando la card es secundaria o vive en listas densas.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Con CardAction</CardTitle>
            <CardDescription>
              La acción se alinea a la derecha del header automáticamente.
            </CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon-sm" aria-label="Más opciones">
                <MoreHorizontal />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              CardAction usa grid-column auto en el header — solo aparece cuando
              está presente.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Con CardFooter</CardTitle>
            <CardDescription>
              El footer trae fondo muted/50 y border-top.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              El padding inferior de la card se ajusta automáticamente cuando hay
              footer.
            </p>
          </CardContent>
          <CardFooter className="justify-between">
            <span className="text-xs text-muted-foreground">Footer info</span>
            <Button variant="default" size="sm">
              Acción
            </Button>
          </CardFooter>
        </Card>
      </div>
    </StyleSection>
  );
}
