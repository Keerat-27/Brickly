import { Link } from "react-router";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Separator } from "../components/ui/separator";

type TokenSwatch = {
  name: string;
  variable: string;
  tailwind: string;
  className: string;
};

const semanticColors: TokenSwatch[] = [
  { name: "Background", variable: "--background", tailwind: "bg-background", className: "bg-background border" },
  { name: "Foreground", variable: "--foreground", tailwind: "text-foreground", className: "bg-foreground" },
  { name: "Primary", variable: "--primary", tailwind: "bg-primary", className: "bg-primary" },
  { name: "Secondary", variable: "--secondary", tailwind: "bg-secondary", className: "bg-secondary" },
  { name: "Muted", variable: "--muted", tailwind: "bg-muted", className: "bg-muted" },
  { name: "Accent", variable: "--accent", tailwind: "bg-accent", className: "bg-accent" },
  { name: "Destructive", variable: "--destructive", tailwind: "bg-destructive", className: "bg-destructive" },
  { name: "Card", variable: "--card", tailwind: "bg-card", className: "bg-card border" },
  { name: "Border", variable: "--border", tailwind: "border-border", className: "bg-border" },
];

const chartColors: TokenSwatch[] = [
  { name: "Chart 1", variable: "--chart-1", tailwind: "bg-chart-1", className: "bg-chart-1" },
  { name: "Chart 2", variable: "--chart-2", tailwind: "bg-chart-2", className: "bg-chart-2" },
  { name: "Chart 3", variable: "--chart-3", tailwind: "bg-chart-3", className: "bg-chart-3" },
  { name: "Chart 4", variable: "--chart-4", tailwind: "bg-chart-4", className: "bg-chart-4" },
  { name: "Chart 5", variable: "--chart-5", tailwind: "bg-chart-5", className: "bg-chart-5" },
];

const sidebarColors: TokenSwatch[] = [
  { name: "Sidebar", variable: "--sidebar", tailwind: "bg-sidebar", className: "bg-sidebar border" },
  { name: "Sidebar Foreground", variable: "--sidebar-foreground", tailwind: "text-sidebar-foreground", className: "bg-sidebar-foreground" },
  { name: "Sidebar Primary", variable: "--sidebar-primary", tailwind: "bg-sidebar-primary", className: "bg-sidebar-primary" },
  { name: "Sidebar Accent", variable: "--sidebar-accent", tailwind: "bg-sidebar-accent", className: "bg-sidebar-accent" },
  { name: "Sidebar Border", variable: "--sidebar-border", tailwind: "border-sidebar-border", className: "bg-sidebar-border" },
];

const radiusTokens = [
  { name: "Small", variable: "--radius-sm", tailwind: "rounded-sm", example: "rounded-sm" },
  { name: "Medium", variable: "--radius-md", tailwind: "rounded-md", example: "rounded-md" },
  { name: "Large", variable: "--radius-lg", tailwind: "rounded-lg", example: "rounded-lg" },
  { name: "Extra Large", variable: "--radius-xl", tailwind: "rounded-xl", example: "rounded-xl" },
];

const typographyTokens = [
  { name: "Base font size", variable: "--font-size", value: "16px", tailwind: "text-base" },
  { name: "Medium weight", variable: "--font-weight-medium", value: "500", tailwind: "font-medium" },
  { name: "Normal weight", variable: "--font-weight-normal", value: "400", tailwind: "font-normal" },
];

const TokenGrid = ({ tokens }: { tokens: TokenSwatch[] }) => (
  <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {tokens.map((token) => (
      <div
        key={token.variable}
        className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
      >
        <div className={`size-10 shrink-0 rounded-lg border border-border ${token.className}`} />
        <div className="min-w-0 flex-1">
          <p className="text-sm text-foreground">{token.name}</p>
          <p className="font-mono text-xs text-muted-foreground">{token.variable}</p>
          <p className="font-mono text-xs text-primary">{token.tailwind}</p>
        </div>
      </div>
    ))}
  </div>
);

export const TokensPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Design Tokens"
        description={
          <>
            Semantic colors, spacing, and typography from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">src/styles/theme.css</code>.
            Toggle dark mode in the header to preview both themes. See also the{" "}
            <Link to="/typography" className="text-primary hover:underline">
              Typography
            </Link>{" "}
            page for usage examples.
          </>
        }
        badge="Reference"
      />

      <ComponentSection
        title="Semantic Colors"
        description="Core palette tokens mapped to Tailwind utilities. Values update automatically in dark mode."
        source="custom"
        code={`/* src/styles/theme.css */
:root {
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: #030213;
  --destructive: #d4183d;
}

/* Usage */
<div className="bg-background text-foreground" />
<button className="bg-primary text-primary-foreground" />`}
      >
        <TokenGrid tokens={semanticColors} />
      </ComponentSection>

      <ComponentSection
        title="Chart Colors"
        description="Five chart accent colors for data visualization."
        source="custom"
        code={`<div className="bg-chart-1" />
<div className="bg-chart-2" />
{/* --chart-1 through --chart-5 in theme.css */}`}
      >
        <TokenGrid tokens={chartColors} />
      </ComponentSection>

      <ComponentSection
        title="Sidebar Colors"
        description="Tokens for navigation shells and the shadcn Sidebar primitive."
        source="custom"
        code={`<aside className="bg-sidebar text-sidebar-foreground border-sidebar-border" />
<button className="bg-sidebar-primary text-sidebar-primary-foreground" />`}
      >
        <TokenGrid tokens={sidebarColors} />
      </ComponentSection>

      <ComponentSection
        title="Border Radius"
        description="Radius scale derived from the base --radius token."
        source="custom"
        code={`:root { --radius: 0.625rem; }
/* Tailwind maps: */
.rounded-sm  /* --radius-sm */
.rounded-md  /* --radius-md */
.rounded-lg  /* --radius-lg */
.rounded-xl  /* --radius-xl */`}
      >
        <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
          {radiusTokens.map((token) => (
            <div key={token.variable} className="space-y-2 text-center">
              <div className={`mx-auto size-16 border-2 border-primary bg-muted ${token.example}`} />
              <p className="text-sm text-foreground">{token.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{token.variable}</p>
              <p className="font-mono text-xs text-primary">{token.tailwind}</p>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection
        title="Typography"
        description="Font size and weight tokens. Pair with Tailwind text utilities on the Typography page."
        source="custom"
        code={`:root {
  --font-size: 16px;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
}

<p className="text-base font-medium">Medium body text</p>`}
      >
        <div className="w-full space-y-4">
          {typographyTokens.map((token) => (
            <div
              key={token.variable}
              className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-4"
            >
              <div>
                <p className="text-sm text-foreground">{token.name}</p>
                <p className="font-mono text-xs text-muted-foreground">{token.variable}</p>
                <p className="font-mono text-xs text-primary">{token.tailwind}</p>
              </div>
              <p className={`text-foreground ${token.tailwind}`} style={{ fontWeight: token.name.includes("weight") ? token.value : undefined }}>
                The quick brown fox
              </p>
            </div>
          ))}
          <Separator />
          <p className="text-sm text-muted-foreground">
            Heading and body examples live on the{" "}
            <Link to="/typography" className="text-primary hover:underline">
              Typography
            </Link>{" "}
            page.
          </p>
        </div>
      </ComponentSection>
    </div>
  );
}
