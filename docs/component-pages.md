# Adding a component documentation page

Step-by-step guide for adding a new page to the Brickly catalog.

## Checklist

- [ ] Create `src/app/pages/YourPage.tsx`
- [ ] Register lazy route in `src/app/routes.tsx` via `lazyPage()`
- [ ] Add nav entry in `src/app/components/layout/nav-config.ts`
- [ ] Add overview card in `src/app/pages/OverviewPage.tsx`
- [ ] Use `PageHeader` + one or more `ComponentSection` blocks
- [ ] Set `source` on each section (`shadcn` / `composition` / `custom`)
- [ ] Set `shadcnComponent` on shadcn sections for install hints (see `shadcn-registry.ts`)
- [ ] Run `npm run typecheck && npm run lint && npm run test && npm run build`
- [ ] Update `README.md` component catalog table

## Step 1 — Create the page file

Create `src/app/pages/ChartsPage.tsx` (example):

```tsx
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart";
import { Bar, BarChart, XAxis } from "recharts";

export const ChartsPage = () => {
  const data = [
    { month: "Jan", value: 120 },
    { month: "Feb", value: 200 },
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        title="Charts"
        description="Data visualization with the shadcn Chart primitive and Recharts."
        badge="Component"
      />

      <ComponentSection
        title="Bar Chart"
        description="Basic bar chart themed with CSS chart tokens."
        source="shadcn"
        shadcnComponent="chart"
        code={`import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, XAxis } from "recharts";

<ChartContainer config={{ value: { label: "Value", color: "var(--chart-1)" } }}>
  <BarChart data={data}>
    <XAxis dataKey="month" />
    <Bar dataKey="value" fill="var(--color-chart-1)" />
  </BarChart>
</ChartContainer>`}
      >
        <ChartContainer
          config={{ value: { label: "Value", color: "var(--chart-1)" } }}
          className="h-[200px] w-full max-w-md"
        >
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <Bar dataKey="value" fill="var(--color-chart-1)" radius={4} />
          </BarChart>
        </ChartContainer>
      </ComponentSection>
    </div>
  );
};
```

## Step 2 — Register the route

In `src/app/routes.tsx`, add a lazy import and route entry:

```tsx
const ChartsPage = lazyPage(() => import("./pages/ChartsPage"), "ChartsPage");

// Inside Layout children:
{ path: "charts", Component: ChartsPage },
```

Use **kebab-case** URL segments: `date-picker`, not `datePicker`.

Do **not** add a static import — all page routes use `lazyPage()` for code splitting.

## Step 3 — Add navigation

In `src/app/components/layout/nav-config.ts`:

1. Import a Lucide icon: `import { BarChart3 } from "lucide-react";`
2. Add to the appropriate group:

```tsx
{ to: "/charts", label: "Charts", icon: BarChart3 },
```

This automatically updates:

- Sidebar links
- Header ⌘K command palette
- Route smoke tests (via `route-expectations.ts` derived from nav)

## Step 4 — Add to Overview

In `src/app/pages/OverviewPage.tsx`, add to the `components` array:

```tsx
{ to: "/charts", label: "Charts", icon: BarChart3, description: "Bar, line, area charts", count: 4 },
```

Update the stats row if the total page count changed (currently `"Pages": "33"` in the Overview stats).

## Step 5 — Verify

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Manually check:

- Route loads at `/charts`
- Sidebar link works
- ⌘K finds the page
- Preview / Code tabs match
- "Copy full example" includes imports and install command
- Dark mode looks correct

## Adding a section to an existing page

1. Open the relevant `*Page.tsx`.
2. Add a new `ComponentSection` at the bottom (keep related sections grouped).
3. Import any new primitives at the top.
4. Tag with `source` and `shadcnComponent` when applicable.
5. Re-run typecheck, lint, test, and build.

## Adding a shadcn primitive (no new page)

If you only need a new file under `ui/` wired into an existing page, see [shadcn primitives](shadcn.md).

## Page naming reference

| Route | File | Export name |
|-------|------|-------------|
| `/buttons` | `ButtonsPage.tsx` | `ButtonsPage` |
| `/date-picker` | `DatePickerPage.tsx` | `DatePickerPage` |
| `/tokens` | `TokensPage.tsx` | `TokensPage` |

Pattern: **PascalCase** + `Page`, plural category name when it makes sense.

## Interactive demos

Use local state for demos that need it:

```tsx
import { useState } from "react";

export const ExamplePage = () => {
  const [open, setOpen] = useState(false);
  // ...
};
```

Keep state inside the page file or small inline subcomponents at the bottom of the same file. Avoid global stores.
