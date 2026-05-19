"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { setThemeAction } from "@/core/theme/theme.actions";
import type { Theme } from "@/core/theme/theme.cookie";

export function ThemeSwitcher({ current }: { current: Theme }) {
  const [pending, start] = useTransition();

  const select = (theme: Theme) => {
    start(async () => {
      await setThemeAction(theme);
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-full bg-card p-1 ring-1 ring-foreground/10 w-fit">
      <Button
        size="sm"
        variant={current === "default" ? "default" : "ghost"}
        onClick={() => select("default")}
        disabled={pending}
      >
        Zen / Kakebo
      </Button>
      <Button
        size="sm"
        variant={current === "editorial" ? "default" : "ghost"}
        onClick={() => select("editorial")}
        disabled={pending}
      >
        Editorial
      </Button>
      <Button
        size="sm"
        variant={current === "vibrant" ? "default" : "ghost"}
        onClick={() => select("vibrant")}
        disabled={pending}
      >
        Vibrante
      </Button>
      <Button
        size="sm"
        variant={current === "aurora" ? "default" : "ghost"}
        onClick={() => select("aurora")}
        disabled={pending}
      >
        Aurora
      </Button>
    </div>
  );
}
