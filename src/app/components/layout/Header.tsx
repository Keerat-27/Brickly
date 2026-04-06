import { Menu, Moon, Sun, Search } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export function Header({ onMenuClick, darkMode, onDarkModeToggle }: HeaderProps) {
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 h-14 border-b border-border bg-background/95 backdrop-blur-sm">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-accent text-muted-foreground"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-2 h-8 w-56 px-3 rounded-md border border-border bg-muted text-muted-foreground text-sm">
          <Search className="w-3.5 h-3.5 shrink-0" />
          <input
            type="text"
            placeholder="Search components…"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-transparent outline-none w-full placeholder:text-muted-foreground text-foreground"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <button
          onClick={onDarkModeToggle}
          className="p-2 rounded-md hover:bg-accent text-muted-foreground transition-colors"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
        <div className="h-6 w-px bg-border" />
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-xs hover:opacity-90 transition-opacity"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
