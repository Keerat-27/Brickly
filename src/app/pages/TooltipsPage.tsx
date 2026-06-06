import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../components/ui/tooltip";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../components/ui/hover-card";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { Info, HelpCircle, Settings, Copy, Trash2 } from "lucide-react";

export const TooltipsPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Tooltips"
        description="Hover and click popovers for contextual help, labels, and supplementary information."
        badge="Component"
      />

      <ComponentSection
        title="Basic Tooltip"
        description="Simple text tooltip on hover with directional placement."
        code={`import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Top</Button>
  </TooltipTrigger>
  <TooltipContent>Top tooltip</TooltipContent>
</Tooltip>

<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline">Bottom</Button>
  </TooltipTrigger>
  <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
</Tooltip>`}
      >
        <TooltipProvider>
          <div className="flex flex-wrap gap-4 items-center pt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Top</Button>
              </TooltipTrigger>
              <TooltipContent side="top">Top tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Bottom</Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Left</Button>
              </TooltipTrigger>
              <TooltipContent side="left">Left tooltip</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">Right</Button>
              </TooltipTrigger>
              <TooltipContent side="right">Right tooltip</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </ComponentSection>

      <ComponentSection
        title="Icon Tooltips"
        description="Tooltips on icon buttons to explain actions."
        code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon">
      <Copy className="w-4 h-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent>Copy to clipboard</TooltipContent>
</Tooltip>`}
      >
        <TooltipProvider>
          <div className="flex gap-2 pt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Copy className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy to clipboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete item</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>More information</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </ComponentSection>

      <ComponentSection
        title="Rich Tooltip"
        description="Tooltips with a title and description for more context."
        code={`<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="outline"><HelpCircle className="w-4 h-4" /> Hover me</Button>
  </TooltipTrigger>
  <TooltipContent className="w-56 p-3">
    <p className="font-medium text-sm mb-1">Pro Feature</p>
    <p className="text-xs opacity-80">Upgrade your plan to unlock this feature and more.</p>
  </TooltipContent>
</Tooltip>`}
      >
        <TooltipProvider>
          <div className="flex flex-wrap gap-4 pt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  Hover me
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-56 p-3" side="top">
                <p className="text-sm mb-1">Pro Feature</p>
                <p className="text-xs opacity-80">Upgrade your plan to unlock this feature and more.</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  What's this?
                </Button>
              </TooltipTrigger>
              <TooltipContent className="w-56 p-3" side="top">
                <p className="text-sm mb-1">Two-Factor Auth</p>
                <p className="text-xs opacity-80">Add an extra layer of security to protect your account.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </ComponentSection>

      <ComponentSection
        title="Hover Card"
        description="Rich preview cards that open on hover — great for user profiles and link previews."
        code={`import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link" className="p-0 h-auto">@brickly</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-72">
    <div className="space-y-2">
      <p className="text-sm font-medium">Brickly</p>
      <p className="text-xs text-muted-foreground">React component library · 21+ categories</p>
    </div>
  </HoverCardContent>
</HoverCard>`}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" className="p-0 h-auto text-primary">
              @brickly
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-72">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium shrink-0">
                B
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Brickly</p>
                <p className="text-xs text-muted-foreground">
                  React component library with live previews and copyable code.
                </p>
                <p className="text-xs text-muted-foreground">21+ component categories</p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </ComponentSection>

      <ComponentSection
        title="Click Popover"
        description="Click-triggered popovers for actions and menus."
        code={`import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

<Popover>
  <PopoverTrigger asChild>
    <Button>Click Popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-52 p-2">
    <div className="space-y-1">
      {["View Profile", "Edit Settings", "Sign Out"].map(item => (
        <button key={item} className="w-full text-left px-3 py-1.5 text-sm hover:bg-accent rounded-md">
          {item}
        </button>
      ))}
    </div>
  </PopoverContent>
</Popover>`}
      >
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button>Click Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-2">
              <div className="space-y-1">
                {["View Profile", "Edit Settings", "Sign Out"].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-3 py-1.5 text-sm text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Share</Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-3">
              <p className="text-xs text-muted-foreground mb-2">Share via</p>
              <div className="flex gap-2">
                {["Twitter", "Email", "Link"].map((item) => (
                  <Button key={item} variant="outline" size="sm" className="flex-1 text-xs px-2">
                    {item}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentSection>
    </div>
  );
}
