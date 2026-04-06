import { NavLink } from "react-router";
import {
  LayoutGrid,
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
  X,
  Sparkles,
  ChevronDown,
  Navigation,
  Menu,
  SlidersHorizontal,
  ChevronRight,
  BellRing,
  ListOrdered,
} from "lucide-react";

const navItems = [
  {
    label: "Getting Started",
    items: [
      { to: "/", label: "Overview", icon: LayoutGrid, end: true },
    ],
  },
  {
    label: "Components",
    items: [
      { to: "/accordion",   label: "Accordion",   icon: ChevronDown },
      { to: "/alerts",      label: "Alerts",       icon: Bell },
      { to: "/avatars",     label: "Avatars",      icon: User },
      { to: "/badges",      label: "Badges",       icon: Tag },
      { to: "/breadcrumbs", label: "Breadcrumbs",  icon: Navigation },
      { to: "/buttons",     label: "Buttons",      icon: Square },
      { to: "/cards",       label: "Cards",        icon: CreditCard },
      { to: "/dropdowns",   label: "Dropdowns",    icon: Menu },
      { to: "/forms",       label: "Forms",        icon: FormInput },
      { to: "/loading",     label: "Loading",      icon: Loader },
      { to: "/modals",      label: "Modals",       icon: Layers },
      { to: "/pagination",  label: "Pagination",   icon: ChevronRight },
      { to: "/progress",    label: "Progress",     icon: Activity },
      { to: "/sliders",     label: "Sliders",      icon: SlidersHorizontal },
      { to: "/stepper",     label: "Stepper",      icon: ListOrdered },
      { to: "/tables",      label: "Tables",       icon: Table2 },
      { to: "/tabs",        label: "Tabs",         icon: Grid3x3 },
      { to: "/toasts",      label: "Toasts",       icon: BellRing },
      { to: "/tooltips",    label: "Tooltips",     icon: MessageSquare },
      { to: "/typography",  label: "Typography",   icon: Type },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-30 w-64 flex flex-col border-r border-border bg-background
        transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 h-14 shrink-0 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              UIKit
            </span>
            <span className="text-xs text-muted-foreground ml-1">v1.0</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-md hover:bg-accent text-muted-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navItems.map((group) => (
          <div key={group.label}>
            <p className="px-2 mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`
                    }
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Built with Tailwind CSS & React
        </p>
      </div>
    </aside>
  );
}