import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuShortcut,
} from "../components/ui/dropdown-menu";
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Bell,
  Trash2,
  Edit,
  Copy,
  MoreHorizontal,
  Globe,
  Moon,
  Sun,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

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
          className="fixed z-50 min-w-[160px] rounded-xl border border-border bg-popover shadow-lg py-1 px-1"
          style={{ top: pos.y, left: pos.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <DropdownMenuItem className="gap-2"><Copy className="w-3.5 h-3.5" /> Copy<DropdownMenuShortcut>⌘C</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuItem className="gap-2"><Edit className="w-3.5 h-3.5" /> Edit<DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" className="gap-2"><Trash2 className="w-3.5 h-3.5" /> Delete</DropdownMenuItem>
        </div>
      )}
    </div>
  );
}

function ThemeDropdown() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {theme === "light" ? <Sun className="w-4 h-4" /> : theme === "dark" ? <Moon className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
          Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuCheckboxItem checked={theme === "light"} onCheckedChange={() => setTheme("light")}>
          <Sun className="w-3.5 h-3.5" /> Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === "dark"} onCheckedChange={() => setTheme("dark")}>
          <Moon className="w-3.5 h-3.5" /> Dark
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={theme === "system"} onCheckedChange={() => setTheme("system")}>
          <Globe className="w-3.5 h-3.5" /> System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
        code={`import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button>Actions <ChevronDown /></Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem><Edit /> Edit <DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuItem><Copy /> Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><Trash2 /> Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              Actions <ChevronDown className="w-3.5 h-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Edit className="w-3.5 h-3.5" /> Edit <DropdownMenuShortcut>⌘E</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><Copy className="w-3.5 h-3.5" /> Duplicate <DropdownMenuShortcut>⌘D</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive"><Trash2 className="w-3.5 h-3.5" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentSection>

      <ComponentSection
        title="Profile Menu"
        description="User account menu with avatar and grouped sections."
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">JS</div>
      Jane Smith <ChevronDown />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>Jane Smith</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><User /> Profile</DropdownMenuItem>
    <DropdownMenuItem><Settings /> Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive"><LogOut /> Sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground">JS</div>
              Jane Smith <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="px-2 py-2">
              <p className="text-sm font-medium text-foreground">Jane Smith</p>
              <p className="text-xs text-muted-foreground">jane@example.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User className="w-3.5 h-3.5" /> Profile</DropdownMenuItem>
            <DropdownMenuItem><Settings className="w-3.5 h-3.5" /> Settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut></DropdownMenuItem>
            <DropdownMenuItem><Bell className="w-3.5 h-3.5" /> Notifications</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive"><LogOut className="w-3.5 h-3.5" /> Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentSection>

      <ComponentSection
        title="Checkable Menu"
        description="Selectable items with a checkmark to indicate the current selection."
        code={`import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

<DropdownMenuCheckboxItem checked={theme === "light"} onCheckedChange={() => setTheme("light")}>
  <Sun /> Light
</DropdownMenuCheckboxItem>`}
      >
        <ThemeDropdown />
      </ComponentSection>

      <ComponentSection
        title="Icon Button Trigger"
        description="Compact three-dot menu for table rows and list items."
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="icon">
      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Copy link</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Edit className="w-3.5 h-3.5" /> Edit</DropdownMenuItem>
            <DropdownMenuItem><Copy className="w-3.5 h-3.5" /> Copy link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive"><Trash2 className="w-3.5 h-3.5" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
    <div className="fixed z-50" style={{ top: pos.y, left: pos.x }}>
      <DropdownMenuItem>Copy</DropdownMenuItem>
      <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
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
