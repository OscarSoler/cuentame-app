import { HugeiconsIcon } from "@hugeicons/react";
import {
  AiChat01Icon,
  SparklesIcon,
  CheckmarkCircle02Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { ChapterLabel } from "./chapter-label";

const steps = [
  {
    n: "01",
    title: "Escribe lo que pasó",
    desc: "En el chat, tal como hablarías. \"Pagué el arriendo por 1 millón\" o \"Vendí dos gorras por 80 mil\". Sin formularios, sin categorías manuales.",
  },
  {
    n: "02",
    title: "Cuéntame clasifica por ti",
    desc: "El gasto queda registrado automáticamente en el pilar correcto —Operación, Inversión, Supervivencia— y con la emoción del momento.",
  },
  {
    n: "03",
    title: "Reflexiona al cierre del mes",
    desc: "¿Cuál fue tu utilidad? ¿Qué gasto pudiste haber evitado? El dashboard lo tiene todo listo para que decidas mejor el mes siguiente.",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative px-6 md:px-10 py-24 md:py-36"
    >
      <ChapterLabel number="03" title="Cómo funciona" />

      <div className="mt-12 max-w-5xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="font-heading text-4xl md:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
            Registrar nunca había sido{" "}
            <span className="italic font-normal text-primary">tan fácil.</span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            El secreto está en que no tienes que pensar dónde va cada cosa.
            Solo cuéntame lo que pasó.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left: steps */}
          <ol className="lg:col-span-6 space-y-6">
            {steps.map((s) => (
              <li
                key={s.n}
                className="relative bg-cream/70 border border-foreground/8 rounded-3xl p-6 md:p-7"
              >
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                  Paso {s.n}
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-medium text-foreground tracking-tight leading-tight">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>

          {/* Right: chat mockup */}
          <div className="lg:col-span-6 lg:sticky lg:top-24">
            <ChatMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function ChatMockup() {
  return (
    <div className="relative bg-cream/80 backdrop-blur-sm rounded-[2rem] border border-foreground/10 shadow-[0_18px_60px_-22px_rgba(45,80,22,0.28)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-foreground/8 bg-cream/60">
        <div className="flex items-center gap-2.5">
          <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
            <HugeiconsIcon
              icon={AiChat01Icon}
              size={16}
              className="text-primary"
              strokeWidth={1.5}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-cream" />
          </span>
          <div className="flex flex-col leading-none">
            <span className="text-sm font-medium text-foreground">
              Chat de Cuéntame
            </span>
            <span className="text-[10px] text-muted-foreground mt-0.5">
              Inteligencia artificial · en línea
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground tracking-wider uppercase">
          <span className="block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          en vivo
        </div>
      </div>

      {/* Messages */}
      <div className="px-5 py-6 space-y-4 min-h-[420px] bg-gradient-to-b from-cream/30 to-cream/0">
        {/* User message */}
        <div className="flex justify-end">
          <div className="max-w-[78%] bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-2.5 text-sm shadow-[0_2px_10px_rgba(45,80,22,0.18)]">
            Pagué el arriendo por 1 millón
          </div>
        </div>

        {/* AI confirmation card */}
        <div className="flex justify-start">
          <div className="max-w-[88%] bg-white border border-foreground/8 rounded-2xl rounded-tl-md p-4 shadow-[0_2px_10px_-2px_rgba(45,80,22,0.12)]">
            <div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-3">
              <HugeiconsIcon
                icon={CheckmarkCircle02Icon}
                size={14}
                strokeWidth={2}
              />
              Gasto registrado · 2026-04-30
            </div>

            <div className="flex items-baseline justify-between">
              <span className="font-heading text-2xl font-medium text-foreground tabular-nums">
                $1.000.000
              </span>
              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={14}
                className="text-muted-foreground/60"
              />
            </div>
            <div className="text-sm text-foreground/80 mt-0.5">
              Pago de arriendo
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                <span className="block w-1 h-1 rounded-full bg-primary" />
                Operación
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-foreground/[0.05] text-muted-foreground">
                #arriendo
              </span>
            </div>
          </div>
        </div>

        {/* AI emotion prompt */}
        <div className="flex justify-start">
          <div className="max-w-[88%] bg-white border border-foreground/8 rounded-2xl rounded-tl-md px-4 py-3 shadow-[0_2px_10px_-2px_rgba(45,80,22,0.12)]">
            <div className="text-sm text-foreground/85">
              ¿Cómo te sentiste?
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              {[
                { emoji: "😊", label: "Tranquilo" },
                { emoji: "😐", label: "Neutral" },
                { emoji: "😟", label: "Estresado" },
              ].map((e) => (
                <button
                  type="button"
                  key={e.label}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-foreground/10 bg-cream/60 hover:bg-primary/10 hover:border-primary/25 transition-colors text-sm"
                >
                  <span className="text-base leading-none">{e.emoji}</span>
                  <span className="text-xs text-foreground/75">{e.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="px-4 py-3 border-t border-foreground/8 bg-cream/40">
        <div className="flex items-center gap-2 bg-white border border-foreground/10 rounded-full pl-4 pr-1.5 py-1.5">
          <HugeiconsIcon
            icon={SparklesIcon}
            size={14}
            className="text-primary/70 shrink-0"
            strokeWidth={1.75}
          />
          <span className="flex-1 text-sm text-muted-foreground/80 truncate">
            Registra una venta o gasto…
          </span>
          <button
            type="button"
            className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_2px_8px_rgba(45,80,22,0.3)]"
            aria-label="Enviar"
          >
            <HugeiconsIcon
              icon={ArrowUpRight01Icon}
              size={14}
              strokeWidth={2}
            />
          </button>
        </div>
        <div className="mt-2 text-center text-[10px] tracking-[0.25em] uppercase text-muted-foreground/60">
          Inteligencia artificial · clasifica por ti
        </div>
      </div>
    </div>
  );
}
