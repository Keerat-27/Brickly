import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "../components/ui/card";
import { AspectRatio } from "../components/ui/aspect-ratio";
import { ArrowUpRight, Star, TrendingUp, Users, ShoppingCart, DollarSign, MoreHorizontal } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$45,231", trend: "+20.1%", icon: DollarSign },
  { label: "Active Users", value: "2,350", trend: "+12.5%", icon: Users },
  { label: "New Orders", value: "1,247", trend: "+8.3%", icon: ShoppingCart },
];

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
        source="shadcn"
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
        source="shadcn"
        code={`import { Card, CardHeader, CardContent } from "@/components/ui/card";

<Card className="w-52">
  <CardHeader className="flex-row items-center justify-between pb-2">
    <span className="text-sm text-muted-foreground">Total Revenue</span>
    <div className="p-2 rounded-lg bg-muted">
      <DollarSign className="w-4 h-4 text-muted-foreground" />
    </div>
  </CardHeader>
  <CardContent>
    <p className="text-2xl text-foreground">$45,231</p>
    <p className="text-sm text-green-600 mt-0.5 flex items-center gap-1">
      <TrendingUp className="w-3.5 h-3.5" /> +20.1% this month
    </p>
  </CardContent>
</Card>`}
      >
        {stats.map((stat) => (
          <Card key={stat.label} className="w-52">
            <CardHeader className="flex-row items-center justify-between pb-2">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className="p-2 rounded-lg bg-muted">
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl text-foreground">{stat.value}</p>
              <p className="text-sm mt-0.5 flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3.5 h-3.5" />
                {stat.trend} this month
              </p>
            </CardContent>
          </Card>
        ))}
      </ComponentSection>

      <ComponentSection
        title="Profile / User Card"
        description="Display user information in a structured card layout."
        source="shadcn"
        code={`import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

<Card className="w-64 text-center">
  <CardHeader className="items-center">
    <Avatar className="size-20">
      <AvatarFallback className="bg-blue-500 text-white text-2xl">AJ</AvatarFallback>
    </Avatar>
    <CardTitle>Alice Johnson</CardTitle>
    <CardDescription>Product Designer</CardDescription>
  </CardHeader>
  <CardContent className="flex text-center text-sm">
    <div className="flex-1"><p className="font-medium">128</p><p className="text-xs text-muted-foreground">Posts</p></div>
    <div className="flex-1 border-x border-border"><p className="font-medium">4.2k</p><p className="text-xs text-muted-foreground">Followers</p></div>
    <div className="flex-1"><p className="font-medium">362</p><p className="text-xs text-muted-foreground">Following</p></div>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Follow</Button>
  </CardFooter>
</Card>`}
      >
        <Card className="w-64 text-center">
          <CardHeader className="items-center">
            <Avatar className="size-20">
              <AvatarFallback className="bg-blue-500 text-white text-2xl">AJ</AvatarFallback>
            </Avatar>
            <CardTitle>Alice Johnson</CardTitle>
            <CardDescription>Product Designer</CardDescription>
          </CardHeader>
          <CardContent className="flex text-center text-sm">
            <div className="flex-1">
              <p className="font-medium text-foreground">128</p>
              <p className="text-xs text-muted-foreground mt-0.5">Posts</p>
            </div>
            <div className="flex-1 border-x border-border">
              <p className="font-medium text-foreground">4.2k</p>
              <p className="text-xs text-muted-foreground mt-0.5">Followers</p>
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">362</p>
              <p className="text-xs text-muted-foreground mt-0.5">Following</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Follow</Button>
          </CardFooter>
        </Card>
      </ComponentSection>

      <ComponentSection
        title="Media Card (Aspect Ratio)"
        description="Lock image proportions with the AspectRatio primitive."
        source="shadcn"
        code={`import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
        source="shadcn"
        code={`import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

<Card className="flex w-full max-w-md flex-row overflow-hidden p-0">
  <div className="w-32 shrink-0">
    <AspectRatio ratio={1}>
      <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500" />
    </AspectRatio>
  </div>
  <CardContent className="space-y-2 py-4">
    <Badge variant="secondary">Article</Badge>
    <h4 className="text-foreground">Getting Started with Design Systems</h4>
    <p className="text-sm text-muted-foreground">A comprehensive guide for teams.</p>
  </CardContent>
</Card>`}
      >
        <Card className="flex w-full max-w-md flex-row overflow-hidden p-0">
          <div className="w-32 shrink-0">
            <AspectRatio ratio={1}>
              <div className="h-full w-full bg-gradient-to-br from-blue-400 to-purple-500" />
            </AspectRatio>
          </div>
          <CardContent className="space-y-2 py-4">
            <Badge variant="secondary">Article</Badge>
            <h4 className="text-foreground">Getting Started with Design Systems</h4>
            <p className="text-sm text-muted-foreground">A comprehensive guide for building consistent UIs.</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-muted-foreground">5 min read</span>
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-xs text-muted-foreground">4.8</span>
            </div>
          </CardContent>
        </Card>
      </ComponentSection>

      <ComponentSection
        title="Action Card"
        description="Cards with contextual actions and overflow menus."
        source="shadcn"
        code={`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

<Card className="w-72">
  <CardHeader>
    <CardTitle>Project Alpha</CardTitle>
    <CardDescription>Web redesign · Due Dec 2024</CardDescription>
    <CardAction>
      <Button variant="ghost" size="icon"><MoreHorizontal /></Button>
    </CardAction>
  </CardHeader>
  <CardContent className="space-y-2">
    <div className="flex justify-between text-xs text-muted-foreground">
      <span>Progress</span><span>72%</span>
    </div>
    <Progress value={72} />
    <Button variant="link" className="h-auto p-0 text-sm">
      View project <ArrowUpRight className="w-3.5 h-3.5" />
    </Button>
  </CardContent>
</Card>`}
      >
        <Card className="w-72">
          <CardHeader>
            <CardTitle>Project Alpha</CardTitle>
            <CardDescription>Web redesign · Due Dec 2024</CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>72%</span>
            </div>
            <Progress value={72} />
            <Button variant="link" className="h-auto p-0 text-sm">
              View project <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </CardContent>
        </Card>
      </ComponentSection>
    </div>
  );
}
