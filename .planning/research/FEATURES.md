# Feature Research

**Domain:** React admin component library on Ant Design v5
**Researched:** 2026-03-30
**Confidence:** HIGH (antd v5 and ProComponents are mature, well-documented; MUI/Mantine features are stable and well-known as of training cutoff Aug 2025. No live docs could be fetched — based on training knowledge of these libraries.)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that admin panel developers assume exist in any credible component library. Missing any of these makes the library feel incomplete or unshippable.

#### Primitive / Base Components (wrap antd, add theme)

| Feature | Why Expected | Complexity | Antd Basis | Notes |
|---------|--------------|------------|------------|-------|
| Button | Every UI has buttons; variants (primary/default/danger/ghost/link/text) expected | LOW | `antd/Button` | Add `loading` prop convention; document all variants in Storybook |
| Input / Input.Password / Input.Search | All forms need text input; password masking is assumed | LOW | `antd/Input` | Add `prefix`/`suffix` icon slot; document `status` (error/warning) |
| Select / MultiSelect | Dropdown selection is foundational for filters and forms | LOW | `antd/Select` | Async/remote option loading is the common gotcha — needs `onSearch` + debounce pattern |
| Checkbox / Radio / Switch | Boolean and option controls, form staples | LOW | `antd/Checkbox`, `antd/Radio`, `antd/Switch` | Group variants (CheckboxGroup, RadioGroup) needed for real forms |
| DatePicker / RangePicker | Admin panels are full of date filtering | MEDIUM | `antd/DatePicker` | Locale config via ConfigProvider is a gotcha; document preset ranges |
| Form | The backbone of admin CRUD workflows; validation, layout, field arrays | HIGH | `antd/Form` | Field-level validation, async validators, and layout (inline/vertical/horizontal) must all be covered |
| Modal / Drawer | Detail views, confirmation dialogs, side panels | LOW | `antd/Modal`, `antd/Drawer` | Async confirm pattern (`modal.confirm(...)`) should be documented |
| Table | Core of every admin panel; sortable, filterable, paginated | HIGH | `antd/Table` | See notes below — this is a full component category |
| Pagination | Required whenever there is a list | LOW | `antd/Pagination` | Should integrate with Table automatically |
| Tabs | Navigation within pages | LOW | `antd/Tabs` | Controlled and uncontrolled patterns both needed |
| Tag / Badge | Status indicators, counts | LOW | `antd/Tag`, `antd/Badge` | Status color presets (success/warning/error/processing) are the main value-add |
| Tooltip / Popover / Popconfirm | Contextual info and confirmation flows | LOW | `antd/Tooltip`, `antd/Popover`, `antd/Popconfirm` | Popconfirm needed for delete actions everywhere |
| Alert / Message / Notification | Feedback patterns; form errors, async results | LOW | `antd/Alert`, `antd/message`, `antd/notification` | Imperative API (`message.success(...)`) must be exported; hook-based API (`useMessage`) for React 18 strict mode |
| Spin / Skeleton | Loading states; essential UX | LOW | `antd/Spin`, `antd/Skeleton` | Skeleton templates for card/table/list reduce boilerplate |
| Avatar | User representation in headers, tables | LOW | `antd/Avatar` | Group variant (AvatarGroup) for team displays |
| Divider | Visual separation | LOW | `antd/Divider` | Trivial but expected |
| Typography (Text, Title, Paragraph, Link) | Consistent text rendering throughout the app | LOW | `antd/Typography` | Ellipsis + copyable props are heavily used in admin data display |

#### Layout Components (partially wrap antd, partially custom)

| Feature | Why Expected | Complexity | Antd Basis | Notes |
|---------|--------------|------------|------------|-------|
| Page Layout / AppShell | Admin apps all have header + sidebar + content structure | MEDIUM | `antd/Layout` | The main shell with Sidebar + Header + Content slots — this is the landmark admin component |
| Sidebar / Sider | Navigation menu; collapsible, with logo slot | MEDIUM | `antd/Layout.Sider` + `antd/Menu` | Dark sidebar with white/accent text is the flagship visual; collapse to icon-only mode expected |
| Header / Topbar | App header with breadcrumbs, user menu, notifications | MEDIUM | `antd/Layout.Header` | Breadcrumb, avatar dropdown, notification bell slots |
| Breadcrumb | Navigation context | LOW | `antd/Breadcrumb` | Auto-generation from route is a common enhancement |
| Menu / NavMenu | The actual navigation items inside Sidebar | MEDIUM | `antd/Menu` | Nested (sub-menus), icon support, active state — all expected |
| Card | Data grouping container; heavily used in dashboards | LOW | `antd/Card` | Stats card variant (number + label + trend) is the most common admin use case |
| Grid / Row / Col | Responsive layout grid | LOW | `antd/Grid` | Thin re-export is fine; document responsive breakpoints |
| Space / Flex | Component spacing and alignment | LOW | `antd/Space`, `antd/Flex` | Thin re-export |

### Differentiators (Competitive Advantage)

Features that make this library worth adopting over "just using antd directly" or over a generic component library.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Admin Theme Preset | Drop-in, production-quality visual theme (dark sidebar, neutral body, strong typography); no design work required | MEDIUM | The flagship differentiator. Encapsulates antd ConfigProvider tokens + component-level overrides into an importable preset object. See Theme section below. |
| ProTable / DataGrid | Advanced table with built-in search bar, column config, bulk actions, CSV export, server-side pagination — all wired up | HIGH | antd Table is powerful but low-level. ProComponents' ProTable is the gold standard; this library should provide a lighter version that stays on top of antd Table rather than reimplementing from scratch |
| ProForm / SmartForm | Form with built-in schema-driven field rendering, async submit handling, reset, success/error feedback | HIGH | Reduces CRUD form boilerplate from ~80 lines to ~20. Must support layout variants (modal form, drawer form, step form) |
| StatCard / KPICard | Styled card with number, label, trend arrow, sparkline slot — the building block of dashboard overview pages | LOW | High visual value, low implementation cost. Every admin dashboard has these. |
| Chart components (thin wrappers) | Pre-styled line, bar, pie charts with the admin theme applied | MEDIUM | Use echarts or recharts under the hood; library provides styled wrapper + sensible defaults. Not a full charting library — just themed wrappers |
| Upload / FileManager | File upload with drag-and-drop, progress bar, file list, image preview | MEDIUM | `antd/Upload` needs significant UX work to be production-ready (list type, image preview, validation, server URL wiring) |
| DescriptionsList / Detail | Read-only structured data display (label-value pairs); used for detail/view pages | LOW | ProDescriptions in antd-pro is the reference. Fills the gap between Form (edit) and Table (list) |
| Empty State component | Illustrated or icon-based empty states for tables, lists, search results | LOW | High visual polish signal. antd has a basic Empty but custom illustrations with action buttons are expected |
| PermissionGuard / RoleGate | Conditional rendering based on user role/permission | MEDIUM | Very common in admin panels; reduces boilerplate in consumer apps. Pure render prop / children approach — no auth logic inside |
| Storybook with Controls and a11y addon | Interactive docs that let consumers explore tokens and props live | MEDIUM | The documentation surface IS the product for component libraries. Storybook 8 + CSF3 + autodocs is the current standard |
| Token-aware Theming API | Consumers pass a partial token object and get a fully themed ConfigProvider subtree | MEDIUM | This is what separates "a wrapper" from "a design system". Must export TypeScript types for all tokens. |

### Anti-Features (Things to Deliberately NOT Build in v1)

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Mobile / responsive-first components | "Can it work on mobile?" | Admin panels are desktop-first workflows; mobile admin is a distinct product; responsive adds test surface area with no near-term value | Document that breakpoints are available via antd Grid; defer mobile story until v2 |
| SSR / Next.js specific optimizations | Teams often use Next.js | antd v5 CSS-in-JS has known SSR complexity (extracting critical CSS); out of scope for v1 | Document that SSR consumers need `@ant-design/static-style-extract` or similar; provide a callout in README |
| Dark mode toggle at runtime | "It should have dark mode" | Runtime theme switching requires CSS variable approach or full re-render; antd's dark algorithm token works but adds complexity to all component stories and token decisions | Ship the "admin" preset in light mode only for v1; dark mode as a v2 preset |
| Full authentication flows (login, register, forgot password) | "ProComponents has a login page" | Auth is business logic, not UI primitives; coupling auth flows to a component library creates opinionated dependencies | Provide a `LoginLayout` shell (centered card, logo slot) but not form logic or auth API calls |
| Data-fetching hooks (useFetch, useTable, useForm with API) | "It would reduce boilerplate" | Couples the library to a data-fetching strategy (react-query, SWR, fetch, axios); breaks the UI-only boundary | Components should accept `loading`, `dataSource`, `onSubmit` props — data fetching stays in consumer's app |
| Icon library / custom icons | "We need consistent icons" | Antd ships `@ant-design/icons` which is comprehensive; maintaining a parallel icon set is a maintenance trap | Re-export and document common antd icons; provide icon slot props on components |
| Full data grid with virtual scrolling | "We need ag-Grid-level features" | Implementing virtual scrolling correctly is a months-long project; conflicts with the "built on antd" constraint | Ship ProTable (enhanced antd Table) with server-side pagination — sufficient for 90% of admin use cases |
| Drag-and-drop builder / page builder | "Would be cool" | Completely different product category | Not in scope |
| i18n / internationalization system | "Apps need translations" | antd has its own locale system via ConfigProvider; building a parallel i18n system creates conflicts | Document how to pass antd locale objects; let consumer's i18n library own translation strings |
| CSS framework integration (Tailwind, etc.) | "Teams use Tailwind" | antd CSS-in-JS and Tailwind's utility classes create specificity conflicts; mixing styling systems causes maintainability problems | Stay CSS-in-JS-only; document that consumers should not mix Tailwind with antd component internals |

---

## Antd Component Coverage Guide

Which antd components to wrap vs extend vs leave alone:

### Wrap with Theme Only (no behavioral changes)
These antd components just need the design token baked in and re-export:
- Button, Input, Select, Checkbox, Radio, Switch, Slider, Rate
- Tag, Badge, Avatar, Divider, Space, Flex
- Tooltip, Popover
- Spin, Progress
- Tabs, Collapse, Carousel
- Grid (Row, Col)
- Typography (Text, Title, Paragraph)

### Wrap with Behavioral Extensions (add props/patterns)
These need documented patterns and prop extensions on top of antd defaults:
- **Table** — add `rowSelection` shorthand, `searchBar` slot, `toolbarActions` slot, `emptyState` prop
- **Form** — add `onFinishAsync` (returns Promise, auto-sets loading), `initialValuesAsync`, layout variants
- **Modal / Drawer** — add `confirmLoading` wiring convention, `useModal()` hook for imperative API
- **DatePicker** — add preset ranges (Last 7 days, Last 30 days, This month, etc.) as a `presets` prop default
- **Upload** — add `accept` presets (image, document, any), `maxSize` validation, `onUploadSuccess`/`onUploadError` callbacks, image preview grid
- **Notification / Message** — export hook-based API (`useMessage`, `useNotification`) as the recommended pattern for React 18 strict mode compatibility

### Build Custom (on top of antd primitives, not wrapping a single antd component)
These require composing multiple antd primitives:
- **AppShell / PageLayout** — Layout + Sider + Header + Content + Footer
- **Sidebar** — Layout.Sider + Menu + logo slot + collapse button
- **StatCard / KPICard** — Card + Typography + custom trend indicator
- **ProTable / DataGrid** — Table + Form (search bar) + Space (toolbar) + Dropdown (column config) + Export logic
- **ProForm / SmartForm** — Form + various Field components + loading state management
- **DescriptionsList** — Descriptions (antd) with enhanced column layout and loading state
- **PermissionGuard** — Pure render logic, no antd dependency
- **Empty state** — antd Empty + Button + custom illustration slot

---

## Storybook Story Patterns for Admin Components

These patterns should be applied consistently across all component stories:

| Pattern | What It Provides | Implementation |
|---------|-----------------|----------------|
| Default story | The most common usage | CSF3 `export const Default = {}` with realistic admin data |
| Variants story | All visual variants in one view | Multiple instances in a single story for visual regression |
| Loading/Async story | The async loading state | `loading: true` or `status: 'loading'` prop |
| Empty state story | No data case | `dataSource: []` or empty data |
| Error state story | Validation / API error | `status: 'error'` or `validateStatus` trigger |
| With Theme story | Component inside ThemeProvider | Shows how custom tokens affect rendering |
| Controls (autodocs) | Interactive prop exploration | CSF3 autodocs + argTypes for all public props |
| a11y story | Accessibility validation | Storybook a11y addon runs against all stories |

Key: every story should use realistic admin data (user records, financial figures, status values) not generic "foo/bar" placeholder data.

---

## Theme Preset Patterns

### How the Admin Theme Preset Works

The preset is an exported object consumed by antd's `ConfigProvider`:

```typescript
// Consumer usage
import { GravityProvider, adminTheme } from 'gravity-components';

<GravityProvider theme={adminTheme}>
  <App />
</GravityProvider>
```

### Token Categories to Cover in the Preset

| Token Category | Admin Preset Values | Rationale |
|---------------|---------------------|-----------|
| colorPrimary | Brand blue (e.g. #1677FF or custom) | Action color throughout |
| colorBgContainer | #ffffff (content area) | Clean white body |
| colorBgLayout | #f0f2f5 (page background) | Subtle grey behind cards |
| Sidebar bg | #001529 (dark navy) | Dark sidebar is the admin standard |
| colorTextBase | #1d1d1f | Strong, dark text for data density |
| borderRadius | 6px | Modern but not overly rounded |
| fontSizeBase | 14px | Admin density standard |
| boxShadow | Subtle elevation (0 1px 4px rgba(0,0,0,0.12)) | Card depth without excess |
| colorSuccess/Warning/Error | Standard semantic palette | Status indicators throughout |

### Customization API

Consumers should be able to override tokens without reimporting everything:

```typescript
import { GravityProvider, adminTheme, mergeTheme } from 'gravity-components';

const myTheme = mergeTheme(adminTheme, {
  token: { colorPrimary: '#7c3aed' }, // brand override
});
```

---

## Feature Dependencies

```
AppShell / PageLayout
    └──requires──> Sidebar
    └──requires──> Header / Topbar
    └──requires──> Menu / NavMenu

ProTable / DataGrid
    └──requires──> Table (base)
    └──requires──> Form (search bar uses Form internally)
    └──requires──> Pagination
    └──enhances──> Button (toolbar actions)

ProForm / SmartForm
    └──requires──> Form (base)
    └──requires──> Button (submit/reset)
    └──optionally uses──> Modal / Drawer (modal form / drawer form variants)

Admin Theme Preset
    └──requires──> GravityProvider / ConfigProvider wrapper
    └──blocks──> All other components (must exist before any component can render correctly)

PermissionGuard
    └──has no antd dependency
    └──enhances──> any component (wraps anything)

StatCard / KPICard
    └──requires──> Card (base)
    └──optionally uses──> Chart (sparkline slot)

Upload (enhanced)
    └──requires──> antd Upload base
    └──requires──> Message/Notification (feedback on error/success)
```

### Dependency Notes

- **Theme Preset before everything:** The GravityProvider + adminTheme must be the first thing bootstrapped; no component renders correctly without it. This means it must be the first deliverable.
- **ProTable requires Form:** The search bar in ProTable uses Form internally — Form must be stable before ProTable development starts.
- **ProForm optionally uses Modal/Drawer:** Drawer Form and Modal Form variants can be deferred until Modal/Drawer are stable.
- **Charts are optional in StatCard:** The sparkline slot should accept any React node — full chart integration is not required for StatCard to ship.

---

## MVP Definition

### Launch With (v1)

Minimum viable for an admin panel developer to build a real app with this library.

- [ ] GravityProvider + adminTheme preset — everything else depends on it
- [ ] AppShell / PageLayout with Sidebar + Header slots — the structural foundation
- [ ] Sidebar with collapsible Menu — the most distinctive visual component
- [ ] Button (all variants) — universal primitive
- [ ] Input, Select, Checkbox, Radio, Switch — form field primitives
- [ ] Form (with async submit, validation, layout variants) — CRUD backbone
- [ ] Table (with toolbar, search bar, pagination, empty state) — list page backbone
- [ ] Modal and Drawer (with imperative API) — detail and confirmation patterns
- [ ] Card and StatCard/KPICard — dashboard building blocks
- [ ] Tag, Badge — status indicators
- [ ] Alert, Message, Notification (hook-based) — feedback system
- [ ] Typography (Text, Title, Paragraph) — consistent text rendering
- [ ] Storybook with all v1 components documented (Controls + a11y)

### Add After Validation (v1.x)

- [ ] ProTable / DataGrid (advanced table with column config, bulk actions, CSV export) — add when basic Table is stable and consumer demand is confirmed
- [ ] ProForm / SmartForm (schema-driven, drawer/modal variants) — add after Form baseline ships
- [ ] Upload (enhanced with drag-drop, image preview, validation) — add when file handling use cases are confirmed
- [ ] DescriptionsList — add when detail page pattern is requested by consumers
- [ ] PermissionGuard — add when access-control use cases are raised

### Future Consideration (v2+)

- [ ] Chart wrappers (line, bar, pie) — only if consumer apps need charts; defer to avoid echarts/recharts dependency decision now
- [ ] Dark mode theme preset — significant testing surface; defer until v1 is stable
- [ ] Skeleton / loading templates per component type — nice polish; defer until core is complete
- [ ] Virtual scrolling for very large tables — defer; server-side pagination covers 90% of cases

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| GravityProvider + adminTheme | HIGH | LOW | P1 |
| AppShell / PageLayout + Sidebar | HIGH | MEDIUM | P1 |
| Button, Input, Select, Checkbox, Switch | HIGH | LOW | P1 |
| Form (async, validated) | HIGH | MEDIUM | P1 |
| Table (with search, pagination, empty) | HIGH | HIGH | P1 |
| Modal + Drawer | HIGH | LOW | P1 |
| StatCard / KPICard | HIGH | LOW | P1 |
| Tag, Badge, Alert, Message, Notification | MEDIUM | LOW | P1 |
| Typography | MEDIUM | LOW | P1 |
| Storybook docs | HIGH | MEDIUM | P1 |
| ProTable / DataGrid | HIGH | HIGH | P2 |
| ProForm / SmartForm | HIGH | HIGH | P2 |
| Upload (enhanced) | MEDIUM | MEDIUM | P2 |
| DescriptionsList | MEDIUM | LOW | P2 |
| PermissionGuard | MEDIUM | LOW | P2 |
| Chart wrappers | MEDIUM | MEDIUM | P3 |
| Dark mode preset | MEDIUM | HIGH | P3 |
| Skeleton templates | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | antd-pro (ProComponents) | MUI (Material) | Mantine | Our Approach |
|---------|--------------------------|----------------|---------|--------------|
| Theme system | ConfigProvider + token API + `ProProvider` | `ThemeProvider` + CSS variables in v6 | `MantineProvider` + CSS variables | ConfigProvider + token object preset; exported as importable constant |
| Layout / AppShell | `ProLayout` — full featured, route-driven | `Drawer`/`AppBar` primitives only; app shells are user-assembled | `AppShell` component — first-class | `AppShell` with Sidebar + Header slots; less opinionated than ProLayout about routing |
| Advanced Table | `ProTable` — search bar, column config, toolbar | `DataGrid` (MUI X, paid for advanced features) | `DataTable` (Mantine DataTable, community) | ProTable-lite on top of antd Table; free, no paywall |
| Form | `ProForm`, `ModalForm`, `DrawerForm`, `StepsForm` | `react-hook-form` / uncontrolled; no smart form | `useForm` hook; field-level components | SmartForm with async submit, layout variants; antd Form-based |
| Charts | No built-in; ecosystem recommendation is echarts | `recharts` ecosystem, no wrappers | No built-in | Themed wrappers around recharts or echarts; v2 |
| Storybook | No official Storybook; uses dumi docs | Storybook in MUI repo (internal) | Storybook as primary docs | Storybook 8 + CSF3 + autodocs; the primary documentation surface |
| Auth / login | Login page template in ProLayout | No | No | LoginLayout shell only; no auth logic |
| Permission gates | No built-in | No | No | PermissionGuard render prop — a differentiator vs all three |
| RBAC / access control | No | No | No | Simple, composable PermissionGuard |
| Dark mode | Yes (via antd dark algorithm) | Yes | Yes | v2 — defer |
| TypeScript | Full | Full | Full | Full, strict mode |

---

## Sources

- Ant Design v5 component docs (training knowledge, cutoff Aug 2025): https://ant.design/components/overview
- antd-pro / ProComponents docs (training knowledge): https://procomponents.ant.design
- MUI component library (training knowledge): https://mui.com/material-ui/all-components/
- Mantine component library (training knowledge): https://mantine.dev/getting-started/
- Note: Live doc fetches were blocked in this research session. All findings are from training knowledge of these stable, mature libraries. Confidence is HIGH for core antd/antd-pro APIs (stable since v5 release in late 2022). Flag for human verification if any specific ProTable or ProForm API details are used as implementation contracts.

---

*Feature research for: React admin component library on Ant Design v5 (Gravity Components)*
*Researched: 2026-03-30*
