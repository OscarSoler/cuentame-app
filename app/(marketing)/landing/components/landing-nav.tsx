"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tree06Icon } from "@hugeicons/core-free-icons";

export function LandingNav() {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-foreground/5">
      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        <Link href="/landing" className="flex items-center gap-2.5 group">
          <span className="relative w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-primary/5 blur-sm" />
            <HugeiconsIcon
              icon={Tree06Icon}
              size={16}
              className="text-primary relative z-10"
              strokeWidth={1.5}
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-semibold text-foreground tracking-tight">
              Cuéntame
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/70 mt-0.5">
              Tu Coach Financiero
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a
            href="#el-problema"
            className="hover:text-foreground transition-colors"
          >
            El problema
          </a>
          <a
            href="#metodologia"
            className="hover:text-foreground transition-colors"
          >
            Metodología
          </a>
          <a
            href="#como-funciona"
            className="hover:text-foreground transition-colors"
          >
            Cómo funciona
          </a>
          <a
            href="#historia"
            className="hover:text-foreground transition-colors"
          >
            Historia
          </a>
          <a
            href="#aprendizaje"
            className="hover:text-foreground transition-colors"
          >
            Aprendizaje
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden md:inline">
            <Button variant="ghost" size="sm">
              Ingresar
            </Button>
          </Link>
          <Link href="/onboarding">
            <Button
              size="sm"
              style={{
                boxShadow:
                  "0 2px 12px color-mix(in srgb, var(--primary) 25%, transparent)",
              }}
            >
              Empezar
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
