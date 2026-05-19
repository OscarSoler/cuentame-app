"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { Home01Icon, Leaf01Icon, Cog } from "@hugeicons/core-free-icons";

function TabLink({
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
      className="flex flex-col items-center justify-center gap-1 relative py-2 px-4"
    >
      <div className="relative">
        <HugeiconsIcon
          icon={icon}
          size={24}
          className={isActive ? "text-primary" : "text-muted-foreground/50"}
          strokeWidth={isActive ? 1.8 : 1.5}
        />
        {isActive && (
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
        )}
      </div>
      <span
        className={`text-[11px] ${
          isActive ? "text-primary font-medium" : "text-muted-foreground/50"
        }`}
      >
        {label}
      </span>
    </Link>
  );
}

export function BottomTabs() {
  const pathname = usePathname();
  const isChatActive = pathname.startsWith("/chat");

  return (
    <nav className="md:hidden relative border-t border-border/20 bg-white pb-[env(safe-area-inset-bottom)] h-16">
      <div className="flex items-center justify-around px-2 h-16">
        <TabLink
          href="/dashboard"
          label="Inicio"
          icon={Home01Icon}
          isActive={pathname.startsWith("/dashboard")}
        />
        <Link
          href="/chat"
          className="flex flex-col items-center justify-center -mt-5"
        >
          <div
            className={`rounded-2xl flex items-center justify-center shadow-md w-12 h-12 ${
              isChatActive
                ? "bg-primary shadow-primary/25"
                : "bg-primary/90 shadow-primary/15"
            }`}
          >
            <HugeiconsIcon
              icon={Leaf01Icon}
              size={22}
              className="text-primary-foreground"
              strokeWidth={1.5}
            />
          </div>
          <span
            className={`text-[11px] mt-1 ${
              isChatActive
                ? "text-primary font-medium"
                : "text-muted-foreground/60"
            }`}
          >
            Cuéntame
          </span>
        </Link>
        <TabLink
          href="/profile"
          label="Ajustes"
          icon={Cog}
          isActive={pathname.startsWith("/profile")}
        />
      </div>
    </nav>
  );
}
