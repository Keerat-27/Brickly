import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { AspectRatio } from "../components/ui/aspect-ratio";
import { ArrowUpRight, Star, TrendingUp, Users, ShoppingCart, DollarSign, MoreHorizontal } from "lucide-react";

export const CardsPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Cards"
        description="Flexible container components for grouping related information and actions."
        badge="Component"
      />

      <ComponentSection
        title="Basic Card"
        description="shadcn Card primitive with header, content, and footer slots."
        code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

<Card className="w-72">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card subtitle or description</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-muted-foreground">Card content goes here.</p>
  </CardContent>
  <CardFooter className="gap-2">
    <Button size="sm">Action</Button>
    <Button variant="outline" size="sm">Cancel</Button>
  </CardFooter>
</Card>`}
      >
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card subtitle or description</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Card content goes here. This is a flexible container for related content.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">Action</Button>
            <Button variant="outline" size="sm">Cancel</Button>
          </CardFooter>
        </Card>
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
          { label: "Total Revenue", value: "$45,231", trend: "+20.1%", icon: DollarSign },
          { label: "Active Users", value: "2,350", trend: "+12.5%", icon: Users },
          { label: "New Orders", value: "1,247", trend: "+8.3%", icon: ShoppingCart },
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
              <p className="text-sm mt-0.5 flex items-center gap-1 text-green-600">
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
        code={`<div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center gap-4 w-64">
  <div className="w-20 h-20 rounded-full bg-blue-400 text-white text-2xl flex items-center justify-center">AJ</div>
  <div>
    <p className="text-foreground font-semibold">Alice Johnson</p>
    <p className="text-sm text-muted-foreground mt-0.5">Product Designer</p>
  </div>
  <Button className="w-full">Follow</Button>
</div>`}
      >
        <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center gap-4 w-64">
          <div className="w-20 h-20 rounded-full bg-blue-400 text-white text-2xl flex items-center justify-center" style={{ fontWeight: 500 }}>
            AJ
          </div>
          <div>
            <p className="text-foreground" style={{ fontWeight: 600 }}>Alice Johnson</p>
            <p className="text-sm text-muted-foreground mt-0.5">Product Designer</p>
          </div>
          <div className="flex w-full text-center text-sm">
            <div className="flex-1">
              <p className="text-foreground" style={{ fontWeight: 500 }}>128</p>
              <p className="text-muted-foreground text-xs mt-0.5">Posts</p>
            </div>
            <div className="flex-1 border-x border-border">
              <p className="text-foreground" style={{ fontWeight: 500 }}>4.2k</p>
              <p className="text-muted-foreground text-xs mt-0.5">Followers</p>
            </div>
            <div className="flex-1">
              <p className="text-foreground" style={{ fontWeight: 500 }}>362</p>
              <p className="text-muted-foreground text-xs mt-0.5">Following</p>
            </div>
          </div>
          <Button className="w-full">Follow</Button>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Media Card (Aspect Ratio)"
        description="Lock image proportions with the AspectRatio primitive."
        code={`import { AspectRatio } from "@/components/ui/aspect-ratio";

<Card className="w-72 gap-0 overflow-hidden pt-0">
  <AspectRatio ratio={16 / 9}>
    <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500" />
  </AspectRatio>
  <CardHeader className="px-6 pt-4 pb-6">
    <CardTitle>Design Systems 101</CardTitle>
    <CardDescription>16:9 cover image</CardDescription>
  </CardHeader>
</Card>`}
      >
        <Card className="w-72 gap-0 overflow-hidden pt-0">
          <AspectRatio ratio={16 / 9}>
            <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500" />
          </AspectRatio>
          <CardHeader className="px-6 pt-4 pb-6">
            <CardTitle>Design Systems 101</CardTitle>
            <CardDescription>16:9 cover image</CardDescription>
          </CardHeader>
        </Card>
      </ComponentSection>

      <ComponentSection
        title="Horizontal Card"
        description="Side-by-side layout for articles and media content."
        code={`<div className="rounded-xl border border-border bg-card overflow-hidden flex">
  <div className="w-32 bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
  <div className="p-4 space-y-2">
    <Badge variant="secondary">Article</Badge>
    <h4>Getting Started with Design Systems</h4>
    <p className="text-sm text-muted-foreground">A comprehensive guide for teams.</p>
    <div className="flex items-center gap-2">
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
            <Badge variant="secondary">Article</Badge>
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
      <h4>Project Alpha</h4>
      <p className="text-sm text-muted-foreground mt-0.5">Web redesign · Due Dec 2024</p>
    </div>
    <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
  </div>
  <div className="mt-4">
    <div className="h-1.5 rounded-full bg-muted">
      <div className="h-1.5 w-[72%] rounded-full bg-primary" />
    </div>
  </div>
  <Button variant="link" className="mt-2 p-0 h-auto text-sm">
    View project <ArrowUpRight className="w-3.5 h-3.5" />
  </Button>
</div>`}
      >
        <div className="rounded-xl border border-border bg-card p-5 w-72">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-foreground">Project Alpha</h4>
              <p className="text-sm text-muted-foreground mt-0.5">Web redesign · Due Dec 2024</p>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
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
          <Button variant="link" className="mt-3 p-0 h-auto text-sm">
            View project <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </ComponentSection>
    </div>
  );
}
