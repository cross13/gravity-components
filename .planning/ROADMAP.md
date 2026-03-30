# Roadmap: Gravity Components

## Overview

Gravity Components ships as a fully themed admin UI kit on npm. The build follows a strict dependency order: the theme system must exist before any component can be visually validated, the build pipeline must be locked before any component is considered consumer-safe, base wrappers come next, composites and enhanced components follow, and a formal publish verification closes out v1. Every phase delivers a coherent, independently verifiable capability.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Theme system, build pipeline, and Storybook scaffolding — everything every component depends on
- [ ] **Phase 2: Base Components** - All primitive wrapper components and their Storybook stories
- [ ] **Phase 3: Composite Components** - Structural differentiators: AppShell, Sidebar, and StatCard
- [ ] **Phase 4: Enhanced Components** - DataGrid and Upload — higher-complexity composites
- [ ] **Phase 5: Publish** - npm v1.0.0 release with formal artifact verification

## Phase Details

### Phase 1: Foundation
**Goal**: The theme system, build pipeline, and Storybook environment are locked in and consumer-safe before any component work begins
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, SB-02, SB-03
**Success Criteria** (what must be TRUE):
  1. A consumer can `import { GravityProvider, adminTheme } from 'gravity-components'` and wrap their app to apply the admin theme with zero additional configuration
  2. A consumer can pass custom token overrides to GravityProvider and see them merged with the admin defaults
  3. All design token types are exported and a consumer project with `tsc --noEmit` passes without errors on token usage
  4. `tsup build` produces `dist/index.js` (ESM), `dist/index.cjs` (CJS), and `dist/index.d.ts` with antd listed as external (not bundled), verified by `npm pack --dry-run` producing a tarball under 100KB
  5. Storybook launches with a global GravityProvider decorator, a theme switcher addon that toggles adminTheme vs. custom overrides, and interactive Controls for primary color, border-radius, and key tokens
**Plans**: TBD

### Phase 2: Base Components
**Goal**: All primitive wrapper components are built, themed, and documented in Storybook so consumers have the full table-stakes component set available
**Depends on**: Phase 1
**Requirements**: PRIM-01, PRIM-02, PRIM-03, PRIM-04, PRIM-05, PRIM-06, LAYOUT-03, LAYOUT-04, DATA-01, DATA-04, FEED-01, FEED-02, FEED-03, FEED-04, SB-01
**Success Criteria** (what must be TRUE):
  1. A consumer can import Button, Input, Select, DatePicker, Form, Modal, Drawer, Tag, Badge, Typography, Table, Card, Alert, Notification, Spin, Skeleton, PageHeader, and PageContainer and all render with the Gravity admin theme applied
  2. Every component has a Storybook story showing Default, Variants, and States; all stories are browsable and interact with global theme Controls
  3. Form submit handling works asynchronously (consumer passes an async `onFinish` handler) and validation errors display inline with Gravity styling
  4. Notification and Message APIs work imperatively via hooks (`useMessage`, `useNotification`) consistent with antd v5 hook-based patterns
**Plans**: TBD

### Phase 3: Composite Components
**Goal**: The library's structural differentiators — AppShell, Sidebar, and StatCard — are built on top of stable base components, giving consumers a complete admin page frame out of the box
**Depends on**: Phase 2
**Requirements**: LAYOUT-01, LAYOUT-02, DATA-03
**Success Criteria** (what must be TRUE):
  1. A consumer can compose `<AppShell sidebar={<Sidebar items={navItems} />}>` and get a complete admin layout with dark sidebar, header area, and scrollable content region
  2. The Sidebar accepts a `selectedKey` prop and `collapsed` prop for fully controlled state; consumers wire routing themselves without the library imposing a router dependency
  3. StatCard renders a KPI value, label, and optional trend indicator (up/down/neutral) with Gravity typography; it accepts any ReactNode in a sparkline slot
  4. Storybook stories for AppShell, Sidebar, and StatCard demonstrate realistic admin data and the interactive theme playground shows token customization live
**Plans**: TBD

### Phase 4: Enhanced Components
**Goal**: DataGrid and Upload — the two highest-complexity composites — are complete and documented, finishing the v1 admin component surface
**Depends on**: Phase 3
**Requirements**: DATA-02, UPLOAD-01
**Success Criteria** (what must be TRUE):
  1. DataGrid renders a Table with an integrated search bar Form, toolbar slot, and empty state; it supports server-side pagination via `onFetch` callback and does not require consumers to manage internal column state
  2. Upload renders a Gravity-styled file picker; the Dragger variant accepts drag-and-drop; consumers receive `onUploadSuccess` and `onUploadError` callbacks; file type and size constraints are enforced before upload
  3. Both components have Storybook stories covering default state, loading state, empty state, and error state
**Plans**: TBD

### Phase 5: Publish
**Goal**: v1.0.0 is published to npm with a verified artifact — the packed tarball installs cleanly into a fresh consumer project and all type checks pass
**Depends on**: Phase 4
**Requirements**: FOUND-05
**Success Criteria** (what must be TRUE):
  1. `npm pack` produces a tarball that installs into a fresh TypeScript project; `tsc --noEmit` passes with no errors on a smoke-import of `GravityProvider`, `adminTheme`, `Button`, `AppShell`, and `DataGrid`
  2. `attw` and `publint` both report no errors against the packed artifact
  3. `size-limit` CI check passes with per-export budgets enforced
  4. v1.0.0 appears on the npm registry with correct `exports` map, `types` condition, `sideEffects: false`, and antd as a peer dependency pinned `>=5.0.0 <6.0.0`
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/? | Not started | - |
| 2. Base Components | 0/? | Not started | - |
| 3. Composite Components | 0/? | Not started | - |
| 4. Enhanced Components | 0/? | Not started | - |
| 5. Publish | 0/? | Not started | - |
