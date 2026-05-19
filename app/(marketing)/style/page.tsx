import type { Metadata } from "next";

import { getTheme } from "@/core/theme/theme.cookie";

import { TypographyShowcase } from "./components/typography-showcase";
import { ColorPaletteShowcase } from "./components/color-palette-showcase";
import { RadiusShowcase } from "./components/radius-showcase";
import { ButtonShowcase } from "./components/button-showcase";
import { CardShowcase } from "./components/card-showcase";
import { InputShowcase } from "./components/input-showcase";
import { DrawerShowcase } from "./components/drawer-showcase";
import { PopoverShowcase } from "./components/popover-showcase";
import { CompositeShowcase } from "./components/composite-showcase";
import { ThemeSwitcher } from "./components/theme-switcher";
import { EditorialPreview } from "./components/editorial-preview";

export const metadata: Metadata = {
  title: "Guía de Estilos — Cuéntame",
  description: "Sistema de diseño: tipografía, color, componentes.",
};

export default async function StyleGuidePage() {
  const theme = await getTheme();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 space-y-16">
      <header className="space-y-4">
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-semibold">
            Guía de Estilos
          </h1>
          <p className="text-muted-foreground">
            Sistema de diseño de Cuéntame — tokens, tipografía y componentes.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <ThemeSwitcher current={theme} />
          <span className="font-mono text-xs text-muted-foreground">
            Tema activo:{" "}
            <span className="text-foreground">
              {theme === "editorial"
                ? "Editorial"
                : theme === "vibrant"
                  ? "Vibrante / Neobanco"
                  : theme === "aurora"
                    ? "Aurora"
                    : "Zen / Kakebo"}
            </span>
          </span>
        </div>
      </header>

      <EditorialPreview />
      <TypographyShowcase />
      <ColorPaletteShowcase />
      <RadiusShowcase />
      <ButtonShowcase />
      <CardShowcase />
      <InputShowcase />
      <DrawerShowcase />
      <PopoverShowcase />
      <CompositeShowcase />
    </div>
  );
}
