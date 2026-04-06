import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Info, CheckCircle2, AlertTriangle, XCircle, X, AlertCircle } from "lucide-react";
import { useState } from "react";

type AlertType = "info" | "success" | "warning" | "error";

function Alert({
  type = "info",
  title,
  children,
  dismissible,
}: {
  type?: AlertType;
  title?: string;
  children: React.ReactNode;
  dismissible?: boolean;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const styles: Record<AlertType, { bg: string; border: string; icon: React.ReactNode; titleColor: string; textColor: string }> = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      icon: <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />,
      titleColor: "text-blue-900 dark:text-blue-300",
      textColor: "text-blue-800 dark:text-blue-400",
    },
    success: {
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      icon: <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />,
      titleColor: "text-green-900 dark:text-green-300",
      textColor: "text-green-800 dark:text-green-400",
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      icon: <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />,
      titleColor: "text-amber-900 dark:text-amber-300",
      textColor: "text-amber-800 dark:text-amber-400",
    },
    error: {
      bg: "bg-red-50 dark:bg-red-950/30",
      border: "border-red-200 dark:border-red-800",
      icon: <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />,
      titleColor: "text-red-900 dark:text-red-300",
      textColor: "text-red-800 dark:text-red-400",
    },
  };

  const s = styles[type];

  return (
    <div className={`flex gap-3 p-4 rounded-lg border ${s.bg} ${s.border} w-full`}>
      {s.icon}
      <div className="flex-1 min-w-0">
        {title && <p className={`text-sm mb-1 ${s.titleColor}`}>{title}</p>}
        <p className={`text-sm ${s.textColor}`}>{children}</p>
      </div>
      {dismissible && (
        <button
          onClick={() => setVisible(false)}
          className={`shrink-0 ${s.textColor} hover:opacity-70 transition-opacity`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function AlertsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Alerts"
        description="Contextual feedback messages for success, errors, warnings, and informational notices."
        badge="Component"
      />

      <ComponentSection
        title="Variants"
        description="Four semantic types to match the message context."
        code={`<div className="flex gap-3 p-4 rounded-lg border bg-blue-50 border-blue-200">
  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
  <p className="text-sm text-blue-800">Your account information has been updated.</p>
</div>
<div className="flex gap-3 p-4 rounded-lg border bg-green-50 border-green-200">
  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
  <p className="text-sm text-green-800">Payment was processed successfully.</p>
</div>`}
      >
        <div className="flex flex-col gap-3 w-full">
          <Alert type="info">Your account information has been updated.</Alert>
          <Alert type="success">Payment was processed successfully.</Alert>
          <Alert type="warning">Your subscription will expire in 7 days.</Alert>
          <Alert type="error">Failed to save changes. Please try again.</Alert>
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Title"
        description="Add a bold title for more structured alert messages."
        code={`<div className="flex gap-3 p-4 rounded-lg border bg-blue-50 border-blue-200">
  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
  <div>
    <p className="text-sm text-blue-900">New Feature Available</p>
    <p className="text-sm text-blue-800 mt-1">Check out the new dashboard experience in settings.</p>
  </div>
</div>`}
      >
        <div className="flex flex-col gap-3 w-full">
          <Alert type="info" title="New Feature Available">
            Check out the new dashboard experience in settings.
          </Alert>
          <Alert type="success" title="Changes Saved">
            Your profile has been updated and is now visible to others.
          </Alert>
          <Alert type="warning" title="Action Required">
            Please verify your email address before continuing.
          </Alert>
          <Alert type="error" title="Connection Lost">
            Unable to reach the server. Check your network and try again.
          </Alert>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Dismissible"
        description="Allow users to close alerts they no longer need."
        code={`function DismissibleAlert() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="flex gap-3 p-4 rounded-lg border bg-blue-50 border-blue-200">
      <Info className="w-4 h-4 text-blue-600 mt-0.5" />
      <p className="flex-1 text-sm text-blue-800">This alert can be dismissed.</p>
      <button onClick={() => setVisible(false)}>
        <X className="w-4 h-4 text-blue-600" />
      </button>
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-3 w-full">
          <Alert type="info" title="Welcome back!" dismissible>
            You have 3 unread notifications waiting for you.
          </Alert>
          <Alert type="success" dismissible>
            Your changes have been saved successfully.
          </Alert>
          <Alert type="warning" title="Beta Feature" dismissible>
            This feature is still in beta and may have some limitations.
          </Alert>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Toast-style (inline)"
        description="Compact inline notifications for non-critical feedback."
        code={`<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground text-background text-sm">
  <CheckCircle2 className="w-4 h-4 text-green-400" />
  Copied to clipboard!
</div>`}
      >
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground text-background text-sm">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            Copied to clipboard!
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground text-background text-sm">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            File too large (max 5MB)
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground text-background text-sm">
            <XCircle className="w-4 h-4 text-red-400" />
            Upload failed
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
