import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { useState } from "react";
import { Eye, EyeOff, Search, ChevronDown } from "lucide-react";

function Input({
  label,
  placeholder,
  type = "text",
  error,
  hint,
  icon,
  disabled,
}: {
  label?: string;
  placeholder?: string;
  type?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="space-y-1.5 w-full">
      {label && <label className="text-sm text-foreground">{label}</label>}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        )}
        <input
          type={type === "password" && showPw ? "text" : type}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-3 py-2 rounded-lg border text-sm bg-background text-foreground placeholder:text-muted-foreground outline-none transition-colors
            focus:ring-2 focus:ring-ring focus:border-transparent
            disabled:opacity-50 disabled:cursor-not-allowed
            ${icon ? "pl-9" : ""}
            ${type === "password" ? "pr-10" : ""}
            ${error ? "border-destructive focus:ring-destructive/50" : "border-border"}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Checkbox({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div
        onClick={() => setChecked(!checked)}
        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
          checked ? "bg-primary border-primary" : "border-border bg-background"
        }`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-sm text-foreground">{label}</span>
    </label>
  );
}

function Radio({ label, name, value, defaultChecked }: { label: string; name: string; value: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  return (
    <label className="flex items-center gap-2 cursor-pointer" onClick={() => setChecked(true)}>
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
          checked ? "border-primary" : "border-border"
        }`}
      >
        {checked && <div className="w-2 h-2 rounded-full bg-primary" />}
      </div>
      <span className="text-sm text-foreground">{label}</span>
    </label>
  );
}

function Toggle({ label, defaultChecked }: { label?: string; defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked ?? false);
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => setOn(!on)}
        className={`relative w-10 h-5 rounded-full transition-colors ${on ? "bg-primary" : "bg-muted"}`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      {label && <span className="text-sm text-foreground">{label}</span>}
    </label>
  );
}

export function FormsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Forms"
        description="Form controls including text inputs, checkboxes, radio buttons, selects, and toggles."
        badge="Component"
      />

      <ComponentSection
        title="Text Inputs"
        description="Standard text input in default, with hint, and error states."
        code={`<input
  type="text"
  placeholder="Enter your name"
  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm
    focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
/>
{/* With error state */}
<input
  type="email"
  className="w-full px-3 py-2 rounded-lg border border-destructive bg-background text-sm
    focus:ring-2 focus:ring-destructive/50"
/>
<p className="text-xs text-destructive">Please enter a valid email address.</p>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Input label="Full Name" placeholder="Enter your name" />
          <Input label="Email" placeholder="you@example.com" type="email" hint="We'll never share your email." />
          <Input label="Email" placeholder="invalid-email" type="email" error="Please enter a valid email address." />
          <Input label="Password" placeholder="••••••••" type="password" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Icon"
        description="Inputs with leading icons for context."
        code={`<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
  <input
    type="text"
    placeholder="Search..."
    className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm
      focus:outline-none focus:ring-2 focus:ring-ring"
  />
</div>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Input label="Search" placeholder="Search components…" icon={<Search className="w-4 h-4" />} />
          <Input label="Disabled" placeholder="This field is disabled" disabled />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Textarea"
        description="Multi-line text input for longer content."
        code={`<div className="space-y-1.5">
  <label className="text-sm text-foreground">Message</label>
  <textarea
    rows={4}
    placeholder="Write your message..."
    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none
      focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
  />
  <p className="text-xs text-muted-foreground text-right">0 / 500</p>
</div>`}
      >
        <div className="w-full max-w-sm space-y-1.5">
          <label className="text-sm text-foreground">Message</label>
          <textarea
            rows={4}
            placeholder="Write your message here…"
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground text-right">0 / 500</p>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Select"
        description="Dropdown select for choosing from a list of options."
        code={`<div className="relative">
  <select className="w-full appearance-none px-3 py-2 pr-9 rounded-lg border border-border bg-background text-sm
    focus:outline-none focus:ring-2 focus:ring-ring text-foreground">
    <option>Choose a framework</option>
    <option>React</option>
    <option>Vue</option>
    <option>Svelte</option>
  </select>
  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
</div>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="space-y-1.5">
            <label className="text-sm text-foreground">Framework</label>
            <div className="relative">
              <select className="w-full appearance-none px-3 py-2 pr-9 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Choose a framework</option>
                <option>React</option>
                <option>Vue</option>
                <option>Svelte</option>
                <option>Angular</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Checkboxes"
        description="Allow users to select multiple options from a list."
        code={`<label className="flex items-center gap-2 cursor-pointer">
  <div className="w-4 h-4 rounded border-2 border-primary bg-primary flex items-center justify-center">
    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  </div>
  <span className="text-sm">Accept terms and conditions</span>
</label>`}
      >
        <div className="flex flex-col gap-3">
          <Checkbox label="Accept terms and conditions" defaultChecked />
          <Checkbox label="Subscribe to newsletter" />
          <Checkbox label="Enable notifications" defaultChecked />
          <Checkbox label="Share usage data" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Radio Buttons"
        description="Allow users to select a single option from a group."
        code={`<div className="space-y-2">
  {["Starter", "Pro", "Enterprise"].map(plan => (
    <label key={plan} className="flex items-center gap-2 cursor-pointer">
      <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-primary" />
      </div>
      <span className="text-sm">{plan}</span>
    </label>
  ))}
</div>`}
      >
        <div className="flex flex-col gap-2">
          <Radio name="plan" value="starter" label="Starter — Free" defaultChecked />
          <Radio name="plan" value="pro" label="Pro — $12/mo" />
          <Radio name="plan" value="enterprise" label="Enterprise — Custom" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Toggle Switch"
        description="Binary on/off controls for settings and preferences."
        code={`<label className="flex items-center gap-3 cursor-pointer">
  <div className="relative w-10 h-5 rounded-full bg-primary">
    <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow translate-x-5 transition-transform" />
  </div>
  <span className="text-sm">Dark mode</span>
</label>`}
      >
        <div className="flex flex-col gap-4">
          <Toggle label="Dark mode" defaultChecked />
          <Toggle label="Email notifications" />
          <Toggle label="Two-factor authentication" defaultChecked />
          <Toggle label="Public profile" />
        </div>
      </ComponentSection>
    </div>
  );
}
