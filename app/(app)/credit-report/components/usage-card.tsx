interface UsageCardProps {
  scoreConsistenciaDias: number;
  scoreConsistenciaTotal: number;
  registrosDiariosPromedio: number;
  ventasDiariasPromedio: number;
}

export function UsageCard({
  scoreConsistenciaDias,
  scoreConsistenciaTotal,
  registrosDiariosPromedio,
  ventasDiariasPromedio,
}: UsageCardProps) {
  return (
    <section className="space-y-3">
      <h2 className="font-heading text-sm font-semibold text-foreground">
        Indicadores de uso de Cuéntame.app
      </h2>

      <div className="grid grid-cols-3 gap-2">
        <UsageStat
          label="Score de Consistencia"
          sublabel="Usuario registra movimientos"
          value={`${scoreConsistenciaDias}/${scoreConsistenciaTotal}`}
          unit="Días"
        />
        <UsageStat
          label="Frecuencia de Registros"
          sublabel="Usuario registra en promedio"
          value={String(Math.round(registrosDiariosPromedio))}
          unit="Registros diarios"
        />
        <UsageStat
          label="Variabilidad de ingresos"
          sublabel="Usuario registra en promedio"
          value={String(Math.round(ventasDiariasPromedio))}
          unit="Ventas diarias"
        />
      </div>
    </section>
  );
}

function UsageStat({
  label,
  sublabel,
  value,
  unit,
}: {
  label: string;
  sublabel: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm flex flex-col items-center text-center">
      <p className="text-[10px] font-medium text-foreground leading-tight">
        {label}
      </p>
      <p className="text-[8px] text-muted-foreground mt-1.5 leading-tight">
        {sublabel}
      </p>
      <p className="text-2xl font-bold text-primary mt-2">{value}</p>
      <p className="text-[9px] text-muted-foreground mt-0.5">{unit}</p>
    </div>
  );
}
