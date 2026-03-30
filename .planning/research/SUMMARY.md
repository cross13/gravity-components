# Project Research Summary

**Project:** Gravity Components
**Domain:** React component library (antd v5 wrapper, admin UI kit)
**Researched:** 2026-03-30
**Confidence:** HIGH

## Executive Summary

Gravity Components is an admin-focused React component library built on top of Ant Design v5. The established pattern for this type of product is a thin-wrapper architecture: antd provides the rendering engine and accessibility infrastructure, while the library contributes a curated design token preset (the "admin theme"), behavioral extensions to high-value components, and a set of composite components that do not exist in antd directly (AppShell, Sidebar, ProTable, StatCard). The library is published as a dual ESM+CJS npm package using tsup, with antd, React, and related packages declared as peer dependencies so consumers retain full control over their dependency tree.

The recommended approach is to build in strict dependency order. The theme layer (token definitions, adminTheme preset, GravityProvider wrapper) must ship before any component work begins, because no component can be visually validated in Storybook without it. From there, the build pipeline (tsup configuration, package.json exports map, sideEffects flag, peer dependency declarations) must be locked before any component is considered done — publishing mistakes are expensive to recover from. Base wrapper components come next, followed by composite components that depend on stable bases. Storybook documentation is a first-class deliverable throughout, not an afterthought.

The primary risks are infrastructure risks, not feature risks. Bundling antd as a hard dependency instead of a peer, nesting ConfigProvider incorrectly, and mis-wiring the package.json exports map are all mistakes that are hard to recover from post-publish and break consumer trust. Every one of these is preventable with a locked-in checklist at the end of Phase 1 and Phase 2. Feature scope risks are manageable: the v1 feature set is well-defined by the antd primitive set, and the main differentiators (AppShell, ProTable, adminTheme) have clear implementation paths.

## Key Findings

### Recommended Stack

The library uses tsup 8.5.1 as its build tool, producing dual ESM+CJS output with TypeScript declarations in a single command. TypeScript is pinned to `~5.8` — not 6.x — because typescript-eslint 8.x caps support at `<6.0.0`. Storybook 10.3.3 (now the `latest` dist-tag, replacing v8) is used for documentation and visual testing, using `@storybook/react-vite` as the framework; the old `addon-essentials` package does not exist in v10 (functionality merged into core). Vitest 4.x replaces Jest for unit testing and requires Node 20+. ESLint 10 uses flat config only.

**Core technologies:**
- React 19 + antd 5.29.3: UI runtime and base component layer — antd v5 token API is the theming surface; never bundle antd (peer dep only)
- TypeScript ~5.8: type system — pinned below 6.x because typescript-eslint 8.x is incompatible with TS 6
- tsup 8.5.1: library bundler — zero-config dual ESM+CJS with dts; `external` must list all peer deps explicitly
- Storybook 10.3.3: component documentation and visual testing — primary consumer-facing documentation surface
- Vitest 4.1.2 + @testing-library/react: unit testing — requires Node 20+, faster than Jest for Vite-based projects
- @changesets/cli: versioning and changelog — standard for npm library version management
- size-limit: bundle size CI guard — prevents accidental bundle bloat per-export

### Expected Features

The feature set divides cleanly into three tiers. Table-stakes features are antd primitives re-exported with the Gravity theme applied (Button, Input, Select, Form, Table, Modal, Card, Tag, Badge, Alert, Typography, etc.) plus layout composites (AppShell, Sidebar, Header). Differentiating features are higher-level composites that do not exist in antd directly and represent the main reason to use this library over raw antd. Anti-features are explicitly out of scope for v1 to keep the library UI-only and dependency-light.

**Must have (table stakes):**
- GravityProvider + adminTheme preset — all other components depend on it; must ship first
- AppShell / PageLayout + collapsible Sidebar — the flagship structural component; most distinctive visual
- Form primitives (Button, Input, Select, Checkbox, Radio, Switch, DatePicker) — CRUD backbone
- Form with async submit, validation, layout variants — core of every admin workflow
- Table with toolbar, search bar, pagination, empty state — list page backbone
- Modal + Drawer with imperative API — detail and confirmation patterns
- Card + StatCard/KPICard — dashboard building blocks
- Alert, Message, Notification (hook-based API for React 18+) — feedback system
- Tag, Badge, Typography — status indicators and consistent text rendering
- Storybook with Controls + a11y addon for all v1 components

**Should have (competitive differentiators):**
- ProTable / DataGrid — Table + search bar + column config + bulk actions + CSV export wired up
- ProForm / SmartForm — schema-driven form with modal/drawer variants
- Upload (enhanced) — drag-drop, image preview, file validation
- DescriptionsList — read-only structured data display for detail pages
- PermissionGuard / RoleGate — conditional render by role; not available in antd, MUI, or Mantine

**Defer to v2+:**
- Chart wrappers (line, bar, pie via recharts) — only if confirmed consumer demand
- Dark mode theme preset — significant testing surface; light mode only for v1
- Skeleton templates per component — nice polish, defer until core complete
- Virtual scrolling for large tables — server-side pagination covers 90% of use cases

### Architecture Approach

The architecture has four layers with strict boundaries: Theme Layer (pure serializable token data + one React wrapper around ConfigProvider), Component Layer (thin wrappers and composites that receive theme via React context), Storybook Layer (dev-only, references source directly, never hits dist), and Publish Layer (tsup output in dist/). The single entry point is `src/index.ts`; everything not in that barrel is package-private. Theme and components are in separate directory trees so the theme preset can be imported without pulling in any component code.

**Major components:**
1. ThemeProvider — wraps antd ConfigProvider; accepts preset name or raw ThemeConfig; the only place ConfigProvider lives
2. adminTheme preset — pure serializable data object; importable without rendering; composable with consumer overrides
3. Wrapper components (Button, Input, Table, Form, Modal, etc.) — thin antd wrappers with Gravity prop defaults; delegate all rendering to antd
4. Composite components (AppShell, Sidebar, DataGrid, StatCard) — compose multiple antd primitives; own layout logic; the main differentiators
5. src/index.ts barrel — single named-export contract; everything public is explicitly listed here
6. tsup config — produces dist/index.js (ESM), dist/index.cjs (CJS), dist/index.d.ts; all peer deps in `external` array

### Critical Pitfalls

1. **Bundling antd as a hard dependency** — configure `external: ['react', 'react-dom', 'antd', '@ant-design/icons', '@ant-design/cssinjs']` in tsup.config.ts on day one; declare all as peerDependencies; verify with `npm pack --dry-run` (tarball should be under 100KB)
2. **Double ConfigProvider / nesting conflicts** — export adminTheme as a plain data object; provide GravityProvider that merges consumer overrides with preset; document that GravityProvider is the outermost provider, never nested inside a consumer's own ConfigProvider
3. **TypeScript declarations not wired in exports map** — use the exact package.json exports pattern with `"types"` condition before `"import"` and `"require"`; validate every release with `@arethetypeswrong/cli` (attw) and `publint`
4. **Missing `sideEffects: false`** — set this in package.json from day one; antd v5 CSS-in-JS has no static CSS file imports so it is safe; verify tree-shaking in a consumer test app
5. **Publishing without testing the packed artifact** — CI pipeline must pack tarball, install into a fresh consumer project, and run `tsc --noEmit` + smoke import before every `npm publish`

## Implications for Roadmap

Based on the dependency chain discovered across all four research files, the natural build order is: theme infrastructure first, build pipeline second, base components third, composites and documentation fourth, publish tooling fifth. This order is non-negotiable — a component without a working GravityProvider cannot be visually validated, and a component without a locked build pipeline cannot be verified as consumer-safe.

### Phase 1: Foundation — Theme System and Project Scaffolding

**Rationale:** Everything else depends on this. The theme layer must exist before any component can be visually validated in Storybook. The build pipeline must be locked before any component is considered "done." These are the two highest-cost recovery pitfalls.

**Delivers:**
- Repo scaffolded (tsup, TypeScript ~5.8, ESLint 10, Prettier, Vitest, @changesets/cli)
- Token definitions (global, alias, component tiers)
- adminTheme preset (serializable ThemeConfig object)
- GravityProvider (ConfigProvider wrapper with merge API)
- package.json exports map + sideEffects field + peer dependency declarations
- tsup config with all peer deps externalized
- Storybook 10 scaffolded with global GravityProvider decorator and token Controls wired
- CI: `npm pack --dry-run`, `attw`, `publint`, `size-limit` checks

**Avoids:** Pitfalls 1 (bundled antd), 2 (double ConfigProvider), 3 (CSS-in-JS injection order), 4 (broken TS declarations), 5 (icons not externalized), 7 (token specificity confusion), 9 (sideEffects field), 8 (peer dep version ranges)

### Phase 2: Base Component Library

**Rationale:** Once the theme layer is stable, base wrapper components can be built in parallel. These are low-complexity (thin antd wrappers) and unblock the composite components in Phase 3. Form primitives must be stable before ProTable/ProForm development begins.

**Delivers:**
- All P1 wrapper components: Button, Input, Input.Password, Input.Search, Select, Checkbox, Radio, Switch, DatePicker/RangePicker, Tabs, Tag, Badge, Avatar, Tooltip, Popover, Popconfirm, Alert, Spin, Skeleton, Divider, Typography (Text, Title, Paragraph)
- Modal + Drawer with imperative API and useModal() hook
- Alert + Message + Notification with hook-based API (useMessage, useNotification)
- Form with onFinishAsync, layout variants (inline/vertical/horizontal), async validators
- Pagination
- Card
- Grid (Row, Col), Space, Flex
- forwardRef on all form controls and focusable elements
- displayName set on all components
- One Storybook story per component (Default, Variants, Loading, Empty, Error, With Theme, Controls, a11y)
- Vitest unit tests for behavioral extensions (not for pure antd rendering)

**Avoids:** Pitfall on forwardRef gaps; Technical debt patterns (hardcoded colors, missing displayName, `any` in public API)

### Phase 3: Composite Components (Differentiators)

**Rationale:** AppShell, Sidebar, and StatCard are the library's most visible differentiators and require stable base components from Phase 2. ProTable requires Form to be stable. These are the highest-complexity components and the main reason a consumer would choose this library over raw antd.

**Delivers:**
- AppShell / PageLayout (Layout + Sider + Header + Content)
- Sidebar (Layout.Sider + Menu + logo slot + collapse button + dark mode tokens)
- Header / Topbar (breadcrumb, avatar dropdown, notification bell slots)
- StatCard / KPICard (Card + Typography + trend indicator; sparkline slot accepts any ReactNode)
- DataGrid / ProTable-lite (Table + search bar Form + toolbar + column config + CSV export + server-side pagination)
- Empty state component (antd Empty + Button + illustration slot)
- DescriptionsList (enhanced Descriptions with loading state)
- PermissionGuard (pure render prop, no antd dependency)
- Storybook stories for all composites with realistic admin data
- Storybook "Theme Playground" story demonstrating token customization interactively

**Avoids:** Integration gotcha on Modal z-index in Storybook; antd Table virtualization documentation for DataGrid

### Phase 4: Enhanced Components (v1.x)

**Rationale:** ProForm and Upload require confirmed consumer demand and stable base components. These can ship as patch/minor releases after v1 validates the foundation.

**Delivers:**
- ProForm / SmartForm (schema-driven, modal form variant, drawer form variant, step form)
- Upload (enhanced: drag-drop, image preview, file type presets, maxSize validation, onUploadSuccess/onUploadError callbacks)
- Complete Storybook coverage for new components

### Phase 5: npm Publishing and Release Pipeline

**Rationale:** The publish infrastructure should be set up early (pack + attw in CI from Phase 1) but the first actual publish is a dedicated milestone that verifies the complete artifact.

**Delivers:**
- `npm pack` → fresh consumer project → `tsc --noEmit` + smoke test CI step
- @changesets/cli workflow configured (changeset per PR, version command, publish command)
- size-limit budgets per export enforced in CI
- v1.0.0 published to npm

**Avoids:** Pitfall 11 (publishing without testing the artifact); peer dep range mistakes

### Phase Ordering Rationale

- Theme before components: GravityProvider is a hard dependency for visual validation in Storybook; no component can be signed off without it
- Build pipeline in Phase 1 (not Phase 5): build mistakes compound across all subsequent phases; locking it in at the start means every component is verified against the real publish artifact
- Base components before composites: DataGrid depends on Form being stable; AppShell depends on Sidebar and Menu; building out of order creates rework
- Composites before ProForm/Upload: the composite layer (Phase 3) validates the architecture and surfaces unexpected integration issues before the more complex form/upload work begins
- Publish pipeline formal validation at the end: CI checks are set up in Phase 1 but the formal publish process is a distinct milestone that deserves its own checklist

### Research Flags

Phases that likely need `/gsd:research-phase` during planning:
- **Phase 3 (DataGrid / ProTable-lite):** The exact API design for search bar integration, column config persistence, and CSV export is not specified in this research. Needs a design decision: how close to antd ProComponents' ProTable API, and whether to support controlled vs uncontrolled column state.
- **Phase 3 (AppShell routing integration):** The FEATURES research notes this library should be less opinionated than ProLayout about routing. The exact API for how the Sidebar's active menu item is controlled (prop-based vs. react-router-integration) needs a decision.
- **Phase 4 (ProForm schema API):** Schema-driven form rendering is complex. The API design (JSON schema, TypeScript schema, or builder pattern) is not resolved in this research and will affect how consumers integrate.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Scaffolding + theme):** All patterns are well-documented; tsup + ConfigProvider + token hierarchy is straightforward
- **Phase 2 (Base wrappers):** Thin antd wrappers are mechanical; the pattern is established and consistent across all components
- **Phase 5 (Publishing):** @changesets/cli workflow is well-documented; attw + publint are standard tools with clear usage

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All version numbers verified against npm registry on 2026-03-30; compatibility constraints (TS ~5.8, Node 20+ for Vitest) confirmed against published peerDeps |
| Features | HIGH | antd v5 and ProComponents are mature, stable APIs. Feature set derived from known antd component surface. Specific ProTable/ProForm API details should be verified against live docs before implementation |
| Architecture | HIGH | ConfigProvider theming, tsup dual output, Storybook global decorator — all are established, well-documented patterns with multiple real-world precedents |
| Pitfalls | MEDIUM | Core pitfalls (bundled antd, double ConfigProvider, exports map) are HIGH confidence — observed repeatedly in antd ecosystem. Some pitfalls (CSS-in-JS injection order with third-party libs) are MEDIUM confidence — training data patterns |

**Overall confidence:** HIGH

### Gaps to Address

- **ProTable API design:** Research identifies the need but does not specify the exact prop interface for the search bar, toolbar, and column config. Decide before starting Phase 3 whether to mirror antd ProComponents' API (familiar to antd-pro users) or design a simpler API.
- **Sidebar routing contract:** How does the Sidebar receive its active item state? Prop-driven (consumer passes `selectedKey`) is simpler and keeps the library routing-agnostic. This must be decided before Phase 3.
- **recharts vs. echarts for Chart wrappers (v2+):** STACK.md recommends recharts 3.8.1 (already declared as optional peer dep). echarts is also a common choice. This decision is deferred to v2 but should be made early in that phase.
- **ProForm schema API shape:** JSON schema, TypeScript-first object schema, or builder pattern — the choice has significant DX implications. Defer to Phase 4 planning but flag for early decision.
- **Live ProComponents API verification:** FEATURES.md notes that ProTable/ProForm API details are from training data (cutoff Aug 2025). Before implementing Phase 3/4 composites, verify the current ProComponents API against live documentation to avoid building against a stale API surface.

## Sources

### Primary (HIGH confidence)
- npm registry (registry.npmjs.org), 2026-03-30 — all version numbers and peerDep constraints verified
- antd v5 official documentation (training knowledge, stable API since v5.0 release 2022) — ConfigProvider, theme token hierarchy, component APIs
- tsup documentation — dual ESM/CJS output, dts flag, external configuration
- Storybook 10 documentation — global decorators, preview.ts, CSF3 format
- package.json exports map specification (Node.js/bundler standard)

### Secondary (MEDIUM confidence)
- antd-pro / ProComponents documentation (training knowledge, cutoff Aug 2025) — ProTable, ProForm API patterns
- Storybook 8/10 CSF3 documentation — global decorators and decorator composition patterns
- Standard React component library patterns (shadcn/ui, Mantine, Chakra) — adapted for antd-specific theming surface
- antd GitHub issues patterns — double ConfigProvider, icon bundle size, SSR hydration

### Tertiary (LOW confidence)
- Community discussions on antd + Next.js App Router compatibility — patterns for 'use client' boundary and @ant-design/nextjs-registry; needs verification for v2 SSR work

---
*Research completed: 2026-03-30*
*Ready for roadmap: yes*
