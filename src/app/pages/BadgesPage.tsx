import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CheckCircle, AlertCircle, Clock, Star, X } from "lucide-react";

export function BadgesPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Badges"
        description="Small labels for status, categories, counts, and metadata. Compact and informative."
        badge="Component"
      />

      <ComponentSection
        title="Variants"
        description="Different semantic colors to convey meaning at a glance."
        code={`import { Badge } from "@/components/ui/badge";

<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge className="bg-green-100 text-green-800 border-transparent">Success</Badge>
<Badge className="bg-amber-100 text-amber-800 border-transparent">Warning</Badge>
<Badge className="bg-blue-100 text-blue-700 border-transparent">Info</Badge>`}
      >
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Error</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge className="bg-green-100 text-green-800 border-transparent dark:bg-green-900/30 dark:text-green-400">Success</Badge>
        <Badge className="bg-amber-100 text-amber-800 border-transparent dark:bg-amber-900/30 dark:text-amber-400">Warning</Badge>
        <Badge className="bg-blue-100 text-blue-700 border-transparent dark:bg-blue-900/30 dark:text-blue-400">Info</Badge>
      </ComponentSection>

      <ComponentSection
        title="With Dot Indicator"
        description="Use a colored dot to reinforce status semantics."
        code={`<Badge className="bg-green-100 text-green-800 border-transparent gap-1.5">
  <span className="w-1.5 h-1.5 rounded-full bg-green-600" /> Active
</Badge>`}
      >
        <Badge className="bg-green-100 text-green-800 border-transparent dark:bg-green-900/30 dark:text-green-400 gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600" /> Active
        </Badge>
        <Badge className="bg-amber-100 text-amber-800 border-transparent dark:bg-amber-900/30 dark:text-amber-400 gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pending
        </Badge>
        <Badge variant="destructive" className="gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/80" /> Failed
        </Badge>
        <Badge className="bg-blue-100 text-blue-700 border-transparent dark:bg-blue-900/30 dark:text-blue-400 gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" /> Processing
        </Badge>
        <Badge variant="secondary" className="gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" /> Offline
        </Badge>
      </ComponentSection>

      <ComponentSection
        title="With Icons"
        description="Pair a badge with a small icon for extra clarity."
        code={`<Badge className="bg-green-100 text-green-800 border-transparent">
  <CheckCircle className="w-3 h-3" /> Verified
</Badge>`}
      >
        <Badge className="bg-green-100 text-green-800 border-transparent dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="w-3 h-3" /> Verified
        </Badge>
        <Badge className="bg-amber-100 text-amber-800 border-transparent dark:bg-amber-900/30 dark:text-amber-400">
          <Clock className="w-3 h-3" /> In Review
        </Badge>
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3" /> Flagged
        </Badge>
        <Badge variant="default">
          <Star className="w-3 h-3" /> Featured
        </Badge>
      </ComponentSection>

      <ComponentSection
        title="Removable"
        description="Badges with a close button for tag-style interactions."
        code={`<Badge variant="secondary">
  Design
  <button className="ml-0.5 hover:opacity-70"><X className="w-3 h-3" /></button>
</Badge>`}
      >
        <Badge variant="secondary">
          Design <button className="ml-0.5 hover:opacity-70 transition-opacity"><X className="w-3 h-3" /></button>
        </Badge>
        <Badge className="bg-blue-100 text-blue-700 border-transparent dark:bg-blue-900/30 dark:text-blue-400">
          Engineering <button className="ml-0.5 hover:opacity-70 transition-opacity"><X className="w-3 h-3" /></button>
        </Badge>
        <Badge className="bg-green-100 text-green-800 border-transparent dark:bg-green-900/30 dark:text-green-400">
          Marketing <button className="ml-0.5 hover:opacity-70 transition-opacity"><X className="w-3 h-3" /></button>
        </Badge>
        <Badge variant="outline">
          Archived <button className="ml-0.5 hover:opacity-70 transition-opacity"><X className="w-3 h-3" /></button>
        </Badge>
      </ComponentSection>

      <ComponentSection
        title="Counter Badges"
        description="Numeric badges for counts and notifications."
        code={`<div className="relative inline-block">
  <Button variant="outline">Inbox</Button>
  <Badge variant="destructive" className="absolute -top-2 -right-2 px-1.5">4</Badge>
</div>`}
      >
        <div className="flex items-center gap-6">
          <div className="relative inline-block">
            <Button variant="outline" size="sm">Inbox</Button>
            <Badge variant="destructive" className="absolute -top-2 -right-2 px-1.5 min-w-[1.25rem] justify-center">4</Badge>
          </div>
          <div className="relative inline-block">
            <Button variant="outline" size="sm">Messages</Button>
            <Badge variant="default" className="absolute -top-2 -right-2 px-1.5 min-w-[1.25rem] justify-center">12</Badge>
          </div>
          <div className="relative inline-block">
            <Button variant="outline" size="sm">Alerts</Button>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-500 ring-2 ring-background" />
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
