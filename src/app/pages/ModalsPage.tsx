import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { useState } from "react";
import { X, AlertTriangle, CheckCircle2 } from "lucide-react";

function Modal({ open, onClose, title, children, footer }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-xl border border-border shadow-xl w-full max-w-md animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="text-foreground">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-accent text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-border flex justify-end gap-2">{footer}</div>
        )}
      </div>
    </div>
  );
}

function Drawer({ open, onClose, title, children }: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-background w-80 h-full border-l border-border shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-foreground">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-accent text-muted-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

export function ModalsPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Modals"
        description="Overlay dialogs for confirmations, forms, alerts, and slide-out drawers."
        badge="Component"
      />

      <ComponentSection
        title="Basic Modal"
        description="A simple dialog with title, content, and action buttons."
        code={`function Modal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-background rounded-xl border border-border shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3>Modal Title</h3>
          <button onClick={onClose}><X className="w-4 h-4" /></button>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-muted-foreground">Modal content goes here.</p>
        </div>
        <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-border text-sm">Cancel</button>
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">Confirm</button>
        </div>
      </div>
    </div>
  );
}`}
      >
        <button
          onClick={() => setBasicOpen(true)}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm"
        >
          Open Modal
        </button>
        <Modal
          open={basicOpen}
          onClose={() => setBasicOpen(false)}
          title="Modal Title"
          footer={
            <>
              <button onClick={() => setBasicOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-accent">Cancel</button>
              <button onClick={() => setBasicOpen(false)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">Confirm</button>
            </>
          }
        >
          <p className="text-sm text-muted-foreground">
            This is a basic modal dialog. You can place any content inside it — text, forms, images, or other components.
          </p>
        </Modal>
      </ComponentSection>

      <ComponentSection
        title="Form Modal"
        description="Modal containing a form for data collection."
        code={`<Modal title="Create Account">
  <div className="space-y-4">
    <div className="space-y-1.5">
      <label className="text-sm">Full Name</label>
      <input className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
    </div>
    <div className="space-y-1.5">
      <label className="text-sm">Email</label>
      <input type="email" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
    </div>
  </div>
</Modal>`}
      >
        <button
          onClick={() => setFormOpen(true)}
          className="px-4 py-2 rounded-lg border border-border text-foreground text-sm hover:bg-accent"
        >
          Open Form Modal
        </button>
        <Modal
          open={formOpen}
          onClose={() => setFormOpen(false)}
          title="Create Account"
          footer={
            <>
              <button onClick={() => setFormOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-foreground">Cancel</button>
              <button onClick={() => setFormOpen(false)} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm">Create</button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm text-foreground">Full Name</label>
              <input placeholder="Alice Johnson" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-foreground">Email</label>
              <input type="email" placeholder="alice@example.com" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm text-foreground">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
          </div>
        </Modal>
      </ComponentSection>

      <ComponentSection
        title="Confirmation Dialog"
        description="Destructive action confirmation with a warning icon."
        code={`<Modal title="Delete Account">
  <div className="flex gap-3">
    <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
    <p className="text-sm text-muted-foreground">
      Are you sure? This action cannot be undone. All data will be permanently deleted.
    </p>
  </div>
</Modal>`}
      >
        <button
          onClick={() => setConfirmOpen(true)}
          className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm"
        >
          Delete Account
        </button>
        <Modal
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          title="Delete Account"
          footer={
            <>
              <button onClick={() => setConfirmOpen(false)} className="px-4 py-2 rounded-lg border border-border text-sm text-foreground">Cancel</button>
              <button onClick={() => setConfirmOpen(false)} className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm">Delete</button>
            </>
          }
        >
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete your account? This action cannot be undone. All your data, projects, and settings will be permanently removed.
            </p>
          </div>
        </Modal>
      </ComponentSection>

      <ComponentSection
        title="Success Modal"
        description="Positive confirmation dialog with a success icon."
        code={`<Modal title="">
  <div className="flex flex-col items-center text-center gap-3 py-4">
    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
      <CheckCircle2 className="w-8 h-8 text-green-600" />
    </div>
    <h3>Payment Successful!</h3>
    <p className="text-sm text-muted-foreground">Your order has been placed.</p>
  </div>
</Modal>`}
      >
        <button
          onClick={() => setSuccessOpen(true)}
          className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700"
        >
          Show Success
        </button>
        <Modal
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          title=""
          footer={
            <button onClick={() => setSuccessOpen(false)} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm w-full">
              Done
            </button>
          }
        >
          <div className="flex flex-col items-center text-center gap-3 py-2">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-foreground">Payment Successful!</h3>
            <p className="text-sm text-muted-foreground">
              Your order has been placed. You'll receive a confirmation email shortly.
            </p>
          </div>
        </Modal>
      </ComponentSection>

      <ComponentSection
        title="Drawer / Slide-over"
        description="Side panel that slides in from the right edge of the screen."
        code={`function Drawer({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-background w-80 h-full border-l border-border shadow-xl">
        ...
      </div>
    </div>
  );
}`}
      >
        <button
          onClick={() => setDrawerOpen(true)}
          className="px-4 py-2 rounded-lg border border-border text-foreground text-sm hover:bg-accent"
        >
          Open Drawer
        </button>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Settings">
          <div className="space-y-5">
            {["Notifications", "Privacy", "Appearance", "Security", "Integrations"].map((item) => (
              <div key={item} className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-foreground">{item}</span>
                <button className="text-xs text-primary">Edit</button>
              </div>
            ))}
          </div>
        </Drawer>
      </ComponentSection>
    </div>
  );
}
