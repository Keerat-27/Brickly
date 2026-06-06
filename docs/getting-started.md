# Getting started

## Prerequisites

- **Node.js** 18+ (20+ recommended)
- **npm**, pnpm, or yarn (repo uses npm in scripts/docs)

## Clone and install

```bash
git clone https://github.com/Keerat-27/Brickly.git
cd Brickly
npm install
```

## Development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite provides hot module replacement (HMR).

## Production build

```bash
npm run build
```

Output goes to `dist/`. The `dist/` folder is gitignored — generate it locally or in CI, do not commit it.

To preview the production build locally:

```bash
npx vite preview
```

(`preview` script may be added to `package.json` in a future roadmap item.)

## Type checking

```bash
npm run typecheck
```

Runs `tsc --noEmit` with strict mode. Fix all errors before submitting a PR.

## Typical workflow

1. Pull latest `main`.
2. Create a branch: `git checkout -b feat/charts-page`.
3. Make changes (see [Component pages](component-pages.md)).
4. Run `npm run typecheck && npm run build`.
5. Open a PR with a short summary and test plan.

## Environment variables

Brickly has **no required `.env` file** today. The app is a static Vite SPA with no backend.

## Dark mode during development

Toggle dark mode from the **header** (moon/sun icon). It adds/removes the `dark` class on `<html>`. All theme tokens in `src/styles/theme.css` respond automatically.

## Common first tasks

| Goal | Start here |
|------|------------|
| Add a new doc page | [Component pages](component-pages.md) |
| Restore a shadcn file | [shadcn primitives](shadcn.md) |
| Change colors / radius | [Design tokens](design-tokens.md) |
| Understand folder layout | [Architecture](architecture.md) |
