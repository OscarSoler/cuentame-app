import { formatCurrency } from "@/lib/utils";

interface ReportHeaderProps {
  nombreNegocio: string | null;
  tipoNegocio: string | null;
  antiguedadMeses: number;
  ventasUltimoAnio: number;
}

export function ReportHeader({
  nombreNegocio,
  tipoNegocio,
  antiguedadMeses,
  ventasUltimoAnio,
}: ReportHeaderProps) {
  const years = Math.floor(antiguedadMeses / 12);
  const months = antiguedadMeses % 12;
  const antiguedadLabel =
    years > 0
      ? `${years} ${years === 1 ? "año" : "años"}${months > 0 ? ` ${months} m` : ""}`
      : `${antiguedadMeses} ${antiguedadMeses === 1 ? "mes" : "meses"}`;

  return (
    <header className="space-y-3">
      <div>
        <h1 className="font-heading text-xl font-semibold text-foreground">
          Reporte de Comportamiento Financiero
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Generado a partir de tu actividad en Cuéntame.app
        </p>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        <Field label="Nombre del Emprendimiento" value={nombreNegocio ?? "—"} />
        <Field label="Actividad Económica" value={tipoNegocio ?? "—"} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Antigüedad del Negocio" value={antiguedadLabel} />
          <Field
            label="Ventas del último año"
            value={ventasUltimoAnio > 0 ? formatCurrency(ventasUltimoAnio) : "—"}
          />
        </div>
      </div>
    </header>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
        {label}
      </p>
      <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
    </div>
  );
}
