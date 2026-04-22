"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tree06Icon } from "@hugeicons/core-free-icons";
import { createLedgerAction, getUserLedgersAction } from "@/core/ledger/presentation/ledger.actions";

export default function SetupPage() {
  const router = useRouter();
  const [message, setMessage] = useState("Preparando tu espacio...");

  useEffect(() => {
    async function setup() {
      const raw = sessionStorage.getItem("onboarding");

      if (!raw) {
        const { data } = await getUserLedgersAction();
        router.replace(data && data.length > 0 ? "/dashboard" : "/");
        return;
      }

      sessionStorage.removeItem("onboarding");
      const { name, types, businessName, businessType } = JSON.parse(raw);

      setMessage("Creando tus libros...");

      await Promise.all(
        types.map((type: "personal" | "business") =>
          createLedgerAction({
            name: type === "business" ? (businessName || name) : name,
            type,
            businessName: type === "business" ? businessName : undefined,
            businessType: type === "business" ? businessType : undefined,
          })
        )
      );

      setMessage("¡Todo listo!");
      await new Promise((r) => setTimeout(r, 600));
      router.replace("/dashboard");
    }

    setup();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-dvh gap-8 bg-white/60 backdrop-blur-sm">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm animate-pulse" />
        <HugeiconsIcon
          icon={Tree06Icon}
          size={48}
          className="text-primary relative z-10"
          strokeWidth={1.5}
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
