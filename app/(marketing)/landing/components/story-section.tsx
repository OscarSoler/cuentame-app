import { HugeiconsIcon } from "@hugeicons/react";
import {
  QuoteUpIcon,
  Notebook01Icon,
  ChartUpIcon,
  BankIcon,
  Tree06Icon,
} from "@hugeicons/core-free-icons";
import { ChapterLabel } from "./chapter-label";

const acts = [
  {
    n: "01",
    when: "Antes",
    icon: Notebook01Icon,
    title: "El enredo",
    body: "Una sola cuenta. Una sola cabeza. Inventario, mercado, suscripciones, pedidos: todo mezclado. Vendía bien, pero no sabía cuánto ganaba.",
  },
  {
    n: "02",
    when: "Semana 1",
    icon: Notebook01Icon,
    title: "Dos cuadernos",
    body: "Abrió Cuéntame un domingo. Marcó \"las dos: vida y negocio\". Por primera vez en tres años, sus cuentas no se mezclaban.",
  },
  {
    n: "03",
    when: "Mes 6",
    icon: ChartUpIcon,
    title: "El score",
    body: "Cuéntame le mostró un puntaje que no había visto antes — construido con su disciplina diaria, no con su buró.",
    stat: "742 / 850",
  },
  {
    n: "04",
    when: "Mes 7",
    icon: BankIcon,
    title: "El convenio",
    body: "Una cooperativa aliada leyó su score y le pre-aprobó capital de trabajo. Sin codeudor. Sin extractos.",
    stat: "$8.000.000",
  },
  {
    n: "05",
    when: "Mes 12",
    icon: Tree06Icon,
    title: "El negocio crece",
    body: "Inventario por adelantado, primera empleada, pop-up físico. Cerró el año con utilidad real — y volvió a su cuaderno.",
    stat: "↑ 165% utilidad",
  },
];

export function StorySection() {
  return (
    <section
      id="historia"
      className="relative px-6 md:px-10 py-24 md:py-36 bg-foreground text-cream overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #FAF7F2 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <span
        aria-hidden
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-25 bg-sage"
      />

      <div className="relative">
        <ChapterLabel number="04" title="Una historia real" dark />

        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <h2 className="lg:col-span-8 font-heading text-4xl md:text-6xl leading-[1.05] tracking-tight text-cream font-medium">
              Valentina vendía bien —{" "}
              <span className="italic font-normal text-accent-warm">
                pero no sabía cuánto ganaba.
              </span>
            </h2>
            <p className="lg:col-span-4 text-base md:text-lg text-cream/70 leading-relaxed">
              29 años, e-commerce de ropa, Cali. Un año con Cuéntame.
            </p>
          </div>

          <figure className="mt-12 max-w-3xl bg-cream/[0.05] border border-cream/15 rounded-3xl p-7 md:p-9">
            <HugeiconsIcon
              icon={QuoteUpIcon}
              size={28}
              className="text-accent-warm/70"
              strokeWidth={1.25}
            />
            <blockquote className="mt-3 font-heading text-2xl md:text-3xl italic text-cream leading-snug tracking-tight">
              &ldquo;Cuéntame no me dio plata. Me dio claridad — y la claridad
              atrajo la plata.&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-sm text-cream/70">
              <span className="w-9 h-9 rounded-full bg-accent-warm/15 border border-accent-warm/25 flex items-center justify-center font-heading font-medium text-accent-warm">
                V
              </span>
              <span>
                Valentina · cierre del año
              </span>
            </figcaption>
          </figure>

          {/* Timeline */}
          <ol className="mt-16 relative">
            <span
              aria-hidden
              className="absolute left-[22px] md:left-[28px] top-3 bottom-3 w-px bg-cream/15"
            />
            {acts.map((a) => (
              <li
                key={a.n}
                className="relative grid grid-cols-[50px_1fr] md:grid-cols-[60px_1fr] gap-5 md:gap-8 py-6 md:py-8 first:pt-0 last:pb-0 border-b border-cream/8 last:border-0"
              >
                <div className="relative flex items-start justify-center">
                  <span className="relative z-10 w-11 md:w-[58px] h-11 md:h-[58px] rounded-full bg-foreground border border-cream/20 flex items-center justify-center shadow-[0_3px_12px_-2px_rgba(0,0,0,0.4)]">
                    <HugeiconsIcon
                      icon={a.icon}
                      size={18}
                      className="text-accent-warm"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="absolute -top-1 -right-1 z-20 w-5 md:w-6 h-5 md:h-6 rounded-full bg-accent-warm text-foreground flex items-center justify-center font-mono text-[9px] md:text-[10px] tabular-nums font-medium">
                    {a.n}
                  </span>
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-cream/55">
                      {a.when}
                    </span>
                    {a.stat && (
                      <span className="text-xs font-mono tabular-nums text-accent-warm bg-accent-warm/10 border border-accent-warm/20 px-2 py-0.5 rounded-full">
                        {a.stat}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-heading text-2xl md:text-3xl font-medium text-cream tracking-tight leading-tight">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-base text-cream/70 leading-relaxed max-w-2xl">
                    {a.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
