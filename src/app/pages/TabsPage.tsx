import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { useState } from "react";
import { User, Bell, Lock, CreditCard } from "lucide-react";

function VerticalTabs() {
  const [active, setActive] = useState(0);
  const tabs = ["General", "Profile", "Notifications", "Security", "Billing"];

  return (
    <div className="flex gap-4 w-full">
      <div className="flex flex-col w-36 shrink-0 border-r border-border pr-2 space-y-0.5">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
              i === active
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1">
        <h4 className="text-foreground mb-2">{tabs[active]}</h4>
        <p className="text-sm text-muted-foreground">Configure your {tabs[active].toLowerCase()} settings here.</p>
      </div>
    </div>
  );
}

export function TabsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Tabs"
        description="Navigation controls for switching between related content panels."
        badge="Component"
      />

      <ComponentSection
        title="Pill Tabs (Default)"
        description="Rounded pill-style tabs in a contained background — the default shadcn style."
        code={`import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="analytics">Analytics</TabsTrigger>
    <TabsTrigger value="reports">Reports</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content here.</TabsContent>
  <TabsContent value="analytics">Analytics content here.</TabsContent>
</Tabs>`}
      >
        <div className="w-full">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <p className="text-sm text-muted-foreground pt-2">Overview content goes here.</p>
            </TabsContent>
            <TabsContent value="analytics">
              <p className="text-sm text-muted-foreground pt-2">Analytics content goes here.</p>
            </TabsContent>
            <TabsContent value="reports">
              <p className="text-sm text-muted-foreground pt-2">Reports content goes here.</p>
            </TabsContent>
            <TabsContent value="settings">
              <p className="text-sm text-muted-foreground pt-2">Settings content goes here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Icons"
        description="Tabs with leading icons for richer navigation."
        code={`<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile"><User className="w-4 h-4" />Profile</TabsTrigger>
    <TabsTrigger value="notifications"><Bell className="w-4 h-4" />Notifications</TabsTrigger>
    <TabsTrigger value="security"><Lock className="w-4 h-4" />Security</TabsTrigger>
    <TabsTrigger value="billing"><CreditCard className="w-4 h-4" />Billing</TabsTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="w-full">
          <Tabs defaultValue="profile">
            <TabsList>
              <TabsTrigger value="profile"><User className="w-4 h-4" />Profile</TabsTrigger>
              <TabsTrigger value="notifications"><Bell className="w-4 h-4" />Notifications</TabsTrigger>
              <TabsTrigger value="security"><Lock className="w-4 h-4" />Security</TabsTrigger>
              <TabsTrigger value="billing"><CreditCard className="w-4 h-4" />Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <div className="space-y-3 pt-2">
                <p className="text-sm text-muted-foreground">Manage your personal information and profile settings.</p>
                <div className="space-y-2">
                  {["Full Name", "Email", "Bio"].map((field) => (
                    <div key={field} className="flex items-center justify-between py-2 border-b border-border">
                      <span className="text-sm text-muted-foreground">{field}</span>
                      <span className="text-sm text-foreground">—</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notifications">
              <p className="text-sm text-muted-foreground pt-2">Configure how you receive notifications and alerts.</p>
            </TabsContent>
            <TabsContent value="security">
              <p className="text-sm text-muted-foreground pt-2">Update your password and manage two-factor authentication.</p>
            </TabsContent>
            <TabsContent value="billing">
              <p className="text-sm text-muted-foreground pt-2">Manage your subscription plan and payment methods.</p>
            </TabsContent>
          </Tabs>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Underline Style"
        description="Classic underline tabs — extended from the shadcn base using className overrides."
        code={`<Tabs defaultValue="tab1">
  <TabsList className="bg-transparent border-b rounded-none h-auto p-0 w-full justify-start gap-0">
    <TabsTrigger
      value="tab1"
      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary
        data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2.5"
    >
      Tab 1
    </TabsTrigger>
  </TabsList>
</Tabs>`}
      >
        <div className="w-full">
          <Tabs defaultValue="overview">
            <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 w-full justify-start gap-0">
              {["Overview", "Analytics", "Reports", "Settings"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase()}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground text-muted-foreground px-4 py-2.5 -mb-px"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="overview"><p className="text-sm text-muted-foreground pt-3">Overview content goes here.</p></TabsContent>
            <TabsContent value="analytics"><p className="text-sm text-muted-foreground pt-3">Analytics content goes here.</p></TabsContent>
            <TabsContent value="reports"><p className="text-sm text-muted-foreground pt-3">Reports content goes here.</p></TabsContent>
            <TabsContent value="settings"><p className="text-sm text-muted-foreground pt-3">Settings content goes here.</p></TabsContent>
          </Tabs>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Vertical Tabs"
        description="Side navigation tabs for settings and configuration panels."
        code={`<div className="flex gap-4">
  <div className="flex flex-col w-36 border-r border-border pr-2 space-y-0.5">
    {tabs.map((tab, i) => (
      <button key={tab} className={i === active ? "bg-accent text-foreground" : "text-muted-foreground"}>
        {tab}
      </button>
    ))}
  </div>
  <div className="flex-1">Content here</div>
</div>`}
      >
        <VerticalTabs />
      </ComponentSection>
    </div>
  );
}
