import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Separator } from "../components/ui/separator";

const tags = Array.from({ length: 50 }, (_, i) => `v1.0.${i}`);

const artworks = [
  { artist: "Olivia Martin", email: "m@example.com" },
  { artist: "Isabella Nguyen", email: "isabella.nguyen@email.com" },
  { artist: "Emily Wilson", email: "emily@example.com" },
  { artist: "William Kim", email: "will@email.com" },
  { artist: "Sofia Davis", email: "sofia.davis@email.com" },
];

export const ScrollAreaPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Scroll Area"
        description="Custom scrollbars for overflow content in fixed-height containers."
        badge="Component"
      />

      <ComponentSection
        title="Vertical"
        description="Scroll a list inside a bounded height with a styled scrollbar."
        source="shadcn"
        shadcnComponent="scroll-area"
        accessibility="ScrollArea preserves keyboard scrolling; content remains reachable without a mouse."
        code={`import { ScrollArea } from "@/components/ui/scroll-area";

<ScrollArea className="h-72 w-48 rounded-md border">
  <div className="p-4">
    {tags.map((tag) => (
      <div key={tag}>{tag}</div>
    ))}
  </div>
</ScrollArea>`}
      >
        <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {tags.map((tag) => (
              <div key={tag}>
                <div className="text-sm">{tag}</div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </ComponentSection>

      <ComponentSection
        title="Horizontal"
        description="Add ScrollBar with horizontal orientation for wide content."
        source="shadcn"
        shadcnComponent="scroll-area"
        code={`<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {items.map((item) => (
      <figure key={item} className="shrink-0">
        <div className="h-32 w-32 rounded-md bg-muted" />
        <figcaption className="pt-2 text-xs text-muted-foreground">{item}</figcaption>
      </figure>
    ))}
  </div>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
      >
        <ScrollArea className="w-full max-w-md whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {["Photo", "Artwork", "Portrait", "Landscape", "Abstract", "Sketch"].map(
              (item) => (
                <figure key={item} className="shrink-0">
                  <div className="flex h-32 w-32 items-center justify-center rounded-md bg-muted text-sm text-muted-foreground">
                    {item}
                  </div>
                  <figcaption className="pt-2 text-xs text-muted-foreground">{item}</figcaption>
                </figure>
              ),
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </ComponentSection>

      <ComponentSection
        title="Contact List"
        description="A common pattern — scrollable list with separators between rows."
        source="shadcn"
        shadcnComponent="scroll-area"
        code={`<ScrollArea className="h-72 w-full max-w-sm rounded-md border">
  <div className="p-4">
    {people.map((person) => (
      <div key={person.email}>
        <div className="text-sm font-medium">{person.name}</div>
        <div className="text-sm text-muted-foreground">{person.email}</div>
        <Separator className="my-2" />
      </div>
    ))}
  </div>
</ScrollArea>`}
      >
        <ScrollArea className="h-72 w-full max-w-sm rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Contacts</h4>
            {artworks.map((person) => (
              <div key={person.email}>
                <div className="text-sm font-medium">{person.artist}</div>
                <div className="text-sm text-muted-foreground">{person.email}</div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </ComponentSection>
    </div>
  );
};
