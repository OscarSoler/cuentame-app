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
          className={`transition-colors ${
            isActive ? "text-primary" : "text-muted-foreground/50"
          }`}
          strokeWidth={isActive ? 1.8 : 1.5}
        />
        {isActive && (
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
        )}
      </div>
      <span
        className={`text-[10px] transition-colors ${
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
    <nav className="relative border-t border-border/20 bg-[#FAF7F2]/80 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
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
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all ${
              isChatActive
                ? "bg-primary shadow-primary/25 scale-105"
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
            className={`text-[10px] mt-0.5 transition-colors ${
              isChatActive ? "text-primary font-medium" : "text-muted-foreground/60"
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
