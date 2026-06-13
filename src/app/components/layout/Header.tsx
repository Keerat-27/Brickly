import { Menu, Moon, Sun, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { navItems } from "./nav-config";
import { useRecentNavItems } from "./useRecentNavItems";

interface HeaderProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

interface ComponentSearchProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

const flatNavItems = navItems.flatMap((group) =>
  group.items.map((item) => ({ ...item, group: group.label })),
);

const ComponentSearch = ({ darkMode, onDarkModeToggle }: ComponentSearchProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { recent, recordVisit } = useRecentNavItems();

  const recentItems = useMemo(
    () =>
      recent
        .map((path) => flatNavItems.find((item) => item.to === path))
        .filter((item): item is (typeof flatNavItems)[number] => Boolean(item)),
    [recent],
  );

  const selectItem = useCallback(
    (to: string) => {
      recordVisit(to);
      navigate(to);
      setOpen(false);
    },
    [navigate, recordVisit],
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
            aria-label="Search components"
          >
            <Search className="w-4 h-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Search components (⌘K)</TooltipContent>
      </Tooltip>

      <CommandDialog open={open} onOpenChange={setOpen} title="Search components">
        <CommandInput placeholder="Search by name or route (e.g. /charts)…" />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          <CommandGroup heading="Theme">
            <CommandItem
              value={
                darkMode
                  ? "switch to light mode theme appearance"
                  : "switch to dark mode theme appearance"
              }
              keywords={["theme", "dark", "light", "appearance", "mode", "toggle"]}
              onSelect={() => {
                onDarkModeToggle();
                setOpen(false);
              }}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Moon className="w-4 h-4 text-muted-foreground" />
              )}
              {darkMode ? "Switch to light mode" : "Switch to dark mode"}
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          {recentItems.length > 0 && (
            <>
              <CommandGroup heading="Recent">
                {recentItems.map((item) => (
                  <CommandItem
                    key={`recent-${item.to}`}
                    value={`${item.label} ${item.to}`}
                    onSelect={() => selectItem(item.to)}
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    {item.label}
                    <CommandShortcut>{item.to}</CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}
          {navItems.map((group) => (
            <CommandGroup key={group.label} heading={group.label}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.to}
                  value={`${item.label} ${item.to}`}
                  keywords={[item.to.replace(/^\//, "")]}
                  onSelect={() => selectItem(item.to)}
                >
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  {item.label}
                  {item.to !== "/" && (
                    <CommandShortcut>{item.to}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
        <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
          <span>↑↓ navigate · Enter select · Esc close</span>
          <CommandShortcut>⌘K</CommandShortcut>
        </div>
      </CommandDialog>
    </>
  );
}

export const Header = ({
  onMenuClick,
  darkMode,
  onDarkModeToggle,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 h-14 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-accent text-muted-foreground"
          aria-label="Open navigation menu"
          aria-expanded={false}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <TooltipProvider>
        <div className="flex items-center gap-2">
          <ComponentSearch darkMode={darkMode} onDarkModeToggle={onDarkModeToggle} />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={onDarkModeToggle}
                className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {darkMode ? "Switch to light mode" : "Switch to dark mode"}
            </TooltipContent>
          </Tooltip>
          <div className="h-6 w-px bg-border" />
          <a
            href="https://github.com/Keerat-27/Brickly"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs hover:opacity-90 transition-opacity"
          >
            GitHub
          </a>
        </div>
      </TooltipProvider>
    </header>
  );
}
