import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import {
  transformImportPaths,
  type ImportPathStyle,
} from "./transformImportPaths";

interface CodeBlockProps {
  code: string;
  language?: string;
  seamless?: boolean;
  installCommand?: string;
  importPathStyle?: ImportPathStyle;
  onImportPathStyleChange?: (style: ImportPathStyle) => void;
}

export const CodeBlock = ({
  code,
  language = "tsx",
  seamless = false,
  installCommand,
  importPathStyle: controlledImportPathStyle,
  onImportPathStyleChange,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [installCopied, setInstallCopied] = useState(false);
  const [internalImportPathStyle, setInternalImportPathStyle] =
    useState<ImportPathStyle>("alias");

  const importPathStyle = controlledImportPathStyle ?? internalImportPathStyle;
  const setImportPathStyle =
    onImportPathStyleChange ?? setInternalImportPathStyle;
  const isImportPathControlled = controlledImportPathStyle !== undefined;

  const displayCode = transformImportPaths(code, importPathStyle);
  const hasImportPaths =
    code.includes("@/components/ui/") ||
    code.includes("@/app/components/ui/") ||
    code.includes("../components/ui/");
  const showToolbar = !seamless || !isImportPathControlled;

  const handleCopy = () => {
    navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstallCopy = () => {
    if (!installCommand) return;
    navigator.clipboard.writeText(installCommand);
    setInstallCopied(true);
    setTimeout(() => setInstallCopied(false), 2000);
  };

  return (
    <div
      className={
        seamless
          ? "overflow-hidden"
          : "relative overflow-hidden rounded-lg border border-border bg-muted"
      }
    >
      {installCommand && (
        <button
          type="button"
          onClick={handleInstallCopy}
          className="group flex w-full items-center gap-3 border-b border-border bg-primary/5 px-4 py-3 text-left transition-colors hover:bg-primary/10"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Terminal className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-primary">
                shadcn CLI
              </span>
              <span className="text-[10px] text-muted-foreground">
                {installCopied ? "Copied to clipboard" : "Click to copy install command"}
              </span>
            </div>
            <code className="mt-1 block break-all text-xs font-mono text-foreground/90">
              {installCommand}
            </code>
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center text-muted-foreground transition-colors group-hover:text-foreground">
            {installCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </div>
        </button>
      )}

      <div className="relative">
        {showToolbar && (
          <div className="flex flex-col gap-2 border-b border-border px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                {language}
              </span>
              {hasImportPaths && !isImportPathControlled && (
                <div
                  role="group"
                  aria-label="Import path style"
                  className="flex items-center rounded-md bg-background/80 p-0.5"
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
            </div>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied example" : "Copy example"}
              className="ml-auto flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground sm:ml-0 sm:px-2.5"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 shrink-0 text-green-500" />
                  <span className="hidden text-green-500 sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 shrink-0" />
                  <span className="hidden sm:inline">Copy example</span>
                </>
              )}
            </button>
          </div>
        )}
        <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-foreground/90 whitespace-pre-wrap break-all">
          <code>{displayCode}</code>
        </pre>
      </div>
    </div>
  );
};
