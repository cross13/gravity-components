# Gravity Components

<p align="center">
  <a href="https://www.npmjs.com/package/@crosscode/gravity-components" title="Latest @crosscode/gravity-components on the npm registry">
    <img src="https://img.shields.io/npm/v/%40crosscode%2Fgravity-components?style=flat-square&logo=npm&logoColor=white&label=registry&color=cb3837" alt="npm package version" height="28" />
  </a>
  &nbsp;
  <a href="https://github.com/cross13/gravity-components/actions/workflows/ci.yml?query=branch%3Amain" title="CI on main: install, lint, test, library build (green = passing)">
    <img src="https://img.shields.io/github/actions/workflow/status/cross13/gravity-components/ci.yml?branch=main&style=flat-square&logo=githubactions&logoColor=white&label=ci" alt="CI workflow status on main" height="28" />
  </a>
  &nbsp;
  <a href="https://github.com/cross13/gravity-components/actions/workflows/release.yml?query=branch%3Amain" title="Release on main: Changesets version PR or npm publish (green = passing)">
    <img src="https://img.shields.io/github/actions/workflow/status/cross13/gravity-components/release.yml?branch=main&style=flat-square&logo=githubactions&logoColor=white&label=release" alt="Release workflow status on main" height="28" />
  </a>
</p>

<p align="center">
  <sub>
    <strong>Registry</strong> — live npm version ·
    <strong>CI</strong> — quality + build ·
    <strong>Release</strong> — ship to npm
    · <a href="docs/publishing.md">Publishing guide</a>
  </sub>
</p>

A drop-in, fully themed admin UI kit built on [Ant Design v6](https://ant.design/). Install from npm, wrap your app with `GravityProvider`, and use Storybook-documented components with Gravity’s admin preset and token model.

Internal layout and chrome for several components use [styled-components](https://styled-components.com/) (a **peer dependency**). Toasts use [Sonner](https://sonner.emilkowal.ski/) via `GravityToaster`, mounted by default inside `GravityProvider`.

## Installation

Peer dependencies (install these in your app; versions should satisfy the ranges below):

```bash
npm install @crosscode/gravity-components antd dayjs react react-dom sonner styled-components
```

Typical ranges (see `package.json` `peerDependencies` for the source of truth):

| Package             | Range   |
| ------------------- | ------- |
| `antd`              | `>=6 <7` |
| `react` / `react-dom` | `>=18` |
| `dayjs`             | `>=1.11` |
| `sonner`            | `>=2 <3` |
| `styled-components` | `>=6`   |

If you use Ant Design icons in props (for example `icon` on `Button`), also install `@ant-design/icons` in your project.

## Package exports

- **`@crosscode/gravity-components`** — components, hooks, and theme helpers (`GravityProvider`, `adminTheme`, `mergeTheme`, tokens, etc.).
- **`@crosscode/gravity-components/theme`** — the same theme surface only, for apps that want a lighter import path without pulling the full component bundle.

## Quick start

```tsx
import { GravityProvider, Button, Table } from '@crosscode/gravity-components'

function App() {
  return (
    <GravityProvider>
      <Button type="primary">Get started</Button>
    </GravityProvider>
  )
}
```

`GravityProvider` wraps Ant Design’s `ConfigProvider` with the admin theme, nests `antd`’s `App` (for static methods like `Modal.confirm` when needed), and mounts **`GravityToaster`** (Sonner) by default. To disable the toaster: `<GravityProvider toaster={false}>`.

## Theme customization

Override tokens while keeping the admin preset:

```tsx
import { GravityProvider } from '@crosscode/gravity-components'

<GravityProvider tokens={{ colorPrimary: '#7C3AED', borderRadius: 8 }}>
  <App />
</GravityProvider>
```

Or merge a full custom `ThemeConfig`:

```tsx
import { GravityProvider, adminTheme, mergeTheme } from '@crosscode/gravity-components'

const myTheme = mergeTheme(adminTheme, {
  token: { colorPrimary: '#059669' },
  components: { Button: { borderRadius: 12 } },
})

<GravityProvider theme={myTheme}>
  <App />
</GravityProvider>
```

Token types and defaults are exported as `GravityTokens` and `defaultTokens` from the main entry (and from `@crosscode/gravity-components/theme`).

## Components and APIs

Exported names match `src/index.ts`. Types are exported next to each component where applicable.

### Primitives

| Area        | Exports |
| ----------- | ------- |
| **Actions** | `Button` |
| **Inputs**  | `Input`, `Password`, `Search`, `TextArea` |
| **Pickers** | `Select`, `DatePicker`, `RangePicker` |
| **Forms**   | `Form`, `FormItem` |
| **Overlays** | `Modal`, `Drawer` |
| **Display** | `Tag`, `Badge` |
| **Typography** | `Typography`, `Text`, `Title`, `Paragraph`, `Link` |

### Layout

| Exports |
| ------- |
| `PageHeader`, `PageContainer` |

### Data display

| Exports |
| ------- |
| `Table`, `Card`, `StatCard` |

### Feedback and messaging

| Exports |
| ------- |
| `Alert`, `Empty`, `Spin`, `Skeleton` |
| `useNotification`, `useMessage` (Ant Design static helpers via `App`) |
| `GravityToaster`, `toast`, `useSonner` (Sonner; themed under `GravityProvider`) |

### Composites and enhanced

| Exports | Notes |
| ------- | ----- |
| `AppShell`, `Sidebar` | Application shell and sidebar navigation |
| `DataGrid` | Table with search, toolbar, and pagination patterns |
| `Upload`, `Dragger` | File upload wrappers |

## Development

```bash
npm run storybook      # Storybook dev server (port 6006)
npm run build          # Library build: ESM + CJS + declarations (tsup)
npm test               # Vitest
npm run lint           # ESLint (`src/`)
npm run build-storybook # Static Storybook into `storybook-static/`
```

Releases to npm are automated with Changesets and GitHub Actions; see [docs/publishing.md](docs/publishing.md) for the `NPM_TOKEN` secret and the version / publish flow.

## Requirements

- **React** 18 or newer (the repo is tested with React 19 in development).
- **Ant Design** 6.x.
- **TypeScript** is optional for consumers; the package ships `.d.ts` types.

## License

MIT
