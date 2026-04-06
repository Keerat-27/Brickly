import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { ChevronDown, Plus, Minus } from "lucide-react";

/* ─── Base accordion ─────────────────────────────── */
function AccordionItem({
  title,
  children,
  variant = "default",
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "flush" | "plus";
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (variant === "flush") {
    return (
      <div className="border-b border-border last:border-0">
        <button
          className="flex w-full items-center justify-between py-4 text-sm text-foreground hover:text-primary transition-colors text-left"
          onClick={() => setOpen(!open)}
        >
          {title}
          <ChevronDown
            className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <div className="pb-4 text-sm text-muted-foreground">{children}</div>
        )}
      </div>
    );
  }

  if (variant === "plus") {
    return (
      <div className="rounded-lg border border-border overflow-hidden">
        <button
          className="flex w-full items-center justify-between px-4 py-3.5 text-sm text-foreground bg-muted/40 hover:bg-muted/70 transition-colors text-left"
          onClick={() => setOpen(!open)}
        >
          {title}
          {open ? (
            <Minus className="w-4 h-4 shrink-0 text-primary" />
          ) : (
            <Plus className="w-4 h-4 shrink-0 text-muted-foreground" />
          )}
        </button>
        {open && (
          <div className="px-4 py-3 text-sm text-muted-foreground border-t border-border">
            {children}
          </div>
        )}
      </div>
    );
  }

  // default
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-sm text-foreground bg-background hover:bg-accent transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown
          className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 text-sm text-muted-foreground border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── Exclusive accordion (only one open at a time) ─ */
function ExclusiveAccordion({ items }: { items: { title: string; body: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2 w-full">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-border overflow-hidden">
          <button
            className="flex w-full items-center justify-between px-5 py-4 text-sm text-foreground bg-background hover:bg-accent transition-colors text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.title}
            <ChevronDown
              className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <div className="px-5 pb-4 pt-2 text-sm text-muted-foreground border-t border-border">
              {item.body}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const faqItems = [
  { title: "What is UIKit?", body: "UIKit is a collection of accessible, customizable React components built with Tailwind CSS. Copy and paste any component into your project." },
  { title: "Does it support dark mode?", body: "Yes — every component uses CSS custom properties so dark mode works out of the box by toggling the html class." },
  { title: "Is TypeScript supported?", body: "Absolutely. All components are written in TypeScript with fully typed props." },
  { title: "Can I customize the styles?", body: "Yes. Modify the Tailwind classes or update the CSS variables in your theme file to match your brand." },
];

export function AccordionPage() {
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
        code={`function AccordionItem({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <button
        className="flex w-full items-center justify-between px-5 py-4 text-sm text-foreground bg-background hover:bg-accent transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown className={\`w-4 h-4 transition-transform \${open ? "rotate-180" : ""}\`} />
      </button>
      {open && (
        <div className="px-5 pb-4 pt-0 text-sm text-muted-foreground border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
}`}
      >
        <div className="space-y-2 w-full">
          <AccordionItem title="What is UIKit?" defaultOpen>
            UIKit is a collection of accessible, customizable React components built with Tailwind CSS.
          </AccordionItem>
          <AccordionItem title="Does it support dark mode?">
            Yes — every component uses CSS custom properties so dark mode works out of the box.
          </AccordionItem>
          <AccordionItem title="Is TypeScript supported?">
            Absolutely. All components are written in TypeScript with fully typed props.
          </AccordionItem>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Exclusive (One Open at a Time)"
        description="Only one item can be expanded at a time — ideal for FAQs."
        code={`function ExclusiveAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-2 w-full">
      {items.map((item, i) => (
        <div key={i} className="rounded-xl border border-border overflow-hidden">
          <button
            className="flex w-full items-center justify-between px-5 py-4 text-sm bg-background hover:bg-accent text-left"
            onClick={() => setOpen(open === i ? null : i)}
          >
            {item.title}
            <ChevronDown className={\`w-4 h-4 transition-transform \${open === i ? "rotate-180" : ""}\`} />
          </button>
          {open === i && (
            <div className="px-5 pb-4 pt-2 text-sm text-muted-foreground border-t border-border">
              {item.body}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}`}
      >
        <ExclusiveAccordion items={faqItems} />
      </ComponentSection>

      <ComponentSection
        title="Flush"
        description="Borderless style with bottom dividers — fits seamlessly in cards or panels."
        code={`<div className="divide-y divide-border">
  <button className="flex w-full items-center justify-between py-4 text-sm hover:text-primary text-left">
    Question one <ChevronDown className="w-4 h-4" />
  </button>
  {open && <div className="pb-4 text-sm text-muted-foreground">Answer text here.</div>}
</div>`}
      >
        <div className="w-full divide-border">
          {faqItems.slice(0, 3).map((item) => (
            <AccordionItem key={item.title} title={item.title} variant="flush">
              {item.body}
            </AccordionItem>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection
        title="Plus / Minus Icon"
        description="Uses + / − icon instead of chevron for a different visual language."
        code={`<button onClick={() => setOpen(!open)}>
  {open ? <Minus className="w-4 h-4 text-primary" /> : <Plus className="w-4 h-4" />}
</button>`}
      >
        <div className="space-y-2 w-full">
          {faqItems.slice(0, 3).map((item) => (
            <AccordionItem key={item.title} title={item.title} variant="plus">
              {item.body}
            </AccordionItem>
          ))}
        </div>
      </ComponentSection>
    </div>
  );
}
