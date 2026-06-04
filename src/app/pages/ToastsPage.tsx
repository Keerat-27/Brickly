import { useState, useCallback, useEffect } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X,
  Bell,
  Loader2,
} from "lucide-react";

type ToastType = "success" | "error" | "warning" | "info" | "loading" | "default";

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

function Toast({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: string) => void }) {
  useEffect(() => {
    if (toast.type === "loading") return;
    const t = setTimeout(() => onDismiss(toast.id), toast.duration ?? 4000);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  const config: Record<ToastType, { icon: React.ReactNode; bar: string }> = {
    success: { icon: <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />, bar: "bg-green-500" },
    error:   { icon: <XCircle      className="w-4 h-4 text-red-500   shrink-0" />, bar: "bg-red-500"   },
    warning: { icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />, bar: "bg-amber-500" },
    info:    { icon: <Info          className="w-4 h-4 text-blue-500  shrink-0" />, bar: "bg-blue-500"  },
    loading: { icon: <Loader2      className="w-4 h-4 text-primary    shrink-0 animate-spin" />, bar: "bg-primary" },
    default: { icon: <Bell          className="w-4 h-4 text-foreground shrink-0" />, bar: "bg-border"   },
  };

  const { icon, bar } = config[toast.type];

  return (
    <div className="relative flex gap-3 items-start bg-background border border-border rounded-xl shadow-lg p-4 w-full max-w-sm overflow-hidden">
      <div className={`absolute left-0 inset-y-0 w-1 rounded-l-xl ${bar}`} />
      <div className="pl-1">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{toast.description}</p>
        )}
        {toast.action && (
          <Button
            variant="link"
            size="sm"
            onClick={toast.action.onClick}
            className="mt-1 h-auto p-0 text-xs text-primary"
          >
            {toast.action.label}
          </Button>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDismiss(toast.id)}
        className="h-5 w-5 text-muted-foreground hover:text-foreground shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

let _uid = 0;
function uid() { return String(++_uid); }

function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const add = useCallback((toast: Omit<ToastItem, "id">) => {
    const id = uid();
    setToasts((prev) => [...prev, { ...toast, id }]);
    return id;
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, add, dismiss };
}

function ToastDemo({
  toasts,
  dismiss,
  position = "bottom-right",
}: {
  toasts: ToastItem[];
  dismiss: (id: string) => void;
  position?: "top-right" | "top-center" | "bottom-right" | "bottom-center";
}) {
  const pos = {
    "top-right":    "top-4 right-4",
    "top-center":   "top-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-center":"bottom-4 left-1/2 -translate-x-1/2",
  }[position];

  return (
    <div className={`fixed z-[100] flex flex-col gap-2 ${pos}`} style={{ pointerEvents: "none" }}>
      {toasts.map((t) => (
        <div key={t.id} style={{ pointerEvents: "auto" }}>
          <Toast toast={t} onDismiss={dismiss} />
        </div>
      ))}
    </div>
  );
}

export function ToastsPage() {
  const { toasts, add, dismiss } = useToasts();

  return (
    <div className="space-y-10">
      <PageHeader
        title="Toasts"
        description="Non-intrusive notification messages that appear briefly and disappear automatically."
        badge="Component"
      />

      <ToastDemo toasts={toasts} dismiss={dismiss} />

      <ComponentSection
        title="Types"
        description="Four semantic types — success, error, warning, and info — plus a neutral default."
        code={`import { Button } from "@/components/ui/button";

<Button className="bg-green-600 text-white hover:bg-green-700" onClick={() => add({ type: "success", title: "Saved!" })}>
  Success
</Button>
<Button variant="destructive" onClick={() => add({ type: "error", title: "Error!" })}>
  Error
</Button>`}
      >
        <div className="flex flex-wrap gap-2">
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => add({ type: "success", title: "Saved successfully!", description: "Your changes have been saved." })}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Success
          </Button>
          <Button
            variant="destructive"
            onClick={() => add({ type: "error", title: "Something went wrong.", description: "Please try again later." })}
          >
            <XCircle className="w-3.5 h-3.5" /> Error
          </Button>
          <Button
            className="bg-amber-500 text-white hover:bg-amber-600"
            onClick={() => add({ type: "warning", title: "Low disk space.", description: "Only 2 GB remaining." })}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Warning
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => add({ type: "info", title: "New update available.", description: "v2.1.0 is ready to install." })}
          >
            <Info className="w-3.5 h-3.5" /> Info
          </Button>
          <Button
            variant="outline"
            onClick={() => add({ type: "default", title: "You have a new message." })}
          >
            <Bell className="w-3.5 h-3.5" /> Default
          </Button>
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Description"
        description="Add a secondary line for more context."
        code={`add({
  type: "success",
  title: "File uploaded",
  description: "report-q4.pdf · 2.4 MB",
})`}
      >
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={() => add({ type: "success", title: "File uploaded", description: "report-q4.pdf · 2.4 MB" })}
        >
          Show toast with description
        </Button>
      </ComponentSection>

      <ComponentSection
        title="With Action"
        description="Include a clickable action link inside the notification."
        code={`add({
  type: "info",
  title: "Update available",
  description: "Version 2.1.0 is ready.",
  action: {
    label: "Install now",
    onClick: () => console.log("installing…"),
  },
})`}
      >
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() =>
            add({
              type: "info",
              title: "Update available",
              description: "Version 2.1.0 is ready.",
              action: { label: "Install now →", onClick: () => {} },
            })
          }
        >
          Show toast with action
        </Button>
      </ComponentSection>

      <ComponentSection
        title="Loading"
        description="A persistent spinner toast for async operations — dismiss manually."
        code={`const id = add({ type: "loading", title: "Uploading file…" });
// Later, dismiss when done:
dismiss(id);`}
      >
        <div className="flex gap-2">
          <Button
            onClick={() => add({ type: "loading", title: "Uploading file…", description: "This won't auto-dismiss.", duration: 999999 })}
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Show loading
          </Button>
          <Button variant="outline" onClick={() => toasts.forEach((t) => dismiss(t.id))}>
            Dismiss all
          </Button>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Anatomy"
        description="An inline static preview showing all toast elements at once."
        code={`<div className="relative flex gap-3 items-start bg-background border border-border rounded-xl shadow-lg p-4 overflow-hidden">
  {/* accent bar */}
  <div className="absolute left-0 inset-y-0 w-1 rounded-l-xl bg-green-500" />
  {/* icon */}
  <CheckCircle2 className="w-4 h-4 text-green-500" />
  {/* content */}
  <div>
    <p className="text-sm text-foreground">Title</p>
    <p className="text-xs text-muted-foreground">Description text</p>
    <Button variant="link" size="sm" className="h-auto p-0 text-xs">Action label</Button>
  </div>
  {/* dismiss */}
  <Button variant="ghost" size="icon" className="h-5 w-5"><X /></Button>
</div>`}
      >
        <div className="w-full max-w-sm">
          <div className="relative flex gap-3 items-start bg-background border border-border rounded-xl shadow-md p-4 overflow-hidden">
            <div className="absolute left-0 inset-y-0 w-1 rounded-l-xl bg-green-500" />
            <div className="pl-1"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /></div>
            <div className="flex-1">
              <p className="text-sm text-foreground">Payment received</p>
              <p className="text-xs text-muted-foreground mt-0.5">$129.00 was added to your balance.</p>
              <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs text-primary">
                View transaction →
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
