"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  Home01Icon,
  ChartHistogramIcon,
  Leaf01Icon,
  UserCircleIcon,
} from "@hugeicons/core-free-icons";

interface Tab {
  href: string;
  label: string;
  icon: IconSvgElement;
  special?: boolean;
}

const tabs: Tab[] = [
  { href: "/dashboard", label: "Inicio", icon: Home01Icon },
  { href: "/budget", label: "Presupuesto", icon: ChartHistogramIcon },
  { href: "/profile", label: "Perfil", icon: UserCircleIcon },
  { href: "/chat", label: "Cuéntame", icon: Leaf01Icon, special: true },
];

export function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav className="relative border-t border-border/20 bg-[#FAF7F2]/80 backdrop-blur-xl pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around px-2 h-14">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);

          if (tab.special) {
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="flex flex-col items-center justify-center -mt-4"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all ${
                    isActive
                      ? "bg-primary shadow-primary/25 scale-105"
                      : "bg-primary/90 shadow-primary/15"
                  }`}
                >
                  <HugeiconsIcon
                    icon={tab.icon}
                    size={18}
                    className="text-primary-foreground"
                    strokeWidth={1.5}
                  />
                </div>
                <span
                  className={`text-[10px] mt-0.5 transition-colors ${
                    isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center justify-center gap-0.5 relative py-1.5 px-3"
            >
              <div className="relative">
                <HugeiconsIcon
                  icon={tab.icon}
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
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground/50"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
