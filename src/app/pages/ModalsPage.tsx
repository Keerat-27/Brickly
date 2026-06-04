import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function ModalsPage() {
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
        code={`import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Modal Title</DialogTitle>
      <DialogDescription>This is a basic modal dialog.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button>Open Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Modal Title</DialogTitle>
              <DialogDescription>
                This is a basic modal dialog. You can place any content inside it — text, forms, images, or other components.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button>Confirm</Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentSection>

      <ComponentSection
        title="Form Modal"
        description="Modal containing a form for data collection."
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Form Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Account</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Alice Johnson" />
      </div>
    </div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Create</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Form Modal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="modal-name">Full Name</Label>
                <Input id="modal-name" placeholder="Alice Johnson" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="modal-email">Email</Label>
                <Input id="modal-email" type="email" placeholder="alice@example.com" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="modal-password">Password</Label>
                <Input id="modal-password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <Button>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentSection>

      <ComponentSection
        title="Confirmation Dialog"
        description="Destructive action confirmation with a warning icon."
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Delete Account</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Delete Account</DialogTitle>
    </DialogHeader>
    <div className="flex gap-3">
      <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
      <DialogDescription>
        Are you sure? This action cannot be undone.
      </DialogDescription>
    </div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Account</DialogTitle>
            </DialogHeader>
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <DialogDescription>
                Are you sure you want to delete your account? This action cannot be undone. All your data, projects, and settings will be permanently removed.
              </DialogDescription>
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </DialogTrigger>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentSection>

      <ComponentSection
        title="Success Modal"
        description="Positive confirmation dialog with a success icon."
        code={`<Dialog>
  <DialogTrigger asChild>
    <Button className="bg-green-600 text-white hover:bg-green-700">Show Success</Button>
  </DialogTrigger>
  <DialogContent>
    <div className="flex flex-col items-center text-center gap-3 py-4">
      <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle2 className="w-8 h-8 text-green-600" />
      </div>
      <DialogTitle>Payment Successful!</DialogTitle>
      <DialogDescription>Your order has been placed.</DialogDescription>
    </div>
    <DialogFooter>
      <Button className="w-full">Done</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-600 text-white hover:bg-green-700">Show Success</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col items-center text-center gap-3 py-2">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <DialogTitle>Payment Successful!</DialogTitle>
              <DialogDescription>
                Your order has been placed. You'll receive a confirmation email shortly.
              </DialogDescription>
            </div>
            <DialogFooter>
              <DialogTrigger asChild>
                <Button className="w-full">Done</Button>
              </DialogTrigger>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentSection>

      <ComponentSection
        title="Drawer / Slide-over"
        description="Side panel that slides in from the right edge of the screen."
        code={`import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Settings</SheetTitle>
    </SheetHeader>
    {/* sheet body */}
  </SheetContent>
</Sheet>`}
      >
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
            </SheetHeader>
            <div className="space-y-5 px-4 py-2">
              {["Notifications", "Privacy", "Appearance", "Security", "Integrations"].map((item) => (
                <div key={item} className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-sm text-foreground">{item}</span>
                  <Button variant="link" size="sm" className="text-xs p-0 h-auto">Edit</Button>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </ComponentSection>
    </div>
  );
}
