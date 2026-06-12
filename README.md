# Brickly

A browsable React component library and design-system reference built on [shadcn/ui](https://ui.shadcn.com/) patterns. Each page documents variants with live previews and copyable code snippets.

## Features

- **28 documentation pages** — 27 component categories plus a design token reference
- **Live previews** — toggle between Preview and Code on every example
- **Dark mode** — toggle from the header; uses CSS variables from the theme
- **TypeScript** — full type coverage across pages and UI primitives
- **shadcn-style primitives** — Radix UI, Tailwind CSS v4, `class-variance-authority`, and Lucide icons

## Tech stack

| Layer | Tools |
|-------|--------|
| Framework | React 18, React Router 7 |
| Build | Vite 6 |
| Styling | Tailwind CSS 4, CSS variables (`src/styles/theme.css`) |
| Components | shadcn/ui-style primitives in `src/app/components/ui/` |
| Icons | [Lucide React](https://lucide.dev/) |

## Developer documentation

Contributor guides, conventions, and step-by-step instructions live in **[docs/](docs/README.md)**.

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
| `npm run build` | Bundle for production |
| `npm run typecheck` | Run TypeScript without emitting files |

## Project structure

```
Brickly/
├── docs/                       # Developer documentation
├── public/                   # Static assets (favicon, OG image)
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layout/       # App shell (sidebar, header, nav-config)
│   │   │   └── ui/           # shadcn-style primitives + doc helpers
│   │   ├── pages/            # One page per component category
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── styles/               # Global CSS, theme tokens, Tailwind entry
│   └── main.tsx
├── ATTRIBUTIONS.md           # Third-party licenses
└── ROADMAP.md                # Planned improvements and priorities
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
| `/tokens` | Design Tokens | Color, radius, and typography tokens from `theme.css` |
| `/buttons` | Buttons | Variants, sizes, states |
| `/badges` | Badges | Status and label styles |
| `/alerts` | Alerts | Info, success, warning, error |
| `/avatars` | Avatars | Image, initials, groups |
| `/cards` | Cards | shadcn Card compositions (stats, profile, media, actions) |
| `/carousel` | Carousel | Image, card, and autoplay sliders |
| `/charts` | Charts | Bar, line, area, pie with Recharts |
| `/command` | Command | Inline palette, dialog, empty/loading states |
| `/date-picker` | Date Picker | Inline, popover, range, disabled |
| `/forms` | Forms | Input, select, checkbox, switch, radio, react-hook-form |
| `/progress` | Progress | Bar (shadcn) and radial (chart) |
| `/resizable` | Resizable | Horizontal, vertical, panel constraints |
| `/sidebar` | Sidebar | Collapsible, icon, floating variants |
| `/modals` | Modals | Dialog, sheet, drawer, alert dialog |
| `/otp` | OTP Input | Split digits, masked, form validation |
| `/tabs` | Tabs | Default, pills, vertical |
| `/tables` | Tables | Basic, striped, sortable |
| `/loading` | Loading | Spinner, skeleton, dots |
| `/typography` | Typography | Headings, body, code |
| `/tooltips` | Tooltips | Tooltip, popover, hover card |
| `/accordion` | Accordion | Collapsible sections + Collapsible primitive |
| `/breadcrumbs` | Breadcrumbs | Navigation trail |
| `/dropdowns` | Dropdowns | Menus, context menu, checkable items |
| `/sliders` | Sliders | Range and stepped controls |
| `/pagination` | Pagination | shadcn Pagination with full controls |
| `/toasts` | Toasts | Sonner-only toast demos |
| `/stepper` | Stepper | Horizontal, vertical, wizard |

Additional shadcn primitives live under `src/app/components/ui/` (e.g. `calendar`, `menubar`, `navigation-menu`) and can be wired into new pages as needed. See [ROADMAP.md](ROADMAP.md) for planned improvements.

## Design system

- **Tokens** — Semantic colors and spacing are defined in `src/styles/theme.css` and wired through Tailwind (`bg-primary`, `text-muted-foreground`, etc.).
- **UI primitives** — Most interactive controls use Radix-based shadcn components with `cn()` and CVA variants.
- **Doc-only components** — `PageHeader`, `ComponentSection`, and `CodeBlock` power the documentation layout; they are not part of the shadcn registry.
- **Composition demos** — A few pages (stepper, loading, typography) document patterns built from tokens and primitives rather than a single shadcn file.

## Adding a new component page

See **[docs/component-pages.md](docs/component-pages.md)** for the full step-by-step guide. Short version:

1. Create `src/app/pages/YourPage.tsx` using `PageHeader` and `ComponentSection`.
2. Import primitives from `src/app/components/ui/`.
3. Register the route in `src/app/routes.tsx`.
4. Add an entry in `src/app/components/layout/nav-config.ts` and on `OverviewPage`.

## Roadmap

Planned work — branding, new pages, deployment, tests, and more — is tracked in [ROADMAP.md](ROADMAP.md).

## Attributions

UI components are based on [shadcn/ui](https://ui.shadcn.com/) (MIT). See [ATTRIBUTIONS.md](ATTRIBUTIONS.md) for full license details and image credits.

## License

Refer to repository ownership and `ATTRIBUTIONS.md` for third-party terms. shadcn/ui components retain their MIT license as noted in attributions.
