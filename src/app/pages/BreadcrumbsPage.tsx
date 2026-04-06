import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { ChevronRight, Home, Slash, MoreHorizontal } from "lucide-react";

/* ─── Types ──────────────────────────────────────── */
type Crumb = { label: string; href?: string };

/* ─── Variants ───────────────────────────────────── */
function Breadcrumb({ crumbs, separator = "chevron" }: { crumbs: Crumb[]; separator?: "chevron" | "slash" | "dot" }) {
  const Sep = () => {
    if (separator === "slash") return <Slash className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />;
    if (separator === "dot")   return <span className="w-1 h-1 rounded-full bg-muted-foreground/40 shrink-0" />;
    return <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />;
  };

  return (
    <nav className="flex items-center gap-1.5 text-sm flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <Sep />}
          {crumb.href && i < crumbs.length - 1 ? (
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{crumb.label}</a>
          ) : (
            <span className={i === crumbs.length - 1 ? "text-foreground" : "text-muted-foreground"}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function HomeBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm flex-wrap">
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
        <Home className="w-3.5 h-3.5" />
      </a>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
          {crumb.href && i < crumbs.length - 1 ? (
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{crumb.label}</a>
          ) : (
            <span className={i === crumbs.length - 1 ? "text-foreground" : "text-muted-foreground"}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

function CollapsedBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  const first = crumbs[0];
  const last  = crumbs[crumbs.length - 1];
  return (
    <nav className="flex items-center gap-1.5 text-sm flex-wrap">
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{first.label}</a>
      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
      <button className="flex items-center justify-center w-6 h-6 rounded border border-border hover:bg-accent transition-colors">
        <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
      <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
      <span className="text-foreground">{last.label}</span>
    </nav>
  );
}

function BadgeBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm flex-wrap">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />}
          {i < crumbs.length - 1 ? (
            <a
              href="#"
              className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground hover:bg-accent hover:text-foreground transition-colors text-xs"
            >
              {crumb.label}
            </a>
          ) : (
            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Breadcrumbs" },
];

const longCrumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
  { label: "Navigation", href: "/navigation" },
  { label: "Breadcrumbs" },
];

export function BreadcrumbsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Breadcrumbs"
        description="Navigational aids that show the current page's location in a hierarchy."
        badge="Component"
      />

      <ComponentSection
        title="Default"
        description="Simple chevron-separated breadcrumb trail."
        code={`<nav className="flex items-center gap-1.5 text-sm">
  <a href="/" className="text-muted-foreground hover:text-foreground">Home</a>
  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
  <a href="/components" className="text-muted-foreground hover:text-foreground">Components</a>
  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
  <span className="text-foreground">Breadcrumbs</span>
</nav>`}
      >
        <Breadcrumb crumbs={crumbs} />
      </ComponentSection>

      <ComponentSection
        title="Separators"
        description="Swap the separator for slash or dot styles."
        code={`{/* Chevron */}
<ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />

{/* Slash */}
<Slash className="w-3.5 h-3.5 text-muted-foreground/60" />

{/* Dot */}
<span className="w-1 h-1 rounded-full bg-muted-foreground/40" />`}
      >
        <div className="space-y-4 w-full">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Chevron</p>
            <Breadcrumb crumbs={crumbs} separator="chevron" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Slash</p>
            <Breadcrumb crumbs={crumbs} separator="slash" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Dot</p>
            <Breadcrumb crumbs={crumbs} separator="dot" />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Home Icon"
        description="Replace the first text label with a home icon."
        code={`<nav className="flex items-center gap-1.5 text-sm">
  <a href="/" className="text-muted-foreground hover:text-foreground">
    <Home className="w-3.5 h-3.5" />
  </a>
  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
  <a href="/components" className="text-muted-foreground hover:text-foreground">Components</a>
  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60" />
  <span className="text-foreground">Breadcrumbs</span>
</nav>`}
      >
        <HomeBreadcrumb crumbs={crumbs.slice(1)} />
      </ComponentSection>

      <ComponentSection
        title="Collapsed (Ellipsis)"
        description="For deep paths, collapse middle items behind a … button."
        code={`<nav className="flex items-center gap-1.5 text-sm">
  <a href="/">Home</a>
  <ChevronRight className="w-3.5 h-3.5" />
  <button className="w-6 h-6 rounded border border-border hover:bg-accent">
    <MoreHorizontal className="w-3.5 h-3.5" />
  </button>
  <ChevronRight className="w-3.5 h-3.5" />
  <span>Breadcrumbs</span>
</nav>`}
      >
        <CollapsedBreadcrumb crumbs={longCrumbs} />
      </ComponentSection>

      <ComponentSection
        title="Badge Style"
        description="Pill-shaped crumbs for a more visual appearance."
        code={`{/* Inactive crumb */}
<a className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground hover:bg-accent text-xs">
  Components
</a>

{/* Active crumb */}
<span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
  Breadcrumbs
</span>`}
      >
        <BadgeBreadcrumb crumbs={crumbs} />
      </ComponentSection>
    </div>
  );
}
