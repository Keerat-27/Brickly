import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";

export const TypographyPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Typography"
        description="Type scale, body text, code, links, and special text treatments. Color and font tokens are documented on the Design Tokens page."
        badge="Component"
      />

      <ComponentSection
        title="Headings"
        description="Semantic heading levels with consistent size and weight."
        source="custom"
        code={`<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>`}
      >
        <div className="space-y-3 w-full">
          <h1 className="text-foreground">Heading 1 — The quick brown fox</h1>
          <h2 className="text-foreground">Heading 2 — The quick brown fox</h2>
          <h3 className="text-foreground">Heading 3 — The quick brown fox</h3>
          <h4 className="text-foreground">Heading 4 — The quick brown fox</h4>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Body Text"
        description="Regular paragraph text in different sizes."
        source="custom"
        code={`<p className="text-lg text-foreground">Large — Lorem ipsum dolor sit amet.</p>
<p className="text-base text-foreground">Base — Lorem ipsum dolor sit amet.</p>
<p className="text-sm text-muted-foreground">Small — Lorem ipsum dolor sit amet.</p>
<p className="text-xs text-muted-foreground">Extra small — Lorem ipsum dolor sit amet.</p>`}
      >
        <div className="space-y-3 w-full">
          <p className="text-lg text-foreground">
            Large — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="text-base text-foreground">
            Base — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
          </p>
          <p className="text-sm text-muted-foreground">
            Small — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
          <p className="text-xs text-muted-foreground">
            Extra small — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Text Styles"
        description="Bold, italic, underline, strikethrough, and highlight treatments."
        source="custom"
        code={`<span className="font-semibold">Semibold text</span>
<span className="italic text-muted-foreground">Italic text</span>
<span className="underline underline-offset-2">Underlined text</span>
<span className="line-through text-muted-foreground">Strikethrough text</span>
<mark className="bg-amber-100 text-amber-900 px-1 rounded">Highlighted text</mark>`}
      >
        <div className="flex flex-wrap gap-4 items-center text-sm">
          <span className="font-semibold text-foreground">Semibold text</span>
          <span className="italic text-muted-foreground">Italic text</span>
          <span className="underline underline-offset-2 text-foreground">Underlined text</span>
          <span className="line-through text-muted-foreground">Strikethrough text</span>
          <mark className="bg-amber-100 text-amber-900 px-1 rounded">Highlighted text</mark>
          <span className="text-primary hover:underline cursor-pointer">Link text</span>
          <span className="text-muted-foreground uppercase tracking-widest text-xs">Uppercase label</span>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Code"
        description="Inline code and code block styling."
        source="custom"
        code={`{/* Inline code */}
<code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">npm install react</code>

{/* Code block */}
<pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto">
  <code>const greeting = "Hello, world!";</code>
</pre>`}
      >
        <div className="space-y-4 w-full">
          <p className="text-sm text-foreground">
            Install dependencies with{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-foreground">
              npm install
            </code>{" "}
            and start the dev server using{" "}
            <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-foreground">
              npm run dev
            </code>
            .
          </p>
          <pre className="p-4 rounded-lg bg-muted text-sm font-mono overflow-x-auto text-foreground/90 border border-border">
            <code>{`const Button = ({ children, variant = "primary" }) => {
  return (
    <button className={\`btn btn-\${variant}\`}>
      {children}
    </button>
  );
};`}</code>
          </pre>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Lists"
        description="Unordered and ordered list styles."
        source="custom"
        code={`<ul className="list-disc list-inside space-y-1 text-sm text-foreground">
  <li>First item in the list</li>
  <li>Second item in the list</li>
</ul>
<ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
  <li>Step one</li>
  <li>Step two</li>
</ol>`}
      >
        <div className="flex flex-wrap gap-12">
          <ul className="list-disc list-inside space-y-1 text-sm text-foreground">
            <li>First item in the list</li>
            <li>Second item in the list</li>
            <li>Third item in the list</li>
            <li>Fourth item in the list</li>
          </ul>
          <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
            <li>Install dependencies</li>
            <li>Configure environment</li>
            <li>Run the dev server</li>
            <li>Open in your browser</li>
          </ol>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Blockquote"
        description="Styled blockquotes for pull quotes and callouts."
        source="custom"
        code={`<blockquote className="pl-4 border-l-4 border-primary italic text-muted-foreground">
  "Design is not just what it looks like and feels like. Design is how it works."
  <footer className="mt-1 text-sm not-italic text-muted-foreground">— Steve Jobs</footer>
</blockquote>`}
      >
        <div className="w-full space-y-4">
          <blockquote className="pl-4 border-l-4 border-primary italic text-muted-foreground text-sm">
            "Design is not just what it looks like and feels like. Design is how it works."
            <footer className="mt-1 not-italic text-xs text-muted-foreground">— Steve Jobs</footer>
          </blockquote>
          <blockquote className="pl-4 border-l-4 border-amber-400 italic text-muted-foreground text-sm">
            "Simplicity is the ultimate sophistication."
            <footer className="mt-1 not-italic text-xs text-muted-foreground">— Leonardo da Vinci</footer>
          </blockquote>
        </div>
      </ComponentSection>
    </div>
  );
}
