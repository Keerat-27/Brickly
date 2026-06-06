import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { Toggle } from "../components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group";
import { Loader2, Download, ArrowRight, Trash2, Plus, Heart, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { useState } from "react";

export const ButtonsPage = () => {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="space-y-10">
      <PageHeader
        title="Buttons"
        description="Interactive button elements with multiple variants, sizes, and states to fit any use case."
        badge="Component"
      />

      <ComponentSection
        title="Variants"
        description="Six visual styles to communicate intent and hierarchy."
        code={`import { Button } from "@/components/ui/button";

<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button className="bg-green-600 text-white hover:bg-green-700">Success</Button>`}
      >
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button className="bg-green-600 text-white hover:bg-green-700">Success</Button>
      </ComponentSection>

      <ComponentSection
        title="Sizes"
        description="Four sizes for different contexts and hierarchies."
        code={`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Plus /></Button>`}
      >
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon"><Plus /></Button>
      </ComponentSection>

      <ComponentSection
        title="With Icons"
        description="Pair buttons with icons to reinforce meaning."
        code={`<Button><Download /> Download</Button>
<Button>Continue <ArrowRight /></Button>
<Button variant="outline"><Plus /> Add Item</Button>
<Button variant="destructive" size="icon"><Trash2 /></Button>
<Button variant="ghost" size="icon"><Heart /></Button>`}
      >
        <Button><Download /> Download</Button>
        <Button>Continue <ArrowRight /></Button>
        <Button variant="outline"><Plus /> Add Item</Button>
        <Button variant="destructive" size="icon"><Trash2 /></Button>
        <Button variant="ghost" size="icon"><Heart /></Button>
      </ComponentSection>

      <ComponentSection
        title="States"
        description="Disabled and loading states for asynchronous operations."
        code={`<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled</Button>
<Button disabled>
  <Loader2 className="animate-spin" /> Loading…
</Button>`}
      >
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>Disabled</Button>
        <Button disabled={loading} onClick={handleLoad}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Loading…" : "Click to Load"}
        </Button>
        <Button variant="outline" disabled={loading} onClick={handleLoad}>
          {loading && <Loader2 className="animate-spin" />}
          {loading ? "Loading…" : "Click to Load"}
        </Button>
      </ComponentSection>

      <ComponentSection
        title="Link Variant"
        description="Text-style buttons that look like hyperlinks."
        code={`<Button variant="link">Visit documentation</Button>
<Button variant="link">Learn more →</Button>`}
      >
        <Button variant="link">Visit documentation</Button>
        <Button variant="link">Learn more →</Button>
      </ComponentSection>

      <ComponentSection
        title="Toggle"
        description="Two-state buttons for formatting and on/off controls."
        code={`import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

<Toggle aria-label="Toggle bold"><Bold /></Toggle>

<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold" aria-label="Bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><Italic /></ToggleGroupItem>
</ToggleGroup>`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Toggle aria-label="Toggle bold">
              <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle aria-label="Toggle italic">
              <Italic className="w-4 h-4" />
            </Toggle>
            <Toggle aria-label="Toggle underline" variant="outline">
              <Underline className="w-4 h-4" />
            </Toggle>
          </div>
          <ToggleGroup type="single" defaultValue="left">
            <ToggleGroupItem value="left" aria-label="Align left">
              <AlignLeft className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
              <AlignCenter className="w-4 h-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
              <AlignRight className="w-4 h-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </ComponentSection>
    </div>
  );
}
