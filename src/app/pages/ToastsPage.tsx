import { toast } from "sonner";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { Toaster } from "../components/ui/sonner";
import { CheckCircle2, AlertTriangle, XCircle, Info, Bell, Loader2 } from "lucide-react";

export const ToastsPage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Toasts"
        description="Non-intrusive notifications powered by Sonner and the shadcn Toaster wrapper."
        badge="Component"
      />

      <Toaster position="bottom-right" richColors closeButton />

      <ComponentSection
        title="Types"
        description="Four semantic types plus a neutral default — all via Sonner."
        source="shadcn"
        shadcnComponent="sonner"
        code={`import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

<Toaster richColors closeButton />
<Button onClick={() => toast.success("Saved successfully!")}>Success</Button>
<Button onClick={() => toast.error("Something went wrong")}>Error</Button>
<Button onClick={() => toast.warning("Low disk space")}>Warning</Button>
<Button onClick={() => toast.info("New update available")}>Info</Button>
<Button onClick={() => toast("You have a new message")}>Default</Button>`}
      >
        <div className="flex flex-wrap gap-2">
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => toast.success("Saved successfully!", { description: "Your changes have been saved." })}
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Success
          </Button>
          <Button
            variant="destructive"
            onClick={() => toast.error("Something went wrong.", { description: "Please try again later." })}
          >
            <XCircle className="w-3.5 h-3.5" /> Error
          </Button>
          <Button
            className="bg-amber-500 text-white hover:bg-amber-600"
            onClick={() => toast.warning("Low disk space.", { description: "Only 2 GB remaining." })}
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Warning
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => toast.info("New update available.", { description: "v2.1.0 is ready to install." })}
          >
            <Info className="w-3.5 h-3.5" /> Info
          </Button>
          <Button variant="outline" onClick={() => toast("You have a new message.")}>
            <Bell className="w-3.5 h-3.5" /> Default
          </Button>
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Description"
        description="Add a secondary line for more context."
        source="shadcn"
        shadcnComponent="sonner"
        code={`toast.success("File uploaded", {
  description: "report-q4.pdf · 2.4 MB",
});`}
      >
        <Button
          className="bg-green-600 text-white hover:bg-green-700"
          onClick={() => toast.success("File uploaded", { description: "report-q4.pdf · 2.4 MB" })}
        >
          Show toast with description
        </Button>
      </ComponentSection>

      <ComponentSection
        title="With Action"
        description="Include a clickable action inside the notification."
        source="shadcn"
        shadcnComponent="sonner"
        code={`toast.info("Update available", {
  description: "Version 2.1.0 is ready.",
  action: {
    label: "Install now",
    onClick: () => console.log("installing…"),
  },
});`}
      >
        <Button
          className="bg-blue-600 text-white hover:bg-blue-700"
          onClick={() =>
            toast.info("Update available", {
              description: "Version 2.1.0 is ready.",
              action: { label: "Install now", onClick: () => {} },
            })
          }
        >
          Show toast with action
        </Button>
      </ComponentSection>

      <ComponentSection
        title="Loading"
        description="Persistent spinner toast for async operations."
        source="shadcn"
        shadcnComponent="sonner"
        code={`const id = toast.loading("Uploading file…");
// Later, dismiss when done:
toast.dismiss(id);
toast.success("Upload complete");`}
      >
        <div className="flex gap-2">
          <Button
            onClick={() => {
              const id = toast.loading("Uploading file…", { description: "This won't auto-dismiss." });
              setTimeout(() => {
                toast.dismiss(id);
                toast.success("Upload complete");
              }, 2500);
            }}
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Show loading
          </Button>
          <Button variant="outline" onClick={() => toast.dismiss()}>
            Dismiss all
          </Button>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Promise"
        description="Automatically resolve or reject based on an async operation."
        source="shadcn"
        shadcnComponent="sonner"
        code={`toast.promise(fetch("/api/save"), {
  loading: "Saving…",
  success: "Saved successfully!",
  error: "Failed to save",
});`}
      >
        <Button
          onClick={() =>
            toast.promise(
              new Promise((resolve) => setTimeout(resolve, 2000)),
              {
                loading: "Saving changes…",
                success: "Saved successfully!",
                error: "Failed to save",
              },
            )
          }
        >
          Run async toast
        </Button>
      </ComponentSection>
    </div>
  );
}
