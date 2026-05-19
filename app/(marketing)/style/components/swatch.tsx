type Props = {
  name: string;
  varName: string;
  hex: string;
  className: string;
  textClassName?: string;
};

export function Swatch({ name, varName, hex, className, textClassName }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`flex h-20 items-end rounded-xl ring-1 ring-foreground/10 p-3 ${className} ${textClassName ?? ""}`}
      >
        <span className="font-mono text-xs opacity-80">{hex}</span>
      </div>
      <div className="space-y-0.5 px-1">
        <p className="font-medium text-sm">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{varName}</p>
      </div>
    </div>
  );
}
