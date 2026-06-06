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

### Documented on pages (21 component routes + tokens)

Accordion, Alert, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Checkbox, Collapsible, Command, Context Menu, Dialog, Drawer, Dropdown, Form, Hover Card, Input, Label, Pagination, Popover, Progress, Radio, Select, Separator, Sheet, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toggle, Tooltip, and more — spread across `src/app/pages/`.

### Restored, awaiting dedicated pages

| File | Dependency | Planned route |
|------|------------|---------------|
| `carousel.tsx` | `embla-carousel-react` | `/carousel` |
| `input-otp.tsx` | `input-otp` | `/otp` |
| `menubar.tsx` | — | demo on Dropdowns or own page |
| `navigation-menu.tsx` | — | `/command` or nav demo |
| `resizable.tsx` | `react-resizable-panels` | `/resizable` |
| `scroll-area.tsx` | — | sidebar / lists |
| `sidebar.tsx` | — | `/sidebar` |
| `chart.tsx` | `recharts` | `/charts` (also used on Progress) |

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

## Install command hints (future)

ROADMAP Phase 5 plans optional `installCommand` on `ComponentSection` (e.g. `npx shadcn@latest add button`). Not implemented yet — document manually in PR descriptions when adding primitives.
