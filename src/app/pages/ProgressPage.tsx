import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

function ProgressBar({
  value,
  max = 100,
  label,
  color = "primary",
  size = "md",
  showLabel = false,
  animated = false,
}: {
  value: number;
  max?: number;
  label?: string;
  color?: "primary" | "green" | "blue" | "amber" | "red";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}) {
  const pct = Math.round((value / max) * 100);
  const colors = {
    primary: "bg-primary",
    green: "bg-green-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  };
  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className="w-full space-y-1.5">
      {(label || showLabel) && (
        <div className="flex justify-between text-sm">
          {label && <span className="text-foreground">{label}</span>}
          {showLabel && <span className="text-muted-foreground">{pct}%</span>}
        </div>
      )}
      <div className={`w-full rounded-full bg-muted ${sizes[size]}`}>
        <div
          className={`${sizes[size]} rounded-full ${colors[color]} transition-all duration-700 ${animated ? "animate-pulse" : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function CircularProgress({ value, size = 64, strokeWidth = 6, color = "#030213" }: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-sm text-foreground">{value}%</span>
    </div>
  );
}

const steps = ["Account", "Profile", "Payment", "Confirm"];

export function ProgressPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Progress"
        description="Visual indicators for loading states, task completion, and multi-step workflows."
        badge="Component"
      />

      <ComponentSection
        title="Progress Bars"
        description="Horizontal bars showing completion percentage with color variants."
        code={`<div className="w-full space-y-1.5">
  <div className="flex justify-between text-sm">
    <span>Storage used</span>
    <span className="text-muted-foreground">72%</span>
  </div>
  <div className="h-2 w-full rounded-full bg-muted">
    <div className="h-2 w-[72%] rounded-full bg-primary transition-all duration-700" />
  </div>
</div>`}
      >
        <div className="flex flex-col gap-5 w-full max-w-sm">
          <ProgressBar value={72} label="Storage used" showLabel color="primary" />
          <ProgressBar value={45} label="Downloads" showLabel color="blue" />
          <ProgressBar value={88} label="Performance" showLabel color="green" />
          <ProgressBar value={30} label="Errors" showLabel color="red" />
          <ProgressBar value={60} label="Warnings" showLabel color="amber" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Sizes"
        description="Three heights for different visual weights."
        code={`<div className="h-1 w-full rounded-full bg-muted"><div className="h-1 w-[60%] rounded-full bg-primary" /></div>
<div className="h-2 w-full rounded-full bg-muted"><div className="h-2 w-[60%] rounded-full bg-primary" /></div>
<div className="h-3 w-full rounded-full bg-muted"><div className="h-3 w-[60%] rounded-full bg-primary" /></div>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <ProgressBar value={60} size="sm" label="Small" />
          <ProgressBar value={60} size="md" label="Medium" />
          <ProgressBar value={60} size="lg" label="Large" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Circular Progress"
        description="Radial progress indicators for compact layouts."
        code={`<svg width={64} height={64} className="-rotate-90">
  <circle cx={32} cy={32} r={26} fill="none" stroke="currentColor" strokeWidth={6} className="text-muted" />
  <circle cx={32} cy={32} r={26} fill="none" stroke="#030213" strokeWidth={6}
    strokeDasharray={163.36} strokeDashoffset={163.36 * (1 - 0.75)}
    strokeLinecap="round" className="transition-all" />
</svg>`}
      >
        <div className="flex flex-wrap gap-6 items-center">
          <CircularProgress value={25} size={64} />
          <CircularProgress value={50} size={80} />
          <CircularProgress value={75} size={96} strokeWidth={8} color="#2563eb" />
          <CircularProgress value={90} size={112} strokeWidth={10} color="#16a34a" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Step Progress"
        description="Multi-step workflow indicator showing completed and pending steps."
        code={`<div className="flex items-center">
  {steps.map((step, i) => (
    <div key={step} className="flex items-center">
      <div className={
        i < current ? "w-8 h-8 rounded-full bg-primary flex items-center justify-center" :
        i === current ? "w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center" :
        "w-8 h-8 rounded-full border-2 border-border flex items-center justify-center"
      }>
        {i < current ? <CheckCircle2 className="w-4 h-4 text-primary-foreground" /> :
          <span className={i === current ? "text-primary text-sm" : "text-muted-foreground text-sm"}>{i + 1}</span>
        }
      </div>
      {i < steps.length - 1 && (
        <div className={\`h-0.5 w-16 \${i < current ? "bg-primary" : "bg-border"}\`} />
      )}
    </div>
  ))}
</div>`}
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-center">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center">
                <button
                  onClick={() => setCurrentStep(i)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    i < currentStep
                      ? "bg-primary"
                      : i === currentStep
                      ? "border-2 border-primary bg-background"
                      : "border-2 border-border bg-background"
                  }`}>
                    {i < currentStep ? (
                      <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <span className={`text-xs ${i === currentStep ? "text-primary" : "text-muted-foreground"}`}>
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs hidden sm:block ${i === currentStep ? "text-foreground" : "text-muted-foreground"}`}>
                    {step}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 w-12 sm:w-20 mx-1 mb-4 transition-colors ${i < currentStep ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="px-3 py-1.5 rounded-md border border-border text-sm text-foreground hover:bg-accent"
            >
              Back
            </button>
            <button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
