import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiBrain01Icon,
  SparklesIcon,
  BubbleChatIcon,
  PieChartIcon,
  Coins02Icon,
  Notebook01Icon,
} from "@hugeicons/core-free-icons";
import { ChapterLabel } from "./chapter-label";

const lessons = [
  {
    tag: "Hábito detectado",
    icon: BubbleChatIcon,
    title: "Gastas más los domingos con ansiedad",
    desc: "Cuéntame cruzó tu diario emocional con tus movimientos. Te muestra el patrón antes de que se vuelva costumbre.",
  },
  {
    tag: "Concepto del mes",
    icon: PieChartIcon,
    title: "Qué es realmente el margen neto",
    desc: "Una microlección de 60 segundos, ilustrada con tus propios números del mes. No teoría — tu negocio.",
  },
  {
    tag: "Decisión guiada",
    icon: Coins02Icon,
    title: "¿Capital de trabajo o ahorro de impuestos?",
    desc: "Te ayuda a pensar la pregunta correcta. No te dice qué hacer — te enseña a decidir con criterio.",
  },
];

export function LearningSection() {
  return (
    <section
      id="aprendizaje"
      className="relative px-6 md:px-10 py-24 md:py-36 overflow-hidden"
    >
      {/* soft sage glow on the side */}
      <span
        aria-hidden
        className="absolute -top-32 -left-40 w-[480px] h-[480px] rounded-full blur-3xl opacity-30 bg-sage/40 pointer-events-none"
      />

      <div className="relative">
        <ChapterLabel number="05" title="Aprendizaje contextual" />

        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <h2 className="lg:col-span-8 font-heading text-4xl md:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
              Educación financiera{" "}
              <span className="italic font-normal text-primary">
                hecha con tus datos,
              </span>{" "}
              no con teoría ajena.
            </h2>
            <p className="lg:col-span-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Cuéntame estudia tu mes y te enseña lo que necesitas saber — justo
              cuando lo necesitas.
            </p>
          </div>

          {/* Hero card: AI-generated contextual tip mock */}
          <div className="mt-16 grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 relative bg-foreground text-cream rounded-3xl p-7 md:p-9 overflow-hidden">
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 1px 1px, #FAF7F2 1px, transparent 0)",
                  backgroundSize: "28px 28px",
                }}
              />
              <span
                aria-hidden
                className="absolute -bottom-24 -right-24 w-[320px] h-[320px] rounded-full blur-3xl opacity-30 bg-accent-warm"
              />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-2xl bg-accent-warm/15 border border-accent-warm/25 flex items-center justify-center">
                    <HugeiconsIcon
                      icon={AiBrain01Icon}
                      size={18}
                      className="text-accent-warm"
                      strokeWidth={1.5}
                    />
                  </span>
                  <div>
                    <div className="text-[10px] tracking-[0.25em] uppercase text-cream/55">
                      Tip generado para ti
                    </div>
                    <div className="text-xs font-mono tabular-nums text-cream/70 mt-1">
                      Lunes · 09:14 · basado en 47 movimientos
                    </div>
                  </div>
                </div>

                <blockquote className="mt-7 font-heading text-2xl md:text-[28px] leading-snug tracking-tight text-cream">
                  Este mes gastaste{" "}
                  <span className="italic text-accent-warm">
                    32% más en pauta
                  </span>{" "}
                  que el promedio de los últimos 3 meses — pero tus ventas
                  subieron 11%. La pauta no está pagando lo mismo que antes.
                </blockquote>

                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="text-[11px] px-3 py-1.5 rounded-full bg-cream/10 border border-cream/15 text-cream/75">
                    #ROAS
                  </span>
                  <span className="text-[11px] px-3 py-1.5 rounded-full bg-cream/10 border border-cream/15 text-cream/75">
                    #marketing-digital
                  </span>
                  <span className="text-[11px] px-3 py-1.5 rounded-full bg-accent-warm/15 border border-accent-warm/25 text-accent-warm">
                    #microlección
                  </span>
                </div>

                <div className="mt-7 pt-6 border-t border-cream/10 flex items-center gap-2 text-xs text-cream/60">
                  <HugeiconsIcon
                    icon={SparklesIcon}
                    size={14}
                    strokeWidth={1.5}
                    className="text-accent-warm/80"
                  />
                  Aprendes leyendo tu propio negocio
                </div>
              </div>
            </div>

            {/* Stat / why card */}
            <div className="lg:col-span-5 bg-cream/80 border border-foreground/8 rounded-3xl p-7 md:p-9 flex flex-col">
              <span className="w-10 h-10 rounded-2xl bg-primary/8 text-primary flex items-center justify-center">
                <HugeiconsIcon
                  icon={Notebook01Icon}
                  size={18}
                  strokeWidth={1.5}
                />
              </span>
              <h3 className="mt-6 font-heading text-2xl md:text-3xl font-medium text-foreground tracking-tight leading-tight">
                No es un curso. Es tu cuaderno{" "}
                <span className="italic text-primary">enseñándote</span>.
              </h3>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                Cada tarjeta nace de algo que tú registraste. Por eso se queda —
                porque ya lo viviste.
              </p>

              <dl className="mt-auto pt-8 grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/80">
                    Lecciones
                  </dt>
                  <dd className="mt-2 font-heading text-3xl font-medium text-foreground tabular-nums">
                    60s
                  </dd>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Lo que tardas en leerla
                  </p>
                </div>
                <div>
                  <dt className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/80">
                    Frecuencia
                  </dt>
                  <dd className="mt-2 font-heading text-3xl font-medium text-foreground tabular-nums">
                    2/sem
                  </dd>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Sin saturar tu bandeja
                  </p>
                </div>
              </dl>
            </div>
          </div>

          {/* Three contextual lesson cards */}
          <ul className="mt-6 grid md:grid-cols-3 gap-3">
            {lessons.map((l, i) => (
              <li
                key={l.title}
                className="group relative bg-cream/80 hover:bg-cream transition-all duration-500 border border-foreground/8 rounded-3xl p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary/70 bg-primary/8 px-2.5 py-1 rounded-full">
                    {l.tag}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums tracking-wider text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="mt-6 w-11 h-11 rounded-2xl bg-primary/8 text-primary flex items-center justify-center">
                  <HugeiconsIcon icon={l.icon} size={18} strokeWidth={1.5} />
                </span>
                <h4 className="mt-5 font-heading text-xl md:text-[22px] font-medium text-foreground tracking-tight leading-snug">
                  {l.title}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {l.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
