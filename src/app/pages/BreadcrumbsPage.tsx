import { Fragment } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../components/ui/breadcrumb";
import { Home, Slash } from "lucide-react";

type Crumb = { label: string; href?: string };

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

function DefaultBreadcrumb({ crumbs, separator }: { crumbs: Crumb[]; separator?: "slash" | "dot" }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, i) => (
          <Fragment key={i}>
            <BreadcrumbItem>
              {i < crumbs.length - 1 ? (
                <BreadcrumbLink href="#">{crumb.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {i < crumbs.length - 1 && (
              <BreadcrumbSeparator>
                {separator === "slash" && <Slash className="w-3.5 h-3.5" />}
                {separator === "dot" && <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />}
              </BreadcrumbSeparator>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function HomeBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">
            <Home className="w-3.5 h-3.5" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {crumbs.map((crumb, i) => (
          <Fragment key={i}>
            <BreadcrumbItem>
              {i < crumbs.length - 1 ? (
                <BreadcrumbLink href="#">{crumb.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
            {i < crumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function CollapsedBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  const first = crumbs[0];
  const last = crumbs[crumbs.length - 1];
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">{first.label}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{last.label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function BadgeBreadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {crumbs.map((crumb, i) => (
          <Fragment key={i}>
            <BreadcrumbItem>
              {i < crumbs.length - 1 ? (
                <BreadcrumbLink
                  href="#"
                  className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground hover:bg-accent hover:text-foreground text-xs no-underline"
                >
                  {crumb.label}
                </BreadcrumbLink>
              ) : (
                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs">
                  {crumb.label}
                </span>
              )}
            </BreadcrumbItem>
            {i < crumbs.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

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
        code={`import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
      <BreadcrumbSeparator />
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
      <BreadcrumbSeparator />
    </BreadcrumbItem>
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumbs</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`}
      >
        <DefaultBreadcrumb crumbs={crumbs} />
      </ComponentSection>

      <ComponentSection
        title="Separators"
        description="Swap the separator for slash or dot styles."
        code={`{/* Chevron (default) */}
<BreadcrumbSeparator />

{/* Slash */}
<BreadcrumbSeparator>
  <Slash className="w-3.5 h-3.5" />
</BreadcrumbSeparator>

{/* Dot */}
<BreadcrumbSeparator>
  <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
</BreadcrumbSeparator>`}
      >
        <div className="space-y-4 w-full">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Chevron</p>
            <DefaultBreadcrumb crumbs={crumbs} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Slash</p>
            <DefaultBreadcrumb crumbs={crumbs} separator="slash" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Dot</p>
            <DefaultBreadcrumb crumbs={crumbs} separator="dot" />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Home Icon"
        description="Replace the first text label with a home icon."
        code={`<BreadcrumbItem>
  <BreadcrumbLink href="/">
    <Home className="w-3.5 h-3.5" />
  </BreadcrumbLink>
  <BreadcrumbSeparator />
</BreadcrumbItem>`}
      >
        <HomeBreadcrumb crumbs={crumbs.slice(1)} />
      </ComponentSection>

      <ComponentSection
        title="Collapsed (Ellipsis)"
        description="For deep paths, collapse middle items behind a … button."
        code={`import { BreadcrumbEllipsis } from "@/components/ui/breadcrumb";

<BreadcrumbItem>
  <BreadcrumbEllipsis />
  <BreadcrumbSeparator />
</BreadcrumbItem>`}
      >
        <CollapsedBreadcrumb crumbs={longCrumbs} />
      </ComponentSection>

      <ComponentSection
        title="Badge Style"
        description="Pill-shaped crumbs for a more visual appearance."
        code={`{/* Inactive crumb */}
<BreadcrumbLink
  href="#"
  className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground hover:bg-accent text-xs"
>
  Components
</BreadcrumbLink>

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
