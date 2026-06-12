import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../components/ui/collapsible";
import { Plus, Minus, ChevronsUpDown } from "lucide-react";

const faqItems = [
  { title: "What is Brickly?", body: "Brickly is a browsable component library and design-system reference built with shadcn/ui patterns and Tailwind CSS. Copy and paste any component into your project." },
  { title: "Does it support dark mode?", body: "Yes — every component uses CSS custom properties so dark mode works out of the box by toggling the html class." },
  { title: "Is TypeScript supported?", body: "Absolutely. All components are written in TypeScript with fully typed props." },
  { title: "Can I customize the styles?", body: "Yes. Modify the Tailwind classes or update the CSS variables in your theme file to match your brand." },
];

const CollapsiblePlusMinus = ({ items }: { items: { title: string; body: string }[] }) => {
  return (
    <div className="space-y-2 w-full">
      {items.map((item, i) => (
        <Collapsible key={i} className="group rounded-lg border border-border overflow-hidden">
          <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-3.5 text-sm text-foreground bg-muted/40 hover:bg-muted/70 transition-colors text-left">
            {item.title}
            <Plus className="w-4 h-4 shrink-0 text-muted-foreground group-data-[state=open]:hidden" />
            <Minus className="w-4 h-4 shrink-0 text-primary hidden group-data-[state=open]:block" />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 py-3 text-sm text-muted-foreground border-t border-border">
            {item.body}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export const AccordionPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Accordion"
        description="Collapsible content sections for FAQs, settings panels, and structured information."
        badge="Component"
      />

      <ComponentSection
        title="Default"
        description="Standard bordered accordion with chevron indicator."
        source="shadcn"
        shadcnComponent="accordion"
        code={`import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

<Accordion type="multiple" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Brickly?</AccordionTrigger>
    <AccordionContent>
      Brickly is a browsable component library built with accessible React components.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion type="multiple" defaultValue={["item-1"]} className="w-full">
          {faqItems.slice(0, 3).map((item, i) => (
            <AccordionItem key={i} value={`item-${i + 1}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSection>

      <ComponentSection
        title="Exclusive (One Open at a Time)"
        description="Only one item can be expanded at a time — ideal for FAQs."
        source="shadcn"
        shadcnComponent="accordion"
        code={`<Accordion type="single" collapsible className="w-full">
  {items.map((item, i) => (
    <AccordionItem key={i} value={\`item-\${i}\`}>
      <AccordionTrigger>{item.title}</AccordionTrigger>
      <AccordionContent>{item.body}</AccordionContent>
    </AccordionItem>
  ))}
</Accordion>`}
      >
        <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSection>

      <ComponentSection
        title="Flush"
        description="Borderless style with bottom dividers — fits seamlessly in cards or panels."
        source="shadcn"
        shadcnComponent="accordion"
        code={`<Accordion type="multiple" className="w-full divide-y divide-border">
  <AccordionItem value="item-1" className="border-none">
    <AccordionTrigger className="hover:no-underline hover:text-primary">
      Question one
    </AccordionTrigger>
    <AccordionContent>Answer text here.</AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <Accordion type="multiple" className="w-full">
          {faqItems.slice(0, 3).map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b last:border-b-0 border-x-0 border-t-0 rounded-none"
            >
              <AccordionTrigger className="hover:no-underline hover:text-primary px-0">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="px-0">{item.body}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ComponentSection>

      <ComponentSection
        title="Collapsible"
        description="Lightweight single-section expand/collapse using the Collapsible primitive."
        source="shadcn"
        shadcnComponent="collapsible"
        code={`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

<Collapsible>
  <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border px-4 py-3">
    Can I use this in production?
    <ChevronsUpDown className="w-4 h-4" />
  </CollapsibleTrigger>
  <CollapsibleContent className="px-4 py-3 text-sm text-muted-foreground">
    Yes. All components are built on Radix UI primitives.
  </CollapsibleContent>
</Collapsible>`}
      >
        <Collapsible className="w-full">
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-foreground hover:bg-muted/40 transition-colors">
            Can I use this in production?
            <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 py-3 text-sm text-muted-foreground border border-t-0 border-border rounded-b-lg -mt-px">
            Yes. All components are built on Radix UI primitives with accessible keyboard support.
          </CollapsibleContent>
        </Collapsible>
      </ComponentSection>

      <ComponentSection
        title="Plus / Minus Icon"
        description="Collapsible items with + / − icons instead of chevrons."
        source="shadcn"
        shadcnComponent="collapsible"
        code={`import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

<Collapsible className="rounded-lg border overflow-hidden">
  <CollapsibleTrigger className="group flex w-full items-center justify-between px-4 py-3.5">
    {item.title}
    <Plus className="group-data-[state=open]:hidden" />
    <Minus className="hidden group-data-[state=open]:block" />
  </CollapsibleTrigger>
  <CollapsibleContent className="px-4 py-3 border-t">{item.body}</CollapsibleContent>
</Collapsible>`}
      >
        <CollapsiblePlusMinus items={faqItems.slice(0, 3)} />
      </ComponentSection>
    </div>
  );
}
