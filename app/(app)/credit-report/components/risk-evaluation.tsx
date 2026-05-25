import { formatCurrency } from "@/lib/utils";
import type { Rating } from "@/core/credit-score/domain/score.entity";

interface RiskEvaluationProps {
  utilidadMensualPromedio: number;
  cuotaSugeridaMin: number;
  cuotaSugeridaMax: number;
  margenOperativoPct: number;
  antiguedadMeses: number;
  riesgoGlobal: Rating;
}

export function RiskEvaluation({
  utilidadMensualPromedio,
  cuotaSugeridaMin,
  cuotaSugeridaMax,
  margenOperativoPct,
  antiguedadMeses,
  riesgoGlobal,
}: RiskEvaluationProps) {
  const bullets = [
    {
      title: "Flujo de caja probado",
      body: "El negocio presenta ingresos recurrentes y rotación de efectivo medible en la app.",
    },
    {
      title: "Margen operativo",
      body: `El margen operativo promedio del negocio es del ${Math.round(margenOperativoPct)}%.`,
    },
    {
      title: "Experiencia operativa",
      body: `Antigüedad registrada en Cuéntame: ${antiguedadMeses} ${antiguedadMeses === 1 ? "mes" : "meses"}.`,
    },
    {
      title: "Capacidad de pago",
      body: `Con una utilidad operacional cercana a ${formatCurrency(Math.round(utilidadMensualPromedio))} mensuales, el negocio podría asumir cuotas entre ${formatCurrency(Math.round(cuotaSugeridaMin))} y ${formatCurrency(Math.round(cuotaSugeridaMax))}.`,
    },
  ];

  return (
    <section className="space-y-3">
      <h2 className="font-heading text-sm font-semibold text-foreground">
        Evaluación de riesgo crediticio
      </h2>

      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        {bullets.map((b) => (
          <div key={b.title} className="text-xs">
            <span className="font-semibold text-foreground">{b.title}: </span>
            <span className="text-muted-foreground">{b.body}</span>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
          Conclusión preliminar
        </p>
        <p className="text-sm text-foreground mt-1">
          Perfil con riesgo global{" "}
          <span className="font-semibold">{riesgoGlobal}</span> según el
          comportamiento financiero registrado en Cuéntame.app.
        </p>
      </div>
    </section>
  );
}
