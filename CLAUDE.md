# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@crosscode/gravity-components` is a published npm library: a drop-in, themed admin UI kit on top of Ant Design v6. It is consumed by external apps — any change to `src/` is a public API change. The README and `docs/publishing.md` are the source of truth for consumer-facing behavior.

Node `>=22` (`.nvmrc` pins `22`). Build target ESM + CJS via `tsup`.

## Common commands

```bash
npm run storybook        # dev: Storybook on port 6006 (primary visual workbench)
npm run build            # produce dist/ — ESM, CJS, and .d.ts/.d.cts via tsup
npm run dev              # tsup --watch
npm test                 # vitest run (jsdom)
npm run test:watch       # vitest watch
npm run test:coverage    # vitest with v8 coverage
npm run lint             # eslint src/
npm run format           # prettier --write .
npm run build-storybook  # static build into storybook-static/
npm run size             # size-limit (index.js ≤ 25 kB, theme.js ≤ 5 kB)
npm run changeset        # add a changeset (required for any user-visible change)
```

Run a single test file: `npx vitest run path/to/file.test.tsx`. Filter by name: `npx vitest run -t "pattern"`.

## Public API surface

Everything exported from `src/index.ts` is public. There are two entry points (see `tsup.config.ts` and `package.json#exports`):

- `@crosscode/gravity-components` — full library (components + theme).
- `@crosscode/gravity-components/theme` — theme-only (`src/theme/index.ts`), intended for apps that want a smaller bundle. Keep this entry free of component imports so the theme bundle stays under the 5 kB size-limit.

When adding a component, also export it (and its types) from `src/index.ts` — Storybook stories and tests read it, but consumers only see what's re-exported.

## Architecture

### Theme system (`src/theme/`)

The theme is the spine of the library. `GravityProvider` wraps Ant Design's `ConfigProvider` with `adminTheme` and nests `antd`'s `App` (so static helpers like `Modal.confirm`, `useNotification`, `useMessage` work) and mounts `GravityToaster` (Sonner) by default.

`adminTheme` is composed from three token files:

- `tokens/global.ts` — the `GravityTokens` interface (the public token shape) and `defaultTokens` (brand colors, radii, control heights, shadows).
- `tokens/alias.ts` — derived semantic tokens (text/border/fill scales, motion durations, heading sizes).
- `tokens/components.ts` — per-component overrides for antd (Button, Input, Table, Menu, Layout, etc.) — this is where most visual tuning lives.

Consumers customize via `<GravityProvider tokens={...}>` (shallow merge onto base token), `<GravityProvider theme={ThemeConfig}>` (full override), or `mergeTheme(adminTheme, overrides)` (deep merge of token + components). Don't change the `GravityTokens` shape lightly — it's a public type.

### Components (`src/components/<Name>/`)

Each component is its own folder with a consistent layout:

- `<Name>.tsx` — implementation
- `<Name>.types.ts` — exported `Props` type (re-export from `index.ts`)
- `<Name>.styles.ts` — `styled-components` for layout/chrome (only when needed)
- `index.ts` — re-exports component + types

Conventions worth preserving:

- Most primitives are thin wrappers around the antd component, sometimes with adjusted defaults (e.g. `Button` defaults `type="primary"`, `size="middle"`). Don't reinvent antd APIs — pass `...props` through.
- Internal chrome uses `styled-components` (a peer dependency). `dayjs`, `recharts`, `sonner`, `styled-components`, and `antd` family are all `external` in `tsup` and must remain peer deps — never bundle them.
- Lucide / Ant icons used in stories are dev deps; `@ant-design/icons` is a consumer install (documented in README).
- `displayName` is set on every component.
- Controlled/uncontrolled pattern: components like `Sidebar` and `DataGrid` accept controlled props (`collapsed`, `dataSource`) and fall back to internal state when undefined — follow this pattern for new stateful components.
- `DataGrid` switches between client-mode (uses `dataSource`) and server-mode (uses `onFetch`) based on whether `onFetch` is provided. Search/pagination/refresh wire to `onFetch` automatically in server-mode.

### Stories (`stories/`)

Storybook is the visual spec and the dev workbench (no app harness in this repo). Story files live in `stories/` (NOT colocated with source) and are picked up by `.storybook/main.ts` via `stories/**/*.stories.@(ts|tsx)`. Stories are excluded from the library build (`tsconfig.json#exclude`). Style helpers for stories live next to them as `*.stories.styles.ts`.

### Tests

Vitest + jsdom + Testing Library. `src/test-setup.ts` only loads `@testing-library/jest-dom`. Tests are excluded from the build (`tsconfig.json#exclude`).

## Release flow (Changesets)

Releases are automated via Changesets and GitHub Actions (`.github/workflows/release.yml`). Any user-visible change requires `npm run changeset` and committing the generated file under `.changeset/`. Merging to `main` opens a "version packages" PR; merging that PR triggers `npm publish`. Full details in `docs/publishing.md`. **Do not bump `version` in `package.json` by hand** — Changesets does it.

## Style

- Prettier: no semicolons, single quotes, trailing commas all, width 100, 2 spaces (`.prettierrc`).
- ESLint: `react/react-in-jsx-scope` off, `react-hooks/exhaustive-deps` warns, unused vars allowed if prefixed `_`.
