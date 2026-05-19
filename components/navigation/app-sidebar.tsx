"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  Home01Icon,
  Leaf01Icon,
  Cog,
  Tree06Icon,
} from "@hugeicons/core-free-icons";

function SidebarLink({
  href,
  label,
  icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: IconSvgElement;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors ${
        isActive
          ? "bg-primary/8 text-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.03]"
      }`}
    >
      <HugeiconsIcon
        icon={icon}
        size={18}
        strokeWidth={isActive ? 1.8 : 1.5}
        className={isActive ? "text-primary" : "text-muted-foreground/70"}
      />
      <span
        className={`text-sm ${isActive ? "font-medium" : ""} tracking-tight`}
      >
        {label}
      </span>
      {isActive && (
        <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-accent" />
      )}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col bg-white  md:w-[240px] md:shrink-0 md:px-4 md:py-6 md:border-r md:border-border/30">
      <Link href="/dashboard" className="flex items-center gap-2.5 px-3 mb-10">
        <span className="relative w-9 h-9 rounded-full bg-primary/8 flex items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary/5 blur-sm" />
          <HugeiconsIcon
            icon={Tree06Icon}
            size={18}
            strokeWidth={1.5}
            className="text-primary relative z-10"
          />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-heading text-base font-semibold text-foreground tracking-tight">
            Cuéntame
          </span>
          <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground/70 mt-0.5">
            Coach financiero
          </span>
        </span>
      </Link>

      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 px-3 mb-3">
        Navegación
      </div>
      <nav className="flex flex-col gap-1">
        <SidebarLink
          href="/dashboard"
          label="Inicio"
          icon={Home01Icon}
          isActive={pathname.startsWith("/dashboard")}
        />
        <SidebarLink
          href="/chat"
          label="Cuéntame"
          icon={Leaf01Icon}
          isActive={pathname.startsWith("/chat")}
        />
        <SidebarLink
          href="/profile"
          label="Ajustes"
          icon={Cog}
          isActive={pathname.startsWith("/profile")}
        />
      </nav>

      <div className="mt-auto px-3 pt-6 border-t border-border/30">
        <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60 mb-2">
          家計簿
        </div>
        <p className="text-xs text-muted-foreground/80 leading-relaxed">
          Tu diario financiero. Lleva 120 años funcionando.
        </p>
      </div>
    </aside>
  );
}
