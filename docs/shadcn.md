# shadcn primitives

How Brickly uses [shadcn/ui](https://ui.shadcn.com/) and how to add or restore components.

## Where primitives live

```
src/app/components/ui/
├── button.tsx          # shadcn registry
├── card.tsx
├── dialog.tsx
├── PageHeader.tsx      # NOT shadcn — doc helper
├── ComponentSection.tsx
└── ...
```

## Current inventory

Brickly has **~48 shadcn-style primitive files** under `ui/`, documented across **31 component routes** plus the Design Tokens reference page.

Primitives include: Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, Context Menu, Dialog, Drawer, Dropdown Menu, Form, Hover Card, Input, Input OTP, Label, Menubar, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toggle, Toggle Group, and Tooltip.

Each maps to at least one demo on a documentation page. Registry names for install hints live in `shadcn-registry.ts`.

## Adding a component via shadcn CLI

Brickly does not ship a `components.json` today. You can still use the CLI and adapt output:

```bash
npx shadcn@latest add button
```

After adding, **verify and fix**:

1. **Path** — move/copy into `src/app/components/ui/` if needed.
2. **Export style** — convert to arrow functions to match repo conventions:

   ```tsx
   // shadcn default
   function Button() { ... }

   // Brickly convention
   export const Button = () => { ... };
   ```

3. **Imports** — ensure `cn` imports from `./utils`.
4. **Wire a demo** — add or extend a page in `src/app/pages/`.
5. **Dependencies** — if the CLI adds a package, confirm it's in `package.json` and actually imported.

## Restoring from git history

If a component was deleted during cleanup:

```bash
git log --oneline -- src/app/components/ui/chart.tsx
git show <commit>:src/app/components/ui/chart.tsx
```

Or re-add via CLI and reconcile styles with existing pages.

## Companion dependencies

When restoring primitives, ensure these packages stay installed:

| Package | Component |
|---------|-----------|
| `recharts` | `chart.tsx` |
| `vaul` | `drawer.tsx` |
| `embla-carousel-react` | `carousel.tsx` |
| `input-otp` | `input-otp.tsx` |
| `sonner` | `sonner.tsx` |
| `react-hook-form` | `form.tsx` |
| `react-resizable-panels` | `resizable.tsx` |
| `react-day-picker` | `calendar.tsx` |
| `cmdk` | `command.tsx` |

Do **not** re-add removed packages (`@mui/*`, `react-slick`, `motion`, etc.) unless you have a specific need.

## `cn()` and CVA

Primitives use:

```tsx
import { cn } from "./utils";
import { cva } from "class-variance-authority";
```

`utils.ts`:

```tsx
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs) => twMerge(clsx(inputs));
```

When extending variants, follow existing `cva` patterns in `button.tsx` or `badge.tsx`.

## shadcn vs composition — decision guide

| Question | Action |
|----------|--------|
| Does shadcn registry have this component? | Use it, tag `source="shadcn"` |
| Is it Sonner / Vaul / Recharts via our wrapper? | Use wrapper, tag `source="shadcn"` |
| Is it typography, spinners, or steppers? | Build from tokens + primitives, tag `composition` or `custom` |
| Is it a token reference swatch? | Tag `custom` |

## Snippet and install workflow

`ComponentSection` powers the copy/install experience on every demo:

| Feature | How it works |
|---------|--------------|
| **Install command** | Set `shadcnComponent="button"` or `installCommand="npx shadcn@latest add …"` — shown above the Code tab |
| **Import path toggle** | Code tab switches `@/components/ui/…` vs relative paths; applies to copy actions |
| **Copy full example** | Builds imports + snippet + install command via `buildFullExample.ts` |
| **Accessibility notes** | Optional `accessibility` prop renders guidance below the section |

Registry names and install commands are centralized in `shadcn-registry.ts`. See the Overview page for a user-facing summary of the copy workflow.
