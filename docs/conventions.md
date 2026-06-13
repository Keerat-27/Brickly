# Conventions

Coding standards for Brickly. Follow these so pages stay consistent and copy-paste snippets stay trustworthy.

## Component style

### Arrow-function exports

```tsx
// ✅ Preferred
export const ButtonsPage = () => {
  return <div>...</div>;
};

// ❌ Avoid
export function ButtonsPage() { ... }
```

shadcn primitives in `ui/` also use `export const ComponentName = () => {}`.

### File naming

| Type | Pattern | Example |
|------|---------|---------|
| Doc pages | `PascalCase` + `Page` | `ButtonsPage.tsx` |
| UI primitives | `kebab-case.tsx` | `alert-dialog.tsx` |
| Layout | `PascalCase.tsx` | `Header.tsx` |

### Imports

- Use the `@/` alias for app code (e.g. `@/app/components/ui/button`).
- In **displayed snippets**, use `@/components/ui/...` — shorter and matches the Code tab toggle.
- Group imports: React → third-party → `@/app/components/...` → relative (avoid relative when `@/` works).
- Icons from `lucide-react`.

## Documentation page anatomy

Every component page follows this structure:

```tsx
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";

export const ExamplePage = () => {
  return (
    <div className="space-y-10">
      <PageHeader
        title="Example"
        description="One-line summary of what this page covers."
        badge="Component"
      />

      <ComponentSection
        title="Variants"
        description="What this section demonstrates."
        source="shadcn"
        code={`import { Button } from "@/components/ui/button";

<Button variant="default">Click me</Button>`}
      >
        <Button variant="default">Click me</Button>
      </ComponentSection>
    </div>
  );
};
```

### `PageHeader` props

| Prop | Type | Notes |
|------|------|-------|
| `title` | `string` | Page H1 |
| `description` | `React.ReactNode` | Subtitle; can include links |
| `badge` | `string?` | e.g. `"Component"`, `"Reference"` |

### `ComponentSection` props

| Prop | Type | Notes |
|------|------|-------|
| `title` | `string` | Section heading |
| `description` | `string?` | Short explanation |
| `code` | `string` | Shown in Code tab; must match Preview |
| `source` | `"shadcn" \| "composition" \| "custom"?` | Badge for demo type |
| `shadcnComponent` | `ShadcnComponentName?` | Derives install command from `shadcn-registry.ts` |
| `installCommand` | `string?` | Override auto-generated shadcn CLI hint |
| `accessibility` | `string?` | Optional a11y guidance shown below the section |
| `children` | `ReactNode` | Live preview content |

The Code tab includes an import-path toggle and a **Copy full example** button that exports imports, snippet, and install command together.

## Demo source types

| Tag | When to use | Example |
|-----|-------------|---------|
| `shadcn` | Demo imports a primitive from `ui/` | Button variants, Dialog |
| `composition` | Built from multiple primitives + tokens | Avatar + status dot, stepper UI |
| `custom` | No shadcn equivalent | Typography scale, token swatches |

**Do not** wrap custom markup in `Card` just to earn a `shadcn` tag. Label honestly.

## shadcn companions

These third-party libraries are used via shadcn wrappers and count as shadcn-aligned:

| Library | Wrapper | Used for |
|---------|---------|----------|
| Sonner | `ui/sonner.tsx` | Toasts |
| Vaul | `ui/drawer.tsx` | Drawer |
| Recharts | `ui/chart.tsx` | Charts, radial progress |
| react-hook-form | `ui/form.tsx` | Form validation |
| embla-carousel-react | `ui/carousel.tsx` | Carousel |
| input-otp | `ui/input-otp.tsx` | OTP input |

## Styling rules

- Use **semantic tokens**: `bg-background`, `text-foreground`, `border-border`, `text-muted-foreground`.
- Avoid hard-coded hex in components when a token exists.
- Prefer Tailwind utilities over inline styles (exception: demo-specific widths in skeleton loaders).
- Dark mode must work without extra code — rely on CSS variables.

## Code snippets

1. **Preview and Code must match** — if Preview shows three buttons, Code shows three buttons.
2. Include **import lines** in snippets when they help copy-paste.
3. Use template literals for multi-line `code` props.
4. Escape backticks inside template literals when showing template literal examples.

## Accessibility

- Icon-only buttons need `aria-label`.
- Interactive demos should be keyboard-operable (Radix primitives handle most cases).
- Prefer shadcn/Radix over custom `<button>` + `onClick` when building new interactive demos.

## What not to do

- Don't add MUI, Chakra, or parallel component libraries.
- Don't commit `dist/` or `node_modules/`.
- Don't add dependencies without using them in `src/`.
- Don't create empty commits or drive-by refactors on unrelated files.
