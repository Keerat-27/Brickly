import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { Code2, Eye } from "lucide-react";

type ComponentSource = "shadcn" | "custom" | "composition";

const sourceLabels: Record<ComponentSource, string> = {
  shadcn: "shadcn",
  custom: "custom",
  composition: "composition",
};

interface ComponentSectionProps {
  title: string;
  description?: string;
  code: string;
  source?: ComponentSource;
  accessibility?: string;
  children: React.ReactNode;
}

export const ComponentSection = ({
  title,
  description,
  code,
  source,
  accessibility,
  children,
}: ComponentSectionProps) => {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const tabId = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-foreground">{title}</h3>
          {source && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
              {sourceLabels[source]}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
        {accessibility && (
          <p className="text-sm text-muted-foreground mt-1.5">
            <span className="font-medium text-foreground">Accessibility:</span>{" "}
            {accessibility}
          </p>
        )}
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center border-b border-border bg-muted/50 px-4 py-2.5 gap-1">
          <div
            role="tablist"
            aria-label={`${title} view`}
            className="flex items-center bg-muted rounded-lg p-0.5 gap-0.5"
          >
            <button
              type="button"
              role="tab"
              id={`${tabId}-preview-tab`}
              aria-selected={tab === "preview"}
              aria-controls={`${tabId}-preview-panel`}
              onClick={() => setTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-all ${
                tab === "preview"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </button>
            <button
              type="button"
              role="tab"
              id={`${tabId}-code-tab`}
              aria-selected={tab === "code"}
              aria-controls={`${tabId}-code-panel`}
              onClick={() => setTab("code")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md transition-all ${
                tab === "code"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              Code
            </button>
          </div>
        </div>

        {/* Content */}
        {tab === "preview" ? (
          <div
            role="tabpanel"
            id={`${tabId}-preview-panel`}
            aria-labelledby={`${tabId}-preview-tab`}
            className="flex flex-wrap items-center gap-4 p-8 bg-background min-h-28"
          >
            {children}
          </div>
        ) : (
          <div
            role="tabpanel"
            id={`${tabId}-code-panel`}
            aria-labelledby={`${tabId}-code-tab`}
            className="bg-muted"
          >
            <CodeBlock code={code} seamless />
          </div>
        )}
      </div>
    </div>
  );
}