import { HugeiconsIcon } from "@hugeicons/react";
import {
  BubbleChatIcon,
  PieChartIcon,
  TaskDaily01Icon,
  AiBrain01Icon,
  Notebook01Icon,
  GiftIcon,
  LeafIcon,
  MoonIcon,
} from "@hugeicons/core-free-icons";
import { ChapterLabel } from "./chapter-label";

const features = [
  {
    icon: BubbleChatIcon,
    title: "Le cuenta por chat",
    desc: "Le habla a la app como a un amigo. Ella categoriza, calcula IVA y entiende su emoción del momento.",
    accent: "principal",
  },
  {
    icon: TaskDaily01Icon,
    title: "Acciones rápidas",
    desc: "El pago de envíos, el almuerzo, la pauta de Instagram. Plantillas para lo de siempre, listas en un tap.",
  },
  {
    icon: PieChartIcon,
    title: "Pilares en vivo",
    desc: "Ve al instante si está dentro o fuera del rango que se puso a inicio de mes. Sin abrir Excel.",
  },
  {
    icon: AiBrain01Icon,
    title: "Reflexión asistida",
    desc: "Al cierre del mes, Cuéntame le hace las cuatro preguntas del Kakebo. Sus respuestas se quedan en su cuaderno.",
  },
  {
    icon: Notebook01Icon,
    title: "Diario emocional",
    desc: "Cada movimiento puede llevar una emoción. Descubrió que gasta más los domingos con ansiedad.",
  },
  {
    icon: GiftIcon,
    title: "Puntos por hábito",
    desc: "Rachas, registros, reflexiones. Acumula puntos que se canjean por beneficios con los aliados de Cuéntame.",
  },
  {
    icon: LeafIcon,
    title: "Modo Happy Spending",
    desc: "Cuando gasta dentro de su plan, la app lo celebra. La culpa no es buena consejera financiera.",
  },
];

export function FeaturesSection() {
  return (
    <section
      id="metodo"
      className="relative px-6 md:px-10 py-24 md:py-36 bg-cream/30 border-y border-foreground/8"
    >
      <ChapterLabel number="06" title="El cuaderno por dentro" />

      <div className="mt-12 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <h2 className="lg:col-span-8 font-heading text-4xl md:text-6xl leading-[1.05] tracking-tight text-foreground font-medium">
            Esto es lo que{" "}
            <span className="italic font-normal text-primary">
              Valentina usa
            </span>{" "}
            cada día.
          </h2>
          <p className="lg:col-span-4 text-base md:text-lg text-muted-foreground leading-relaxed">
            90 segundos al día. Ni más, ni menos.
          </p>
        </div>

        <ul className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <li
              key={f.title}
              className={`group relative bg-cream/80 hover:bg-cream transition-all duration-500 border border-foreground/8 rounded-3xl p-6 ${
                f.accent === "principal"
                  ? "sm:col-span-2 lg:col-span-2 bg-primary text-primary-foreground hover:bg-primary"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                    f.accent === "principal"
                      ? "bg-cream/15 text-cream"
                      : "bg-primary/8 text-primary"
                  }`}
                >
                  <HugeiconsIcon icon={f.icon} size={18} strokeWidth={1.5} />
                </span>
                <span
                  className={`font-mono text-[10px] tabular-nums tracking-wider ${
                    f.accent === "principal"
                      ? "text-cream/50"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3
                className={`mt-6 font-heading text-xl md:text-2xl font-medium tracking-tight ${
                  f.accent === "principal" ? "text-cream" : "text-foreground"
                }`}
              >
                {f.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  f.accent === "principal"
                    ? "text-cream/75"
                    : "text-muted-foreground"
                }`}
              >
                {f.desc}
              </p>

              {f.accent === "principal" && (
                <div className="mt-6 inline-flex items-center gap-2 text-xs text-cream/80">
                  <span className="block w-2 h-2 rounded-full bg-accent-warm" />
                  Función estrella
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
