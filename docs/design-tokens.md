# Design tokens

Brickly's visual language is defined in CSS variables and exposed through Tailwind utilities.

## Source of truth

```
src/styles/theme.css
```

Imported via `src/styles/index.css` → loaded in `src/main.tsx`.

## Semantic colors

Defined on `:root` (light) and `.dark` (dark mode):

| Variable | Tailwind examples |
|----------|-------------------|
| `--background` | `bg-background` |
| `--foreground` | `text-foreground` |
| `--primary` | `bg-primary`, `text-primary` |
| `--primary-foreground` | `text-primary-foreground` |
| `--secondary` | `bg-secondary` |
| `--muted` | `bg-muted`, `text-muted-foreground` |
| `--accent` | `bg-accent`, `hover:bg-accent` |
| `--destructive` | `bg-destructive`, `text-destructive` |
| `--border` | `border-border` |
| `--ring` | `ring-ring` |
| `--card` | `bg-card` |

### Chart colors

`--chart-1` through `--chart-5` → `bg-chart-1`, `fill-[var(--color-chart-1)]`, etc.

Used by `ui/chart.tsx` and the Progress radial demo.

### Sidebar colors

`--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border` — for navigation shells and the shadcn Sidebar primitive.

## Radius

Base: `--radius: 0.625rem`

Tailwind scale (from `@theme inline`):

| Token | Utility |
|-------|---------|
| `--radius-sm` | `rounded-sm` |
| `--radius-md` | `rounded-md` |
| `--radius-lg` | `rounded-lg` |
| `--radius-xl` | `rounded-xl` |

## Typography

| Variable | Purpose |
|----------|---------|
| `--font-size` | Base HTML font size (16px) |
| `--font-weight-medium` | Default medium weight (500) |
| `--font-weight-normal` | Body weight (400) |

Heading/body scale is applied in `@layer base` in `theme.css` and demonstrated on `/typography`.

## Dark mode

The header toggle calls `useTheme()` from `layout/useTheme.ts`. It adds the `dark` class to `document.documentElement` and persists the choice to `localStorage` under `brickly-theme`.

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

**No `next-themes`** — Brickly uses a simple class toggle + `localStorage`.

Sonner reads dark mode via `MutationObserver` on `<html class>` in `ui/sonner.tsx`.

## Changing the theme

1. Edit values in `src/styles/theme.css`.
2. Prefer OKLCH or hex for colors — keep light/dark pairs readable (WCAG AA target for text).
3. Check `/tokens` page and a few component pages in both modes.
4. Run `npm run build` to confirm no CSS errors.

## Tailwind v4 setup

- Plugin: `@tailwindcss/vite` in `vite.config.ts`
- Entry: `src/styles/tailwind.css`
- `@theme inline` block in `theme.css` maps CSS variables to Tailwind color/radius tokens

## Documenting new tokens

If you add variables:

1. Add to `:root` and `.dark` in `theme.css`
2. Map in `@theme inline` if they need Tailwind utilities
3. Add swatches to `TokensPage.tsx`
4. Mention in this doc

## Live reference

Run the dev server and open [/tokens](http://localhost:5173/tokens) for interactive swatches that respond to the header dark mode toggle.
