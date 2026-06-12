import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Separator } from "../components/ui/separator";

export const SeparatorPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Separator"
        description="Visual dividers for separating content horizontally or vertically."
        badge="Component"
      />

      <ComponentSection
        title="Horizontal"
        description="The default orientation — a full-width line between blocks."
        source="shadcn"
        shadcnComponent="separator"
        accessibility="Separators use role=separator with decorative=true by default so they are ignored by screen readers."
        code={`import { Separator } from "@/components/ui/separator";

<div>
  <div className="space-y-1">
    <h4 className="text-sm font-medium">Radix UI</h4>
    <p className="text-sm text-muted-foreground">Accessible component primitives.</p>
  </div>
  <Separator className="my-4" />
  <div className="flex h-5 items-center space-x-4 text-sm">
    <div>Docs</div>
    <Separator orientation="vertical" />
    <div>Source</div>
  </div>
</div>`}
      >
        <div className="w-full max-w-md">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Radix UI</h4>
            <p className="text-sm text-muted-foreground">
              An open-source UI component library.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Vertical"
        description="Use vertical separators inline between items in a row."
        source="shadcn"
        shadcnComponent="separator"
        code={`<div className="flex h-5 items-center space-x-4 text-sm">
  <span>Profile</span>
  <Separator orientation="vertical" />
  <span>Settings</span>
  <Separator orientation="vertical" />
  <span>Logout</span>
</div>`}
      >
        <div className="flex h-5 items-center space-x-4 text-sm">
          <span>Profile</span>
          <Separator orientation="vertical" />
          <span>Settings</span>
          <Separator orientation="vertical" />
          <span>Billing</span>
          <Separator orientation="vertical" />
          <span>Logout</span>
        </div>
      </ComponentSection>

      <ComponentSection
        title="In a Card Layout"
        description="Separate header, body, and footer regions in composed layouts."
        source="shadcn"
        shadcnComponent="separator"
        code={`<div className="rounded-xl border p-6 space-y-4 max-w-sm">
  <div>
    <h4 className="text-sm font-medium">Notifications</h4>
    <p className="text-sm text-muted-foreground">Choose what you receive.</p>
  </div>
  <Separator />
  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span>Email</span>
      <span className="text-muted-foreground">On</span>
    </div>
    <div className="flex justify-between">
      <span>Push</span>
      <span className="text-muted-foreground">Off</span>
    </div>
  </div>
  <Separator />
  <p className="text-xs text-muted-foreground">Changes save automatically.</p>
</div>`}
      >
        <div className="rounded-xl border border-border p-6 space-y-4 w-full max-w-sm">
          <div>
            <h4 className="text-sm font-medium">Notifications</h4>
            <p className="text-sm text-muted-foreground">Choose what you receive.</p>
          </div>
          <Separator />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Email alerts</span>
              <span className="text-muted-foreground">On</span>
            </div>
            <div className="flex justify-between">
              <span>Push notifications</span>
              <span className="text-muted-foreground">Off</span>
            </div>
            <div className="flex justify-between">
              <span>Weekly digest</span>
              <span className="text-muted-foreground">On</span>
            </div>
          </div>
          <Separator />
          <p className="text-xs text-muted-foreground">Changes save automatically.</p>
        </div>
      </ComponentSection>
    </div>
  );
};
