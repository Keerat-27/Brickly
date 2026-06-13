# Brickly — Developer Documentation

Internal docs for contributors and maintainers. Brickly is a **documentation site** for a shadcn/ui-style component library — not a publishable npm package.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # before opening a PR
npm run lint       # ESLint + jsx-a11y
npm run test       # Vitest smoke tests
npm run build      # production bundle → dist/
```

## Documentation index

| Doc | What you'll learn |
|-----|-------------------|
| [Getting started](getting-started.md) | Prerequisites, install, daily dev workflow |
| [Architecture](architecture.md) | Folder layout, routing, app shell, doc vs UI components |
| [Conventions](conventions.md) | Code style, naming, shadcn vs composition vs custom |
| [Component pages](component-pages.md) | Step-by-step: add a new documentation page |
| [shadcn primitives](shadcn.md) | Add, restore, and wire shadcn/ui components |
| [Design tokens](design-tokens.md) | Theme variables, Tailwind mapping, dark mode |
| [Tooling](tooling.md) | Scripts, TypeScript, Vite, troubleshooting |
| [Contributing](contributing.md) | PR checklist, roadmap, what to run before merge |

## Related repo docs

- [README.md](../README.md) — project overview and component catalog
- [ROADMAP.md](../ROADMAP.md) — planned work and priorities
- [ATTRIBUTIONS.md](../ATTRIBUTIONS.md) — third-party licenses

## Who this is for

- **Contributors** adding or updating component documentation pages
- **Maintainers** restoring shadcn primitives or adjusting the theme
- **AI assistants** — follow [Conventions](conventions.md) and [Component pages](component-pages.md) when generating code

## Golden rules

1. **Interactive demos** should import from `src/app/components/ui/` (or documented companions: Sonner, Vaul, Recharts).
2. **Preview and Code tabs must match** — the string in `ComponentSection`'s `code` prop should reflect what renders in Preview.
3. **Arrow-function components** — `export const Foo = () => {}`, not `function Foo()`.
4. **Run `typecheck`, `lint`, `test`, and `build`** before opening a PR.
5. **Tag demos** with `source="shadcn" | "composition" | "custom"` on `ComponentSection` when adding or editing sections.
