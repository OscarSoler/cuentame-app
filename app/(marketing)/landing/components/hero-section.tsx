import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InkGlow } from "@/components/ink-glow";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Leaf01Icon,
  Notebook01Icon,
  ChartUpIcon,
  HandCoinsIcon,
} from "@hugeicons/core-free-icons";

const flow = [
  {
    n: "01",
    icon: Notebook01Icon,
    title: "Registras",
    desc: "Tu plata personal y la del negocio, separadas en dos cuadernos.",
    color: "var(--primary)",
  },
  {
    n: "02",
    icon: ChartUpIcon,
    title: "Construyes score",
    desc: "Un puntaje alternativo, hecho con tu disciplina diaria.",
    color: "var(--sage)",
  },
  {
    n: "03",
    icon: HandCoinsIcon,
    title: "Convenios con entidades",
    desc: "Créditos, beneficios, asesorías y descuentos de aliados que leen tu hábito, no tu buró.",
    color: "var(--accent-warm)",
  },
];

export function HeroSection() {
  return (
    <section className="relative px-6 md:px-10 pt-14 md:pt-20 pb-20 md:pb-28 overflow-hidden">
      <InkGlow />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left column — copy */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 bg-accent/40 text-accent-foreground px-3 py-1.5 rounded-full text-xs mb-8 border border-primary/10">
            <HugeiconsIcon icon={Leaf01Icon} size={12} />
            <span className="tracking-wide">
              Hecho en Colombia · Beta abierta
            </span>
          </div>

          <h1 className="font-heading text-[40px] leading-[1.05] sm:text-5xl md:text-[68px] md:leading-[0.98] font-medium tracking-[-0.025em] text-foreground">
            El coach financiero que la economía{" "}
            <span className="relative inline-block">
              <span className="italic font-normal text-primary">informal</span>
              <svg
                aria-hidden
                className="absolute -bottom-3 left-0 w-full text-sage"
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
          </h1>

          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">Cuéntame</span> es el
            diario financiero para emprendedores. Llevas tus cuentas, ganas un
            score consciente, y te conectamos con aliados que sí ayudan a las
            PYMEs.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link href="/onboarding">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                style={{
                  boxShadow:
                    "0 6px 24px color-mix(in srgb, var(--primary) 28%, transparent)",
                }}
              >
                Empezar
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={18}
                  data-icon="inline-end"
                />
              </Button>
            </Link>
            <a href="#historia">
              <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                Leer la historia de Valentina
              </Button>
            </a>
          </div>
        </div>

        {/* Right column — flow */}
        <aside className="lg:col-span-5 relative">
          <div
            className="relative bg-cream/70 backdrop-blur-sm rounded-3xl p-7 md:p-8 border border-foreground/8"
            style={{
              boxShadow:
                "0 10px 50px -18px color-mix(in srgb, var(--primary) 22%, transparent)",
            }}
          >
            <span
              aria-hidden
              className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 bg-primary"
            />

            <div className="relative flex items-center justify-between mb-7">
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                Así funciona
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70 tabular-nums">
                3 pasos
              </span>
            </div>

            <ol className="relative space-y-6">
              <svg
                aria-hidden
                className="absolute left-[25px] top-[52px] bottom-[52px] w-px pointer-events-none overflow-visible text-foreground"
                viewBox="0 0 2 200"
                preserveAspectRatio="none"
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="200"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0.25"
                />
                <circle
                  cx="1"
                  cy="0"
                  r="2"
                  className="cuentame-flow-spark cuentame-flow-spark-a fill-primary"
                />
                <circle
                  cx="1"
                  cy="0"
                  r="2"
                  className="cuentame-flow-spark cuentame-flow-spark-b fill-accent-warm"
                />
              </svg>

              {flow.map((step, i) => (
                <li
                  key={step.n}
                  className="relative flex gap-4 cuentame-flow-step opacity-0"
                  style={{ animationDelay: `${i * 220}ms` }}
                >
                  <div className="relative shrink-0">
                    <span
                      className="absolute inset-0 rounded-2xl cuentame-flow-ring"
                      style={{
                        backgroundColor: step.color,
                        animationDelay: `${i * 220 + 600}ms`,
                      }}
                    />
                    <span
                      className="relative z-10 flex items-center justify-center w-[52px] h-[52px] rounded-2xl bg-cream border border-foreground/10"
                      style={{
                        color: step.color,
                        boxShadow:
                          "0 3px 10px -2px color-mix(in srgb, var(--primary) 18%, transparent)",
                      }}
                    >
                      <HugeiconsIcon
                        icon={step.icon}
                        size={22}
                        strokeWidth={1.5}
                      />
                    </span>
                    <span className="absolute -top-1.5 -right-1.5 z-20 w-6 h-6 rounded-full bg-foreground text-cream flex items-center justify-center font-mono text-[10px] tabular-nums">
                      {step.n}
                    </span>
                  </div>

                  <div className="flex-1 pt-1.5">
                    <h3 className="font-heading text-lg md:text-xl font-medium text-foreground leading-tight tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="relative mt-8 pt-5 border-t border-dashed border-foreground/15 flex items-center justify-between text-xs text-muted-foreground">
              <span>Tu cuaderno trabaja por ti</span>
              <span className="flex items-center gap-1.5">
                <span className="block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                En vivo
              </span>
            </div>

            <style>{`
              @keyframes cuentame-flow-step-in {
                0% { opacity: 0; transform: translateY(8px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .cuentame-flow-step {
                animation: cuentame-flow-step-in 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
              }
              @keyframes cuentame-flow-spark-a {
                0% { transform: translateY(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(100px); opacity: 0; }
              }
              @keyframes cuentame-flow-spark-b {
                0% { transform: translateY(100px); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(200px); opacity: 0; }
              }
              .cuentame-flow-spark {
                filter: drop-shadow(0 0 4px rgba(45, 80, 22, 0.55));
                transform-box: fill-box;
                transform-origin: center;
              }
              .cuentame-flow-spark-a {
                animation: cuentame-flow-spark-a 2.6s cubic-bezier(0.6, 0, 0.4, 1) 1.1s infinite;
              }
              .cuentame-flow-spark-b {
                animation: cuentame-flow-spark-b 2.6s cubic-bezier(0.6, 0, 0.4, 1) 2.4s infinite;
                filter: drop-shadow(0 0 4px rgba(212, 165, 116, 0.7));
              }
              @keyframes cuentame-flow-ring {
                0% { opacity: 0.35; transform: scale(1); }
                100% { opacity: 0; transform: scale(1.45); }
              }
              .cuentame-flow-ring {
                animation: cuentame-flow-ring 1.6s ease-out forwards;
                opacity: 0;
              }
            `}</style>
          </div>
        </aside>
      </div>
    </section>
  );
}
