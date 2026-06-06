import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Progress } from "../components/ui/progress";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const ColorProgress = ({
  value,
  label,
  color = "primary",
  size = "md",
}: {
  value: number;
  label?: string;
  color?: "primary" | "green" | "blue" | "amber" | "red";
  size?: "sm" | "md" | "lg";
}) => {
  const colorClass = {
    primary: "",
    green: "[&>div]:bg-green-500",
    blue: "[&>div]:bg-blue-500",
    amber: "[&>div]:bg-amber-500",
    red: "[&>div]:bg-red-500",
  }[color];
  const heightClass = { sm: "h-1", md: "h-2", lg: "h-3" }[size];

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <div className="flex justify-between text-sm">
          <span className="text-foreground">{label}</span>
          <span className="text-muted-foreground">{value}%</span>
        </div>
      )}
      <Progress value={value} className={`${heightClass} ${colorClass}`} />
    </div>
  );
}

const CircularProgress = ({ value, size = 64, strokeWidth = 6, color = "currentColor" }: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-muted" />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-sm text-foreground">{value}%</span>
    </div>
  );
}

const steps = ["Account", "Profile", "Payment", "Confirm"];

export const ProgressPage = () => {
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
        code={`import { Progress } from "@/components/ui/progress";

<Progress value={72} />

{/* Color variants via className */}
<Progress value={88} className="[&>div]:bg-green-500" />
<Progress value={45} className="[&>div]:bg-blue-500" />
<Progress value={60} className="[&>div]:bg-amber-500" />
<Progress value={30} className="[&>div]:bg-red-500" />`}
      >
        <div className="flex flex-col gap-5 w-full max-w-sm">
          <ColorProgress value={72} label="Storage used" color="primary" />
          <ColorProgress value={45} label="Downloads" color="blue" />
          <ColorProgress value={88} label="Performance" color="green" />
          <ColorProgress value={30} label="Errors" color="red" />
          <ColorProgress value={60} label="Warnings" color="amber" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Sizes"
        description="Three heights for different visual weights."
        code={`<Progress value={60} className="h-1" />
<Progress value={60} className="h-2" />
<Progress value={60} className="h-3" />`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="space-y-1.5">
            <span className="text-sm text-foreground">Small</span>
            <Progress value={60} className="h-1" />
          </div>
          <div className="space-y-1.5">
            <span className="text-sm text-foreground">Medium</span>
            <Progress value={60} className="h-2" />
          </div>
          <div className="space-y-1.5">
            <span className="text-sm text-foreground">Large</span>
            <Progress value={60} className="h-3" />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Circular Progress"
        description="Radial progress indicators for compact layouts."
        code={`<svg width={64} height={64} className="-rotate-90">
  <circle cx={32} cy={32} r={26} fill="none" strokeWidth={6} className="text-muted" stroke="currentColor" />
  <circle cx={32} cy={32} r={26} fill="none" strokeWidth={6}
    strokeDasharray={163.36} strokeDashoffset={163.36 * (1 - value / 100)}
    strokeLinecap="round" className="transition-all duration-700" />
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
      <div className={i < current ? "w-8 h-8 rounded-full bg-primary ..." : ...}>
        {i < current ? <CheckCircle2 /> : <span>{i + 1}</span>}
      </div>
      {i < steps.length - 1 && (
        <div className={\`h-0.5 w-16 \${i < current ? "bg-primary" : "bg-border"}\`} />
      )}
    </div>
  ))}
</div>
<Button variant="outline">Back</Button>
<Button>Next</Button>`}
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="flex items-center">
            {steps.map((step, i) => (
              <div key={step} className="flex items-center">
                <button onClick={() => setCurrentStep(i)} className="flex flex-col items-center gap-1">
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
            <Button variant="outline" size="sm" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
              Back
            </Button>
            <Button size="sm" onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}>
              Next
            </Button>
          </div>
        </div>
      </ComponentSection>
    </div>
  );
}
