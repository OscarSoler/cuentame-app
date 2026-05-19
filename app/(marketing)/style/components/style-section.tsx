type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function StyleSection({ title, description, children }: Props) {
  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h2 className="font-heading text-2xl font-medium">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}
