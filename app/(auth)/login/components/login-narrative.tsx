export function LoginNarrative() {
  return (
    <div className="relative max-w-xl w-full">
      <div className="flex items-center gap-3 mb-8">
        <span className="font-mono text-[11px] tracking-[0.25em] tabular-nums text-foreground/45">
          ACCESO
        </span>
        <span className="block w-10 h-px bg-foreground/20" />
        <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
          Bienvenido de vuelta
        </span>
      </div>

      <h2 className="font-heading text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
        El coach financiero que la economía{" "}
        <span className="relative inline-block">
          <span className="italic font-normal text-primary">informal</span>
          <svg
            aria-hidden
            className="absolute -bottom-2 left-0 w-full text-sage"
            viewBox="0 0 300 12"
            fill="none"
          >
            <path
              d="M2 8 Q 75 2, 150 6 T 298 4"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        </span>{" "}
        nunca tuvo.
      </h2>

      <p className="mt-8 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
        <span className="text-foreground font-medium">Cuéntame</span> es el
        diario financiero para emprendedores. Llevas tus cuentas, ganas un
        score consciente, y te conectamos con aliados que sí ayudan a las
        PYMEs.
      </p>

      <div className="mt-12 flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-foreground/45">
        <span className="block w-2 h-2 rounded-full bg-primary/70" />
        Tu santuario te espera
      </div>
    </div>
  );
}
