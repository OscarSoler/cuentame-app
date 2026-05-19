export function InkGlow({
  className = "absolute -top-20 -right-32 w-[640px] h-[640px] opacity-[0.07] pointer-events-none text-primary",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 600 600"
    >
      <defs>
        <radialGradient id="cuentame-ink-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="300" r="280" fill="url(#cuentame-ink-glow)" />
    </svg>
  );
}
