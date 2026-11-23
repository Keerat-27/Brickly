import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Info, CheckCircle2, AlertTriangle, XCircle, X, AlertCircle } from "lucide-react";
import { useState } from "react";

const DismissibleAlert = ({
  children,
  title,
  variant,
  icon,
}: {
  children: React.ReactNode;
  title?: string;
  variant?: "default" | "info" | "success" | "warning" | "destructive";
  icon: React.ReactNode;
}) => {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <Alert variant={variant} className="pr-11">
      {icon}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
        className="absolute top-2 right-2 grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
      >
        <X className="size-4" />
      </button>
    </Alert>
  );
}

export const AlertsPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Alerts"
        description="Contextual feedback messages for success, errors, warnings, and informational notices."
        badge="Component"
      />

      <ComponentSection
        title="Variants"
        description="Five semantic variants. Colour sits on the fill, border and icon; the text stays readable in both themes."
        code={`import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

<Alert>
  <Info />
  <AlertDescription>Your account information has been updated.</AlertDescription>
</Alert>
<Alert variant="info">
  <Info />
  <AlertDescription>A new version is available.</AlertDescription>
</Alert>
<Alert variant="success">
  <CheckCircle2 />
  <AlertDescription>Payment was processed successfully.</AlertDescription>
</Alert>
<Alert variant="warning">
  <AlertTriangle />
  <AlertDescription>Your subscription will expire in 7 days.</AlertDescription>
</Alert>
<Alert variant="destructive">
  <XCircle />
  <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
</Alert>`}
      >
        <div className="flex flex-col gap-3 w-full">
          <Alert>
            <Info />
            <AlertDescription>Your account information has been updated.</AlertDescription>
          </Alert>
          <Alert variant="info">
            <Info />
            <AlertDescription>A new version is available.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircle2 />
            <AlertDescription>Payment was processed successfully.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTriangle />
            <AlertDescription>Your subscription will expire in 7 days.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle />
            <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
          </Alert>
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Title"
        description="Add a title for more structured alert messages."
        code={`<Alert variant="info">
  <Info />
  <AlertTitle>New feature available</AlertTitle>
  <AlertDescription>
    Check out the new dashboard experience in settings.
  </AlertDescription>
</Alert>`}
      >
        <div className="flex flex-col gap-3 w-full">
          <Alert variant="info">
            <Info />
            <AlertTitle>New feature available</AlertTitle>
            <AlertDescription>Check out the new dashboard experience in settings.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <CheckCircle2 />
            <AlertTitle>Changes saved</AlertTitle>
            <AlertDescription>Your profile has been updated and is now visible to others.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTriangle />
            <AlertTitle>Action required</AlertTitle>
            <AlertDescription>Please verify your email address before continuing.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <XCircle />
            <AlertTitle>Connection lost</AlertTitle>
            <AlertDescription>Unable to reach the server. Check your network and try again.</AlertDescription>
          </Alert>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Dismissible"
        description="Allow users to close alerts they no longer need."
        code={`const [visible, setVisible] = useState(true);
if (!visible) return null;

<Alert variant="info" className="pr-11">
  <Info />
  <AlertTitle>Welcome back!</AlertTitle>
  <AlertDescription>You have 3 unread notifications.</AlertDescription>
  <button
    type="button"
    aria-label="Dismiss"
    onClick={() => setVisible(false)}
    className="absolute top-2 right-2 grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
  >
    <X className="size-4" />
  </button>
</Alert>`}
      >
        <div className="flex flex-col gap-3 w-full">
          <DismissibleAlert title="Welcome back!" variant="info" icon={<Info />}>
            You have 3 unread notifications waiting for you.
          </DismissibleAlert>
          <DismissibleAlert variant="success" icon={<CheckCircle2 />}>
            Your changes have been saved successfully.
          </DismissibleAlert>
          <DismissibleAlert title="Beta feature" variant="warning" icon={<AlertTriangle />}>
            This feature is still in beta and may have some limitations.
          </DismissibleAlert>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Toast-style (inline)"
        description="Compact inline notifications for non-critical feedback."
        code={`<div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground text-background text-sm">
  <CheckCircle2 className="w-4 h-4 text-success" />
  Copied to clipboard!
</div>`}
      >
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground text-background text-sm">
            <CheckCircle2 className="w-4 h-4 text-success" />
            Copied to clipboard!
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground text-background text-sm">
            <AlertCircle className="w-4 h-4 text-warning" />
            File too large (max 5MB)
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-foreground text-background text-sm">
            <XCircle className="w-4 h-4 text-destructive" />
            Upload failed
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
