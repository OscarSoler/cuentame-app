"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HugeiconsIcon } from "@hugeicons/react";
import { Leaf01Icon } from "@hugeicons/core-free-icons";
import { ChatContent } from "./chat-content";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function ChatDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          type="button"
          className="flex flex-col items-center justify-center -mt-4 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md bg-primary/90 shadow-primary/15 transition-all hover:bg-primary hover:shadow-primary/25 hover:scale-105 active:scale-95">
            <HugeiconsIcon
              icon={Leaf01Icon}
              size={18}
              className="text-primary-foreground"
              strokeWidth={1.5}
            />
          </div>
          <span className="text-[10px] mt-0.5 text-muted-foreground/60">
            Cuéntame
          </span>
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-[85dvh] bg-linear-to-b from-[#FAF7F2] via-[#F5F0E8] to-[#E8E0D0]">
        <VisuallyHidden>
          <DrawerTitle>Chat con Cuéntame</DrawerTitle>
        </VisuallyHidden>
        <ChatContent variant="drawer" />
      </DrawerContent>
    </Drawer>
  );
}
