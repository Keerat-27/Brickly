# Contributing

How to contribute to Brickly effectively.

## Before you start

1. Read [Conventions](conventions.md).
2. Check [ROADMAP.md](../ROADMAP.md) for planned work — avoid duplicating in-flight items.
3. For new pages, follow [Component pages](component-pages.md).

## Branch naming

```
feat/charts-page
fix/pagination-ellipsis
docs/contributing-guide
chore/trim-deps
```

## PR checklist

Copy into your PR description:

```markdown
## Summary
- …

## Changes
- …

## Test plan
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] Tested route(s) in browser
- [ ] Dark mode checked
- [ ] Preview / Code tabs match on edited sections
- [ ] README or docs updated (if user-facing)
```

## What to run locally

**Minimum before every PR:**

```bash
npm run typecheck
npm run build
```

**Manual browser checks:**

- New/changed routes load
- Sidebar + ⌘K search include new nav items
- Dark mode toggle works on edited pages

## Scope guidance

| Change type | Touch |
|-------------|-------|
| New doc page | `pages/`, `routes.tsx`, `nav-config.ts`, `OverviewPage.tsx` |
| New shadcn primitive | `ui/`, page demo, `package.json` if new dep |
| Theme tweak | `theme.css`, `TokensPage.tsx`, this doc |
| Branding / copy | `index.html`, `Sidebar.tsx`, `README.md` |

Keep PRs focused — one page or one concern per PR when possible.

## Documentation updates

| Audience | Location |
|----------|----------|
| End users / GitHub visitors | `README.md` |
| Developers / contributors | `docs/` (this folder) |
| Planned work | `ROADMAP.md` |
| Licenses | `ATTRIBUTIONS.md` |

When you add a route, update the README component catalog table.

When you change workflow or architecture, update the relevant `docs/*.md` file.

## Claiming roadmap items

In your PR description, reference the roadmap section:

```
Closes ROADMAP §3 — Charts page
```

Check off tasks in `ROADMAP.md` when completing them.

## Code review expectations

Reviewers will check:

- Arrow-function component style
- shadcn imports for interactive demos
- Honest `source` tags on sections
- No unrelated drive-by changes
- No committed secrets or `dist/`

## Questions?

- Open a GitHub issue on [Keerat-27/Brickly](https://github.com/Keerat-27/Brickly)
- For AI-assisted work, point agents at `docs/README.md` and `docs/conventions.md`
