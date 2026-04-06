import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { CheckCircle, AlertCircle, Clock, Star, X } from "lucide-react";

type BadgeVariant = "default" | "secondary" | "success" | "warning" | "destructive" | "info" | "outline";

function Badge({
  children,
  variant = "default",
  dot,
  removable,
  icon,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  removable?: boolean;
  icon?: React.ReactNode;
}) {
  const variants: Record<BadgeVariant, string> = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    destructive: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    outline: "border border-border text-foreground bg-transparent",
  };

  const dots: Record<BadgeVariant, string> = {
    default: "bg-primary-foreground",
    secondary: "bg-secondary-foreground",
    success: "bg-green-600",
    warning: "bg-amber-500",
    destructive: "bg-red-600",
    info: "bg-blue-600",
    outline: "bg-foreground",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${variants[variant]}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dots[variant]}`} />
      )}
      {icon}
      {children}
      {removable && (
        <button className="ml-0.5 hover:opacity-70 transition-opacity">
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

export function BadgesPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Badges"
        description="Small labels for status, categories, counts, and metadata. Compact and informative."
        badge="Component"
      />

      <ComponentSection
        title="Variants"
        description="Different semantic colors to convey meaning at a glance."
        code={`<span className="px-2 py-0.5 rounded-full text-xs bg-primary text-primary-foreground">Default</span>
<span className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">Secondary</span>
<span className="px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">Success</span>
<span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800">Warning</span>
<span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">Destructive</span>
<span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700">Info</span>
<span className="px-2 py-0.5 rounded-full text-xs border border-border text-foreground">Outline</span>`}
      >
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </ComponentSection>

      <ComponentSection
        title="With Dot Indicator"
        description="Use a colored dot to reinforce status semantics."
        code={`<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
  <span className="w-1.5 h-1.5 rounded-full bg-green-600" /> Active
</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800">
  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending
</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-700">
  <span className="w-1.5 h-1.5 rounded-full bg-red-600" /> Failed
</span>`}
      >
        <Badge variant="success" dot>Active</Badge>
        <Badge variant="warning" dot>Pending</Badge>
        <Badge variant="destructive" dot>Failed</Badge>
        <Badge variant="info" dot>Processing</Badge>
        <Badge variant="secondary" dot>Offline</Badge>
      </ComponentSection>

      <ComponentSection
        title="With Icons"
        description="Pair a badge with a small icon for extra clarity."
        code={`<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
  <CheckCircle className="w-3 h-3" /> Verified
</span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800">
  <Clock className="w-3 h-3" /> In Review
</span>`}
      >
        <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>Verified</Badge>
        <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>In Review</Badge>
        <Badge variant="destructive" icon={<AlertCircle className="w-3 h-3" />}>Flagged</Badge>
        <Badge variant="default" icon={<Star className="w-3 h-3" />}>Featured</Badge>
      </ComponentSection>

      <ComponentSection
        title="Removable"
        description="Badges with a close button for tag-style interactions."
        code={`<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
  Design
  <button className="ml-0.5 hover:opacity-70"><X className="w-3 h-3" /></button>
</span>`}
      >
        <Badge variant="secondary" removable>Design</Badge>
        <Badge variant="info" removable>Engineering</Badge>
        <Badge variant="success" removable>Marketing</Badge>
        <Badge variant="outline" removable>Archived</Badge>
      </ComponentSection>

      <ComponentSection
        title="Counter Badges"
        description="Numeric badges for counts and notifications."
        code={`<div className="relative inline-block">
  <button className="px-4 py-2 rounded-lg border border-border text-sm">Inbox</button>
  <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-destructive text-white text-xs">4</span>
</div>`}
      >
        <div className="flex items-center gap-6">
          <div className="relative inline-block">
            <button className="px-4 py-2 rounded-lg border border-border text-sm text-foreground">Inbox</button>
            <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs">4</span>
          </div>
          <div className="relative inline-block">
            <button className="px-4 py-2 rounded-lg border border-border text-sm text-foreground">Messages</button>
            <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">12</span>
          </div>
          <div className="relative inline-block">
            <button className="px-4 py-2 rounded-lg border border-border text-sm text-foreground">Alerts</button>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-background" />
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
