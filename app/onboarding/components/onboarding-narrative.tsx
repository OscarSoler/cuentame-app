"use client";

const questions = [
  "¿Cuánto dinero tengo este mes?",
  "¿Cuánto estoy gastando?",
  "¿Cuánto puedo ahorrar o invertir?",
  "¿Cómo puedo mejorar el mes siguiente?",
];

function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-w-xl w-full animate-[fadeIn_400ms_ease-out]">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      {children}
    </div>
  );
}

function Kanji({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none select-none absolute font-heading text-foreground/[0.05] text-[220px] leading-none tracking-tight ${className}`}
    >
      家計簿
    </span>
  );
}

function Chapter({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="font-mono text-[11px] tracking-[0.25em] tabular-nums text-foreground/45">
        CAP · {number}
      </span>
      <span className="block w-10 h-px bg-foreground/20" />
      <span className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function OnboardingNarrative({ step }: { step: number }) {
  return (
    <div key={step} className="relative w-full flex items-center">
      {step === 0 && (
        <Stage>
          <Kanji className="-top-16 -right-10 rotate-[-4deg]" />
          <Chapter number="00" label="Bienvenido" />
          <h2 className="font-heading text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
            Tu santuario{" "}
            <span className="italic font-normal text-primary">
              financiero
            </span>
            .
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
            Diseñado para llevar en el bolsillo. Cada gasto, una pregunta. Cada
            mes, una respuesta.
          </p>
          <div className="mt-12 flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-foreground/40">
            <span className="block w-8 h-px bg-foreground/30" />
            Hecho en Colombia
          </div>
        </Stage>
      )}

      {step === 1 && (
        <Stage>
          <Kanji className="-top-20 right-0 rotate-[3deg]" />
          <Chapter number="01" label="La metodología" />
          <h2 className="font-heading text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
            Lleva{" "}
            <span className="italic font-normal text-primary">
              120 años
            </span>{" "}
            funcionando.
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
            <em>Kakebo</em> no mide cuánto tienes. Mide qué tan consciente eres
            de lo que haces con tu dinero.
          </p>
          <ol className="mt-10 space-y-3 max-w-md">
            {questions.map((q, i) => (
              <li key={q} className="flex gap-4 items-start">
                <span className="font-mono text-[11px] tabular-nums text-primary/60 mt-1.5">
                  0{i + 1}
                </span>
                <span className="font-heading text-lg text-foreground/85 leading-snug">
                  {q}
                </span>
              </li>
            ))}
          </ol>
        </Stage>
      )}

      {step === 2 && (
        <Stage>
          <Chapter number="02" label="Empezamos por ti" />
          <h2 className="font-heading text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
            Lo más{" "}
            <span className="italic font-normal text-primary">
              importante
            </span>{" "}
            primero.
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
            Tu nombre. Para que cada vez que abras tu cuaderno, sientas que es
            tuyo.
          </p>
          <div className="mt-12 flex items-center gap-5 max-w-md">
            <span className="block flex-1 h-px bg-foreground/15" />
            <span
              aria-hidden
              className="w-9 h-9 rounded-full bg-primary/8 border border-primary/20 flex items-center justify-center font-heading text-base text-primary"
            >
              你
            </span>
            <span className="block flex-1 h-px bg-foreground/15" />
          </div>
        </Stage>
      )}

      {step === 3 && (
        <Stage>
          <Chapter number="03" label="Dos cuadernos" />
          <h2 className="font-heading text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
            Dos vidas,{" "}
            <span className="italic font-normal text-primary">
              dos cuadernos
            </span>
            .
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
            Tu plata personal y la del negocio nunca se mezclan. Por primera
            vez, sabrás cuánto ganas de verdad.
          </p>
          <div className="mt-12 flex items-center gap-6 max-w-md">
            <div className="flex-1 bg-cream/70 border border-foreground/10 rounded-2xl p-4">
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/80">
                Cuaderno
              </div>
              <div className="mt-1 font-heading text-xl text-foreground">
                Personal
              </div>
            </div>
            <span className="font-heading text-3xl text-foreground/30 italic">
              ≠
            </span>
            <div className="flex-1 bg-cream/70 border border-foreground/10 rounded-2xl p-4">
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/80">
                Cuaderno
              </div>
              <div className="mt-1 font-heading text-xl text-foreground">
                Negocio
              </div>
            </div>
          </div>
        </Stage>
      )}

      {step === 4 && (
        <Stage>
          <Chapter number="04" label="Tu negocio" />
          <h2 className="font-heading text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
            Vendías bien.{" "}
            <span className="italic font-normal text-primary">
              Ahora sabrás
            </span>{" "}
            cuánto ganas.
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
            La mayoría de PYMEs en Colombia mezclan plata personal con la del
            negocio. Es la razón #1 por la que no escalan.
          </p>
          <div className="mt-12 flex items-baseline gap-4 max-w-md">
            <span className="font-heading text-6xl tabular-nums text-primary font-medium">
              165%
            </span>
            <span className="text-sm text-muted-foreground leading-snug">
              Aumento promedio de utilidad real cuando los emprendedores
              separan sus cuentas.
            </span>
          </div>
        </Stage>
      )}

      {step === 5 && (
        <Stage>
          <Kanji className="-top-16 -right-8 rotate-[-2deg]" />
          <Chapter number="05" label="Un último paso" />
          <h2 className="font-heading text-5xl lg:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
            Tu cuaderno{" "}
            <span className="italic font-normal text-primary">
              te espera
            </span>
            .
          </h2>
          <p className="mt-6 text-base lg:text-lg text-muted-foreground leading-relaxed max-w-md">
            Solo necesitamos tu número para guardar tu progreso. Sin
            contraseñas. Sin recordatorios. Sin spam.
          </p>
          <div className="mt-12 flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-foreground/45">
            <span className="block w-2 h-2 rounded-full bg-primary/70 animate-pulse" />
            Casi en casa
          </div>
        </Stage>
      )}
    </div>
  );
}
