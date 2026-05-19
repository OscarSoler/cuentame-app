import Image from "next/image";

const partners = [
  { name: "La República", src: "/business/larepublica1.png" },
  { name: "Blu Radio", src: "/business/blueradio1.png" },
  { name: "Cámara de Comercio", src: "/business/camara.svg" },
  { name: "Dropi", src: "/business/dropi.jpeg" },
  { name: "Coomeva", src: "/business/coomeva.png" },
];

export function PartnersMarquee() {
  return (
    <section
      aria-label="Medios de comunicación que han hablado de Cuéntame"
      className="relative border-y border-foreground/8 bg-cream/40 overflow-hidden"
    >
      <style>{`
        @keyframes cuentame-partners-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cuentame-partners-track {
          animation: cuentame-partners-marquee 42s linear infinite;
          width: max-content;
        }
        .cuentame-partners-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative px-6 md:px-10 py-6">
        <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70 text-center">
          Nuestros aliados — medios de comunicación
        </div>
      </div>

      <div
        className="relative pb-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="cuentame-partners-track flex items-center gap-12 md:gap-20">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={`${p.name}-${i}`}
              className="group flex items-center gap-6 md:gap-10 shrink-0"
            >
              <div className="relative h-10 md:h-12 w-[140px] md:w-[180px] flex items-center justify-center">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  sizes="180px"
                  className="object-contain opacity-85 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <span className="block w-1 h-1 rounded-full bg-foreground/15" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
