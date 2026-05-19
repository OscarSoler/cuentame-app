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
      className="flex flex-col items-center justify-center gap-0.5 relative py-1.5 px-3"
    >
      <div className="relative">
        <HugeiconsIcon
          icon={icon}
          size={20}
          className={isActive ? "text-primary" : "text-muted-foreground/50"}
          strokeWidth={isActive ? 1.8 : 1.5}
        />
        {isActive && (
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
        )}
      </div>
      <span
        className={`text-[10px] ${
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
    <nav className="md:hidden relative border-t border-border/20 bg-white pb-[env(safe-area-inset-bottom)] h-14">
      <div className="flex items-center justify-around px-2 h-14">
        <TabLink
          href="/dashboard"
          label="Inicio"
          icon={Home01Icon}
          isActive={pathname.startsWith("/dashboard")}
        />
        <Link
          href="/chat"
          className="flex flex-col items-center justify-center -mt-4"
        >
          <div
            className={`rounded-xl flex items-center justify-center shadow-md w-10 h-10 ${
              isChatActive
                ? "bg-primary shadow-primary/25"
                : "bg-primary/90 shadow-primary/15"
            }`}
          >
            <HugeiconsIcon
              icon={Leaf01Icon}
              size={18}
              className="text-primary-foreground"
              strokeWidth={1.5}
            />
          </div>
          <span
            className={`text-[10px] mt-0.5 ${
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
