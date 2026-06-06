# Architecture

## High-level overview

```
Browser
  └── React 18 + React Router 7
        └── Layout (sidebar + header + outlet)
              └── Page components (ButtonsPage, CardsPage, …)
                    └── ComponentSection (preview / code tabs)
                          └── shadcn primitives (src/app/components/ui/)
```

Brickly is a **single-page application** built with Vite. There is no API layer, database, or SSR.

## Directory structure

```
Brickly/
├── public/                         # Static assets (favicon, OG image)
├── docs/                           # Developer documentation (you are here)
├── src/
│   ├── main.tsx                    # React root mount
│   ├── styles/
│   │   ├── index.css               # Global entry (imports tailwind + theme)
│   │   ├── tailwind.css            # Tailwind v4 entry
│   │   └── theme.css               # CSS variables (design tokens)
│   └── app/
│       ├── App.tsx                 # RouterProvider wrapper
│       ├── routes.tsx              # Route definitions
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Layout.tsx      # App shell wrapper
│       │   │   ├── Header.tsx      # Search, dark mode, GitHub link
│       │   │   ├── Sidebar.tsx     # Navigation sidebar
│       │   │   └── nav-config.ts   # Single source of nav items
│       │   └── ui/
│       │       ├── *.tsx           # shadcn-style primitives (~49 files)
│       │       ├── PageHeader.tsx  # Doc page title block
│       │       ├── ComponentSection.tsx  # Preview / Code tabs
│       │       └── CodeBlock.tsx   # Syntax display + copy button
│       └── pages/
│           └── *Page.tsx           # One file per documentation route
├── index.html                      # HTML shell, meta tags
├── vite.config.ts                  # Vite + Tailwind + @ alias
├── tsconfig.json                   # Strict TypeScript
├── package.json
├── README.md                       # User-facing overview
└── ROADMAP.md                      # Planned improvements
```

## Two kinds of components

### 1. shadcn primitives (`src/app/components/ui/`)

Radix UI + Tailwind + `class-variance-authority` + `cn()`. These mirror [shadcn/ui](https://ui.shadcn.com/) patterns. Examples: `button`, `dialog`, `card`, `tabs`.

**Exception:** Doc helpers in the same folder are **not** shadcn registry components:

- `PageHeader`
- `ComponentSection`
- `CodeBlock`

### 2. Documentation pages (`src/app/pages/`)

Each `*Page.tsx` file documents one component category. Pages compose primitives inside `ComponentSection` blocks with live previews and copyable code.

### 3. App shell (`src/app/components/layout/`)

Custom layout — not from shadcn registry today. May adopt shadcn `sidebar.tsx` in a future phase (see ROADMAP §3).

## Routing

Routes are defined in `src/app/routes.tsx` using React Router 7's `createBrowserRouter`:

```tsx
{ path: "buttons", Component: ButtonsPage }
```

The layout route wraps all pages:

```tsx
{ path: "/", Component: Layout, children: [ … ] }
```

**Every new page needs:**

1. A route in `routes.tsx`
2. An entry in `nav-config.ts` (sidebar + ⌘K search)
3. A card on `OverviewPage.tsx` (optional but recommended)

## Navigation config

`nav-config.ts` is the **single source of truth** for:

- Sidebar groups and links
- Header command palette (⌘K search)

Keep labels and paths in sync with `routes.tsx`.

## Path alias

`@/` maps to `src/` in both Vite and TypeScript:

```tsx
import { Button } from "@/app/components/ui/button";
```

In **displayed code snippets** on doc pages, you may use `@/components/ui/...` as a shorter reader-friendly path — match whatever convention the surrounding page already uses.

## Styling pipeline

1. `src/main.tsx` imports `src/styles/index.css`
2. `index.css` imports Tailwind and `theme.css`
3. `theme.css` defines CSS variables (`--primary`, `--background`, …)
4. Tailwind v4 `@theme inline` maps variables to utilities (`bg-primary`, `text-muted-foreground`)
5. Dark mode: `.dark` class on `<html>` swaps variable values

## State and data

- **No global state library** — pages use local `useState` for interactive demos.
- **No fetch/API** — all content is static.
- **Dark mode** — `localStorage` + `document.documentElement.classList` in `Layout.tsx`.

## Primitives without doc pages yet

These exist under `ui/` but do not have dedicated routes (Phase 3 roadmap):

`carousel`, `input-otp`, `menubar`, `navigation-menu`, `resizable`, `scroll-area`, `sidebar` (layout primitive)

`chart` is partially used on the Progress page (radial demo).
