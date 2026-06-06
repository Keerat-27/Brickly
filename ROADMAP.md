# Brickly Roadmap

A living plan for evolving Brickly from a browsable component reference into a polished, production-ready design-system documentation site.

---

## 1. Restore missing shadcn primitives

During cleanup, several shadcn/ui components were removed because they were not yet wired into any page. Many of these are worth bringing back as the library grows.

### Components to restore

| Component | File | Suggested use |
|-----------|------|---------------|
| Card | `card.tsx` | Replace hand-built card markup on the Cards page |
| Drawer | `drawer.tsx` | Add a slide-up panel demo on the Modals page |
| Chart | `chart.tsx` | New Charts page with bar, line, and area examples |
| Carousel | `carousel.tsx` | New Carousel page for image and content sliders |
| Alert Dialog | `alert-dialog.tsx` | Destructive confirm flows on the Modals page |
| Collapsible | `collapsible.tsx` | Lightweight expand/collapse alternative to Accordion |
| Context Menu | `context-menu.tsx` | Right-click menu demo on the Dropdowns page |
| Form | `form.tsx` | React Hook Form integration on the Forms page |
| Hover Card | `hover-card.tsx` | Rich preview cards on the Tooltips page |
| Input OTP | `input-otp.tsx` | New OTP / verification code page |
| Menubar | `menubar.tsx` | Desktop-style menu bar demo |
| Navigation Menu | `navigation-menu.tsx` | Mega-menu / site-nav patterns |
| Pagination | `pagination.tsx` | Replace custom pagination on the Pagination page |
| Resizable | `resizable.tsx` | New resizable panels page |
| Scroll Area | `scroll-area.tsx` | Custom scrollbars in sidebar or long lists |
| Separator | `separator.tsx` | Visual dividers across doc sections |
| Sidebar | `sidebar.tsx` | Optional upgrade to the current layout sidebar |
| Sonner | `sonner.tsx` | Replace custom toast demos with the Sonner toaster |
| Toggle / Toggle Group | `toggle.tsx`, `toggle-group.tsx` | Segmented controls on Buttons or Forms page |
| Aspect Ratio | `aspect-ratio.tsx` | Media cards and responsive image containers |

### Tasks

- [x] Re-add components via `npx shadcn@latest add <component>` or restore from git history
- [x] Verify each restored file uses arrow-function style (`export const`)
- [x] Confirm no duplicate or conflicting styles with existing pages
- [x] Run `npm run typecheck` and `npm run build` after each batch

### Wired into existing pages (done)

| Component | Page |
|-----------|------|
| Card, Aspect Ratio | Cards |
| Alert Dialog, Drawer | Modals |
| Pagination | Pagination |
| Sonner | Toasts |
| Context Menu | Dropdowns |
| Form | Forms |
| Hover Card | Tooltips |
| Collapsible | Accordion |
| Toggle, Toggle Group | Buttons |

### Restored, awaiting dedicated pages (see §3)

`chart`, `carousel`, `input-otp`, `menubar`, `navigation-menu`, `resizable`, `scroll-area`, `sidebar`, `separator`

---

## 2. Migrate custom demos to full shadcn usage

Brickly is **shadcn-based**, but not every doc page demo imports a shadcn primitive yet. Some examples are hand-built markup that only shares the same design tokens (`bg-card`, `border-border`, etc.).

### What is shadcn today

| Layer | Status |
|-------|--------|
| `src/app/components/ui/*` (48 files) | shadcn-style — Radix UI + Tailwind + CVA + `cn()` |
| `PageHeader`, `ComponentSection`, `CodeBlock` | **Custom** — doc-site helpers, not in shadcn registry |
| `Layout`, `Header`, `Sidebar` | **Custom** — app shell (may later adopt shadcn `sidebar.tsx`) |

### Custom demos to replace

| Page | Already shadcn | Still custom — migrate to |
|------|----------------|---------------------------|
| **Cards** | Basic Card, Aspect Ratio | Stat, profile, horizontal, and action cards → `Card`, `CardHeader`, `CardContent`, `CardFooter` |
| **Pagination** | shadcn Pagination section | Default, outline, pill, minimal, full, page-size variants → shadcn `Pagination` primitives or remove duplicates |
| **Toasts** | Sonner section | Custom toast system (`Toast`, `useToasts`, `ToastDemo`) → Sonner only |
| **Stepper** | Button, Input, Label | Horizontal, vertical, icon, wizard steppers → evaluate shadcn pattern or keep as "composition" demo |
| **Loading** | Skeleton | Spinner, dots, pulse loaders → keep as custom or document as non-shadcn patterns |
| **Progress** | Progress bar | Circular progress → shadcn `Progress` or `chart` |
| **Typography** | — | All hand-built HTML → token-based typography page (see §4) |
| **Accordion** | Accordion, Collapsible | Plus/minus accordion → `Collapsible` or `Accordion` |
| **Avatars** | Avatar, AvatarImage, AvatarFallback | Custom `UserAvatar`, `AvatarGroup`, color helpers → shadcn `Avatar` compositions |
| **Tabs** | Tabs (default) | Vertical tabs demo → shadcn `Tabs` with `orientation="vertical"` |
| **Alerts** | Alert | Dismissible alert wrapper → shadcn `Alert` + local state |

### Tasks

- [x] Audit each page in `src/app/pages/` and tag every `ComponentSection` as **shadcn** or **custom** (via `source` prop on migrated pages)
- [x] Replace custom card markup on Cards page with `Card` subcomponents
- [x] Consolidate Pagination page — pick shadcn `Pagination` as the canonical demo; demote or remove hand-rolled variants
- [x] Remove custom toast implementation on Toasts page; document Sonner as the only approach
- [x] Refactor Accordion plus/minus demo to use `Collapsible`
- [x] Refactor Avatars page groups to use shadcn `Avatar` only
- [x] Update code snippets in each migrated section so Preview and Code tabs match
- [x] Update README component catalog notes once migrations are complete

### Definition of done

A page is **fully shadcn** when every interactive demo imports from `src/app/components/ui/` (or a documented third-party shadcn companion like Sonner/Vaul/Recharts), and code snippets show those imports — not raw `<div>` compositions.

---

## 3. New component documentation pages

Brickly currently covers 21 categories. These pages would fill the biggest gaps in the catalog.

### Charts (`/charts`)

- Bar, line, area, and pie chart demos using the restored `chart.tsx` + Recharts
- Live data toggle (static vs. animated)
- Theming charts with CSS variables (`--chart-1` through `--chart-5`)

### Command palette (`/command`)

- Dedicated page beyond the header search shortcut
- Grouped commands, recent items, and keyboard shortcut hints
- Empty state and loading state variants

### Sidebar layout (`/sidebar`)

- Demo of the shadcn `sidebar.tsx` primitive: collapsible, icon-only, and floating variants
- Compare with the current custom layout sidebar in `layout/Sidebar.tsx`

### OTP input (`/otp`)

- Single-field, split-digit, and masked input patterns
- Form integration example with validation states

### Resizable panels (`/resizable`)

- Horizontal and vertical split layouts
- Collapsible panel handles and min/max size constraints

### Carousel (`/carousel`)

- Image carousel, card carousel, and autoplay variants
- Prev/next controls and dot indicators

### Tasks

- [ ] Create page component in `src/app/pages/`
- [ ] Register route in `src/app/routes.tsx`
- [ ] Add entry to `OverviewPage` and `nav-config.ts`
- [ ] Follow existing `PageHeader` + `ComponentSection` pattern with Preview/Code tabs

---

## 4. Theme and design token reference page

Today, tokens live in `src/styles/theme.css` but are not documented anywhere in the UI.

### Proposed route: `/tokens` or `/theme`

**Color tokens**
- Swatches for `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`
- Chart colors (`--chart-1` – `--chart-5`)
- Sidebar-specific tokens
- Side-by-side light and dark mode previews

**Spacing and layout**
- Border radius scale (`--radius-sm` through `--radius-xl`)
- Common spacing utilities used across pages

**Typography**
- Font family, base size (`--font-size`), weight tokens
- Cross-link to the existing Typography page for usage examples

**Copyable usage**
- Each token shows the CSS variable name and equivalent Tailwind class (e.g. `bg-primary`, `text-muted-foreground`)

### Tasks

- [x] Build `TokensPage.tsx` with live swatches that respond to dark mode toggle
- [x] Add route and navigation entry
- [x] Update README project structure to reference `theme.css` instead of removed `default_shadcn_theme.css`

---

## 5. Trim unused dependencies

`package.json` still lists packages that were only used by deleted components or are not imported anywhere in `src/`.

### Candidates for removal

| Package | Was used by |
|---------|-------------|
| `@mui/material`, `@mui/icons-material` | Not imported in `src/` |
| `@emotion/react`, `@emotion/styled` | MUI peer deps |
| `recharts` | Deleted `chart.tsx` |
| `vaul` | Deleted `drawer.tsx` |
| `embla-carousel-react` | Deleted `carousel.tsx` |
| `input-otp` | Deleted `input-otp.tsx` |
| `react-dnd`, `react-dnd-html5-backend` | Not used |
| `react-slick` | Not used |
| `react-responsive-masonry` | Not used |
| `react-popper`, `@popperjs/core` | Not used |
| `canvas-confetti` | Not used |
| `motion` | Not used |
| `next-themes` | Deleted `sonner.tsx` (only consumer) |

### Kept (required by restored primitives)

`recharts`, `vaul`, `embla-carousel-react`, `input-otp`, and `sonner` remain — they are imported by UI components under `src/app/components/ui/`.

### Approach

- [x] Audit with `npx depcheck` or manual grep before removing
- [x] Re-add packages only when restoring the components that need them (see §1)
- [x] Run `npm install`, `npm run typecheck`, and `npm run build` after each removal batch

---

## 6. Deploy the documentation site

Brickly is currently a local-only Vite app. Publishing it makes the component reference shareable.

### Hosting options

| Platform | Pros |
|----------|------|
| **Vercel** | Zero-config Vite support, preview deploys per PR |
| **Netlify** | Similar DX, free tier for static sites |
| **GitHub Pages** | Free, lives alongside the repo |

### Deployment checklist

- [ ] Add `preview` script: `vite preview` for local production testing
- [ ] Configure base path if deploying to a subpath (e.g. `/Brickly/` on GitHub Pages)
- [ ] Set up CI to run `npm run build` on push to `main`
- [ ] Add deploy badge and live URL to `README.md`
- [ ] Ensure `dist/` stays gitignored; build artifacts are generated in CI only

---

## 7. Add automated tests

There are no tests today. A lightweight suite would catch regressions as pages and primitives are added.

### Recommended stack

- **Vitest** — fast, Vite-native test runner
- **React Testing Library** — render and interact with components
- **@testing-library/jest-dom** — DOM matchers

### What to test first

| Area | Examples |
|------|----------|
| UI primitives | Button variants render, Dialog opens/closes, Tooltip shows on hover |
| Layout | Header dark-mode toggle, sidebar navigation links |
| Pages | Each page renders without crash, `PageHeader` title matches route |
| Routing | All routes in `routes.tsx` resolve to a component |

### Tasks

- [ ] Install Vitest + RTL and add `test` script to `package.json`
- [ ] Add `vitest.config.ts` with `@/` path alias matching Vite
- [ ] Write smoke tests for 3–5 critical pages
- [ ] Optionally add GitHub Actions workflow to run tests on PRs

---

## 8. Improve header search (command palette)

The header already has a ⌘K command dialog. It can be expanded into a full-featured palette.

### Enhancements

- **Fuzzy search** — match partial labels and descriptions (e.g. via `fuse.js` or `cmdk` built-in filtering)
- **Keyboard navigation** — arrow keys, Enter to select, Escape to close (partially supported via `cmdk`)
- **Recent items** — persist last 5 visited components in `localStorage`
- **Category grouping** — already grouped by `navItems`; add visual separators and group labels
- **Shortcut hints** — show `⌘K` in the search trigger tooltip (done) and inside the dialog footer
- **Deep links** — search by route path (`/buttons`) in addition to label

### Tasks

- [ ] Extend `ComponentSearch` in `Header.tsx`
- [ ] Add recent-items hook with `localStorage` persistence
- [ ] Update Tooltips page or add a note on the Overview about ⌘K

---

## 9. Copy and install snippets

Every `ComponentSection` already shows copyable code. The next step is making it easier to use that code in another project.

### Ideas

- **One-click copy** — already on `CodeBlock`; ensure all new pages use it consistently
- **Import path toggle** — switch between `@/app/components/ui/button` and relative paths in displayed code
- **shadcn CLI hint** — show `npx shadcn@latest add button` under primitives that map to the registry
- **Full example export** — copy an entire page section including imports as a single snippet
- **"Open in StackBlitz"** — optional link to a prefilled sandbox (larger effort)

### Tasks

- [ ] Add optional `installCommand` prop to `ComponentSection`
- [ ] Map each UI primitive to its shadcn registry name
- [ ] Document the copy workflow on the Overview page

---

## 10. Accessibility audit

Component libraries should model accessible patterns, not just visual ones.

### Areas to review

| Area | Checks |
|------|--------|
| Keyboard | All interactive demos reachable and operable without a mouse |
| Focus | Visible focus rings on buttons, links, and form controls |
| ARIA | `aria-label` on icon-only buttons (header search and theme toggle already have this) |
| Dialogs | Focus trap, Escape to close, return focus on close |
| Color contrast | Light and dark mode meet WCAG AA for text on backgrounds |
| Screen readers | Alerts, toasts, and live regions use appropriate roles |

### Tasks

- [ ] Run [axe DevTools](https://www.deque.com/axe/devtools/) or Lighthouse accessibility audit on each page
- [ ] Fix issues found in Modals, Forms, and Dropdowns first (highest interaction complexity)
- [ ] Add an **Accessibility** section to each `ComponentSection` where relevant (e.g. "Use `aria-expanded` on accordion triggers")
- [ ] Optionally add `eslint-plugin-jsx-a11y` to catch issues in CI

---

## 11. Rename and polish branding

Figma Make boilerplate removed from metadata, UI, and build config.

### Package and project identity

| Was | Now |
|-----|-----|
| `@figma/my-make-file` in `package.json` | `brickly` |
| "UIKit v1.0" in sidebar | "Brickly" |
| README references to `default_shadcn_theme.css`, `guidelines/` | `src/styles/theme.css`, `ROADMAP.md` |

### UI polish

- [x] Consistent page titles and meta description (add `index.html` title/description if missing)
- [x] Favicon and OG image for social sharing when deployed
- [x] Overview page stats aligned with actual component count after new pages are added
- [x] GitHub link in header already points to the repo — verify URL stays correct

### Documentation polish

- [x] Sync `README.md` project structure with actual directories
- [x] Link `ROADMAP.md` from README
- [x] Keep `ATTRIBUTIONS.md` updated as new shadcn components are added

---

## Suggested priority order

| Phase | Focus | Outcome |
|-------|--------|---------|
| **Phase 1** ✅ | Branding polish (§11), dependency trim (§5), README sync | Cleaner repo, less confusion |
| **Phase 2** ✅ | Restore primitives (§1), migrate custom demos (§2), Tokens page (§4) | Consistent shadcn usage across all pages |
| **Phase 3** | New pages (§3), search improvements (§8) | Richer catalog and better DX |
| **Phase 4** | Deploy (§6), tests (§7), a11y audit (§10) | Production-ready, maintainable site |
| **Phase 5** | Copy/install snippets (§9) | Helps consumers use Brickly in real projects |

---

## Contributing

When picking up a roadmap item:

1. Check open issues or claim a section in a PR description
2. Follow existing conventions: arrow-function components, `PageHeader` + `ComponentSection`, Tailwind + CSS variables
3. Run `npm run typecheck` and `npm run build` before opening a PR
4. Update this file — check off completed tasks and adjust priorities as needed
