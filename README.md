# Brickly

A browsable React component library and design-system reference, exported from Figma and built on [shadcn/ui](https://ui.shadcn.com/) patterns. Each page documents variants with live previews and copyable code snippets.

**Figma source:** [Component library design](https://www.figma.com/design/JZwgsWsEWkq2JNSoGbkkvF/Component-library-design)

## Features

- **20+ component categories** — buttons, forms, tables, modals, navigation, feedback, and more
- **Live previews** — toggle between Preview and Code on every example
- **Dark mode** — toggle from the header; uses CSS variables from the shadcn theme
- **TypeScript** — full type coverage across pages and UI primitives
- **shadcn-style primitives** — Radix UI, Tailwind CSS v4, `class-variance-authority`, and Lucide icons

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | React 18, React Router 7 |
| Build | Vite 6 |
| Styling | Tailwind CSS 4, CSS variables (`default_shadcn_theme.css`) |
| Components | shadcn/ui-style primitives in `src/app/components/ui/` |
| Icons | [Lucide React](https://lucide.dev/) |

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (20+ recommended)
- npm, pnpm, or yarn

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output is written to `dist/`. Preview the production build with any static file server pointed at that folder.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check and bundle for production |

## Project structure

```
Brickly/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layout/       # App shell (sidebar, header)
│   │   │   └── ui/           # shadcn-style primitives + doc helpers
│   │   ├── pages/            # One page per component category
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── styles/               # Global CSS, theme, Tailwind entry
│   └── main.tsx
├── default_shadcn_theme.css  # Design tokens (colors, radius, etc.)
├── guidelines/               # Design-system notes for contributors/AI
└── ATTRIBUTIONS.md         # Third-party licenses
```

### Path alias

`@/` resolves to `src/` (configured in `vite.config.ts`). Example imports in docs:

```tsx
import { Button } from "@/app/components/ui/button";
```

## Component catalog

| Route | Page | Notes |
|-------|------|--------|
| `/` | Overview | Index of all components |
| `/buttons` | Buttons | Variants, sizes, states |
| `/badges` | Badges | Status and label styles |
| `/alerts` | Alerts | Info, success, warning, error |
| `/avatars` | Avatars | Image, initials, groups |
| `/cards` | Cards | Layout patterns (custom markup + shadcn tokens) |
| `/forms` | Forms | Input, select, checkbox, switch, radio |
| `/progress` | Progress | Bar (shadcn) and circular (custom) |
| `/modals` | Modals | Dialog and sheet |
| `/tabs` | Tabs | Default, pills, vertical |
| `/tables` | Tables | Basic, striped, sortable |
| `/loading` | Loading | Spinner, skeleton, dots |
| `/typography` | Typography | Headings, body, code |
| `/tooltips` | Tooltips | Tooltip and popover |
| `/accordion` | Accordion | Collapsible sections |
| `/breadcrumbs` | Breadcrumbs | Navigation trail |
| `/dropdowns` | Dropdowns | Menus and checkable items |
| `/sliders` | Sliders | Range and stepped controls |
| `/pagination` | Pagination | Page controls (built on `Button`) |
| `/toasts` | Toasts | Custom toast demos |
| `/stepper` | Stepper | Horizontal, vertical, wizard |

Additional shadcn primitives live under `src/app/components/ui/` (e.g. `calendar`, `chart`, `command`, `carousel`) and can be wired into new pages as needed.

## Design system

- **Tokens** — Semantic colors and spacing are defined in `default_shadcn_theme.css` and wired through Tailwind (`bg-primary`, `text-muted-foreground`, etc.).
- **UI primitives** — Most interactive controls use Radix-based shadcn components with `cn()` and CVA variants.
- **Doc-only components** — `PageHeader`, `ComponentSection`, and `CodeBlock` power the documentation layout; they are not part of the shadcn registry.
- **Custom demos** — Some pages (cards, stepper, pagination, toasts, typography) use hand-built markup that follows the same tokens rather than importing every matching shadcn file.

For contributor and AI guidelines, see [`guidelines/Guidelines.md`](guidelines/Guidelines.md).

## Adding a new component page

1. Create `src/app/pages/YourPage.tsx` using `PageHeader` and `ComponentSection`.
2. Import primitives from `src/app/components/ui/`.
3. Register the route in `src/app/routes.tsx`.
4. Add a link on `OverviewPage` and in `Sidebar` if you want it in navigation.

## Attributions

UI components are based on [shadcn/ui](https://ui.shadcn.com/) (MIT). See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for full license details and image credits.

## License

Refer to repository ownership and `ATTRIBUTIONS.md` for third-party terms. shadcn/ui components retain their MIT license as noted in attributions.
