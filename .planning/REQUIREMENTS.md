# Requirements: Gravity Components

**Defined:** 2026-03-30
**Core Value:** A drop-in, fully themed admin UI kit that teams install from npm, apply their brand in minutes, and have Storybook-documented components ready to use

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: GravityProvider component wraps antd ConfigProvider, accepts theme tokens, and merges with admin defaults
- [ ] **FOUND-02**: `adminTheme` preset exported as a standalone importable `ThemeConfig` object
- [ ] **FOUND-03**: Full TypeScript type definitions for all overridable design tokens exported as public API
- [ ] **FOUND-04**: tsup build config produces dual ESM + CJS output with `.d.ts` / `.d.cts` declaration files
- [ ] **FOUND-05**: Package published to npm with correct `exports` map, `types` condition, `sideEffects: false`, and antd peer dep pinned `>=5.0.0 <6.0.0`

### Layout

- [ ] **LAYOUT-01**: AppShell component composes full admin page frame (sidebar + header + content area)
- [ ] **LAYOUT-02**: Sidebar component with icon + label navigation items and collapsible toggle
- [ ] **LAYOUT-03**: PageHeader component with breadcrumb, title, and action slot
- [ ] **LAYOUT-04**: PageContainer component wrapping content with consistent padding and max-width

### Primitives

- [ ] **PRIM-01**: Button component with Gravity-themed variants (primary, default, danger, ghost)
- [ ] **PRIM-02**: Input, Select, and DatePicker components with Gravity styling applied
- [ ] **PRIM-03**: Form component wrapping antd Form with Gravity layout defaults
- [ ] **PRIM-04**: Modal and Drawer components with Gravity-themed header and footer
- [ ] **PRIM-05**: Tag and Badge components with Gravity color semantics
- [ ] **PRIM-06**: Typography components (Text, Title, Paragraph) with Gravity type scale

### Data Display

- [ ] **DATA-01**: Table component as a themed antd Table wrapper with Gravity defaults
- [ ] **DATA-02**: DataGrid / ProTable component combining Table + search bar + toolbar + empty state
- [ ] **DATA-03**: StatCard component displaying a KPI value, label, and trend indicator
- [ ] **DATA-04**: Card component as a themed general-purpose content container

### Feedback

- [ ] **FEED-01**: Notification and Message wrappers applying Gravity theme to antd notification system
- [ ] **FEED-02**: Alert component with Gravity-styled info, success, warning, error variants
- [ ] **FEED-03**: Empty state component with customizable illustration slot and message
- [ ] **FEED-04**: Loading (Spin) and Skeleton components with Gravity theming

### Upload

- [ ] **UPLOAD-01**: Upload component with Gravity-styled file picker and drag-and-drop Dragger variant

### Storybook

- [ ] **SB-01**: All v1 components documented in Storybook with Default, Variants, and States stories
- [ ] **SB-02**: Theme switcher addon allowing toggle between adminTheme and custom token overrides
- [ ] **SB-03**: Interactive Controls for primary color, border-radius, and key token overrides

## v2 Requirements

### Permissions

- **PERM-01**: PermissionGuard component rendering children conditionally based on a permissions prop

### Charts

- **CHART-01**: Chart wrapper components (Line, Bar, Pie) using a selected chart library

### Enhanced Forms

- **FORM-01**: ProForm component with async submit handling and layout variants (vertical, inline, grid)

### Dark Mode

- **DARK-01**: Dark mode token preset as an importable ThemeConfig companion to adminTheme

## Out of Scope

| Feature | Reason |
|---------|--------|
| React 16/17 support | React 18+ only — concurrent features, no legacy lifecycle |
| SSR-specific optimizations | Client-side focus for v1; antd CSS-in-JS SSR is complex |
| Mobile-specific components | Admin panels are desktop-first |
| CSS variable runtime theming | Design token approach is sufficient for v1 |
| Auth flows / login pages | Only a LoginLayout shell is possible; full auth is app-level |
| Icon library | antd icons are available to consumers directly |
| Data fetching hooks | UI library only — no data layer coupling |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 5 | Pending |
| LAYOUT-01 | Phase 3 | Pending |
| LAYOUT-02 | Phase 3 | Pending |
| LAYOUT-03 | Phase 2 | Pending |
| LAYOUT-04 | Phase 2 | Pending |
| PRIM-01 | Phase 2 | Pending |
| PRIM-02 | Phase 2 | Pending |
| PRIM-03 | Phase 2 | Pending |
| PRIM-04 | Phase 2 | Pending |
| PRIM-05 | Phase 2 | Pending |
| PRIM-06 | Phase 2 | Pending |
| DATA-01 | Phase 2 | Pending |
| DATA-02 | Phase 4 | Pending |
| DATA-03 | Phase 3 | Pending |
| DATA-04 | Phase 2 | Pending |
| FEED-01 | Phase 2 | Pending |
| FEED-02 | Phase 2 | Pending |
| FEED-03 | Phase 2 | Pending |
| FEED-04 | Phase 2 | Pending |
| UPLOAD-01 | Phase 4 | Pending |
| SB-01 | Phase 2 | Pending |
| SB-02 | Phase 1 | Pending |
| SB-03 | Phase 1 | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 27
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-30*
*Last updated: 2026-03-30 after initial definition*
