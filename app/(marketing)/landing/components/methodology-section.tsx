import { ChapterLabel } from "./chapter-label";

const questions = [
  "¿Cuánto dinero tengo este mes?",
  "¿Cuánto estoy gastando?",
  "¿Cuánto puedo ahorrar o invertir?",
  "¿Cómo puedo mejorar el mes siguiente?",
];

const principles = [
  {
    title: "Consciencia",
    desc: "Registrar genera fricción intencional que cambia el comportamiento.",
  },
  {
    title: "Emoción",
    desc: "Clasifica cómo te sentiste al gastar. La emoción es datos.",
  },
  {
    title: "Reflexión",
    desc: "Una revisión mensual honesta vale más que 30 alertas ignoradas.",
  },
  {
    title: "Simplicidad",
    desc: "Sin categorías infinitas, sin reportes complejos. Solo claridad.",
  },
];

export function MethodologySection() {
  return (
    <section
      id="metodologia"
      className="relative px-6 md:px-10 py-24 md:py-36 bg-cream/30 border-y border-foreground/8 overflow-hidden"
    >
      <span
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 right-[-60px] md:right-[-20px] font-heading text-[260px] md:text-[420px] leading-none text-foreground/[0.04] select-none pointer-events-none"
      >
        家計簿
      </span>

      <div className="relative">
        <ChapterLabel number="02" title="La metodología" />

        <div className="mt-12 max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <div className="font-heading text-2xl text-foreground/40 tracking-[0.15em] mb-4">
              家計簿
            </div>
            <h2 className="font-heading text-4xl md:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
              El método japonés que lleva{" "}
              <span className="italic font-normal text-primary">
                120 años funcionando.
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              <em>Kakebo</em> (家計簿) es el libro de cuentas del hogar creado
              en Japón en 1904. No mide cuánto tienes. Mide qué tan consciente
              eres de lo que haces con tu dinero.
            </p>
          </div>

          {/* Four questions */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {questions.map((q, i) => (
              <div
                key={q}
                className="relative bg-cream/80 border border-foreground/8 rounded-2xl p-6 md:p-7 group hover:bg-cream transition-colors"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-heading text-base font-medium shadow-[0_3px_10px_-2px_rgba(45,80,22,0.3)]">
                  {i + 1}
                </div>
                <p className="mt-5 font-heading text-lg md:text-xl text-foreground leading-snug tracking-tight">
                  {q}
                </p>
              </div>
            ))}
          </div>

          {/* Four principles */}
          <div className="mt-16 pt-12 border-t border-dashed border-foreground/15">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/80 mb-8">
              Los cuatro principios
            </div>
            <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {principles.map((p, i) => (
                <div key={p.title} className="flex gap-5">
                  <span className="shrink-0 font-mono text-xs text-primary/60 tabular-nums tracking-wider pt-1">
                    0{i + 1}
                  </span>
                  <div>
                    <h4 className="font-heading text-xl md:text-2xl font-medium text-foreground tracking-tight">
                      {p.title}
                    </h4>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
