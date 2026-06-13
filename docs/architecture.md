# Architecture

## High-level overview

```
Browser
  └── React 18 + React Router 7
        └── Layout (sidebar + header + outlet)
              └── lazy-loaded page components (ButtonsPage, CardsPage, …)
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
│   ├── test/                       # Vitest setup and smoke tests
│   └── app/
│       ├── App.tsx                 # RouterProvider wrapper
│       ├── routes.tsx              # Route definitions (lazy-loaded pages)
│       ├── lazy-page.ts            # lazyPage() helper with chunk-reload retry
│       ├── route-expectations.ts   # Expected page titles for route tests
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Layout.tsx           # App shell wrapper
│       │   │   ├── Header.tsx           # Search, dark mode, GitHub link
│       │   │   ├── Sidebar.tsx          # Navigation sidebar
│       │   │   ├── nav-config.ts        # Single source of nav items
│       │   │   ├── useTheme.ts          # Dark mode hook + localStorage
│       │   │   ├── PageErrorBoundary.tsx
│       │   │   ├── RouteErrorPage.tsx
│       │   │   └── ErrorFallback.tsx
│       │   └── ui/
│       │       ├── *.tsx           # shadcn-style primitives (~48 files)
│       │       ├── PageHeader.tsx  # Doc page title block
│       │       ├── ComponentSection.tsx  # Preview / Code tabs
│       │       ├── CodeBlock.tsx   # Syntax display + copy button
│       │       ├── buildFullExample.ts   # "Copy full example" builder
│       │       └── shadcn-registry.ts    # Registry names for install hints
│       └── pages/
│           └── *Page.tsx           # One file per documentation route
├── index.html                      # HTML shell, meta tags
├── vite.config.ts                  # Vite + Tailwind + Vitest + @ alias
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
- `buildFullExample.ts`, `transformImportPaths.ts`, `shadcn-registry.ts`

### 2. Documentation pages (`src/app/pages/`)

Each `*Page.tsx` file documents one component category. Pages compose primitives inside `ComponentSection` blocks with live previews and copyable code.

### 3. App shell (`src/app/components/layout/`)

Custom layout — not from shadcn registry today. May adopt shadcn `sidebar.tsx` in a future phase (see ROADMAP §15).

## Routing

Routes are defined in `src/app/routes.tsx` using React Router 7's `createBrowserRouter`. Pages are **lazy-loaded** via `lazyPage()` to keep the initial bundle lean:

```tsx
const ButtonsPage = lazyPage(() => import("./pages/ButtonsPage"), "ButtonsPage");

// Inside Layout children:
{ path: "buttons", Component: ButtonsPage }
```

The layout route wraps all pages:

```tsx
{ path: "/", Component: Layout, children: [ … ] }
```

`Layout` wraps the outlet in `Suspense` (skeleton fallback) and `PageErrorBoundary`. Router-level errors render `RouteErrorPage`.

**Every new page needs:**

1. A `lazyPage()` entry in `routes.tsx`
2. An entry in `nav-config.ts` (sidebar + ⌘K search)
3. A card on `OverviewPage.tsx` (optional but recommended)
4. An expectation in `route-expectations.ts` (picked up automatically by route smoke tests when derived from nav)

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

In **displayed code snippets** on doc pages, use `@/components/ui/...` as a shorter reader-friendly path. The Code tab import-path toggle switches between alias and relative paths when copying.

## Styling pipeline

1. `src/main.tsx` imports `src/styles/index.css`
2. `index.css` imports Tailwind and `theme.css`
3. `theme.css` defines CSS variables (`--primary`, `--background`, …)
4. Tailwind v4 `@theme inline` maps variables to utilities (`bg-primary`, `text-muted-foreground`)
5. Dark mode: `.dark` class on `<html>` swaps variable values

## State and data

- **No global state library** — pages use local `useState` for interactive demos.
- **No fetch/API** — all content is static.
- **Dark mode** — `useTheme()` in `layout/useTheme.ts` toggles the `dark` class on `<html>` and persists to `localStorage` (`brickly-theme`).

## Error handling

| Layer | File | Purpose |
|-------|------|---------|
| Route errors | `RouteErrorPage.tsx` | React Router `errorElement` for failed navigations |
| Page render errors | `PageErrorBoundary.tsx` | Catches errors inside the main content outlet |
| Fallback UI | `ErrorFallback.tsx` | Shared error display with retry action |

## Lazy loading and chunk recovery

`lazy-page.ts` wraps `React.lazy()` with a one-time reload retry when a dynamic import fails (common after a deploy when cached HTML references stale chunk hashes).

Heavy pages (Charts, Carousel, Command) load on demand. Vitest smoke tests in `src/test/routes.test.tsx` verify every route renders without crashing.

## Catalog coverage

Brickly documents **33 pages** total: Overview, Design Tokens, and **31 component categories**. All major shadcn primitives under `ui/` are demonstrated on at least one page. See the README component catalog for the full route list.
