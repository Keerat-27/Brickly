import { useEffect, useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../components/ui/command";
import {
  Calculator,
  Calendar,
  CreditCard,
  Loader2,
  Settings,
  Smile,
  User,
} from "lucide-react";

export const CommandPage = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setLoading(false), 1500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "p") {
        e.preventDefault();
        setDialogOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Command"
        description="Keyboard-first command palette built on cmdk — grouped actions, shortcuts, and empty states."
        badge="Component"
      />

      <ComponentSection
        title="Inline Command Menu"
        description="Embedded palette with grouped commands and keyboard shortcut hints."
        source="shadcn"
        shadcnComponent="command"
        code={`import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandShortcut } from "@/components/ui/command";

<Command className="rounded-lg border shadow-md max-w-md">
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandGroup heading="Suggestions">
      <CommandItem>
        <Calendar /> Calendar
        <CommandShortcut>⌘K</CommandShortcut>
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
      >
        <Command className="rounded-lg border shadow-md max-w-md">
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar className="text-muted-foreground" />
                Calendar
                <CommandShortcut>⌘K</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Smile className="text-muted-foreground" />
                Search emoji
              </CommandItem>
              <CommandItem>
                <Calculator className="text-muted-foreground" />
                Calculator
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User className="text-muted-foreground" />
                Profile
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard className="text-muted-foreground" />
                Billing
              </CommandItem>
              <CommandItem>
                <Settings className="text-muted-foreground" />
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ComponentSection>

      <ComponentSection
        title="Command Dialog"
        description="Modal palette — open with the button below or ⌘⇧P in this demo."
        source="shadcn"
        shadcnComponent="command"
        code={`import { CommandDialog, CommandInput, CommandList, CommandGroup, CommandItem } from "@/components/ui/command";

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Search commands…" />
  <CommandList>
    <CommandGroup heading="Recent">
      <CommandItem>Profile</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`}
      >
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          Open command dialog
          <CommandShortcut className="ml-2">⌘⇧P</CommandShortcut>
        </Button>

        <CommandDialog open={dialogOpen} onOpenChange={setDialogOpen} title="Commands">
          <CommandInput placeholder="Search commands…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Recent">
              <CommandItem onSelect={() => setDialogOpen(false)}>
                <User className="text-muted-foreground" />
                Profile
              </CommandItem>
              <CommandItem onSelect={() => setDialogOpen(false)}>
                <Settings className="text-muted-foreground" />
                Settings
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => setDialogOpen(false)}>
                <Calendar className="text-muted-foreground" />
                Schedule meeting
              </CommandItem>
              <CommandItem onSelect={() => setDialogOpen(false)}>
                <CreditCard className="text-muted-foreground" />
                View billing
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
            <span>Navigate with ↑↓ · Enter to select · Esc to close</span>
          </div>
        </CommandDialog>
      </ComponentSection>

      <ComponentSection
        title="Empty State"
        description="Shown when the filter matches no commands."
        source="shadcn"
        shadcnComponent="command"
        code={`<CommandInput placeholder="Try typing xyz…" />
<CommandList>
  <CommandEmpty>No results found.</CommandEmpty>
</CommandList>`}
      >
        <Command className="rounded-lg border max-w-md">
          <CommandInput placeholder="Try typing xyz…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Commands">
              <CommandItem>
                <Settings className="text-muted-foreground" />
                Settings
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ComponentSection>

      <ComponentSection
        title="Loading State"
        description="Placeholder while async commands are fetched."
        source="shadcn"
        shadcnComponent="command"
        code={`{loading ? (
  <div className="flex items-center gap-2 p-6 text-sm text-muted-foreground">
    <Loader2 className="animate-spin" /> Loading commands…
  </div>
) : (
  <CommandGroup heading="Ready">
    <CommandItem>Settings</CommandItem>
  </CommandGroup>
)}`}
      >
        <Command className="rounded-lg border max-w-md">
          <CommandInput placeholder="Search…" disabled={loading} />
          <CommandList>
            {loading ? (
              <div className="flex items-center gap-2 p-6 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading commands…
              </div>
            ) : (
              <CommandGroup heading="Ready">
                <CommandItem>
                  <Settings className="text-muted-foreground" />
                  Settings
                </CommandItem>
                <CommandItem>
                  <User className="text-muted-foreground" />
                  Profile
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </ComponentSection>
    </div>
  );
};
