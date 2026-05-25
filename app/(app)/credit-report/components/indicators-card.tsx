import { formatCurrencyCompact } from "@/lib/utils";
import type { Rating } from "@/core/credit-score/domain/score.entity";

interface IndicatorsCardProps {
  ventasPromedioMensuales: number;
  margenOperativoPct: number;
  evaluation: {
    flujoDiario: Rating;
    rotacion: Rating;
    riesgoOperativo: Rating;
    margen: Rating;
    capacidadPago: Rating;
    formalizacion: Rating;
    potencialCrecimiento: Rating;
    riesgoGlobal: Rating;
  };
}

const ROWS: { label: string; key: keyof IndicatorsCardProps["evaluation"] }[] = [
  { label: "Flujo diario", key: "flujoDiario" },
  { label: "Rotación", key: "rotacion" },
  { label: "Riesgo operativo", key: "riesgoOperativo" },
  { label: "Margen", key: "margen" },
  { label: "Capacidad de pago", key: "capacidadPago" },
  { label: "Formalización", key: "formalizacion" },
  { label: "Potencial de crecimiento", key: "potencialCrecimiento" },
  { label: "Riesgo global", key: "riesgoGlobal" },
];

export function IndicatorsCard({
  ventasPromedioMensuales,
  margenOperativoPct,
  evaluation,
}: IndicatorsCardProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-heading text-sm font-semibold text-foreground">
        Indicadores Financieros
      </h2>

      <div className="grid grid-cols-2 gap-2.5">
        <Stat
          label="Ventas promedio mensuales"
          value={formatCurrencyCompact(ventasPromedioMensuales)}
        />
        <Stat
          label="Margen operativo mensual"
          value={`${Math.round(margenOperativoPct)}%`}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm divide-y divide-foreground/5">
        {ROWS.map((row) => (
          <div
            key={row.key}
            className="flex items-center justify-between px-4 py-2.5"
          >
            <span className="text-xs text-foreground">{row.label}</span>
            <RatingPill rating={evaluation[row.key]} />
          </div>
        ))}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
      <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
      <p className="text-lg font-bold text-foreground mt-1">{value}</p>
    </div>
  );
}

function RatingPill({ rating }: { rating: Rating }) {
  const styles: Record<Rating, string> = {
    excelente: "bg-emerald-100 text-emerald-700",
    alto: "bg-emerald-50 text-emerald-700",
    bueno: "bg-emerald-50 text-emerald-700",
    medio: "bg-amber-50 text-amber-700",
    "medio-bajo": "bg-emerald-50 text-emerald-700",
    "media-baja": "bg-amber-50 text-amber-700",
    bajo: "bg-rose-50 text-rose-700",
  };
  const label = rating.charAt(0).toUpperCase() + rating.slice(1);
  return (
    <span
      className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${styles[rating]}`}
    >
      {label}
    </span>
  );
}
