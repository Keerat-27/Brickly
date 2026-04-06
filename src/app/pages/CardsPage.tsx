import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { ArrowUpRight, Star, TrendingUp, Users, ShoppingCart, DollarSign, MoreHorizontal } from "lucide-react";

export function CardsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Cards"
        description="Flexible container components for grouping related information and actions."
        badge="Component"
      />

      <ComponentSection
        title="Basic Card"
        description="A simple card with header, body, and footer sections."
        code={`<div className="rounded-xl border border-border bg-card text-card-foreground p-6 space-y-4">
  <div>
    <h3 className="text-card-foreground">Card Title</h3>
    <p className="text-sm text-muted-foreground mt-1">Card subtitle or description</p>
  </div>
  <p className="text-sm text-muted-foreground">
    Card content goes here. This is a flexible container.
  </p>
  <div className="flex gap-2 pt-2 border-t border-border">
    <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm">Action</button>
    <button className="px-3 py-1.5 rounded-md border border-border text-sm">Cancel</button>
  </div>
</div>`}
      >
        <div className="rounded-xl border border-border bg-card p-6 space-y-4 w-72">
          <div>
            <h3>Card Title</h3>
            <p className="text-sm text-muted-foreground mt-1">Card subtitle or description</p>
          </div>
          <p className="text-sm text-muted-foreground">
            Card content goes here. This is a flexible container for related content.
          </p>
          <div className="flex gap-2 pt-2 border-t border-border">
            <button className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm">Action</button>
            <button className="px-3 py-1.5 rounded-md border border-border text-sm text-foreground">Cancel</button>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Stat Cards"
        description="Display key metrics with trend indicators."
        code={`<div className="rounded-xl border border-border bg-card p-5 space-y-3">
  <div className="flex items-center justify-between">
    <span className="text-sm text-muted-foreground">Total Revenue</span>
    <div className="p-2 rounded-lg bg-muted">
      <DollarSign className="w-4 h-4 text-muted-foreground" />
    </div>
  </div>
  <div>
    <p className="text-2xl text-foreground">$45,231</p>
    <p className="text-sm text-green-600 mt-0.5 flex items-center gap-1">
      <TrendingUp className="w-3.5 h-3.5" /> +20.1% this month
    </p>
  </div>
</div>`}
      >
        {[
          { label: "Total Revenue", value: "$45,231", trend: "+20.1%", icon: DollarSign, positive: true },
          { label: "Active Users", value: "2,350", trend: "+12.5%", icon: Users, positive: true },
          { label: "New Orders", value: "1,247", trend: "+8.3%", icon: ShoppingCart, positive: true },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5 space-y-3 w-52">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className="p-2 rounded-lg bg-muted">
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <p className="text-2xl text-foreground">{stat.value}</p>
              <p className={`text-sm mt-0.5 flex items-center gap-1 ${stat.positive ? "text-green-600" : "text-red-500"}`}>
                <TrendingUp className="w-3.5 h-3.5" />
                {stat.trend} this month
              </p>
            </div>
          </div>
        ))}
      </ComponentSection>

      <ComponentSection
        title="Profile / User Card"
        description="Display user information in a structured card layout."
        code={`<div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center text-center space-y-3">
  <div className="w-16 h-16 rounded-full bg-blue-500 text-white text-xl flex items-center justify-center">AJ</div>
  <div>
    <p className="text-foreground">Alice Johnson</p>
    <p className="text-sm text-muted-foreground">Product Designer</p>
  </div>
  <div className="flex gap-4 text-center text-sm">
    <div><p className="text-foreground">128</p><p className="text-muted-foreground">Posts</p></div>
    <div><p className="text-foreground">4.2k</p><p className="text-muted-foreground">Followers</p></div>
    <div><p className="text-foreground">362</p><p className="text-muted-foreground">Following</p></div>
  </div>
  <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">Follow</button>
</div>`}
      >
        <div className="rounded-xl border border-border bg-card p-6 flex flex-col items-center text-center space-y-3 w-60">
          <div className="w-16 h-16 rounded-full bg-blue-500 text-white text-xl flex items-center justify-center">
            AJ
          </div>
          <div>
            <p className="text-foreground">Alice Johnson</p>
            <p className="text-sm text-muted-foreground">Product Designer</p>
          </div>
          <div className="flex gap-4 text-center text-sm w-full">
            <div className="flex-1">
              <p className="text-foreground">128</p>
              <p className="text-muted-foreground text-xs">Posts</p>
            </div>
            <div className="flex-1 border-x border-border">
              <p className="text-foreground">4.2k</p>
              <p className="text-muted-foreground text-xs">Followers</p>
            </div>
            <div className="flex-1">
              <p className="text-foreground">362</p>
              <p className="text-muted-foreground text-xs">Following</p>
            </div>
          </div>
          <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">
            Follow
          </button>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Horizontal Card"
        description="Side-by-side layout for articles and media content."
        code={`<div className="rounded-xl border border-border bg-card overflow-hidden flex">
  <div className="w-32 bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
  <div className="p-4 space-y-2">
    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Article</span>
    <h4 className="text-foreground">Getting Started with Design Systems</h4>
    <p className="text-sm text-muted-foreground">A comprehensive guide for teams.</p>
    <div className="flex items-center gap-2 pt-1">
      <span className="text-xs text-muted-foreground">5 min read</span>
      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
      <span className="text-xs text-muted-foreground">4.8</span>
    </div>
  </div>
</div>`}
      >
        <div className="rounded-xl border border-border bg-card overflow-hidden flex w-full max-w-md">
          <div className="w-32 bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
          <div className="p-4 space-y-2 flex-1">
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Article</span>
            <h4 className="text-foreground">Getting Started with Design Systems</h4>
            <p className="text-sm text-muted-foreground">A comprehensive guide for building consistent UIs.</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">5 min read</span>
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs text-muted-foreground">4.8</span>
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Action Card"
        description="Cards with contextual actions and overflow menus."
        code={`<div className="rounded-xl border border-border bg-card p-5">
  <div className="flex items-start justify-between">
    <div>
      <h4 className="text-foreground">Project Alpha</h4>
      <p className="text-sm text-muted-foreground mt-0.5">Web redesign · Due Dec 2024</p>
    </div>
    <button className="p-1 rounded-md hover:bg-accent"><MoreHorizontal className="w-4 h-4" /></button>
  </div>
  <div className="mt-4">
    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
      <span>Progress</span><span>72%</span>
    </div>
    <div className="h-1.5 rounded-full bg-muted"><div className="h-1.5 w-[72%] rounded-full bg-primary" /></div>
  </div>
  <a href="#" className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline">
    View project <ArrowUpRight className="w-3.5 h-3.5" />
  </a>
</div>`}
      >
        <div className="rounded-xl border border-border bg-card p-5 w-72">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-foreground">Project Alpha</h4>
              <p className="text-sm text-muted-foreground mt-0.5">Web redesign · Due Dec 2024</p>
            </div>
            <button className="p-1 rounded-md hover:bg-accent text-muted-foreground">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
              <span>Progress</span>
              <span>72%</span>
            </div>
            <div className="h-1.5 rounded-full bg-muted">
              <div className="h-1.5 w-[72%] rounded-full bg-primary" />
            </div>
          </div>
          <a href="#" className="mt-4 flex items-center gap-1 text-sm text-primary hover:underline">
            View project <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </ComponentSection>
    </div>
  );
}
