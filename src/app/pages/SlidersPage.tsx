import { useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Slider } from "../components/ui/slider";
import { Volume2, VolumeX, Sun, Contrast } from "lucide-react";

/* ─── Color slider (custom, shadcn Slider has no color variants) ─ */
const ColorSlider = ({
  color,
  initialValue,
}: {
  color: "primary" | "green" | "amber" | "red";
  initialValue: number;
}) => {
  const [val, setVal] = useState(initialValue);
  const pct = val;
  const colorClass = {
    primary: "bg-primary",
    green: "bg-green-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  }[color];
  const label = { primary: "Primary", green: "Success", amber: "Warning", red: "Danger" }[color];

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-14">{label}</span>
      <div className="relative flex-1 h-5 flex items-center">
        <div className="relative w-full h-1.5 rounded-full bg-muted">
          <div className={`absolute inset-y-0 left-0 rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range" min={0} max={100} value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 h-5 cursor-pointer"
        />
        <div
          className={`absolute w-4 h-4 rounded-full border-2 border-background ${colorClass} shadow pointer-events-none`}
          style={{ left: `calc(${pct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

/* ─── Range slider ───────────────────────────────── */
const RangeSlider = () => {
  const [range, setRange] = useState([20, 75]);

  return (
    <div className="w-full space-y-3">
      <Slider
        min={0}
        max={100}
        value={range}
        onValueChange={setRange}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
    </div>
  );
}

/* ─── Tick slider ────────────────────────────────── */
const TickSlider = () => {
  const ticks = [0, 25, 50, 75, 100];
  const [value, setValue] = useState([50]);

  return (
    <div className="w-full space-y-3">
      <Slider value={value} onValueChange={setValue} step={25} min={0} max={100} />
      <div className="flex justify-between px-0">
        {ticks.map((s) => (
          <button
            key={s}
            onClick={() => setValue([s])}
            className={`text-xs transition-colors ${value[0] === s ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {s}%
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Volume control ─────────────────────────────── */
const VolumeControl = () => {
  const [vol, setVol] = useState([60]);

  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <button onClick={() => setVol([0])} className="text-muted-foreground hover:text-foreground transition-colors">
        {vol[0] === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
      <Slider value={vol} onValueChange={setVol} min={0} max={100} className="flex-1" />
      <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">{vol[0]}%</span>
    </div>
  );
}

/* ─── Display settings ───────────────────────────── */
const DisplayControls = () => {
  const [brightness, setBrightness] = useState([70]);
  const [contrast, setContrast] = useState([50]);

  return (
    <div className="space-y-5 w-full max-w-xs">
      <div className="flex items-center gap-3">
        <Sun className="w-4 h-4 text-amber-500 shrink-0" />
        <Slider value={brightness} onValueChange={setBrightness} min={0} max={100} className="flex-1" />
        <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">{brightness[0]}</span>
      </div>
      <div className="flex items-center gap-3">
        <Contrast className="w-4 h-4 text-muted-foreground shrink-0" />
        <Slider value={contrast} onValueChange={setContrast} min={0} max={100} className="flex-1" />
        <span className="text-xs text-muted-foreground w-8 text-right tabular-nums">{contrast[0]}</span>
      </div>
    </div>
  );
}

export const SlidersPage = () => {
  const [basic, setBasic] = useState([40]);

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
        code={`import { Slider } from "@/components/ui/slider";

const [value, setValue] = useState([40]);

<Slider value={value} onValueChange={setValue} min={0} max={100} />`}
      >
        <div className="w-full max-w-xs space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Value</span>
            <span className="tabular-nums">{basic[0]}</span>
          </div>
          <Slider value={basic} onValueChange={setBasic} min={0} max={100} />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Colors"
        description="Use color variants to express meaning — success, warning, danger."
        code={`{/* shadcn Slider uses bg-primary by default.
   Custom color variants use a thin wrapper with inline range input. */}
<Slider value={[70]} />   {/* primary */}
<ColorSlider color="green"  initialValue={50} />
<ColorSlider color="amber"  initialValue={60} />
<ColorSlider color="red"    initialValue={30} />`}
      >
        <div className="space-y-5 w-full max-w-xs">
          <ColorSlider color="primary" initialValue={70} />
          <ColorSlider color="green" initialValue={50} />
          <ColorSlider color="amber" initialValue={60} />
          <ColorSlider color="red" initialValue={30} />
        </div>
      </ComponentSection>

      <ComponentSection
        title="With Ticks"
        description="Snap to discrete steps and display labels for each stop."
        code={`<Slider value={value} onValueChange={setValue} step={25} min={0} max={100} />`}
      >
        <div className="w-full max-w-xs">
          <TickSlider />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Range (Two Handles)"
        description="Select a min/max range using two thumb handles."
        code={`const [range, setRange] = useState([20, 75]);

<Slider value={range} onValueChange={setRange} min={0} max={100} />`}
      >
        <div className="w-full max-w-xs">
          <RangeSlider />
        </div>
      </ComponentSection>

      <ComponentSection
        title="Volume Control"
        description="Slider combined with an icon button for a media player style."
        code={`const [vol, setVol] = useState([60]);

<button onClick={() => setVol([0])}>
  {vol[0] === 0 ? <VolumeX /> : <Volume2 />}
</button>
<Slider value={vol} onValueChange={setVol} min={0} max={100} />
<span>{vol[0]}%</span>`}
      >
        <VolumeControl />
      </ComponentSection>

      <ComponentSection
        title="Display Settings"
        description="Multiple labelled sliders in a grouped settings panel."
        code={`<Sun className="text-amber-500" />
<Slider value={brightness} onValueChange={setBrightness} min={0} max={100} />

<Contrast />
<Slider value={contrast} onValueChange={setContrast} min={0} max={100} />`}
      >
        <DisplayControls />
      </ComponentSection>

      <ComponentSection
        title="Disabled"
        description="A non-interactive slider for read-only display."
        code={`<Slider value={[60]} disabled />`}
      >
        <div className="w-full max-w-xs">
          <Slider value={[60]} disabled min={0} max={100} />
        </div>
      </ComponentSection>
    </div>
  );
}
