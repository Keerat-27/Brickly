import { Menu, Moon, Sun, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { navItems } from "./nav-config";

interface HeaderProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

const ComponentSearch = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const selectItem = useCallback(
    (to: string) => {
      navigate(to);
      setOpen(false);
    },
    [navigate],
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
        <CommandInput placeholder="Search components…" />
        <CommandList>
          <CommandEmpty>No components found.</CommandEmpty>
          {navItems.map((group) => (
            <CommandGroup key={group.label} heading={group.label}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.to}
                  value={item.label}
                  onSelect={() => selectItem(item.to)}
                >
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export const Header = ({ onMenuClick, darkMode, onDarkModeToggle }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 h-14 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-accent text-muted-foreground"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <TooltipProvider>
        <div className="flex items-center gap-2">
          <ComponentSearch />
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
