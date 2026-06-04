import { useState } from "react";
import { format, isWeekend } from "date-fns";
import { DateRange } from "react-day-picker";
import { CalendarIcon } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Calendar } from "../components/ui/calendar";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { cn } from "../components/ui/utils";

/* ─── Inline single date ─────────────────────────── */
function InlineCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="space-y-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-xl border border-border"
      />
      {date && (
        <p className="text-sm text-muted-foreground">
          Selected: <span className="text-foreground">{format(date, "PPP")}</span>
        </p>
      )}
    </div>
  );
}

/* ─── Popover date picker ────────────────────────── */
function PopoverDatePicker() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-64 justify-start text-left",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4" />
          {date ? format(date, "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

/* ─── Date range picker ──────────────────────────── */
function DateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-72 justify-start text-left",
            !range && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4" />
          {range?.from ? (
            range.to ? (
              `${format(range.from, "LLL d, y")} – ${format(range.to, "LLL d, y")}`
            ) : (
              format(range.from, "LLL d, y")
            )
          ) : (
            "Pick a date range"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

/* ─── Disabled dates ─────────────────────────────── */
function DisabledDatesPicker() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div className="space-y-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={(day) => isWeekend(day) || day < new Date()}
        className="rounded-xl border border-border"
      />
      <p className="text-xs text-muted-foreground">Weekends and past dates are disabled.</p>
    </div>
  );
}

/* ─── Multi-select ───────────────────────────────── */
function MultiSelectPicker() {
  const [dates, setDates] = useState<Date[] | undefined>();
  return (
    <div className="space-y-3">
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-xl border border-border"
      />
      {dates && dates.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {dates.length} date{dates.length > 1 ? "s" : ""} selected:{" "}
          <span className="text-foreground">
            {dates.map((d) => format(d, "MMM d")).join(", ")}
          </span>
        </p>
      )}
    </div>
  );
}

export function DatePickerPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Date Picker"
        description="Calendar-based date and date range selectors built on react-day-picker."
        badge="Component"
      />

      <ComponentSection
        title="Inline Calendar"
        description="A standalone calendar rendered directly on the page."
        code={`import { Calendar } from "@/components/ui/calendar";

const [date, setDate] = useState<Date | undefined>(new Date());

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-xl border border-border"
/>`}
      >
        <InlineCalendar />
      </ComponentSection>

      <ComponentSection
        title="Popover Date Picker"
        description="Click a button to open a calendar in a popover — the most common date input pattern."
        code={`import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const [date, setDate] = useState<Date | undefined>();

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-64 justify-start text-left">
      <CalendarIcon className="w-4 h-4" />
      {date ? format(date, "PPP") : "Pick a date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
  </PopoverContent>
</Popover>`}
      >
        <PopoverDatePicker />
      </ComponentSection>

      <ComponentSection
        title="Date Range Picker"
        description="Select a start and end date with a two-month calendar view."
        code={`import { DateRange } from "react-day-picker";

const [range, setRange] = useState<DateRange | undefined>();

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="w-72 justify-start text-left">
      <CalendarIcon className="w-4 h-4" />
      {range?.from && range?.to
        ? \`\${format(range.from, "LLL d, y")} – \${format(range.to, "LLL d, y")}\`
        : "Pick a date range"}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-auto p-0" align="start">
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      initialFocus
    />
  </PopoverContent>
</Popover>`}
      >
        <DateRangePicker />
      </ComponentSection>

      <ComponentSection
        title="Disabled Dates"
        description="Prevent selection of specific dates — here, weekends and past dates are disabled."
        code={`<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  disabled={(day) => isWeekend(day) || day < new Date()}
/>`}
      >
        <DisabledDatesPicker />
      </ComponentSection>

      <ComponentSection
        title="Multi-Select"
        description="Allow picking multiple individual dates at once."
        code={`const [dates, setDates] = useState<Date[] | undefined>();

<Calendar
  mode="multiple"
  selected={dates}
  onSelect={setDates}
/>`}
      >
        <MultiSelectPicker />
      </ComponentSection>
    </div>
  );
}
