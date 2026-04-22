"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import { Home01Icon, Leaf01Icon, Cog } from "@hugeicons/core-free-icons";
import { useEffect, useRef, useState } from "react";

function TabLink({
  href,
  label,
  icon,
  isActive,
  compact,
}: {
  href: string;
  label: string;
  icon: IconSvgElement;
  isActive: boolean;
  compact: boolean;
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
        className={`text-[10px] transition-all duration-300 overflow-hidden ${
          isActive ? "text-primary font-medium" : "text-muted-foreground/50"
        } ${compact ? "max-h-0 opacity-0" : "max-h-4 opacity-100"}`}
      >
        {label}
      </span>
    </Link>
  );
}

export function BottomTabs() {
  const pathname = usePathname();
  const isChatActive = pathname.startsWith("/chat");
  const [compact, setCompact] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>(
      "[data-scroll-container]"
    );
    if (!scrollContainer) return;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const current = scrollContainer.scrollTop;
        const max = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const delta = current - lastScrollY.current;

        // Ignorar micro-movimientos y zona al final del scroll
        if (Math.abs(delta) > 6 && current < max - 10) {
          setCompact(delta > 0);
        }

        // Al llegar al top siempre expandir
        if (current <= 0) setCompact(false);

        lastScrollY.current = current;
        ticking.current = false;
      });
    };

    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`relative border-t border-border/20 bg-[#FAF7F2]/80 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] transition-all duration-300 ${
        compact ? "h-10" : "h-14"
      }`}
    >
      <div
        className={`flex items-center justify-around px-2 transition-all duration-300 ${
          compact ? "h-10" : "h-14"
        }`}
      >
        <TabLink
          href="/dashboard"
          label="Inicio"
          icon={Home01Icon}
          isActive={pathname.startsWith("/dashboard")}
          compact={compact}
        />
        <Link
          href="/chat"
          className="flex flex-col items-center justify-center -mt-4"
        >
          <div
            className={`rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${
              isChatActive
                ? "bg-primary shadow-primary/25 scale-105"
                : "bg-primary/90 shadow-primary/15"
            } ${compact ? "w-8 h-8" : "w-10 h-10"}`}
          >
            <HugeiconsIcon
              icon={Leaf01Icon}
              size={compact ? 15 : 18}
              className="text-primary-foreground transition-all duration-300"
              strokeWidth={1.5}
            />
          </div>
          <span
            className={`text-[10px] mt-0.5 transition-all duration-300 overflow-hidden ${
              isChatActive ? "text-primary font-medium" : "text-muted-foreground/60"
            } ${compact ? "max-h-0 opacity-0" : "max-h-4 opacity-100"}`}
          >
            Cuéntame
          </span>
        </Link>
        <TabLink
          href="/profile"
          label="Ajustes"
          icon={Cog}
          isActive={pathname.startsWith("/profile")}
          compact={compact}
        />
      </div>
    </nav>
  );
}
