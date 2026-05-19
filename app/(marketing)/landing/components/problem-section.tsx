import { ChapterLabel } from "./chapter-label";

const problems = [
  {
    emoji: "💸",
    title: "La plata personal se mezcla con la del negocio",
    desc: "Al final del mes no sabes si el negocio ganó o si tú perdiste. Todo termina en la misma cuenta.",
  },
  {
    emoji: "🌫️",
    title: "Nadie registra nada hasta que es tarde",
    desc: "Las planillas de Excel duran dos semanas. Las apps se olvidan al tercer día. El hábito nunca agarra.",
  },
  {
    emoji: "📉",
    title: "Sin claridad, las decisiones son intuición",
    desc: "¿Puedo pagar esa nómina? ¿Cuánto puedo invertir este mes? No sabes. Y eso cuesta.",
  },
];

export function ProblemSection() {
  return (
    <section
      id="el-problema"
      className="relative px-6 md:px-10 py-24 md:py-32"
    >
      <ChapterLabel number="01" title="El problema" />

      <div className="mt-12 max-w-5xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="font-heading text-4xl md:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
            <span className="italic font-normal text-primary">
              &ldquo;Sé cuánto entró.
            </span>
            <br />
            <span className="italic font-normal text-primary">
              Pero no sé dónde fue.&rdquo;
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            Una frase que escuchamos casi a diario de emprendedores
            colombianos. Detrás de ella, casi siempre, hay tres causas.
          </p>
        </div>

        <ul className="mt-16 grid md:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <li
              key={p.title}
              className="relative bg-cream/70 border border-foreground/8 rounded-3xl p-7 md:p-8 hover:bg-cream transition-colors"
            >
              <span
                className="absolute top-5 right-5 font-mono text-[10px] tabular-nums tracking-wider text-muted-foreground/50"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="text-4xl md:text-5xl leading-none">{p.emoji}</div>

              <h3 className="mt-5 font-heading text-xl md:text-2xl font-medium tracking-tight text-foreground leading-tight">
                {p.title}
              </h3>

              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
