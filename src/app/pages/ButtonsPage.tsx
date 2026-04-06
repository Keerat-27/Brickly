import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Loader2, Download, ArrowRight, Trash2, Plus, Heart } from "lucide-react";
import { useState } from "react";

function Btn({
  variant = "primary",
  size = "md",
  children,
  disabled,
  loading,
  icon,
  iconRight,
  rounded,
  onClick,
}: {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "success";
  size?: "xs" | "sm" | "md" | "lg";
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  rounded?: boolean;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

  const variants = {
    primary: "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-80 active:scale-[0.98]",
    outline: "border border-border bg-transparent text-foreground hover:bg-accent active:scale-[0.98]",
    ghost: "bg-transparent text-foreground hover:bg-accent active:scale-[0.98]",
    destructive: "bg-destructive text-destructive-foreground hover:opacity-90 active:scale-[0.98]",
    success: "bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]",
  };

  const sizes = {
    xs: "px-2.5 py-1 text-xs rounded-md",
    sm: "px-3 py-1.5 text-sm rounded-md",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-5 py-2.5 text-base rounded-xl",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${rounded ? "rounded-full" : ""}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon}
      {children}
      {!loading && iconRight}
    </button>
  );
}

export function ButtonsPage() {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-10">
      <PageHeader
        title="Buttons"
        description="Interactive button elements with multiple variants, sizes, and states to fit any use case."
        badge="Component"
      />

      <ComponentSection
        title="Variants"
        description="Six visual styles to communicate intent and hierarchy."
        code={`<button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">Primary</button>
<button className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm">Secondary</button>
<button className="px-4 py-2 rounded-lg border border-border text-foreground text-sm">Outline</button>
<button className="px-4 py-2 rounded-lg text-foreground hover:bg-accent text-sm">Ghost</button>
<button className="px-4 py-2 rounded-lg bg-destructive text-white text-sm">Destructive</button>
<button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm">Success</button>`}
      >
        <Btn variant="primary">Primary</Btn>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="outline">Outline</Btn>
        <Btn variant="ghost">Ghost</Btn>
        <Btn variant="destructive">Destructive</Btn>
        <Btn variant="success">Success</Btn>
      </ComponentSection>

      <ComponentSection
        title="Sizes"
        description="Four sizes for different contexts and hierarchies."
        code={`<button className="px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-xs">Extra Small</button>
<button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm">Small</button>
<button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">Medium</button>
<button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-base">Large</button>`}
      >
        <Btn size="xs">Extra Small</Btn>
        <Btn size="sm">Small</Btn>
        <Btn size="md">Medium</Btn>
        <Btn size="lg">Large</Btn>
      </ComponentSection>

      <ComponentSection
        title="With Icons"
        description="Pair buttons with icons to reinforce meaning."
        code={`<button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
  <Download className="w-4 h-4" /> Download
</button>
<button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
  Continue <ArrowRight className="w-4 h-4" />
</button>
<button className="p-2 rounded-lg bg-destructive text-white">
  <Trash2 className="w-4 h-4" />
</button>`}
      >
        <Btn icon={<Download className="w-4 h-4" />}>Download</Btn>
        <Btn iconRight={<ArrowRight className="w-4 h-4" />}>Continue</Btn>
        <Btn variant="outline" icon={<Plus className="w-4 h-4" />}>Add Item</Btn>
        <Btn variant="destructive" icon={<Trash2 className="w-4 h-4" />} />
        <Btn variant="ghost" icon={<Heart className="w-4 h-4" />} />
      </ComponentSection>

      <ComponentSection
        title="States"
        description="Disabled and loading states for asynchronous operations."
        code={`<button disabled className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm opacity-50 cursor-not-allowed">
  Disabled
</button>
<button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
  <Loader2 className="w-4 h-4 animate-spin" /> Loading…
</button>`}
      >
        <Btn disabled>Disabled</Btn>
        <Btn variant="outline" disabled>Disabled</Btn>
        <Btn loading onClick={handleLoad}>
          {loading ? "Loading…" : "Click to Load"}
        </Btn>
        <Btn variant="outline" loading={loading} onClick={handleLoad}>
          {loading ? "Loading…" : "Click to Load"}
        </Btn>
      </ComponentSection>

      <ComponentSection
        title="Rounded (Pill)"
        description="Fully rounded buttons for a softer look."
        code={`<button className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm">Primary</button>
<button className="px-4 py-2 rounded-full border border-border text-foreground text-sm">Outline</button>
<button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm">Secondary</button>`}
      >
        <Btn rounded>Primary</Btn>
        <Btn rounded variant="secondary">Secondary</Btn>
        <Btn rounded variant="outline">Outline</Btn>
        <Btn rounded variant="ghost">Ghost</Btn>
      </ComponentSection>
    </div>
  );
}
