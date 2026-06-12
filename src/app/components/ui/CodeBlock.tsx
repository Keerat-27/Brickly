import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  seamless?: boolean;
  installCommand?: string;
}

export const CodeBlock = ({
  code,
  language = "tsx",
  seamless = false,
  installCommand,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [installCopied, setInstallCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
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
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="rounded-md bg-background/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span className="text-green-500">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy example</span>
              </>
            )}
          </button>
        </div>
        <pre className="overflow-x-auto p-4 text-sm font-mono leading-relaxed text-foreground/90 whitespace-pre-wrap break-all">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
