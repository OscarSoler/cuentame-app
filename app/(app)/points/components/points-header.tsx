"use client";

import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export function PointsHeader() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/dashboard"
        className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent/30 transition-colors"
        aria-label="Volver"
      >
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          size={18}
          className="text-foreground"
          strokeWidth={1.75}
        />
      </Link>
      <h1 className="font-heading text-xl font-semibold leading-none">
        Cómo ganas <span className="text-primary">puntos</span>
      </h1>
    </div>
  );
}
