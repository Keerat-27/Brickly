import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { Code2, Eye } from "lucide-react";

interface ComponentSectionProps {
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
}

export const ComponentSection = ({
  title,
  description,
  code,
  children,
}: ComponentSectionProps) => {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        {/* Tab bar */}
        <div className="flex items-center border-b border-border bg-muted/50 px-4 py-2.5 gap-1">
          <div className="flex items-center bg-muted rounded-lg p-0.5 gap-0.5">
            <button
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
          <div className="flex flex-wrap items-center gap-4 p-8 bg-background min-h-28">
            {children}
          </div>
        ) : (
          <div className="bg-muted">
            <CodeBlock code={code} seamless />
          </div>
        )}
      </div>
    </div>
  );
}