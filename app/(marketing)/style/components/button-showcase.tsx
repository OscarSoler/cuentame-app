import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StyleSection } from "./style-section";

const VARIANTS = [
  "default",
  "outline",
  "secondary",
  "ghost",
  "destructive",
  "link",
] as const;

const TEXT_SIZES = ["xs", "sm", "default", "lg"] as const;
const ICON_SIZES = ["icon-xs", "icon-sm", "icon", "icon-lg"] as const;

export function ButtonShowcase() {
  return (
    <StyleSection
      title="Botones"
      description="6 variantes × 7 tamaños. Disponible en @/components/ui/button."
    >
      <div className="space-y-8">
        {VARIANTS.map((variant) => (
          <div
            key={variant}
            className="space-y-4 rounded-xl bg-card p-6 ring-1 ring-foreground/10"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-heading text-lg font-medium capitalize">
                {variant}
              </h3>
              <code className="font-mono text-xs text-muted-foreground">
                {`<Button variant="${variant}" />`}
              </code>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                {TEXT_SIZES.map((size) => (
                  <Button key={size} variant={variant} size={size}>
                    {size === "default" ? "Default" : size.toUpperCase()}
                  </Button>
                ))}
              </div>
              {variant !== "link" && (
                <div className="flex items-center gap-3 flex-wrap">
                  {ICON_SIZES.map((size) => (
                    <Button
                      key={size}
                      variant={variant}
                      size={size}
                      aria-label={`Botón ${size}`}
                    >
                      <Plus />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </StyleSection>
  );
}
