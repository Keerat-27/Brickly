import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";

export const ResizablePage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Resizable"
        description="Drag-to-resize panel layouts with horizontal and vertical splits."
        badge="Component"
      />

      <ComponentSection
        title="Horizontal Split"
        description="Two panels side by side with a draggable handle."
        source="shadcn"
        code={`import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

<ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">Panel A</div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">Panel B</div>
  </ResizablePanel>
</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-2xl rounded-lg border">
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
              Sidebar / navigation
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
              Main content
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ComponentSection>

      <ComponentSection
        title="Vertical Split"
        description="Stacked panels — useful for editor + preview layouts."
        source="shadcn"
        code={`<ResizablePanelGroup direction="vertical" className="min-h-[280px] rounded-lg border">
  <ResizablePanel defaultSize={60}>Editor</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={40}>Preview</ResizablePanel>
</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup direction="vertical" className="min-h-[280px] max-w-2xl rounded-lg border">
          <ResizablePanel defaultSize={60}>
            <div className="flex h-full items-center justify-center bg-muted/30 p-6 text-sm text-muted-foreground">
              Editor pane
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40}>
            <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
              Preview pane
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ComponentSection>

      <ComponentSection
        title="Three-Panel Layout"
        description="Nested groups with min/max size constraints on the center panel."
        source="shadcn"
        code={`<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize={20} minSize={15}>Nav</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={55} minSize={30}>Content</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={25} minSize={15} maxSize={35}>Inspector</ResizablePanel>
</ResizablePanelGroup>`}
      >
        <ResizablePanelGroup direction="horizontal" className="min-h-[220px] max-w-3xl rounded-lg border">
          <ResizablePanel defaultSize={20} minSize={15} collapsible>
            <div className="flex h-full items-center justify-center p-4 text-xs text-muted-foreground">
              Nav
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={55} minSize={30}>
            <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
              Content (min 30%)
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={15} maxSize={35} collapsible>
            <div className="flex h-full items-center justify-center p-4 text-xs text-muted-foreground">
              Inspector (max 35%)
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ComponentSection>
    </div>
  );
};
