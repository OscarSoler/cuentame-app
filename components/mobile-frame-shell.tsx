import { InkGlow } from "@/components/ink-glow";

export function MobileFrameShell({
  narrative,
  children,
  contentMaxWidth = "",
}: {
  narrative: React.ReactNode;
  children: React.ReactNode;
  contentMaxWidth?: string;
}) {
  return (
    <div className="relative h-dvh md:min-h-dvh md:h-auto w-full container mx-auto bg-transparent overflow-hidden md:overflow-visible">
      <div
        aria-hidden
        className="hidden md:block pointer-events-none absolute inset-0 overflow-hidden"
      >
        <InkGlow className="absolute -top-40 -left-40 w-[700px] h-[700px] opacity-[0.08] text-primary" />
        <InkGlow className="absolute -bottom-40 -right-40 w-[600px] h-[600px] opacity-[0.06] text-accent" />
      </div>

      <div className={`relative h-full md:h-auto md:grid md:grid-cols-12 md:gap-0 md:min-h-dvh md:items-center md:px-10 lg:px-16 md:py-10 md:mx-auto ${contentMaxWidth}`}>
        <aside className="hidden md:flex md:col-span-7 lg:col-span-7 md:items-center md:justify-center md:pr-10 lg:pr-16 md:order-1">
          {narrative}
        </aside>

        <div className="h-full md:h-auto md:col-span-5 lg:col-span-5 md:flex md:justify-center md:items-center md:order-2">
          <div
            className="
              relative
              w-full h-full md:h-auto
              md:w-[380px] md:max-w-full
              md:aspect-[9/19.5] md:max-h-[800px]
              md:rounded-[44px] md:border md:border-border/60
              md:bg-[var(--cream)]
              md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.22),0_8px_24px_-8px_rgba(0,0,0,0.10),inset_0_0_0_1px_rgba(255,255,255,0.5)]
              overflow-hidden
            "
          >
            <div className="h-full w-full overflow-y-auto overscroll-contain">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
