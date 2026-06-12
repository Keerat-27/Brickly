import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { buildFullExample } from "./buildFullExample";
import {
  getShadcnInstallCommand,
  type ShadcnComponentName,
} from "./shadcn-registry";
import {
  type ImportPathStyle,
} from "./transformImportPaths";
import { Check, Code2, Copy, Eye } from "lucide-react";

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
  /** shadcn registry name — derives `npx shadcn@latest add …` when set */
  shadcnComponent?: ShadcnComponentName;
  /** Override the auto-generated shadcn install command */
  installCommand?: string;
  accessibility?: string;
  children: React.ReactNode;
}

export const ComponentSection = ({
  title,
  description,
  code,
  source,
  shadcnComponent,
  installCommand,
  accessibility,
  children,
}: ComponentSectionProps) => {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [importPathStyle, setImportPathStyle] =
    useState<ImportPathStyle>("alias");
  const [fullExampleCopied, setFullExampleCopied] = useState(false);
  const tabId = title.toLowerCase().replace(/\s+/g, "-");
  const resolvedInstallCommand =
    installCommand ??
    (shadcnComponent ? getShadcnInstallCommand(shadcnComponent) : undefined);

  const handleCopyFullExample = () => {
    const text = buildFullExample(
      code,
      importPathStyle,
      resolvedInstallCommand,
    );
    navigator.clipboard.writeText(text);
    setFullExampleCopied(true);
    setTimeout(() => setFullExampleCopied(false), 2000);
  };

  const hasImportPaths =
    code.includes("@/components/ui/") ||
    code.includes("@/app/components/ui/") ||
    code.includes("../components/ui/");

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
        <div className="flex flex-col gap-2 border-b border-border bg-muted/50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-4 sm:py-2.5">
          <div
            role="tablist"
            aria-label={`${title} view`}
            className="flex w-fit shrink-0 items-center rounded-lg bg-muted p-0.5 gap-0.5"
          >
            <button
              type="button"
              role="tab"
              id={`${tabId}-preview-tab`}
              aria-selected={tab === "preview"}
              aria-controls={`${tabId}-preview-panel`}
              onClick={() => setTab("preview")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-all sm:px-3 ${
                tab === "preview"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3.5 w-3.5 shrink-0" />
              Preview
            </button>
            <button
              type="button"
              role="tab"
              id={`${tabId}-code-tab`}
              aria-selected={tab === "code"}
              aria-controls={`${tabId}-code-panel`}
              onClick={() => setTab("code")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition-all sm:px-3 ${
                tab === "code"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Code2 className="h-3.5 w-3.5 shrink-0" />
              Code
            </button>
          </div>

          <div className="flex min-w-0 items-center justify-between gap-2 sm:ml-auto sm:justify-end">
            {tab === "code" && hasImportPaths && (
              <div
                role="group"
                aria-label="Import path style"
                className="flex shrink-0 items-center rounded-md bg-muted p-0.5"
              >
                <button
                  type="button"
                  aria-pressed={importPathStyle === "alias"}
                  onClick={() => setImportPathStyle("alias")}
                  className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                    importPathStyle === "alias"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="sm:hidden">@/</span>
                  <span className="hidden sm:inline">@/ alias</span>
                </button>
                <button
                  type="button"
                  aria-pressed={importPathStyle === "relative"}
                  onClick={() => setImportPathStyle("relative")}
                  className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                    importPathStyle === "relative"
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Relative
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={handleCopyFullExample}
              aria-label={
                fullExampleCopied ? "Copied full example" : "Copy full example"
              }
              className="ml-auto flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:ml-0 sm:px-2.5"
            >
              {fullExampleCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 shrink-0 text-green-500" />
                  <span className="hidden text-green-500 sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline">Copy full example</span>
                </>
              )}
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
            <CodeBlock
              code={code}
              seamless
              installCommand={resolvedInstallCommand}
              importPathStyle={importPathStyle}
              onImportPathStyleChange={setImportPathStyle}
            />
          </div>
        )}
      </div>
    </div>
  );
}