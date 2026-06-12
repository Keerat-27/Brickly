import { useState } from "react";
import {
  Home,
  Inbox,
  Search,
  Settings,
  ChevronRight,
  PanelLeft,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { cn } from "../components/ui/utils";

type SidebarVariant = "sidebar" | "floating" | "inset";
type SidebarCollapsible = "offcanvas" | "icon" | "none";

const demoNav = [
  { label: "Home", icon: Home },
  { label: "Inbox", icon: Inbox },
  { label: "Search", icon: Search },
  { label: "Settings", icon: Settings },
];

const SidebarDemo = ({
  variant,
  collapsible,
}: {
  variant: SidebarVariant;
  collapsible: SidebarCollapsible;
}) => (
  <div className="relative h-[420px] overflow-hidden rounded-xl border bg-background [&_[data-slot=sidebar-container]]:!absolute [&_[data-slot=sidebar-container]]:!h-full">
    <SidebarProvider defaultOpen>
      <Sidebar variant={variant} collapsible={collapsible}>
        <SidebarHeader className="border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
              B
            </div>
            <span className="truncate text-sm font-medium group-data-[collapsible=icon]:hidden">
              Brickly
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {demoNav.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Account">
                <Settings />
                <span>Account</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">Demo workspace</span>
        </header>
        <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
          Main content area — toggle the sidebar with the trigger or ⌘B
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
);

export const SidebarPage = () => {
  const [variant, setVariant] = useState<SidebarVariant>("sidebar");
  const [collapsible, setCollapsible] = useState<SidebarCollapsible>("icon");

  return (
    <div className="space-y-10">
      <PageHeader
        title="Sidebar"
        description="shadcn sidebar primitive with collapsible, icon-only, and floating variants — compared to the custom doc layout sidebar."
        badge="Component"
      />

      <ComponentSection
        title="Interactive Demo"
        description="Switch variant and collapsible mode, then use the trigger to collapse."
        source="shadcn"
        shadcnComponent="sidebar"
        code={`import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";

<SidebarProvider>
  <Sidebar variant="floating" collapsible="icon">
    <SidebarContent>...</SidebarContent>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    <main>...</main>
  </SidebarInset>
</SidebarProvider>`}
      >
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(["sidebar", "floating", "inset"] as const).map((v) => (
              <Button
                key={v}
                size="sm"
                variant={variant === v ? "default" : "outline"}
                onClick={() => setVariant(v)}
              >
                {v}
              </Button>
            ))}
            <span className="mx-1 self-center text-muted-foreground">·</span>
            {(["offcanvas", "icon", "none"] as const).map((c) => (
              <Button
                key={c}
                size="sm"
                variant={collapsible === c ? "default" : "outline"}
                onClick={() => setCollapsible(c)}
              >
                {c}
              </Button>
            ))}
          </div>
          <SidebarDemo variant={variant} collapsible={collapsible} />
        </div>
      </ComponentSection>

      <ComponentSection
        title="vs. Custom Layout Sidebar"
        description="Brickly's doc shell uses a hand-built sidebar in layout/Sidebar.tsx — simpler, route-driven, and not collapsible to icons."
        source="composition"
        code={`// Custom doc sidebar (layout/Sidebar.tsx)
<aside className="w-64 border-r bg-background">
  {navItems.map((group) => (
    <NavLink to={item.to}>{item.label}</NavLink>
  ))}
</aside>

// shadcn sidebar — full app shell primitive
<SidebarProvider>
  <Sidebar collapsible="icon" variant="floating">...</Sidebar>
</SidebarProvider>`}
      >
        <div className="grid gap-4 md:grid-cols-2 max-w-3xl">
          <div className="rounded-xl border p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <PanelLeft className="h-4 w-4 text-muted-foreground" />
              Custom doc sidebar
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> Static width, mobile sheet
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> Driven by nav-config.ts
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> No icon-only collapse
              </li>
            </ul>
          </div>
          <div className="rounded-xl border p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <PanelLeft className="h-4 w-4 text-primary" />
              shadcn Sidebar
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> Collapsible + icon rail
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> Floating / inset variants
              </li>
              <li className="flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> ⌘B keyboard shortcut
              </li>
            </ul>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Icon-Only Collapsed State"
        description="When collapsible is set to icon, labels hide and tooltips appear on hover."
        source="shadcn"
        shadcnComponent="sidebar"
        code={`<Sidebar collapsible="icon">
  <SidebarMenuButton tooltip="Home">
    <Home />
    <span>Home</span>
  </SidebarMenuButton>
</Sidebar>`}
      >
        <div
          className={cn(
            "relative h-[320px] overflow-hidden rounded-xl border",
            "[&_[data-slot=sidebar-container]]:!absolute [&_[data-slot=sidebar-container]]:!h-full",
          )}
        >
          <SidebarProvider defaultOpen={false}>
            <Sidebar collapsible="icon">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {demoNav.map((item) => (
                        <SidebarMenuItem key={item.label}>
                          <SidebarMenuButton tooltip={item.label} isActive={item.label === "Home"}>
                            <item.icon />
                            <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
                Sidebar starts collapsed — hover icons for tooltips
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </ComponentSection>
    </div>
  );
};
