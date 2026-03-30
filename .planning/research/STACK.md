# Stack Research

**Domain:** React component library (antd v5 wrapper, admin UI kit)
**Researched:** 2026-03-30
**Confidence:** HIGH (all versions verified against npm registry)

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | 19.2.4 | UI runtime | Latest stable; antd v5 peerDeps allow >=16.9.0 but v19 is production-ready and aligns with React 18+ concurrent model the project targets |
| TypeScript | 5.x (pin to `~5.8`) | Type system | TS 6.0.2 just hit npm as `latest` but is a very fresh major — typescript-eslint 8.x caps support at `<6.0.0`. Pin to TS 5.8 until ecosystem fully catches up. TS 5.x has all needed features: `satisfies`, const type params, `verbatimModuleSyntax` |
| antd | 5.29.3 | Base component layer | Project is locked to v5 token API. `latest-5` dist-tag is 5.29.3. Ships its own types (`es/index.d.ts`). No `@types/antd` needed |
| tsup | 8.5.1 | Library bundler | Zero-config, powered by esbuild 0.27 + Rollup 4 for tree-shaking. Native dual ESM+CJS output with `--format esm,cjs`. TypeScript dts generation with `--dts`. No plugin authoring needed |

### Supporting Libraries (Runtime / Peer)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @ant-design/icons | 5.6.x (via antd 5 transitive) | Antd icon set | Any component that uses antd built-in icons; do not bundle separately — antd declares it as a dep |
| @ant-design/cssinjs | 1.23.x (via antd 5 transitive) | CSS-in-JS engine | The runtime that powers antd v5 design tokens. Do NOT depend on it directly in library code — consume tokens only through antd's `theme` API |
| dayjs | 1.11.x | Date handling | Required peer when using antd DatePicker; list as peerDependency in package.json, do not bundle |
| recharts | 3.8.1 | Chart components | Production-stable React charting library that supports React 18/19. Use for the Charts portion of the admin suite. Declare as a peerDependency |

### Development Tools

| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| Storybook | 10.3.3 | Component docs + visual testing | v10 is now `latest`. Uses Vite as dev server. `@storybook/react-vite` is the framework package. `addon-essentials` does NOT exist in v10 — addons are bundled into the core `storybook` package |
| @storybook/react-vite | 10.3.3 | Storybook React+Vite framework | Replaces `@storybook/react` + `@storybook/builder-vite` split from v8. Accept Vite 5–8 |
| @storybook/addon-a11y | 10.3.3 | Accessibility audit in Storybook | Add to `.storybook/main.ts` addons array |
| @storybook/addon-docs | 10.3.3 | MDX docs + auto prop tables | Generates docs from JSDoc + TypeScript types |
| Vitest | 4.1.2 | Unit + integration testing | Requires Node >=20, Vite >=6. Fastest test runner for Vite-based projects. Replaces Jest for all new TS/React projects |
| @vitest/coverage-v8 | 4.1.2 | Code coverage | V8 native coverage; zero extra config beyond `coverage: { provider: 'v8' }` |
| @testing-library/react | 16.3.2 | React component testing | Pairs with Vitest; `jsdom` or `happy-dom` as environment |
| @testing-library/user-event | 14.6.1 | User interaction simulation | Use over `fireEvent` for realistic event chains |
| jsdom | 29.0.1 | DOM environment for Vitest | Set `environment: 'jsdom'` in vitest config |
| ESLint | 10.1.0 | Linting | v10 uses flat config only (`eslint.config.ts`) |
| typescript-eslint | 8.57.2 | TypeScript ESLint rules | Supports ESLint 8–10. Caps TS support at `<6.0.0` — another reason to stay on TS 5.x |
| eslint-plugin-react | 7.37.5 | React-specific lint rules | JSX detection, hooks rules |
| eslint-plugin-react-hooks | 7.0.1 | Hooks rules enforcement | Catches stale closures, missing deps |
| eslint-plugin-storybook | 10.3.3 | Story linting | Enforces CSF3 story format |
| Prettier | 3.8.1 | Code formatting | Required peer by storybook 10 |
| @changesets/cli | 2.30.0 | Versioning + changelog | Standard for npm library version management. Enables semantic versioning automation without manual CHANGELOG maintenance |
| size-limit | 12.0.1 | Bundle size CI guard | Prevents accidental bundle bloat. Run in CI to enforce per-export size budgets |
| np | 11.0.2 | npm publish workflow | Interactive publish helper: runs tests, bumps version, tags git, publishes. Alternative to manual `npm publish` if not using changesets |

## package.json Structure for npm Publishing

The `package.json` exports field is the critical piece for a dual ESM+CJS library:

```json
{
  "name": "gravity-components",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./theme": {
      "import": {
        "types": "./dist/theme/index.d.ts",
        "default": "./dist/theme/index.js"
      },
      "require": {
        "types": "./dist/theme/index.d.cts",
        "default": "./dist/theme/index.cjs"
      }
    }
  },
  "files": ["dist"],
  "sideEffects": false,
  "peerDependencies": {
    "antd": ">=5.0.0",
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0",
    "dayjs": ">=1.11.0"
  }
}
```

Key rules:
- `"type": "module"` makes `.js` files ESM by default. tsup outputs `.cjs` for CommonJS.
- `"sideEffects": false` enables tree-shaking in bundlers like webpack and Rollup.
- The `exports` field is the authoritative resolution map. Bundlers that respect it (webpack 5, Vite, Rollup) use it. The `main`/`module` fields are fallbacks for legacy tooling.
- `types` must point to generated `.d.ts`, and in the `require` condition it must be `.d.cts` (tsup generates both when `--dts` is used with dual format).
- `files: ["dist"]` keeps the published package clean.
- `antd` and React are `peerDependencies` — never `dependencies`. The consumer controls the antd version; bundling antd would create duplicate instances and break context/ConfigProvider.

## tsup Configuration

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    theme: 'src/theme/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ['react', 'react-dom', 'antd', 'dayjs'],
})
```

- `format: ['esm', 'cjs']` produces `.js` + `.cjs` pairs automatically.
- `dts: true` runs TypeScript compiler to emit `.d.ts` files (separate process from esbuild transpilation).
- `external` must list all peerDependencies — prevents tsup from bundling them.
- `clean: true` wipes `dist/` before each build.

## TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "jsx": "react-jsx",
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["dist", "node_modules", "**/*.stories.tsx", "**/*.test.tsx"]
}
```

Key choices:
- `"module": "NodeNext"` + `"moduleResolution": "NodeNext"` is the correct pair for a library that ships both ESM and CJS. tsup handles the actual output; this controls TypeScript's type checking behavior.
- `"verbatimModuleSyntax": true` enforces `import type` usage, preventing accidental value imports from type-only paths.
- `"isolatedModules": true` ensures each file is compilable in isolation, compatible with esbuild's transpile model.
- Stories and tests are excluded so they don't affect the library's type output.

## antd v5 Token API Usage Pattern

antd v5 theming works through `ConfigProvider`. The library wraps components with a shared ConfigProvider carrying the Gravity design tokens:

```typescript
// src/theme/GravityTheme.tsx
import { ConfigProvider, theme as antdTheme } from 'antd'
import type { ThemeConfig } from 'antd'

export const gravityTokens: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 6,
    // ... other global tokens
  },
  components: {
    Button: { borderRadius: 8 },
    // ... component-level overrides
  },
  algorithm: antdTheme.defaultAlgorithm,
}

export function GravityThemeProvider({ children, theme }: {
  children: React.ReactNode
  theme?: ThemeConfig
}) {
  return (
    <ConfigProvider theme={{ ...gravityTokens, ...theme }}>
      {children}
    </ConfigProvider>
  )
}
```

- Do NOT import from `@ant-design/cssinjs` directly — it is an implementation detail of antd's theming system.
- `ThemeConfig` is the correct type import for token configuration.
- The `algorithm` field switches between `defaultAlgorithm`, `darkAlgorithm`, and `compactAlgorithm`.
- Individual components re-export from antd with no style overrides beyond what the token system covers. This keeps the bundle clean.

## Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'  // Note: use @vitejs/plugin-react compatible with Vite 8

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
})
```

Note: `@vitejs/plugin-react` 6.0.1 requires Vite 8. Vitest 4.x requires Vite >=6. These are compatible.

## Installation

```bash
# Runtime peer dependencies (consumer installs these)
# antd, react, react-dom, dayjs are peerDeps — not installed in the library

# Build tooling
npm install -D tsup typescript@~5.8

# Storybook 10 (use the init command to scaffold)
npx storybook@latest init --type react --builder vite
# This installs: storybook, @storybook/react-vite, @storybook/addon-docs, @storybook/addon-a11y

# Testing
npm install -D vitest @vitest/coverage-v8 jsdom @testing-library/react @testing-library/user-event

# Linting
npm install -D eslint typescript-eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-storybook prettier

# Versioning + publishing
npm install -D @changesets/cli size-limit

# antd (install as devDependency in the library repo for Storybook and type checking)
npm install -D antd react react-dom @types/react @types/react-dom dayjs
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| tsup 8.x | Rollup 4 + plugins | When needing custom transform pipeline (e.g., SVG inlining, PostCSS). tsup is the right choice for a straightforward TS library; Rollup adds plugin maintenance overhead |
| tsup 8.x | Vite library mode | Vite lib mode works but requires more manual config for dual CJS/ESM with correct `.d.ts`. tsup handles this more cleanly for pure TS libraries |
| Vitest 4.x | Jest 29 | Jest is appropriate for projects that need jsdom-level compatibility with Node <20 or have heavy Babel transform chains. For a new Vite/TS library, Vitest is strictly faster and simpler |
| Storybook 10 | Storybook 8 | Use SB8 (v8 dist-tag) only if integration tooling explicitly does not support SB10 yet. SB10 is the stable `latest` as of 2026-03 |
| @changesets/cli | semantic-release | semantic-release is powerful but opinionated CI-first tool. Changesets gives more manual control, which is appropriate for a library where humans curate the changelog |
| ESLint 10 flat config | ESLint 8 + .eslintrc | ESLint 8 is EOL. Flat config is the only supported format in ESLint 9+. Do not start a new project on legacy config format |
| TypeScript ~5.8 | TypeScript 6.0 | TS 6.0 is stable on npm but `typescript-eslint` 8.x (the current release) explicitly caps support at `<6.0.0`. Starting on TS 6 today means broken linting |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Babel | Adds compilation overhead and config complexity. esbuild (used by tsup) is 10-100x faster for transpilation. No new React library needs Babel unless using Babel-specific transforms | esbuild via tsup |
| CRA / react-scripts | Not a library tool; CRA is for apps and is unmaintained | tsup for build |
| CSS Modules / styled-components | antd v5 is CSS-in-JS via `@ant-design/cssinjs`. Mixing in a second styling system creates specificity conflicts and doubles the runtime. The token API is the right styling surface | antd ConfigProvider token API |
| @emotion/react | Same conflict as above — antd v5 uses its own CSS-in-JS runtime, not emotion | antd token API |
| Lerna | Heavy monorepo tool. This project is a single-package library, not a monorepo. If sub-packages emerge later, changesets + npm workspaces is the modern approach | @changesets/cli |
| tsdx | Unmaintained (last release 2021). Was popular for TS library scaffolding but tsup has entirely replaced it | tsup |
| Jest 29 | Not wrong, but requires more config for ESM support and runs significantly slower than Vitest on esbuild/Vite-based projects | Vitest 4.x |

## Stack Patterns by Variant

**If adding a dark theme preset:**
- Add `algorithm: antdTheme.darkAlgorithm` to a second `ThemeConfig` export
- Do not ship separate CSS — the algorithm switch is handled at runtime by ConfigProvider
- Export as `./theme/dark` using the `exports` field in package.json

**If the library grows to multiple packages (e.g., `gravity-charts` split out):**
- Add npm workspaces to the root `package.json`
- Keep `@changesets/cli` — it has native workspace support
- Keep a single Storybook that imports across packages

**If consumers need SSR (Next.js App Router):**
- antd v5 has an official `@ant-design/nextjs-registry` package for SSR hydration
- The library itself does not need to change — the consumer wraps with the registry
- Mark this as out-of-scope for v1 (aligned with PROJECT.md)

**If recharts is too heavy for some consumers:**
- Structure the chart components as a separate export entry (`./charts`)
- Consumers who don't need charts import only from `gravity-components` root
- Declare recharts as an optional peerDependency with `peerDependenciesMeta`

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| antd@5.29.3 | react@>=16.9.0, @ant-design/cssinjs@^1.23.0 | v5 and v6 have different token APIs. This library is hard-locked to v5 |
| storybook@10.3.3 | vite@^5–8, react@^16.8–19 | `@storybook/react-vite` is the framework; `addon-essentials` does not exist in v10 (functionality merged into core) |
| vitest@4.1.2 | node@>=20, vite@^6–8 | Node 18 is NOT supported by Vitest 4. Ensure CI uses Node 20+ |
| typescript@~5.8 | typescript-eslint@^8.x | typescript-eslint 8.57.2 supports TS up to `<6.0.0`. Do not upgrade to TS 6.x until typescript-eslint releases TS 6 support |
| tsup@8.5.1 | typescript@>=4.5, esbuild@^0.27 | Bundles its own esbuild copy. Rollup 4 is used internally for tree-shaking in production builds |
| @testing-library/react@16.3.2 | react@^18 or ^19, react-dom@^18 or ^19 | v16 dropped React 17 support |
| recharts@3.8.1 | react@^16.8–19 | Stable for React 18/19 |

## Sources

- npm registry (registry.npmjs.org) — all version numbers verified against published metadata, 2026-03-30
  - tsup@8.5.1: esbuild@^0.27.0, rollup@^4.34.8, typescript peer >=4.5
  - antd@5.29.3: dist-tag `latest-5`, peerDeps react >=16.9.0
  - storybook@10.3.3: dist-tag `latest`; `addon-essentials` has no v10 release (confirmed by dist-tags)
  - @storybook/react-vite@10.3.3: peerDeps vite ^5–8, storybook ^10.3.3
  - vitest@4.1.2: engines node ^20||^22||>=24, vite ^6–8
  - typescript@6.0.2: dist-tag `latest`; typescript-eslint@8.57.2 peerDep caps at `<6.0.0`
  - typescript-eslint@8.57.2: peerDep `"typescript": ">=4.8.4 <6.0.0"` — HIGH confidence reason to pin TS 5.x
  - @ant-design/cssinjs@2.1.2: used by antd v6, NOT v5 (antd v5 uses ^1.23.0 internally)

---
*Stack research for: Gravity Components — React/antd v5 component library*
*Researched: 2026-03-30*
