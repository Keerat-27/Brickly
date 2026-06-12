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

          <div className="ml-auto flex flex-wrap items-center gap-2">
            {hasImportPaths && (
              <div
                role="group"
                aria-label="Import path style"
                className="flex items-center rounded-md bg-muted p-0.5"
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
                  @/ alias
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
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {fullExampleCopied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-green-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy full example</span>
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