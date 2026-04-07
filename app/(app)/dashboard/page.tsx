import { HugeiconsIcon } from "@hugeicons/react";
import { Home01Icon } from "@hugeicons/core-free-icons";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center gap-4">
      <div className="w-14 h-14 rounded-full bg-accent/30 flex items-center justify-center">
        <HugeiconsIcon
          icon={Home01Icon}
          size={28}
          className="text-primary"
          strokeWidth={1.5}
        />
      </div>
      <div>
        <h1 className="font-heading text-xl text-foreground">Inicio</h1>
        <p className="text-xs text-muted-foreground/70 mt-1">
          Tu resumen financiero aparecerá aquí.
        </p>
      </div>
    </div>
  );
}
