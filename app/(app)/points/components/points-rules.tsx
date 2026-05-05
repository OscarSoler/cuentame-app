import { HugeiconsIcon } from "@hugeicons/react";
import type { IconSvgElement } from "@hugeicons/react";
import {
  Edit02Icon,
  FireIcon,
  Calculator01Icon,
} from "@hugeicons/core-free-icons";
import {
  POINTS_PER_TRANSACTION,
  POINTS_PER_STREAK_DAY,
} from "@/core/transaction/domain/scoring";

export function PointsRules() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-[11px] font-medium text-muted-foreground/60 uppercase tracking-wider px-1">
        Cómo se calculan
      </h2>

      <div className="bg-white rounded-xl shadow-sm divide-y divide-border/30">
        <RuleRow
          icon={Edit02Icon}
          color="text-primary"
          title="Cada transacción"
          description="Sumas puntos cada vez que registras un ingreso o un gasto."
          points={`+${POINTS_PER_TRANSACTION} pts`}
        />
        <RuleRow
          icon={FireIcon}
          color="text-orange-500"
          title="Días de racha"
          description="Cada día consecutivo registrando movimientos suma puntos extra."
          points={`+${POINTS_PER_STREAK_DAY} pts/día`}
        />
        <RuleRow
          icon={Calculator01Icon}
          color="text-emerald-600"
          title="Fórmula"
          description={`Puntos = (transacciones × ${POINTS_PER_TRANSACTION}) + (racha × ${POINTS_PER_STREAK_DAY})`}
        />
      </div>
    </div>
  );
}

function RuleRow({
  icon,
  color,
  title,
  description,
  points,
}: {
  icon: IconSvgElement;
  color: string;
  title: string;
  description: string;
  points?: string;
}) {
  return (
    <div className="flex items-start gap-3 px-4 py-3">
      <div className="w-8 h-8 rounded-lg bg-accent/30 flex items-center justify-center shrink-0 mt-0.5">
        <HugeiconsIcon
          icon={icon}
          size={16}
          className={color}
          strokeWidth={1.75}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[13px] font-semibold text-foreground leading-tight">
            {title}
          </p>
          {points && (
            <span className="text-[10px] font-semibold text-primary tabular-nums shrink-0">
              {points}
            </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground/70 mt-0.5 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}
