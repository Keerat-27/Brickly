import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Volume2, VolumeX, Sun, Contrast } from "lucide-react";

/* ─── Base slider ────────────────────────────────── */
function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  color = "primary",
  disabled = false,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  color?: "primary" | "green" | "amber" | "red";
  disabled?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  const trackColor = {
    primary: "bg-primary",
    green: "bg-green-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  }[color];

  return (
    <div className={`relative w-full h-5 flex items-center ${disabled ? "opacity-50" : ""}`}>
      <div className="relative w-full h-1.5 rounded-full bg-muted">
        <div
          className={`absolute inset-y-0 left-0 rounded-full ${trackColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 h-5 cursor-pointer disabled:cursor-not-allowed"
      />
      {/* thumb */}
      <div
        className={`absolute w-4 h-4 rounded-full border-2 border-background ${trackColor} shadow pointer-events-none`}
        style={{ left: `calc(${pct}% - 8px)` }}
      />
    </div>
  );
}

/* ─── Range slider ───────────────────────────────── */
function RangeSlider({
  min = 0,
  max = 100,
}: {
  min?: number;
  max?: number;
}) {
  const [low, setLow] = useState(20);
  const [high, setHigh] = useState(75);

  const pctLow  = ((low  - min) / (max - min)) * 100;
  const pctHigh = ((high - min) / (max - min)) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="relative w-full h-5 flex items-center">
        <div className="relative w-full h-1.5 rounded-full bg-muted">
          <div
            className="absolute inset-y-0 rounded-full bg-primary"
            style={{ left: `${pctLow}%`, right: `${100 - pctHigh}%` }}
          />
        </div>
        {/* low thumb */}
        <input
          type="range" min={min} max={max} value={low}
          onChange={(e) => { const v = Number(e.target.value); if (v < high) setLow(v); }}
          className="absolute inset-0 w-full opacity-0 h-5 cursor-pointer"
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-background bg-primary shadow pointer-events-none"
          style={{ left: `calc(${pctLow}% - 8px)` }}
        />
        {/* high thumb */}
        <input
          type="range" min={min} max={max} value={high}
          onChange={(e) => { const v = Number(e.target.value); if (v > low) setHigh(v); }}
          className="absolute inset-0 w-full opacity-0 h-5 cursor-pointer"
        />
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-background bg-primary shadow pointer-events-none"
          style={{ left: `calc(${pctHigh}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>${low}</span>
        <span>${high}</span>
      </div>
    </div>
  );
}

/* ─── Tick slider ────────────────────────────────── */
function TickSlider() {
  const steps = [0, 25, 50, 75, 100];
  const [value, setValue] = useState(50);
  return (
    <div className="w-full space-y-3">
      <Slider value={value} onChange={setValue} step={25} />
      <div className="flex justify-between px-0">
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => setValue(s)}
            className={`text-xs transition-colors ${value === s ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {s}%
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Volume control ─────────────────────────────── */
function VolumeControl() {
  const [vol, setVol] = useState(60);
  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <button onClick={() => setVol(0)} className="text-muted-foreground hover:text-foreground transition-colors">
        {vol === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
      <Slider value={vol} onChange={setVol} />
      <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">{vol}%</span>
    </div>
  );
}

/* ─── Brightness / contrast controls ────────────────────── */
function DisplayControls() {
  const [brightness, setBrightness] = useState(70);
  const [contrast, setContrast] = useState(50);
  return (
    <div className="space-y-5 w-full max-w-xs">
      <div className="flex items-center gap-3">
        <Sun className="w-4 h-4 text-amber-500 shrink-0" />
        <Slider value={brightness} onChange={setBrightness} color="amber" />
        <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">{brightness}</span>
      </div>
      <div className="flex items-center gap-3">
        <Contrast className="w-4 h-4 text-muted-foreground shrink-0" />
        <Slider value={contrast} onChange={setContrast} />
        <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">{contrast}</span>
      </div>
    </div>
  );
}

export function SlidersPage() {
  const [basic, setBasic] = useState(40);
  const [disabled] = useState(60);

  return (
    <div className="space-y-10">
      <PageHeader
        title="Sliders"
        description="Range input controls for selecting values within a continuous or stepped range."
        badge="Component"
      />

      <ComponentSection
        title="Basic"
        description="Single-value slider with a live readout."
        code={`const [value, setValue] = useState(40);

<div className="relative w-full h-5 flex items-center">
  <div className="relative w-full h-1.5 rounded-full bg-muted">
    <div className="absolute inset-y-0 left-0 rounded-full bg-primary"
      style={{ width: \`\${value}%\` }} />
  </div>
  <input type="range" value={value} onChange={e => setValue(+e.target.value)}
    className="absolute inset-0 w-full opacity-0 cursor-pointer" />
</div>`}
      >
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Value</span>
            <span className="tabular-nums">{basic}</span>
          </div>
          <Slider value={basic} onChange={setBasic} />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Colors"
        description="Use color variants to express meaning — success, warning, danger."
        code={`<Slider color="primary"  value={70} />   {/* blue */}
<Slider color="green"   value={50} />   {/* success */}
<Slider color="amber"   value={60} />   {/* warning */}
<Slider color="red"     value={30} />   {/* danger */}`}
      >
        <div className="space-y-5 w-full max-w-xs">
          {(["primary", "green", "amber", "red"] as const).map((color) => (
            <ColoredSlider key={color} color={color} />
          ))}
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Ticks"
        description="Snap to discrete steps and display labels for each stop."
        code={`<input type="range" step={25} min={0} max={100} />
{/* render labels at 0, 25, 50, 75, 100 */}`}
      >
        <div className="w-full max-w-xs">
          <TickSlider />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Range (Two Handles)"
        description="Select a min/max range using two thumb handles."
        code={`const [low, setLow] = useState(20);
const [high, setHigh] = useState(75);
// Render two overlapping range inputs; clamp so low < high`}
      >
        <div className="w-full max-w-xs">
          <RangeSlider />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Volume Control"
        description="Slider combined with an icon button for a media player style."
        code={`<button onClick={() => setVol(0)}>
  {vol === 0 ? <VolumeX /> : <Volume2 />}
</button>
<Slider value={vol} onChange={setVol} />
<span>{vol}%</span>`}
      >
        <VolumeControl />
      </ComponentSection>

      <ComponentSection
        title="Display Settings"
        description="Multiple labelled sliders in a grouped settings panel."
        code={`<Sun className="text-amber-500" />
<Slider color="amber" value={brightness} onChange={setBrightness} />

<Contrast />
<Slider value={contrast} onChange={setContrast} />`}
      >
        <DisplayControls />
      </ComponentSection>

      <ComponentSection
        title="Disabled"
        description="A non-interactive slider for read-only display."
        code={`<input type="range" disabled value={60} className="... opacity-50 cursor-not-allowed" />`}
      >
        <div className="w-full max-w-xs">
          <Slider value={disabled} onChange={() => {}} disabled />
        </div>
      </ComponentSection>
    </div>
  );
}

/* small helper used inline in Colors section */
function ColoredSlider({ color }: { color: "primary" | "green" | "amber" | "red" }) {
  const [val, setVal] = useState(color === "primary" ? 70 : color === "green" ? 50 : color === "amber" ? 60 : 30);
  const label = { primary: "Primary", green: "Success", amber: "Warning", red: "Danger" }[color];
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-14">{label}</span>
      <Slider value={val} onChange={setVal} color={color} />
    </div>
  );
}
