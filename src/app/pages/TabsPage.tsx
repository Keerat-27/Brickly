import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { useState } from "react";
import { User, Bell, Lock, CreditCard } from "lucide-react";

function Tabs({
  tabs,
  variant = "default",
}: {
  tabs: { label: string; icon?: React.ReactNode; content: React.ReactNode }[];
  variant?: "default" | "pills" | "underline";
}) {
  const [active, setActive] = useState(0);

  const containerStyles = {
    default: "border-b border-border",
    pills: "flex gap-1 bg-muted p-1 rounded-lg",
    underline: "border-b border-border",
  };

  const tabStyles = {
    default: (i: number) =>
      `px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
        i === active
          ? "border-primary text-foreground"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`,
    pills: (i: number) =>
      `px-3 py-1.5 text-sm rounded-md transition-colors ${
        i === active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`,
    underline: (i: number) =>
      `px-4 py-2.5 text-sm transition-colors border-b-2 -mb-px ${
        i === active
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
      }`,
  };

  return (
    <div className="w-full">
      <div className={`flex ${containerStyles[variant]}`}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 ${tabStyles[variant](i)}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{tabs[active].content}</div>
    </div>
  );
}

const profileTabs = [
  {
    label: "Profile",
    icon: <User className="w-4 h-4" />,
    content: (
      <div className="space-y-3">
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
    ),
  },
  {
    label: "Notifications",
    icon: <Bell className="w-4 h-4" />,
    content: (
      <p className="text-sm text-muted-foreground">Configure how you receive notifications and alerts.</p>
    ),
  },
  {
    label: "Security",
    icon: <Lock className="w-4 h-4" />,
    content: (
      <p className="text-sm text-muted-foreground">Update your password and manage two-factor authentication.</p>
    ),
  },
  {
    label: "Billing",
    icon: <CreditCard className="w-4 h-4" />,
    content: (
      <p className="text-sm text-muted-foreground">Manage your subscription plan and payment methods.</p>
    ),
  },
];

const simpleTabs = [
  { label: "Overview", content: <p className="text-sm text-muted-foreground">Overview content goes here.</p> },
  { label: "Analytics", content: <p className="text-sm text-muted-foreground">Analytics content goes here.</p> },
  { label: "Reports", content: <p className="text-sm text-muted-foreground">Reports content goes here.</p> },
  { label: "Settings", content: <p className="text-sm text-muted-foreground">Settings content goes here.</p> },
];

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
        title="Default Tabs"
        description="Classic underline tabs with icon support."
        code={`const [active, setActive] = useState(0);
const tabs = ["Profile", "Notifications", "Security", "Billing"];

<div className="flex border-b border-border">
  {tabs.map((tab, i) => (
    <button
      key={tab}
      onClick={() => setActive(i)}
      className={\`px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors \${
        i === active ? "border-primary text-foreground" : "border-transparent text-muted-foreground"
      }\`}
    >
      {tab}
    </button>
  ))}
</div>`}
      >
        <div className="w-full">
          <Tabs tabs={profileTabs} variant="default" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Pill Tabs"
        description="Rounded pill-style tabs in a contained background."
        code={`<div className="flex gap-1 bg-muted p-1 rounded-lg">
  {tabs.map((tab, i) => (
    <button
      key={tab}
      onClick={() => setActive(i)}
      className={\`px-3 py-1.5 text-sm rounded-md transition-colors \${
        i === active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
      }\`}
    >
      {tab}
    </button>
  ))}
</div>`}
      >
        <div className="w-full">
          <Tabs tabs={simpleTabs} variant="pills" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Underline Tabs"
        description="Minimal tabs with a colored underline on the active item."
        code={`<div className="flex border-b border-border">
  {tabs.map((tab, i) => (
    <button
      key={tab}
      className={\`px-4 py-2.5 text-sm border-b-2 -mb-px \${
        i === active ? "border-primary text-primary" : "border-transparent text-muted-foreground"
      }\`}
    >
      {tab}
    </button>
  ))}
</div>`}
      >
        <div className="w-full">
          <Tabs tabs={simpleTabs} variant="underline" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Vertical Tabs"
        description="Side navigation tabs for settings and configuration panels."
        code={`<div className="flex gap-4">
  <div className="flex flex-col w-36 border-r border-border pr-2 space-y-0.5">
    {tabs.map((tab, i) => (
      <button
        key={tab}
        className={\`text-left px-3 py-2 rounded-md text-sm \${
          i === active ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent"
        }\`}
      >
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
