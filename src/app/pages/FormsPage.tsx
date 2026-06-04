import { useState, useRef } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Switch } from "../components/ui/switch";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { Eye, EyeOff, Search, UploadCloud, X, File } from "lucide-react";

function PasswordInput({ label, placeholder }: { label?: string; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1 w-full">
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Input type={show ? "text" : "password"} placeholder={placeholder} />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function SearchInput({ label }: { label?: string }) {
  return (
    <div className="space-y-1 w-full">
      {label && <Label>{label}</Label>}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search components…" />
      </div>
    </div>
  );
}

function TextareaWithCount() {
  const [value, setValue] = useState("");
  const MAX = 500;
  const count = value.length;
  const over = count > MAX;

  return (
    <div className="space-y-1 w-full">
      <Label htmlFor="message">Message</Label>
      <Textarea
        id="message"
        rows={4}
        placeholder="Write your message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={over ? "border-destructive focus-visible:ring-destructive/20" : ""}
      />
      <p className={`text-xs text-right transition-colors ${over ? "text-destructive" : "text-muted-foreground"}`}>
        {count} / {MAX}
      </p>
    </div>
  );
}

function FileUpload() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    setFiles((prev) => [...prev, ...Array.from(incoming)]);
  };

  const removeFile = (index: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== index));

  return (
    <div className="w-full max-w-sm space-y-2">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
        className={`flex flex-col items-center justify-center gap-2 w-full rounded-xl border-2 border-dashed px-6 py-8 cursor-pointer transition-colors text-center
          ${dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-accent/40"}`}
      >
        <UploadCloud className={`w-8 h-8 ${dragging ? "text-primary" : "text-muted-foreground"}`} />
        <div>
          <p className="text-sm text-foreground">
            <span className="text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, PDF up to 10 MB</p>
        </div>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <ul className="space-y-1.5">
          {files.map((file, i) => (
            <li
              key={i}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg border border-border bg-background"
            >
              <File className="w-4 h-4 shrink-0 text-muted-foreground" />
              <span className="flex-1 text-sm text-foreground truncate">{file.name}</span>
              <span className="text-xs text-muted-foreground shrink-0">
                {(file.size / 1024).toFixed(0)} KB
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
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
        code={`import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-1">
  <Label htmlFor="name">Full Name</Label>
  <Input id="name" placeholder="Enter your name" />
</div>

{/* Error state */}
<div className="space-y-1">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" aria-invalid="true" placeholder="invalid-email" />
  <p className="text-xs text-destructive">Please enter a valid email address.</p>
</div>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="space-y-1">
            <Label htmlFor="fullname">Full Name</Label>
            <Input id="fullname" placeholder="Enter your name" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
            <p className="text-xs text-muted-foreground">We'll never share your email.</p>
          </div>
          <div className="space-y-1">
            <Label htmlFor="email-err">Email</Label>
            <Input id="email-err" type="email" placeholder="invalid-email" aria-invalid="true" />
            <p className="text-xs text-destructive">Please enter a valid email address.</p>
          </div>
          <PasswordInput label="Password" placeholder="••••••••" />
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Icon"
        description="Inputs with leading icons for context."
        code={`<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
  <Input className="pl-9" placeholder="Search..." />
</div>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <SearchInput label="Search" />
          <div className="space-y-1">
            <Label>Disabled</Label>
            <Input placeholder="This field is disabled" disabled />
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Textarea"
        description="Multi-line text input with character counter."
        code={`import { Textarea } from "@/components/ui/textarea";

<div className="space-y-1">
  <Label htmlFor="message">Message</Label>
  <Textarea id="message" rows={4} placeholder="Write your message..." />
  <p className="text-xs text-muted-foreground text-right">0 / 500</p>
</div>`}
      >
        <div className="w-full max-w-sm">
          <TextareaWithCount />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Select"
        description="Dropdown select for choosing from a list of options."
        code={`import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

<div className="space-y-1">
  <Label>Framework</Label>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Choose a framework" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="react">React</SelectItem>
      <SelectItem value="vue">Vue</SelectItem>
      <SelectItem value="svelte">Svelte</SelectItem>
    </SelectContent>
  </Select>
</div>`}
      >
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <div className="space-y-1">
            <Label>Framework</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Choose a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="react">React</SelectItem>
                <SelectItem value="vue">Vue</SelectItem>
                <SelectItem value="svelte">Svelte</SelectItem>
                <SelectItem value="angular">Angular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Checkboxes"
        description="Allow users to select multiple options from a list."
        code={`import { Checkbox } from "@/components/ui/checkbox";

<div className="flex items-center gap-2">
  <Checkbox id="terms" defaultChecked />
  <Label htmlFor="terms">Accept terms and conditions</Label>
</div>`}
      >
        <div className="flex flex-col gap-3">
          {[
            { id: "terms", label: "Accept terms and conditions", defaultChecked: true },
            { id: "newsletter", label: "Subscribe to newsletter", defaultChecked: false },
            { id: "notifications", label: "Enable notifications", defaultChecked: true },
            { id: "share", label: "Share usage data", defaultChecked: false },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <Checkbox id={item.id} defaultChecked={item.defaultChecked} />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection
        title="Radio Buttons"
        description="Allow users to select a single option from a group."
        code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

<RadioGroup defaultValue="starter">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="starter" id="starter" />
    <Label htmlFor="starter">Starter — Free</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="pro" id="pro" />
    <Label htmlFor="pro">Pro — $12/mo</Label>
  </div>
</RadioGroup>`}
      >
        <RadioGroup defaultValue="starter">
          {[
            { value: "starter", label: "Starter — Free" },
            { value: "pro", label: "Pro — $12/mo" },
            { value: "enterprise", label: "Enterprise — Custom" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-center gap-2">
              <RadioGroupItem value={opt.value} id={opt.value} />
              <Label htmlFor={opt.value}>{opt.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </ComponentSection>

      <ComponentSection
        title="Toggle Switch"
        description="Binary on/off controls for settings and preferences."
        code={`import { Switch } from "@/components/ui/switch";

<div className="flex items-center gap-3">
  <Switch id="dark-mode" defaultChecked />
  <Label htmlFor="dark-mode">Dark mode</Label>
</div>`}
      >
        <div className="flex flex-col gap-4">
          {[
            { id: "dark-mode", label: "Dark mode", defaultChecked: true },
            { id: "email-notif", label: "Email notifications", defaultChecked: false },
            { id: "2fa", label: "Two-factor authentication", defaultChecked: true },
            { id: "public", label: "Public profile", defaultChecked: false },
          ].map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <Switch id={item.id} defaultChecked={item.defaultChecked} />
              <Label htmlFor={item.id}>{item.label}</Label>
            </div>
          ))}
        </div>
      </ComponentSection>

      <ComponentSection
        title="File Upload"
        description="Drag-and-drop or click-to-browse file input with file list preview."
        code={`<div
  onClick={() => inputRef.current?.click()}
  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
  onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}
  className="flex flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border px-6 py-8 cursor-pointer hover:border-primary/50 hover:bg-accent/40"
>
  <UploadCloud className="w-8 h-8 text-muted-foreground" />
  <p className="text-sm"><span className="text-primary">Click to upload</span> or drag and drop</p>
  <input ref={inputRef} type="file" multiple className="hidden" />
</div>`}
      >
        <FileUpload />
      </ComponentSection>
    </div>
  );
}
