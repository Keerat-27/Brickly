import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "../components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  CartesianGrid,
  XAxis,
} from "recharts";

const staticData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const pieData = [
  { name: "chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "safari", value: 200, fill: "var(--color-safari)" },
  { name: "firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "edge", value: 173, fill: "var(--color-edge)" },
  { name: "other", value: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig;

const randomizeData = () =>
  staticData.map((row) => ({
    ...row,
    desktop: Math.floor(Math.random() * 300) + 50,
    mobile: Math.floor(Math.random() * 200) + 40,
  }));

export const ChartsPage = () => {
  const [animated, setAnimated] = useState(false);
  const [data, setData] = useState(staticData);

  useEffect(() => {
    if (!animated) {
      setData(staticData);
      return;
    }
    const id = window.setInterval(() => setData(randomizeData()), 2000);
    return () => window.clearInterval(id);
  }, [animated]);

  const totals = useMemo(
    () => data.reduce((acc, row) => acc + row.desktop + row.mobile, 0),
    [data],
  );

  return (
    <div className="space-y-10">
      <PageHeader
        title="Charts"
        description="Data visualization with the shadcn Chart primitive, Recharts, and CSS chart tokens."
        badge="Component"
      />

      <ComponentSection
        title="Bar Chart"
        description="Grouped bars themed with --chart-1 and --chart-2."
        source="shadcn"
        shadcnComponent="chart"
        code={`import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

<ChartContainer config={chartConfig} className="h-[250px] w-full">
  <BarChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
  </BarChart>
</ChartContainer>`}
      >
        <ChartContainer config={chartConfig} className="h-[250px] w-full max-w-xl">
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </ComponentSection>

      <ComponentSection
        title="Line Chart"
        description="Trend lines with tooltip and legend."
        source="shadcn"
        shadcnComponent="chart"
        code={`import { Line, LineChart } from "recharts";

<ChartContainer config={chartConfig} className="h-[250px] w-full">
  <LineChart data={data}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip content={<ChartTooltipContent />} />
    <ChartLegend content={<ChartLegendContent />} />
    <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
    <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
  </LineChart>
</ChartContainer>`}
      >
        <ChartContainer config={chartConfig} className="h-[250px] w-full max-w-xl">
          <LineChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </ComponentSection>

      <ComponentSection
        title="Area Chart"
        description="Stacked areas for cumulative metrics."
        source="shadcn"
        shadcnComponent="chart"
        code={`<AreaChart data={data}>
  <CartesianGrid vertical={false} />
  <XAxis dataKey="month" tickLine={false} axisLine={false} />
  <ChartTooltip content={<ChartTooltipContent />} />
  <Area dataKey="mobile" type="monotone" fill="var(--color-mobile)" stroke="var(--color-mobile)" stackId="a" />
  <Area dataKey="desktop" type="monotone" fill="var(--color-desktop)" stroke="var(--color-desktop)" stackId="a" />
</AreaChart>`}
      >
        <ChartContainer config={chartConfig} className="h-[250px] w-full max-w-xl">
          <AreaChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="mobile"
              type="monotone"
              fill="var(--color-mobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="monotone"
              fill="var(--color-desktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </ComponentSection>

      <ComponentSection
        title="Pie Chart"
        description="Segment colors mapped to --chart-1 through --chart-5."
        source="shadcn"
        shadcnComponent="chart"
        code={`<PieChart>
  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
  <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={2} />
</PieChart>`}
      >
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px] max-w-xs">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={60} strokeWidth={2}>
              {pieData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </ComponentSection>

      <ComponentSection
        title="Live Data Toggle"
        description="Switch between static sample data and animated updates every 2 seconds."
        source="shadcn"
        shadcnComponent="chart"
        code={`const [animated, setAnimated] = useState(false);

useEffect(() => {
  if (!animated) return;
  const id = setInterval(() => setData(randomizeData()), 2000);
  return () => clearInterval(id);
}, [animated]);`}
      >
        <div className="flex flex-col gap-4 w-full max-w-xl">
          <div className="flex items-center gap-3">
            <Button
              variant={animated ? "default" : "outline"}
              size="sm"
              onClick={() => setAnimated((v) => !v)}
            >
              {animated ? "Stop animation" : "Animate data"}
            </Button>
            <span className="text-sm text-muted-foreground">
              Total traffic: {totals.toLocaleString()}
            </span>
          </div>
          <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={data}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </ComponentSection>
    </div>
  );
};
