import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Tree06Icon } from "@hugeicons/core-free-icons";

export function CtaSection() {
  return (
    <section className="relative px-6 md:px-10 py-28 md:py-40 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 40%, var(--accent) 0%, var(--surface-from) 60%, var(--surface-from) 100%)",
        }}
      />
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" />
          <feColorMatrix values="0 0 0 0 0.18  0 0 0 0 0.31  0 0 0 0 0.09  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70 mb-6">
          Fin del capítulo · principio del tuyo
        </div>

        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground"
          style={{ boxShadow: "0 8px 32px color-mix(in srgb, var(--primary) 35%, transparent)" }}
        >
          <HugeiconsIcon icon={Tree06Icon} size={28} strokeWidth={1.5} />
        </div>

        <h2 className="mt-10 font-heading text-5xl md:text-7xl leading-[1] tracking-tight text-foreground font-medium">
          La historia de Valentina{" "}
          <span className="italic font-normal text-primary">
            empezó con un domingo
          </span>{" "}
          y un cuaderno en blanco.
        </h2>

        <p className="mt-10 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto">
          La tuya puede empezar hoy. Separar tu plata de la del negocio. Anotar
          con honestidad. Construir un score que abra puertas que el banco
          tradicional no ve.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/onboarding">
            <Button
              size="lg"
              className="w-full sm:w-auto"
              style={{ boxShadow: "0 8px 28px color-mix(in srgb, var(--primary) 32%, transparent)" }}
            >
              Crear mi cuaderno
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                data-icon="inline-end"
              />
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              Ya tengo uno
            </Button>
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground/80">
          <span>Gratis para empezar</span>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <span>Sin tarjeta de crédito</span>
          <span className="w-1 h-1 rounded-full bg-foreground/20" />
          <span>Tu cuaderno, tus datos</span>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="px-6 md:px-10 py-12 border-t border-foreground/10 bg-cream/40">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-start gap-3">
          <span className="w-8 h-8 rounded-full bg-primary/8 flex items-center justify-center mt-1">
            <HugeiconsIcon
              icon={Tree06Icon}
              size={14}
              className="text-primary"
              strokeWidth={1.5}
            />
          </span>
          <div>
            <div className="font-heading text-base font-semibold text-foreground">
              Cuéntame
            </div>
            <div className="text-xs text-muted-foreground mt-0.5 max-w-xs leading-relaxed">
              El cuaderno digital para emprendedores que quieren claridad —
              hecho con calma en Colombia.
            </div>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="#el-problema" className="hover:text-foreground transition-colors">
            El problema
          </a>
          <a href="#metodologia" className="hover:text-foreground transition-colors">
            Metodología
          </a>
          <a href="#historia" className="hover:text-foreground transition-colors">
            Historia
          </a>
          <Link href="/login" className="hover:text-foreground transition-colors">
            Ingresar
          </Link>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-dashed border-foreground/10 flex flex-col md:flex-row md:items-center justify-between gap-2 text-[11px] text-muted-foreground/70">
        <span>© {new Date().getFullYear()} Cuéntame · Hecho en Cali, Bogotá y donde te leas esto</span>
        <span className="tracking-[0.2em] uppercase">
          Inspirado en el Kakebo · 1904
        </span>
      </div>
    </footer>
  );
}
