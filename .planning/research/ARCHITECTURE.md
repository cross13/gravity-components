# Architecture Research

**Domain:** React component library built on Ant Design v5
**Researched:** 2026-03-30
**Confidence:** HIGH (antd v5 token system, tsup build tooling, Storybook 8 — all stable, well-documented patterns)

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONSUMER APPLICATION                          │
│  import { Button, Table, adminTheme } from 'gravity-components'  │
└───────────────────────────────┬─────────────────────────────────┘
                                │ npm package
┌───────────────────────────────▼─────────────────────────────────┐
│                    PUBLISH LAYER (tsup)                          │
│   dist/index.js (ESM)   dist/index.cjs (CJS)   dist/index.d.ts  │
│   Named exports: components + theme presets + token types        │
└───────────────────────────────┬─────────────────────────────────┘
                                │ build input
┌───────────────────────────────▼─────────────────────────────────┐
│                    COMPONENT LAYER (src/components/)             │
│  ┌───────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐  │
│  │  Button   │ │  Table   │ │   Form   │ │  DataGrid/Chart  │  │
│  │  (wrap)   │ │  (wrap)  │ │  (wrap)  │ │  (compose)       │  │
│  └─────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘  │
│        └────────────┴────────────┴─────────────────┘            │
│                             │ uses                               │
│  ┌──────────────────────────▼──────────────────────────────┐    │
│  │              antd v5 base components (peer dep)          │    │
│  └─────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────┘
                                │ receives theme via React context
┌───────────────────────────────▼─────────────────────────────────┐
│                    THEME LAYER (src/theme/)                      │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  ThemeProvider (wrapper around antd ConfigProvider)      │    │
│  │  Props: theme?: 'admin' | GravityTokens                  │    │
│  └───────────────────────────┬─────────────────────────────┘    │
│                              │ composes                          │
│  ┌───────────────────────────▼─────────────────────────────┐    │
│  │  Theme Presets (src/theme/presets/)                      │    │
│  │  adminTheme: { token: {...}, components: {...} }         │    │
│  └───────────────────────────┬─────────────────────────────┘    │
│                              │ structured as                     │
│  ┌──────────┐ ┌───────────┐ ┌▼──────────────┐                   │
│  │  global  │ │  alias    │ │   component   │                   │
│  │  tokens  │ │  tokens   │ │   tokens      │                   │
│  └──────────┘ └───────────┘ └───────────────┘                   │
│                              │ extends                           │
│  ┌───────────────────────────▼─────────────────────────────┐    │
│  │  antd v5 seed tokens (colorPrimary, borderRadius, etc.)  │    │
│  └─────────────────────────────────────────────────────────┘    │
└───────────────────────────────┬─────────────────────────────────┘
                                │ documented in
┌───────────────────────────────▼─────────────────────────────────┐
│                    STORYBOOK LAYER (.storybook/ + src/stories/)  │
│  ┌────────────────────┐  ┌──────────────────────────────────┐   │
│  │  Global Decorator  │  │  Component Stories (CSF3)        │   │
│  │  (ThemeProvider    │  │  Button.stories.tsx              │   │
│  │   wraps all)       │  │  Table.stories.tsx  etc.         │   │
│  └────────────────────┘  └──────────────────────────────────┘   │
│  ┌────────────────────────────────────────────────────────┐     │
│  │  Controls (ArgTypes) wired to token/prop interfaces     │     │
│  └────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Layer | Component | Responsibility | Boundary |
|-------|-----------|----------------|----------|
| Theme | `ThemeProvider` | Wraps antd `ConfigProvider`; accepts preset name or raw tokens; provides React context | Only theming concern — no layout, no UI |
| Theme | `adminTheme` preset | Serializable object: `{ token, components }` matching antd's `ThemeConfig` shape | Pure data — importable without rendering |
| Theme | Token type definitions | `GravityTokens` TypeScript interface; exported for consumer extension | Types only — no runtime |
| Component | Wrapper components | Re-export antd component with Gravity-specific prop defaults and className hooks | Thin wrap — delegates all rendering to antd |
| Component | Composite components | Compose multiple antd primitives (e.g., `DataGrid = Table + Pagination + Search`) | Own their layout logic; delegate styling to theme layer |
| Storybook | Global decorator | Wraps every story in `ThemeProvider` with `adminTheme` by default | Story-environment only — never shipped |
| Storybook | Component stories | CSF3 format; one story file per component; args map to component props | Documentation only |
| Build | `tsup` config | Produces `dist/` with ESM + CJS + `.d.ts` from `src/index.ts` barrel | Build artifact — no runtime impact |
| Build | `src/index.ts` barrel | Single named-export entry; re-exports all public components + theme presets + types | Public API surface contract |

## Recommended Project Structure

```
gravity-components/
├── src/
│   ├── theme/
│   │   ├── tokens/
│   │   │   ├── global.ts          # Seed + global tokens (colorPrimary, borderRadius, etc.)
│   │   │   ├── alias.ts           # Alias tokens derived from global (colorBgContainer, etc.)
│   │   │   └── components.ts      # Per-component token overrides (Button.colorPrimary, etc.)
│   │   ├── presets/
│   │   │   └── admin.ts           # adminTheme: ThemeConfig = { token, components }
│   │   ├── ThemeProvider.tsx      # ConfigProvider wrapper — consumer-facing API
│   │   └── index.ts               # Re-exports: ThemeProvider, adminTheme, GravityTokens type
│   │
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx         # Wrapper with Gravity-specific defaults
│   │   │   ├── Button.types.ts    # Props interface (extends antd ButtonProps)
│   │   │   └── index.ts           # Re-exports Button + ButtonProps
│   │   ├── Table/
│   │   │   ├── Table.tsx
│   │   │   ├── Table.types.ts
│   │   │   └── index.ts
│   │   ├── Form/
│   │   ├── Input/
│   │   ├── Select/
│   │   ├── Modal/
│   │   ├── Typography/
│   │   ├── DatePicker/
│   │   ├── Upload/
│   │   ├── Notification/
│   │   ├── Layout/
│   │   │   ├── Sidebar/           # Composite: dark sidebar layout component
│   │   │   └── PageLayout/        # Composite: header + sidebar + content shell
│   │   ├── DataGrid/              # Composite: Table + filters + pagination
│   │   └── Charts/                # Thin wrap around antd-compatible chart lib
│   │
│   └── index.ts                   # Single barrel — all public exports
│
├── stories/                       # Co-located with src OR separate — separate is cleaner
│   ├── Button.stories.tsx
│   ├── Table.stories.tsx
│   ├── DataGrid.stories.tsx
│   └── ...
│
├── .storybook/
│   ├── main.ts                    # Storybook config (vite builder, story globs)
│   ├── preview.ts                 # Global decorators (ThemeProvider), global args
│   └── theme.ts                   # Storybook UI theme (optional branding)
│
├── dist/                          # Build output — git-ignored
│   ├── index.js                   # ESM
│   ├── index.cjs                  # CJS
│   └── index.d.ts                 # Type declarations
│
├── tsup.config.ts                 # Build config: entry, format, dts, external
├── tsconfig.json                  # Strict TypeScript — paths, target ES2020
├── package.json                   # exports map, peerDependencies, files field
└── .storybook/
```

### Structure Rationale

- **`src/theme/` separate from `src/components/`:** Theme layer is pure configuration (serializable data + one React wrapper). Keeping it isolated means presets can be imported without pulling in any component code — essential for tree-shaking.
- **`src/theme/tokens/` split into global/alias/components:** Mirrors antd v5's own token hierarchy. Consumers who want to extend only one level can import just that slice.
- **Per-component folders with `index.ts`:** Standard barrel pattern allows `import { Button } from 'gravity-components'` to resolve correctly. Avoids deep import paths leaking into public API.
- **`stories/` at root (not inside `src/`):** Stories are dev-only artifacts. Keeping them outside `src/` makes the `tsup` entry point unambiguous — it never accidentally includes story imports in the build.
- **`src/index.ts` as single entry:** tsup compiles exactly this file. Everything public is explicitly re-exported here. Anything not in this barrel is package-private.

## Architectural Patterns

### Pattern 1: ConfigProvider as Theming Backbone

**What:** antd v5 uses a CSS-in-JS token system delivered via `ConfigProvider`. All antd components read design tokens from the nearest `ConfigProvider` ancestor via React context. `ThemeProvider` is a thin wrapper that translates Gravity's preset/token API into the shape `ConfigProvider` expects.

**When to use:** Always. Every Gravity component must render inside a `ThemeProvider` (or raw `ConfigProvider`) to receive the correct theme.

**Trade-offs:** Requires `ThemeProvider` at the app root — consumers must wrap their app. This is standard and expected for component libraries.

**Example:**
```typescript
// src/theme/ThemeProvider.tsx
import { ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';
import { adminTheme } from './presets/admin';
import type { GravityTokens } from './tokens/global';

export interface ThemeProviderProps {
  theme?: 'admin' | ThemeConfig;    // preset name OR raw antd ThemeConfig
  tokens?: Partial<GravityTokens>;  // token overrides on top of preset
  children: React.ReactNode;
}

export function ThemeProvider({ theme = 'admin', tokens, children }: ThemeProviderProps) {
  const base = theme === 'admin' ? adminTheme : theme;
  const resolved: ThemeConfig = tokens
    ? { ...base, token: { ...base.token, ...tokens } }
    : base;
  return <ConfigProvider theme={resolved}>{children}</ConfigProvider>;
}
```

### Pattern 2: Token Hierarchy — Three Levels

**What:** antd v5 organizes tokens in three layers that compose downward:

1. **Seed tokens** — raw values you set (e.g., `colorPrimary: '#1677ff'`, `borderRadius: 6`). antd derives ~400 calculated tokens from these automatically.
2. **Alias tokens** — antd-derived semantic names (e.g., `colorBgContainer`, `colorTextBase`). These are calculated from seeds but can be overridden explicitly via `token` in `ConfigProvider`.
3. **Component tokens** — per-component overrides passed via `components` key in `ConfigProvider` (e.g., `Button: { colorPrimary: '#...' }`). These override alias tokens for that component only.

**When to use:** Prefer seed token overrides first — they cascade. Use alias overrides for semantic adjustments. Use component tokens for one-off component customization that should not cascade globally.

**Trade-offs:** Getting seed tokens right takes upfront design work but pays off in consistency. Jumping straight to component tokens produces a patchwork theme that's hard to maintain.

**Example:**
```typescript
// src/theme/tokens/global.ts
export interface GravityTokens {
  colorPrimary: string;
  colorSuccess: string;
  colorWarning: string;
  colorError: string;
  borderRadius: number;
  fontFamily: string;
  fontSize: number;
}

export const defaultTokens: GravityTokens = {
  colorPrimary: '#1D4ED8',   // Gravity brand blue
  colorSuccess: '#16A34A',
  colorWarning: '#D97706',
  colorError: '#DC2626',
  borderRadius: 6,
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  fontSize: 14,
};

// src/theme/tokens/components.ts
export const componentTokens = {
  Button: { borderRadius: 6, fontWeight: 500 },
  Table:  { headerBg: '#F8FAFC', headerColor: '#374151' },
  Menu:   { darkItemBg: '#1E293B', darkItemSelectedBg: '#334155' },
};

// src/theme/presets/admin.ts
import type { ThemeConfig } from 'antd';
import { defaultTokens } from '../tokens/global';
import { componentTokens } from '../tokens/components';

export const adminTheme: ThemeConfig = {
  token: defaultTokens,
  components: componentTokens,
};
```

### Pattern 3: Thin Wrapper Components

**What:** Gravity components are thin wrappers — they extend antd's prop interface, set Gravity-opinionated defaults, and forward all other props. They do NOT re-implement rendering logic.

**When to use:** For all direct antd equivalents (Button, Input, Table, etc.). The goal is zero API surprise — a developer who knows antd already knows Gravity's components.

**Trade-offs:** Very low maintenance cost. Risk: consumers might reach for antd directly and bypass the theme — mitigated by documentation.

**Example:**
```typescript
// src/components/Button/Button.tsx
import { Button as AntButton } from 'antd';
import type { ButtonProps as AntButtonProps } from 'antd';

export interface ButtonProps extends AntButtonProps {
  // Gravity-specific prop extensions go here if needed
}

export function Button({ type = 'primary', size = 'middle', ...props }: ButtonProps) {
  return <AntButton type={type} size={size} {...props} />;
}
```

### Pattern 4: Composite Components

**What:** Higher-level components (DataGrid, Sidebar, PageLayout) compose multiple antd primitives and own their layout logic. They are not 1:1 antd wrappers.

**When to use:** When the feature requires coordinating multiple antd components (e.g., Table + Pagination + Search is the DataGrid).

**Trade-offs:** Higher complexity, more Gravity-owned code, more testing surface. Worth it because these are the main differentiators of the library.

**Example:**
```typescript
// src/components/DataGrid/DataGrid.tsx
import { Table, Input, Space, Pagination } from 'antd';
import type { TableProps } from 'antd';

export interface DataGridProps<T> extends TableProps<T> {
  searchable?: boolean;
  onSearch?: (query: string) => void;
}
// Composes Table + optional search bar + pagination
```

### Pattern 5: Storybook Global Decorator

**What:** A single global decorator in `.storybook/preview.ts` wraps every story in `ThemeProvider`. This ensures all stories render with the Gravity theme without requiring each story file to import and apply the theme manually.

**When to use:** Always — it is foundational to correct visual documentation.

**Example:**
```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme="admin">
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default preview;
```

## Data Flow

### Theme Resolution Flow (runtime)

```
Consumer App
    │
    ▼
<ThemeProvider theme="admin" tokens={{ colorPrimary: '#...' }}>
    │
    ▼ resolves to ThemeConfig object
<ConfigProvider theme={resolved}>          ← antd React context
    │
    ▼ CSS-in-JS token injection (antd internal)
<Button />   <Table />   <Input />         ← read tokens from context
    │
    ▼
Rendered DOM with correct CSS-in-JS styles
```

### Token Override Flow (design-time)

```
GravityTokens (seed values)
    │
    ▼ antd derives ~400 alias tokens automatically
Alias Tokens (colorBgContainer, colorTextBase, etc.)
    │
    ▼ component-level overrides applied on top
Component Tokens (Button.borderRadius, Table.headerBg, etc.)
    │
    ▼ merged into ThemeConfig
adminTheme: ThemeConfig
    │
    ▼ passed to ConfigProvider
All antd components styled
```

### Build Flow (build-time)

```
src/index.ts (barrel)
    │
    ▼ tsup
    ├── dist/index.js       (ESM — tree-shakeable)
    ├── dist/index.cjs      (CJS — CommonJS compat)
    └── dist/index.d.ts     (TypeScript declarations)

package.json "exports" map:
    "."  → { import: dist/index.js, require: dist/index.cjs }
    Types → dist/index.d.ts
```

### Key Data Flows

1. **Theme to component:** `ThemeProvider` → `ConfigProvider` context → antd CSS-in-JS → DOM styles. This is a React context flow — unidirectional, top-down.
2. **Token override:** Consumer passes `tokens` prop to `ThemeProvider` → merged with preset base → passed to `ConfigProvider`. Override is shallow-merged at the seed token level.
3. **Preset import (no rendering):** Consumer can `import { adminTheme } from 'gravity-components'` and pass it directly to their own `ConfigProvider` without using `ThemeProvider` at all — the preset is pure data.

## Build Order (What Must Be Built Before What)

```
1. Token definitions (src/theme/tokens/)
       ↓  (tokens are the foundation; everything else depends on them)
2. Theme presets (src/theme/presets/admin.ts)
       ↓
3. ThemeProvider (src/theme/ThemeProvider.tsx)
       ↓
4. Base wrapper components (Button, Input, Select, etc.)
       ↓  (base components must exist before composites can use them)
5. Composite components (DataGrid, Sidebar, PageLayout, Charts)
       ↓
6. src/index.ts barrel (wires all public exports together)
       ↓
7. Storybook setup (.storybook/preview.ts global decorator)
       ↓  (Storybook setup must reference ThemeProvider which is built in step 3)
8. Component stories (one per component, written as components are completed)
       ↓
9. tsup build configuration + package.json exports map
       ↓
10. npm publish
```

**Critical dependency:** Steps 1-3 (theme layer) must be complete before any meaningful component work begins. A component without a working `ThemeProvider` cannot be visually validated in Storybook.

## npm Package Exports Structure

```json
// package.json
{
  "name": "gravity-components",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "antd": ">=5.0.0"
  },
  "sideEffects": false
}
```

**Named exports from `src/index.ts`:**
```typescript
// Theme layer
export { ThemeProvider } from './theme/ThemeProvider';
export { adminTheme }    from './theme/presets/admin';
export type { GravityTokens } from './theme/tokens/global';

// Components
export { Button }     from './components/Button';
export { Input }      from './components/Input';
export { Select }     from './components/Select';
export { Table }      from './components/Table';
export { Form }       from './components/Form';
export { Modal }      from './components/Modal';
export { Typography } from './components/Typography';
export { DatePicker } from './components/DatePicker';
export { Upload }     from './components/Upload';
export { Sidebar }    from './components/Layout/Sidebar';
export { PageLayout } from './components/Layout/PageLayout';
export { DataGrid }   from './components/DataGrid';
export { Charts }     from './components/Charts';

// Re-export component prop types for consumer TypeScript
export type { ButtonProps }     from './components/Button';
export type { TableProps }      from './components/Table';
// ... etc
```

**`sideEffects: false`** is correct because antd v5 CSS-in-JS injects styles at render time — there are no top-level CSS file imports that would break tree-shaking.

## Anti-Patterns

### Anti-Pattern 1: Putting Theme Logic Inside Components

**What people do:** Each component imports its own color constants or hardcodes style values in component files.

**Why it's wrong:** Breaks the theme abstraction. Consumers cannot override component colors via `ThemeProvider`. Theme changes require touching every component file.

**Do this instead:** Components must be style-agnostic. All color/spacing/typography values must flow from antd's token system via `ConfigProvider` context. If a component needs a value, it uses `theme.useToken()` or relies on antd's CSS-in-JS picking up the token.

### Anti-Pattern 2: Importing antd Components Directly in Stories

**What people do:** Stories import from `'antd'` directly instead of from `'../src/components/...'`.

**Why it's wrong:** Stories stop documenting Gravity components and instead document raw antd. The Gravity defaults, prop overrides, and type extensions become invisible.

**Do this instead:** All stories import from Gravity's own component paths (or the barrel). antd is a peer dep — it should never appear in story imports.

### Anti-Pattern 3: Component-Level ThemeProvider

**What people do:** Wrapping individual components in their own `ThemeProvider`/`ConfigProvider` inside component files.

**Why it's wrong:** Creates nested ConfigProvider contexts. antd supports nesting but it's unexpected and causes token resolution confusion. Performance cost of multiple CSS-in-JS context evaluations.

**Do this instead:** Exactly one `ThemeProvider` at the library consumer's app root. Component stories use the global decorator — not per-story ThemeProvider wrapping.

### Anti-Pattern 4: Exporting from Deep Paths

**What people do:** Documenting usage as `import { Button } from 'gravity-components/dist/components/Button'`.

**Why it's wrong:** Leaks internal structure into the public API. Refactoring internals becomes a breaking change. Tree-shaking handles named exports from a single barrel correctly in modern bundlers.

**Do this instead:** All imports from `'gravity-components'` only. The barrel + package.json exports map is the public contract.

### Anti-Pattern 5: Forking antd Components

**What people do:** Copying antd component source into the library to customize it.

**Why it's wrong:** Massive maintenance burden. Security patches and antd upgrades no longer apply. The whole point of building on antd is to leverage its battle-tested implementation.

**Do this instead:** Use the token system and `components` key in `ConfigProvider` for customization. If a component truly cannot be customized via tokens, compose around it — never copy it.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| antd v5 | Peer dependency; ConfigProvider for theme; component imports | Never bundle antd — always peerDep. Consumers must install it separately. |
| Storybook 8 | Dev dependency; separate process; accesses `src/` directly | Storybook never hits `dist/` — it reads source. tsup build is prod-only. |
| npm registry | `npm publish` with `files: ["dist"]` filter | Only `dist/` goes to registry. Source, stories, storybook config stay local. |
| TypeScript consumers | Types from `dist/index.d.ts` (generated by tsup `dts: true`) | `tsup` runs `tsc` for declarations. Strict mode in `tsconfig.json` catches errors at build time. |

### Internal Boundaries

| Boundary | Communication | Direction | Notes |
|----------|---------------|-----------|-------|
| Theme layer → Components | React context (ConfigProvider) | Theme → Component | Components are passive receivers — they never write to theme context |
| Components → antd | Props passthrough + composition | Gravity → antd | One-way delegation. Gravity wraps, antd renders. |
| Stories → Components | Direct import from `src/` | Stories → Component source | Stories bypass `dist/` entirely — Storybook uses Vite to resolve source |
| tsup → `src/index.ts` | File system (build time) | tsup reads src, writes dist | Compile-time boundary — no runtime relationship |
| Consumer → Package | npm import (`dist/`) | Consumer → dist | Consumer never sees `src/`. Public API is `dist/` only. |

## Scaling Considerations

This is a component library, not a backend service. "Scaling" here means growing the component count and consumer base.

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 5-15 components | Current flat structure in `src/components/` is sufficient |
| 15-40 components | Group by category: `src/components/data-entry/`, `src/components/data-display/`, `src/components/layout/` |
| 40+ components | Consider sub-package exports (e.g., `gravity-components/charts`) or a monorepo with separate packages. At this scale, a single bundle becomes large enough to hurt consumer tree-shaking. |

### Scaling Priorities

1. **First bottleneck:** Bundle size. With many components, even tree-shaken bundles can grow. Mitigation: ensure `sideEffects: false` is set and all exports are individually importable named exports (no barrel that forces full import).
2. **Second bottleneck:** Type declaration file size. As components grow, `dist/index.d.ts` becomes large. Mitigation: tsup can split declarations per file with `dts: { resolve: true }`.

## Sources

- antd v5 official documentation on ConfigProvider and theme customization (HIGH confidence — stable API since v5.0, 2022)
- tsup documentation on dual ESM/CJS output and `dts` flag (HIGH confidence — tsup is the de facto standard for this use case)
- Storybook 8 CSF3 documentation on global decorators and preview.ts (HIGH confidence — stable since Storybook 7)
- Standard React component library patterns from open-source libraries (shadcn/ui, Mantine, Chakra) — adapted for antd-specific theming surface (MEDIUM confidence — architectural patterns, not direct antd library)
- package.json `exports` map specification (Node.js/bundler standard) (HIGH confidence — stable spec)

---
*Architecture research for: React component library on Ant Design v5 (Gravity Components)*
*Researched: 2026-03-30*
