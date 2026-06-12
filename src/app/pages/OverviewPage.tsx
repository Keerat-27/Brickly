import { Link } from "react-router";
import {
  Square,
  Tag,
  Bell,
  User,
  CreditCard,
  FormInput,
  Activity,
  Layers,
  Grid3x3,
  Table2,
  Loader,
  Type,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  Navigation,
  Menu,
  SlidersHorizontal,
  ChevronRight,
  BellRing,
  ListOrdered,
  CalendarDays,
  Palette,
  BarChart3,
  Terminal,
  PanelLeft,
  KeyRound,
  Columns2,
  GalleryHorizontal,
} from "lucide-react";

const components = [
  { to: "/tokens",     label: "Design Tokens", icon: Palette,          description: "Colors, radius, typography tokens", count: 5 },
  { to: "/accordion",   label: "Accordion",   icon: ChevronDown,      description: "Collapsible sections, FAQ, flush",   count: 4 },
  { to: "/alerts",      label: "Alerts",       icon: Bell,             description: "Info, success, warning, error",     count: 5 },
  { to: "/avatars",     label: "Avatars",      icon: User,             description: "Image, initials, groups",           count: 5 },
  { to: "/badges",      label: "Badges",       icon: Tag,              description: "Status, label, color variants",     count: 6 },
  { to: "/breadcrumbs", label: "Breadcrumbs",  icon: Navigation,       description: "Separators, home icon, collapsed",  count: 5 },
  { to: "/buttons",     label: "Buttons",      icon: Square,           description: "Variants, sizes, states",           count: 8 },
  { to: "/cards",       label: "Cards",        icon: CreditCard,       description: "shadcn Card layouts and compositions", count: 6 },
  { to: "/carousel",    label: "Carousel",     icon: GalleryHorizontal,description: "Image, card, and autoplay sliders", count: 3 },
  { to: "/charts",      label: "Charts",       icon: BarChart3,        description: "Bar, line, area, pie with live data", count: 5 },
  { to: "/command",     label: "Command",      icon: Terminal,         description: "Palette, groups, empty and loading", count: 4 },
  { to: "/date-picker", label: "Date Picker", icon: CalendarDays,     description: "Inline, popover, range, disabled",  count: 6 },
  { to: "/dropdowns",   label: "Dropdowns",    icon: Menu,             description: "Menu, profile, context, checkable", count: 5 },
  { to: "/forms",       label: "Forms",        icon: FormInput,        description: "Inputs, checkboxes, selects, toggles", count: 7 },
  { to: "/loading",     label: "Loading",      icon: Loader,           description: "Spinner, skeleton, dots",           count: 4 },
  { to: "/modals",      label: "Modals",       icon: Layers,           description: "Dialog, drawer, confirm",           count: 3 },
  { to: "/otp",         label: "OTP Input",    icon: KeyRound,         description: "Split digits, masked, validation",  count: 5 },
  { to: "/pagination",  label: "Pagination",   icon: ChevronRight,     description: "shadcn Pagination, full controls",  count: 3 },
  { to: "/progress",    label: "Progress",     icon: Activity,         description: "Bar, circular, steps",              count: 4 },
  { to: "/resizable",   label: "Resizable",    icon: Columns2,         description: "Horizontal, vertical, constraints", count: 3 },
  { to: "/sidebar",     label: "Sidebar",      icon: PanelLeft,        description: "Collapsible, icon, floating variants", count: 3 },
  { to: "/sliders",     label: "Sliders",      icon: SlidersHorizontal,description: "Basic, range, ticks, colors",       count: 6 },
  { to: "/stepper",     label: "Stepper",      icon: ListOrdered,      description: "Horizontal, vertical, wizard",      count: 4 },
  { to: "/tables",      label: "Tables",       icon: Table2,           description: "Basic, striped, sortable",          count: 3 },
  { to: "/tabs",        label: "Tabs",         icon: Grid3x3,          description: "Default, pills, vertical",          count: 3 },
  { to: "/toasts",      label: "Toasts",       icon: BellRing,         description: "Sonner types, actions, promises",   count: 5 },
  { to: "/tooltips",    label: "Tooltips",     icon: MessageSquare,    description: "Hover, click, positions",           count: 3 },
  { to: "/typography",  label: "Typography",   icon: Type,             description: "Headings, body, code",              count: 6 },
];

const stats = [
  { label: "Pages", value: "28" },
  { label: "Variants",   value: "120+" },
  { label: "Dark Mode",  value: "✓" },
  { label: "TypeScript", value: "✓" },
];

export const OverviewPage = () => {
  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Fully accessible & customizable
        </div>
        <h1 className="text-4xl tracking-tight text-foreground mb-3">
          Brickly Component Library
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          A browsable design-system reference of accessible React components built with shadcn/ui
          patterns and Tailwind CSS. Preview variants, copy snippets, and customize for your project.
          Press{" "}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-mono">
            ⌘K
          </kbd>{" "}
          anywhere to jump to a component.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link
            to={components[0].to}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity"
          >
            Browse Components
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://github.com/Keerat-27/Brickly"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-accent transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-muted/30 px-5 py-4"
          >
            <div className="text-2xl text-foreground">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Copy workflow */}
      <div className="mb-12 rounded-xl border border-border bg-muted/20 p-6">
        <h2 className="text-foreground mb-2">Using snippets in your project</h2>
        <p className="text-sm text-muted-foreground max-w-2xl mb-4">
          Every component page includes Preview and Code tabs. Open the Code tab to copy
          runnable examples into your own app.
        </p>
        <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
          <li>
            <span className="text-foreground">Copy the example</span> — click{" "}
            <span className="font-medium text-foreground">Copy code</span> to grab the
            snippet shown in the Code tab.
          </li>
          <li>
            <span className="text-foreground">Install the primitive</span> — shadcn demos
            show a CLI strip at the top of the Code tab (e.g.{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
              npx shadcn@latest add button
            </code>
            ). Click it to copy the install command.
          </li>
          <li>
            <span className="text-foreground">Check the source badge</span> —{" "}
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              shadcn
            </span>{" "}
            sections map to the registry;{" "}
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              composition
            </span>{" "}
            and{" "}
            <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              custom
            </span>{" "}
            demos are built from tokens and primitives in this repo.
          </li>
        </ol>
      </div>

      {/* Components grid */}
      <div>
        <h2 className="text-foreground mb-6">All Components</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {components.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-accent/50 transition-all"
            >
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}