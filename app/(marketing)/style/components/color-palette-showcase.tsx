import { StyleSection } from "./style-section";
import { Swatch } from "./swatch";

const SEMANTIC = [
  { name: "background", varName: "--background", hex: "#F5F0E8", className: "bg-background", textClassName: "text-foreground" },
  { name: "foreground", varName: "--foreground", hex: "#3D3929", className: "bg-foreground", textClassName: "text-background" },
  { name: "cream", varName: "--cream", hex: "#FAF7F2", className: "bg-cream", textClassName: "text-foreground" },
  { name: "sage", varName: "--sage", hex: "#8B9E7C", className: "bg-sage", textClassName: "text-white" },
  { name: "card", varName: "--card", hex: "#FAF7F2", className: "bg-card", textClassName: "text-card-foreground" },
  { name: "popover", varName: "--popover", hex: "#FAF7F2", className: "bg-popover", textClassName: "text-popover-foreground" },
  { name: "primary", varName: "--primary", hex: "#2D5016", className: "bg-primary", textClassName: "text-primary-foreground" },
  { name: "primary-foreground", varName: "--primary-foreground", hex: "#FAF7F2", className: "bg-primary-foreground", textClassName: "text-primary" },
  { name: "secondary", varName: "--secondary", hex: "#E8E0D0", className: "bg-secondary", textClassName: "text-secondary-foreground" },
  { name: "secondary-foreground", varName: "--secondary-foreground", hex: "#3D3929", className: "bg-secondary-foreground", textClassName: "text-secondary" },
  { name: "muted", varName: "--muted", hex: "#EDE8DC", className: "bg-muted", textClassName: "text-muted-foreground" },
  { name: "muted-foreground", varName: "--muted-foreground", hex: "#7A7265", className: "bg-muted-foreground", textClassName: "text-muted" },
  { name: "accent", varName: "--accent", hex: "#D4E4C8", className: "bg-accent", textClassName: "text-accent-foreground" },
  { name: "accent-foreground", varName: "--accent-foreground", hex: "#2D5016", className: "bg-accent-foreground", textClassName: "text-accent" },
  { name: "destructive", varName: "--destructive", hex: "#B44040", className: "bg-destructive", textClassName: "text-white" },
  { name: "border", varName: "--border", hex: "#D6CEBC", className: "bg-border", textClassName: "text-foreground" },
  { name: "input", varName: "--input", hex: "#D6CEBC", className: "bg-input", textClassName: "text-foreground" },
  { name: "ring", varName: "--ring", hex: "#2D5016", className: "bg-ring", textClassName: "text-white" },
];

const CHART = [
  { name: "chart-1", varName: "--chart-1", hex: "#2D5016", className: "bg-chart-1", textClassName: "text-white" },
  { name: "chart-2", varName: "--chart-2", hex: "#8B9E7C", className: "bg-chart-2", textClassName: "text-white" },
  { name: "chart-3", varName: "--chart-3", hex: "#D4A574", className: "bg-chart-3", textClassName: "text-foreground" },
  { name: "chart-4", varName: "--chart-4", hex: "#C4956A", className: "bg-chart-4", textClassName: "text-foreground" },
  { name: "chart-5", varName: "--chart-5", hex: "#A67B5B", className: "bg-chart-5", textClassName: "text-white" },
];

const SIDEBAR = [
  { name: "sidebar", varName: "--sidebar", hex: "#FAF7F2", className: "bg-sidebar", textClassName: "text-sidebar-foreground" },
  { name: "sidebar-foreground", varName: "--sidebar-foreground", hex: "#3D3929", className: "bg-sidebar-foreground", textClassName: "text-sidebar" },
  { name: "sidebar-primary", varName: "--sidebar-primary", hex: "#2D5016", className: "bg-sidebar-primary", textClassName: "text-sidebar-primary-foreground" },
  { name: "sidebar-accent", varName: "--sidebar-accent", hex: "#E8E0D0", className: "bg-sidebar-accent", textClassName: "text-sidebar-accent-foreground" },
  { name: "sidebar-border", varName: "--sidebar-border", hex: "#D6CEBC", className: "bg-sidebar-border", textClassName: "text-foreground" },
  { name: "sidebar-ring", varName: "--sidebar-ring", hex: "#2D5016", className: "bg-sidebar-ring", textClassName: "text-white" },
];

export function ColorPaletteShowcase() {
  return (
    <StyleSection
      title="Paleta de Colores"
      description="Tokens semánticos del tema Zen/Kakebo definidos en globals.css."
    >
      <div className="space-y-4">
        <h3 className="font-heading text-lg font-medium">Semánticos</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {SEMANTIC.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <h3 className="font-heading text-lg font-medium">Charts</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {CHART.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <h3 className="font-heading text-lg font-medium">Sidebar</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {SIDEBAR.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </div>
      </div>
    </StyleSection>
  );
}
