# Tooling

Scripts, build pipeline, and troubleshooting.

## npm scripts

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `vite` | Development server with HMR (port 5173) |
| `build` | `vite build` | Production bundle to `dist/` |
| `typecheck` | `tsc --noEmit` | TypeScript validation (strict) |
| `lint` | `eslint src` | ESLint with `eslint-plugin-jsx-a11y` recommended rules |
| `preview` | `vite preview` | Local production preview |
| `test` | `vitest run` | Vitest smoke tests |

Run before every PR:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## TypeScript

Config: `tsconfig.json`

- **Strict mode** enabled
- **Path alias:** `@/*` → `./src/*`
- **Include:** `src/` only
- **JSX:** `react-jsx` (no React import required)

## Vite

Config: `vite.config.ts`

- `@vitejs/plugin-react` — Fast Refresh
- `@tailwindcss/vite` — Tailwind v4
- Alias `@` → `src/`
- `assetsInclude` — raw import support for `.svg`, `.csv`

## Linting

Config: `eslint.config.js` (flat config)

- **TypeScript** — `typescript-eslint` recommended rules
- **React** — `eslint-plugin-react` recommended + jsx-runtime
- **Accessibility** — `eslint-plugin-jsx-a11y` recommended rules on all `src/` files
- **CI** — `npm run lint` runs on every push and PR (see `.github/workflows/ci.yml`)

UI primitive wrappers under `src/app/components/ui/` relax `heading-has-content` and `anchor-has-content` because content is supplied by consumers at usage sites.

## Dependencies

### Adding a dependency

1. Confirm it's required by a shadcn primitive or page demo.
2. `npm install <package>`
3. Run `typecheck` + `lint` + `build`.
4. Avoid bloating the bundle — check if the primitive is used on a frequently visited page.

### Auditing unused deps

```bash
npx depcheck
```

Or grep `src/` for imports before removing packages.

## Build output

```
dist/
├── index.html
└── assets/
    ├── index-*.css
    └── index-*.js
```

**Do not commit `dist/`.** It's listed in `.gitignore`.

### Bundle size note

Recharts (via `chart.tsx`) increases bundle size. Consider route-level code splitting in a future optimization pass if the main chunk exceeds comfortable limits.

## Troubleshooting

### `npm run dev` fails

- Delete `node_modules` and `package-lock.json`, then `npm install`.
- Ensure Node 18+.

### Type errors on `@/` imports

Confirm `tsconfig.json` paths and `vite.config.ts` alias both map `@` to `src`.

### ESLint failures on a new page

- Icon-only buttons need `aria-label`.
- Elements in arrays need `key` props.
- Run `npm run lint` locally before pushing.

### Styles not applying

- Check `main.tsx` imports `src/styles/index.css`.
- Confirm Tailwind classes use mapped tokens (`bg-primary`, not arbitrary one-off colors).
- Hard-refresh browser after `theme.css` changes.

### Dark mode stuck

Clear `localStorage` key used by Layout (inspect `Layout.tsx` for the exact key) or toggle from header.

### shadcn component looks wrong

- Compare with [shadcn docs](https://ui.shadcn.com/docs/components).
- Ensure `theme.css` variables match expected shadcn token names.
- Check for missing peer Radix package.

## IDE setup

Recommended:

- VS Code / Cursor with TypeScript and Tailwind CSS IntelliSense
- Format on save (project has no Prettier config — match surrounding style manually)

Path alias `@/` should resolve in the editor via `tsconfig.json` paths.
