export function ChapterLabel({
  number,
  title,
  dark = false,
}: {
  number: string;
  title: string;
  dark?: boolean;
}) {
  const muted = dark ? "text-cream/60" : "text-muted-foreground";
  const line = dark ? "bg-cream/25" : "bg-foreground/20";
  const num = dark ? "text-cream/45" : "text-foreground/45";

  return (
    <div className="flex items-center gap-4 max-w-5xl mx-auto">
      <span className={`font-mono text-xs tracking-[0.25em] tabular-nums ${num}`}>
        CAP · {number}
      </span>
      <span className={`block w-12 h-px ${line}`} />
      <span className={`text-xs tracking-[0.3em] uppercase ${muted}`}>
        {title}
      </span>
    </div>
  );
}
