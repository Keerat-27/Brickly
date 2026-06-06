import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Check, User, CreditCard, Package, Truck, ChevronRight } from "lucide-react";

type StepStatus = "complete" | "current" | "upcoming";

interface Step {
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

const HorizontalStepper = ({ steps, current }: { steps: Step[]; current: number }) => {
  const status =(i: number): StepStatus  => {
    if (i < current) return "complete";
    if (i === current) return "current";
    return "upcoming";
  }

  return (
    <nav className="flex items-start w-full">
      {steps.map((step, i) => {
        const s = status(i);
        return (
          <div key={i} className="flex flex-1 items-start">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 transition-colors ${
                  s === "complete"
                    ? "bg-primary text-primary-foreground"
                    : s === "current"
                    ? "bg-primary/15 border-2 border-primary text-primary"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {s === "complete" ? <Check className="w-3.5 h-3.5" /> : i + 1}
              </div>
              <div className="text-center mt-2">
                <p className={`text-xs ${s === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}>
                  {step.label}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
                )}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px mt-4 mx-2 relative">
                <div className="absolute inset-0 bg-border" />
                {s === "complete" && <div className="absolute inset-0 bg-primary" />}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

const VerticalStepper = ({
  steps,
  current,
}: {
  steps: (Step & { content?: React.ReactNode })[];
  current: number;
}) => {
  const status =(i: number): StepStatus  => {
    if (i < current) return "complete";
    if (i === current) return "current";
    return "upcoming";
  }

  return (
    <div className="relative flex flex-col gap-0 w-full max-w-md">
      {steps.map((step, i) => {
        const s = status(i);
        const isLast = i === steps.length - 1;
        return (
          <div key={i} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 transition-colors ${
                  s === "complete"
                    ? "bg-primary text-primary-foreground"
                    : s === "current"
                    ? "bg-primary/15 border-2 border-primary text-primary"
                    : "bg-muted text-muted-foreground border border-border"
                }`}
              >
                {s === "complete" ? <Check className="w-3.5 h-3.5" /> : step.icon ?? <span>{i + 1}</span>}
              </div>
              {!isLast && (
                <div className={`w-0.5 flex-1 my-1 ${i < current ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
            <div className={`pb-6 flex-1 ${isLast ? "pb-0" : ""}`}>
              <p className={`text-sm mt-1 ${s === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}>
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              )}
              {s === "current" && step.content && (
                <div className="mt-3">{step.content}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const IconStepper = ({ steps, current }: { steps: Step[]; current: number }) => {
  return (
    <nav className="flex items-center gap-0 w-full">
      {steps.map((step, i) => {
        const s: StepStatus = i < current ? "complete" : i === current ? "current" : "upcoming";
        return (
          <div key={i} className="flex flex-1 items-center">
            <div className="flex flex-col items-center flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  s === "complete"
                    ? "bg-primary text-primary-foreground"
                    : s === "current"
                    ? "bg-primary/10 border-2 border-primary text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s === "complete" ? <Check className="w-4 h-4" /> : step.icon}
              </div>
              <span className={`text-xs mt-1.5 text-center ${s === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px relative mx-2 mb-5">
                <div className="absolute inset-0 bg-border" />
                {s === "complete" && <div className="absolute inset-0 bg-primary" />}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

const Wizard = () => {
  const [step, setStep] = useState(0);
  const steps = ["Account", "Details", "Review", "Done"];
  const panels = [
    <div className="space-y-3">
      <div className="space-y-1">
        <Label>Email</Label>
        <Input placeholder="you@example.com" type="email" />
      </div>
      <div className="space-y-1">
        <Label>Password</Label>
        <Input type="password" placeholder="••••••••" />
      </div>
    </div>,
    <div className="space-y-3">
      <div className="space-y-1">
        <Label>Full name</Label>
        <Input placeholder="Jane Smith" />
      </div>
      <div className="space-y-1">
        <Label>Company</Label>
        <Input placeholder="Acme Inc." />
      </div>
    </div>,
    <div className="rounded-xl border border-border p-4 space-y-2 text-sm">
      <p className="text-muted-foreground">Please confirm your details before submitting.</p>
      <p><span className="text-muted-foreground">Email:</span> <span className="text-foreground">you@example.com</span></p>
      <p><span className="text-muted-foreground">Name:</span> <span className="text-foreground">Jane Smith</span></p>
    </div>,
    <div className="text-center py-4">
      <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
        <Check className="w-6 h-6 text-green-600" />
      </div>
      <p className="text-foreground">You're all set!</p>
      <p className="text-sm text-muted-foreground mt-1">Your account has been created.</p>
    </div>,
  ];

  return (
    <div className="w-full max-w-md space-y-6">
      <HorizontalStepper steps={steps.map((s) => ({ label: s }))} current={step} />
      <div className="rounded-xl border border-border p-5 bg-background">
        {panels[step]}
      </div>
      <div className="flex justify-between">
        <Button variant="outline" disabled={step === 0} onClick={() => setStep((p) => p - 1)}>
          Back
        </Button>
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep((p) => p + 1)} className="inline-flex items-center gap-1">
            Continue <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        ) : (
          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => setStep(0)}
          >
            Restart demo
          </Button>
        )}
      </div>
    </div>
  );
}

const orderSteps: (Step & { content?: React.ReactNode })[] = [
  { label: "Order placed", description: "Apr 1 at 2:34 PM", icon: <Package className="w-3.5 h-3.5" /> },
  { label: "Processing", description: "Estimated Apr 2", icon: <CreditCard className="w-3.5 h-3.5" /> },
  {
    label: "Shipped",
    description: "In transit · Est. Apr 4",
    icon: <Truck className="w-3.5 h-3.5" />,
    content: (
      <div className="rounded-lg bg-muted/50 border border-border px-3 py-2 text-xs text-muted-foreground">
        Tracking: <span className="text-foreground font-mono">1Z999AA1012345678</span>
      </div>
    ),
  },
  { label: "Delivered", icon: <Check className="w-3.5 h-3.5" /> },
];

export const StepperPage = () => {
  const [hStep, setHStep] = useState(1);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Stepper"
        description="Visual step indicators for multi-step forms, wizards, and progress flows."
        badge="Component"
      />

      <ComponentSection
        title="Horizontal"
        description="Left-to-right step track with a connector line between steps."
        code={`function HorizontalStepper({ steps, current }) {
  return (
    <nav className="flex items-start w-full">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-1 items-start">
          <div className="flex flex-col items-center">
            <div className={\`w-8 h-8 rounded-full ... \${
              i < current ? "bg-primary text-primary-foreground" :
              i === current ? "border-2 border-primary text-primary" :
              "bg-muted text-muted-foreground"\`}>
              {i < current ? <Check /> : i + 1}
            </div>
            <p className="text-xs mt-2">{step.label}</p>
          </div>
          {i < steps.length - 1 && <div className="flex-1 h-px mt-4 mx-2 bg-border" />}
        </div>
      ))}
    </nav>
  );
}`}
      >
        <div className="w-full space-y-4">
          <HorizontalStepper
            steps={[
              { label: "Account", description: "Create login" },
              { label: "Profile", description: "Add details" },
              { label: "Review", description: "Check info" },
              { label: "Done", description: "All set!" },
            ]}
            current={hStep}
          />
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" disabled={hStep === 0} onClick={() => setHStep((p) => p - 1)}>
              Back
            </Button>
            <Button size="sm" disabled={hStep === 3} onClick={() => setHStep((p) => p + 1)}>
              Next
            </Button>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Vertical"
        description="Top-to-bottom stepper with expandable content for the active step."
        code={`<div className="flex flex-col gap-0">
  {steps.map((step, i) => (
    <div key={i} className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full ...">
          {i < current ? <Check /> : step.icon ?? i + 1}
        </div>
        {!isLast && <div className={\`w-0.5 flex-1 \${i < current ? "bg-primary" : "bg-border"}\`} />}
      </div>
      <div className="pb-6">
        <p>{step.label}</p>
        {i === current && step.content}
      </div>
    </div>
  ))}
</div>`}
      >
        <VerticalStepper steps={orderSteps} current={2} />
      </ComponentSection>

      <ComponentSection
        title="With Icons"
        description="Replace numbers with contextual icons for a richer visual style."
        code={`<div className="w-10 h-10 rounded-full ...">
  {s === "complete" ? <Check /> : step.icon}
</div>`}
      >
        <IconStepper
          steps={[
            { label: "Account",  icon: <User       className="w-4 h-4" /> },
            { label: "Payment",  icon: <CreditCard className="w-4 h-4" /> },
            { label: "Shipping", icon: <Truck      className="w-4 h-4" /> },
            { label: "Confirm",  icon: <Check      className="w-4 h-4" /> },
          ]}
          current={2}
        />
      </ComponentSection>

      <ComponentSection
        title="Interactive Wizard"
        description="A fully interactive multi-step form with back and continue buttons."
        code={`import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<Button variant="outline" disabled={step === 0} onClick={() => setStep(p => p - 1)}>Back</Button>
<Button onClick={() => setStep(p => p + 1)}>
  Continue <ChevronRight className="w-3.5 h-3.5" />
</Button>`}
      >
        <Wizard />
      </ComponentSection>
    </div>
  );
}
