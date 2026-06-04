import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Info, CheckCircle2, AlertTriangle, XCircle, X, AlertCircle } from "lucide-react";
import { useState } from "react";

function DismissibleAlert({
  children,
  title,
  className,
  icon,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
  icon: React.ReactNode;
}) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <Alert className={className}>
      {icon}
      <div className="flex-1 min-w-0">
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{children}</AlertDescription>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute top-3 right-3 opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </Alert>
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
        code={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

<Alert>
  <Info className="h-4 w-4" />
  <AlertDescription>Your account information has been updated.</AlertDescription>
</Alert>

<Alert variant="destructive">
  <XCircle className="h-4 w-4" />
  <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
</Alert>

{/* Extended with className for other semantic colors */}
<Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400">
  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
  <AlertDescription>Payment was processed successfully.</AlertDescription>
</Alert>`}
      >
        <div className="flex flex-col gap-3 w-full">
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-400">
              Your account information has been updated.
            </AlertDescription>
          </Alert>
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-400">
              Payment was processed successfully.
            </AlertDescription>
          </Alert>
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-400">
              Your subscription will expire in 7 days.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to save changes. Please try again.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Title"
        description="Add a title for more structured alert messages."
        code={`<Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
  <AlertTitle className="text-blue-900 dark:text-blue-300">New Feature Available</AlertTitle>
  <AlertDescription className="text-blue-800 dark:text-blue-400">
    Check out the new dashboard experience in settings.
  </AlertDescription>
</Alert>`}
      >
        <div className="flex flex-col gap-3 w-full">
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-900 dark:text-blue-300">New Feature Available</AlertTitle>
            <AlertDescription className="text-blue-800 dark:text-blue-400">
              Check out the new dashboard experience in settings.
            </AlertDescription>
          </Alert>
          <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-900 dark:text-green-300">Changes Saved</AlertTitle>
            <AlertDescription className="text-green-800 dark:text-green-400">
              Your profile has been updated and is now visible to others.
            </AlertDescription>
          </Alert>
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-900 dark:text-amber-300">Action Required</AlertTitle>
            <AlertDescription className="text-amber-800 dark:text-amber-400">
              Please verify your email address before continuing.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Connection Lost</AlertTitle>
            <AlertDescription>
              Unable to reach the server. Check your network and try again.
            </AlertDescription>
          </Alert>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Dismissible"
        description="Allow users to close alerts they no longer need."
        code={`const [visible, setVisible] = useState(true);
if (!visible) return null;

<Alert className="relative border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
  <Info className="h-4 w-4 text-blue-600" />
  <AlertTitle>Welcome back!</AlertTitle>
  <AlertDescription>You have 3 unread notifications.</AlertDescription>
  <button onClick={() => setVisible(false)} className="absolute top-3 right-3 opacity-60 hover:opacity-100">
    <X className="w-4 h-4" />
  </button>
</Alert>`}
      >
        <div className="flex flex-col gap-3 w-full">
          <DismissibleAlert
            title="Welcome back!"
            className="relative border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30"
            icon={<Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
          >
            <span className="text-blue-800 dark:text-blue-400">You have 3 unread notifications waiting for you.</span>
          </DismissibleAlert>
          <DismissibleAlert
            className="relative border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30"
            icon={<CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />}
          >
            <span className="text-green-800 dark:text-green-400">Your changes have been saved successfully.</span>
          </DismissibleAlert>
          <DismissibleAlert
            title="Beta Feature"
            className="relative border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30"
            icon={<AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
          >
            <span className="text-amber-800 dark:text-amber-400">This feature is still in beta and may have some limitations.</span>
          </DismissibleAlert>
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
