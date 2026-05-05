import { HugeiconsIcon } from "@hugeicons/react";
import { Idea01Icon } from "@hugeicons/core-free-icons";
import {
  POINTS_PER_TRANSACTION,
  POINTS_PER_STREAK_DAY,
} from "@/core/transaction/domain/scoring";

export function PointsTips() {
  const dailyMin = POINTS_PER_TRANSACTION + POINTS_PER_STREAK_DAY;
  const weekly = dailyMin * 7;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider px-1">
        Para subir más rápido
      </h2>

      <div className="bg-white rounded-xl shadow-sm px-4 py-3 flex gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
          <HugeiconsIcon
            icon={Idea01Icon}
            size={16}
            className="text-amber-500"
            strokeWidth={1.75}
          />
        </div>
        <div className="flex-1 flex flex-col gap-1.5">
          <p className="text-[12px] text-foreground leading-snug">
            Registra al menos un movimiento al día para mantener tu racha.
            Una transacción diaria suma{" "}
            <span className="font-semibold tabular-nums">
              {dailyMin} pts
            </span>{" "}
            (transacción + día de racha) y{" "}
            <span className="font-semibold tabular-nums">{weekly} pts</span> a
            la semana.
          </p>
          <p className="text-[11px] text-muted-foreground/70 leading-snug">
            Si pasa un día sin registrar, la racha vuelve a cero — pero los
            puntos acumulados se quedan contigo.
          </p>
        </div>
      </div>
    </div>
  );
}
