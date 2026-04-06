import { useState, useRef, useEffect } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Bell,
  Check,
  Trash2,
  Edit,
  Copy,
  MoreHorizontal,
  Globe,
  Moon,
  Sun,
} from "lucide-react";

/* ─── Generic dropdown wrapper ───────────────────── */
function Dropdown({
  trigger,
  children,
  align = "left",
}: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const updateCoords = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY + 4,
      left: align === "right"
        ? rect.right + window.scrollX
        : rect.left + window.scrollX,
    });
  };

  const handleToggle = () => {
    if (!open) updateCoords();
    setOpen((p) => !p);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        menuRef.current  && !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative inline-block" ref={triggerRef}>
      <div onClick={handleToggle}>{trigger}</div>
      {open && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: coords.top,
            ...(align === "right"
              ? { right: `calc(100vw - ${coords.left}px)` }
              : { left: coords.left }),
            zIndex: 9999,
          }}
          className="min-w-[180px] rounded-xl border border-border bg-popover shadow-lg py-1"
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── Reusable menu items ────────────────────────── */
function MenuItem({
  icon,
  label,
  shortcut,
  destructive,
  checked,
  onClick,
}: {
  icon?: React.ReactNode;
  label: string;
  shortcut?: string;
  destructive?: boolean;
  checked?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-accent ${
        destructive ? "text-destructive" : "text-foreground"
      }`}
    >
      {checked !== undefined && (
        <Check className={`w-3.5 h-3.5 shrink-0 ${checked ? "opacity-100" : "opacity-0"}`} />
      )}
      {icon && <span className="w-4 h-4 shrink-0 flex items-center justify-center">{icon}</span>}
      <span className="flex-1 text-left">{label}</span>
      {shortcut && (
        <kbd className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded font-mono">
          {shortcut}
        </kbd>
      )}
    </button>
  );
}

function MenuSeparator() {
  return <div className="my-1 h-px bg-border mx-2" />;
}

function MenuLabel({ label }: { label: string }) {
  return (
    <p className="px-3 py-1.5 text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
  );
}

/* ─── Context menu ───────────────────────────────── */
function ContextMenu() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => setPos(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div
      ref={ref}
      onContextMenu={(e) => {
        e.preventDefault();
        setPos({ x: e.clientX, y: e.clientY });
      }}
      className="relative flex items-center justify-center w-full min-h-[100px] rounded-xl border-2 border-dashed border-border text-sm text-muted-foreground select-none cursor-context-menu hover:bg-accent/30 transition-colors"
    >
      Right-click anywhere in this area
      {pos && (
        <div
          className="fixed z-50 min-w-[160px] rounded-xl border border-border bg-popover shadow-lg py-1"
          style={{ top: pos.y, left: pos.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem icon={<Copy className="w-3.5 h-3.5" />} label="Copy" shortcut="⌘C" />
          <MenuItem icon={<Edit className="w-3.5 h-3.5" />} label="Edit" shortcut="⌘E" />
          <MenuSeparator />
          <MenuItem icon={<Trash2 className="w-3.5 h-3.5" />} label="Delete" destructive />
        </div>
      )}
    </div>
  );
}

/* ─── Checkmark menu ──────────────────────────────── */
function CheckableMenu() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  return (
    <Dropdown
      trigger={
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-accent transition-colors">
          {theme === "light" ? <Sun className="w-4 h-4" /> : theme === "dark" ? <Moon className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
          Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      }
    >
      <MenuLabel label="Appearance" />
      <MenuItem icon={<Sun className="w-3.5 h-3.5" />} label="Light" checked={theme === "light"} onClick={() => setTheme("light")} />
      <MenuItem icon={<Moon className="w-3.5 h-3.5" />} label="Dark" checked={theme === "dark"} onClick={() => setTheme("dark")} />
      <MenuItem icon={<Globe className="w-3.5 h-3.5" />} label="System" checked={theme === "system"} onClick={() => setTheme("system")} />
    </Dropdown>
  );
}

export function DropdownsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Dropdowns"
        description="Floating menus for actions, navigation, and contextual options."
        badge="Component"
      />

      <ComponentSection
        title="Basic Menu"
        description="Simple action menu with icons and keyboard shortcuts."
        code={`function Dropdown({ trigger, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block">
      <div onClick={() => setOpen(p => !p)}>{trigger}</div>
      {open && (
        <div className="absolute z-50 mt-1 min-w-[180px] rounded-xl border border-border bg-popover shadow-lg py-1">
          {children}
        </div>
      )}
    </div>
  );
}`}
      >
        <Dropdown
          trigger={
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity">
              Actions
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          }
        >
          <MenuItem icon={<Edit className="w-3.5 h-3.5" />} label="Edit" shortcut="⌘E" />
          <MenuItem icon={<Copy className="w-3.5 h-3.5" />} label="Duplicate" shortcut="⌘D" />
          <MenuSeparator />
          <MenuItem icon={<Trash2 className="w-3.5 h-3.5" />} label="Delete" destructive />
        </Dropdown>
      </ComponentSection>

      <ComponentSection
        title="Profile Menu"
        description="User account menu with avatar and grouped sections."
        code={`<Dropdown trigger={<button>Account <ChevronDown /></button>}>
  <div className="px-3 py-2">
    <p className="text-sm font-medium">Jane Smith</p>
    <p className="text-xs text-muted-foreground">jane@example.com</p>
  </div>
  <MenuSeparator />
  <MenuItem icon={<User />} label="Profile" />
  <MenuItem icon={<Settings />} label="Settings" />
  <MenuItem icon={<Bell />} label="Notifications" />
  <MenuSeparator />
  <MenuItem icon={<LogOut />} label="Sign out" destructive />
</Dropdown>`}
      >
        <Dropdown
          trigger={
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-accent transition-colors">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">
                JS
              </div>
              Jane Smith
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          }
        >
          <div className="px-3 py-2.5">
            <p className="text-sm text-foreground">Jane Smith</p>
            <p className="text-xs text-muted-foreground">jane@example.com</p>
          </div>
          <MenuSeparator />
          <MenuItem icon={<User className="w-3.5 h-3.5" />} label="Profile" />
          <MenuItem icon={<Settings className="w-3.5 h-3.5" />} label="Settings" shortcut="⌘," />
          <MenuItem icon={<Bell className="w-3.5 h-3.5" />} label="Notifications" />
          <MenuSeparator />
          <MenuItem icon={<LogOut className="w-3.5 h-3.5" />} label="Sign out" destructive />
        </Dropdown>
      </ComponentSection>

      <ComponentSection
        title="Checkable Menu"
        description="Selectable items with a checkmark to indicate the current selection."
        code={`const [theme, setTheme] = useState("system");

<MenuItem
  icon={<Sun />}
  label="Light"
  checked={theme === "light"}
  onClick={() => setTheme("light")}
/>`}
      >
        <CheckableMenu />
      </ComponentSection>

      <ComponentSection
        title="Icon Button Trigger"
        description="Compact three-dot menu for table rows and list items."
        code={`<Dropdown
  align="right"
  trigger={
    <button className="p-1.5 rounded-md hover:bg-accent">
      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
    </button>
  }
>`}
      >
        <Dropdown
          align="right"
          trigger={
            <button className="p-1.5 rounded-md border border-border hover:bg-accent transition-colors">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </button>
          }
        >
          <MenuItem icon={<Edit className="w-3.5 h-3.5" />} label="Edit" />
          <MenuItem icon={<Copy className="w-3.5 h-3.5" />} label="Copy link" />
          <MenuSeparator />
          <MenuItem icon={<Trash2 className="w-3.5 h-3.5" />} label="Delete" destructive />
        </Dropdown>
      </ComponentSection>

      <ComponentSection
        title="Context Menu"
        description="Right-click to reveal a contextual menu tied to a region."
        code={`<div onContextMenu={(e) => {
  e.preventDefault();
  setPos({ x: e.clientX, y: e.clientY });
}}>
  Right-click anywhere in this area
  {pos && (
    <div className="fixed z-50 ..." style={{ top: pos.y, left: pos.x }}>
      <MenuItem label="Copy" />
      <MenuItem label="Edit" />
      <MenuItem label="Delete" destructive />
    </div>
  )}
</div>`}
      >
        <div className="w-full">
          <ContextMenu />
        </div>
      </ComponentSection>
    </div>
  );
}