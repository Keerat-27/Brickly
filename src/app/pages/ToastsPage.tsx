import { useState, useCallback, useEffect } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  X,
  Bell,
  Loader2,
} from "lucide-react";

/* ─── Toast types ────────────────────────────────── */
type ToastType = "success" | "error" | "warning" | "info" | "loading" | "default";

interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  duration?: number;
}

/* ─── Single toast component ─────────────────────── */
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
      {/* colour accent bar */}
      <div className={`absolute left-0 inset-y-0 w-1 rounded-l-xl ${bar}`} />
      <div className="pl-1">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{toast.description}</p>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className="mt-2 text-xs text-primary hover:underline"
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ─── Toast container / hook ─────────────────────── */
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

/* ─── Demo container (inline, positioned relative to section) ── */
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

/* ─── Page ───────────────────────────────────────── */
function Btn({ children, onClick, color = "default" }: { children: React.ReactNode; onClick: () => void; color?: string }) {
  const colors: Record<string, string> = {
    default:  "bg-foreground text-background",
    success:  "bg-green-600 text-white",
    error:    "bg-red-600 text-white",
    warning:  "bg-amber-500 text-white",
    info:     "bg-blue-600 text-white",
    loading:  "bg-primary text-primary-foreground",
    outline:  "border border-border text-foreground hover:bg-accent",
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all active:scale-95 ${colors[color] ?? colors.default}`}
    >
      {children}
    </button>
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
        code={`<Toast type="success" title="Saved successfully!" />
<Toast type="error"   title="Something went wrong." />
<Toast type="warning" title="Low disk space." />
<Toast type="info"    title="New update available." />
<Toast type="default" title="You have a new message." />`}
      >
        <div className="flex flex-wrap gap-2">
          <Btn color="success" onClick={() => add({ type: "success", title: "Saved successfully!", description: "Your changes have been saved." })}>
            <CheckCircle2 className="w-3.5 h-3.5" /> Success
          </Btn>
          <Btn color="error" onClick={() => add({ type: "error", title: "Something went wrong.", description: "Please try again later." })}>
            <XCircle className="w-3.5 h-3.5" /> Error
          </Btn>
          <Btn color="warning" onClick={() => add({ type: "warning", title: "Low disk space.", description: "Only 2 GB remaining." })}>
            <AlertTriangle className="w-3.5 h-3.5" /> Warning
          </Btn>
          <Btn color="info" onClick={() => add({ type: "info", title: "New update available.", description: "v2.1.0 is ready to install." })}>
            <Info className="w-3.5 h-3.5" /> Info
          </Btn>
          <Btn color="outline" onClick={() => add({ type: "default", title: "You have a new message." })}>
            <Bell className="w-3.5 h-3.5" /> Default
          </Btn>
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
        <Btn color="success" onClick={() => add({ type: "success", title: "File uploaded", description: "report-q4.pdf · 2.4 MB" })}>
          Show toast with description
        </Btn>
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
        <Btn color="info" onClick={() =>
          add({
            type: "info",
            title: "Update available",
            description: "Version 2.1.0 is ready.",
            action: { label: "Install now →", onClick: () => {} },
          })
        }>
          Show toast with action
        </Btn>
      </ComponentSection>

      <ComponentSection
        title="Loading"
        description="A persistent spinner toast for async operations — dismiss manually."
        code={`const id = add({ type: "loading", title: "Uploading file…" });
// Later, dismiss when done:
dismiss(id);`}
      >
        <div className="flex gap-2">
          <Btn color="loading" onClick={() => add({ type: "loading", title: "Uploading file…", description: "This won't auto-dismiss.", duration: 999999 })}>
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Show loading
          </Btn>
          <Btn color="outline" onClick={() => toasts.forEach((t) => dismiss(t.id))}>
            Dismiss all
          </Btn>
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
    <button className="text-xs text-primary">Action label</button>
  </div>
  {/* dismiss */}
  <button><X className="w-3.5 h-3.5" /></button>
</div>`}
      >
        <div className="w-full max-w-sm">
          <div className="relative flex gap-3 items-start bg-background border border-border rounded-xl shadow-md p-4 overflow-hidden">
            <div className="absolute left-0 inset-y-0 w-1 rounded-l-xl bg-green-500" />
            <div className="pl-1"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /></div>
            <div className="flex-1">
              <p className="text-sm text-foreground">Payment received</p>
              <p className="text-xs text-muted-foreground mt-0.5">$129.00 was added to your balance.</p>
              <button className="mt-1.5 text-xs text-primary hover:underline">View transaction →</button>
            </div>
            <button className="text-muted-foreground hover:text-foreground"><X className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
