# Pitfalls Research

**Domain:** React component library built on Ant Design v5
**Researched:** 2026-03-30
**Confidence:** MEDIUM (training data + known antd v5 ecosystem patterns; web verification denied)

## Critical Pitfalls

### Pitfall 1: Shipping antd as a Bundled Dependency Instead of a Peer Dependency

**What goes wrong:**
tsup (or any bundler) inlines the entire antd package into the library output when `antd` is not declared as an `external`. The consumer's app ends up with two copies of antd — one from their own `node_modules` and one inside the library bundle. This causes style conflicts, token mismatches, duplicate React Context trees, and massively inflated bundle sizes (antd alone is ~2MB unminified).

**Why it happens:**
New library authors configure tsup with `--dts` and forget to pass `--external antd` or list `antd` in `peerDependencies` in `package.json`. tsup's default is to bundle everything it finds imported.

**How to avoid:**
- Declare `antd`, `react`, `react-dom`, and `@ant-design/icons` in `peerDependencies`, NOT `dependencies`.
- In `tsup.config.ts`, set `external: ['react', 'react-dom', 'antd', '@ant-design/icons', '@ant-design/cssinjs']` explicitly.
- Add `devDependencies` entries for the same packages so local dev and Storybook work.
- Use `peerDependenciesMeta` to mark optional peer deps if applicable.

**Warning signs:**
- `npm pack` output is >500KB for a thin wrapper library.
- Consumer app logs React context warnings about multiple instances.
- Theme tokens applied inside the library don't reflect consumer's `ConfigProvider`.
- `import { Button } from 'gravity-components'` includes antd styles even when tree-shaking is expected.

**Phase to address:**
Phase 1 (Project scaffolding / bundler setup) — must be locked in before any component is written.

---

### Pitfall 2: Double ConfigProvider — Consumer and Library Nesting Conflicts

**What goes wrong:**
The library wraps every component in its own `ConfigProvider` with the admin theme tokens. When the consumer also wraps their app in `ConfigProvider` (for their brand tokens), one of two bad outcomes occurs: (a) the library's inner `ConfigProvider` wins everywhere and consumer overrides are silently ignored, or (b) the consumer's outer `ConfigProvider` overwrites library defaults, breaking the admin theme.

**Why it happens:**
antd v5's `ConfigProvider` merges tokens via React context inheritance. An inner `ConfigProvider` deepMerges with the outer one — but this only works if the library provides a `ConfigProvider` that intentionally composes with an outer one, not one that hard-codes a complete `theme` object. Developers often test in isolation (only their provider) and miss the composed case.

**How to avoid:**
- Export the admin theme as a plain token object (`adminTheme`) rather than wrapping all components in a hard-coded `ConfigProvider`.
- Provide a `GravityProvider` wrapper component that accepts `theme` as a prop and merges it with the admin default using `deepmerge` or spread: `theme={{ ...adminTheme, ...consumerTheme }}`.
- Document explicitly that consumers must use `GravityProvider` as the outermost provider, not nest it inside their own `ConfigProvider`.
- Test the `GravityProvider` in Storybook with an outer `ConfigProvider` with different brand tokens to validate merge behavior.

**Warning signs:**
- Consumer reports that passing `theme` prop to `ConfigProvider` has no effect on library components.
- Library's default colors bleed into non-library components in the consumer's app.
- Token values logged from `useToken()` differ inside vs. outside library components.

**Phase to address:**
Phase 1 (Theming architecture) — decide the provider strategy before building any themed components.

---

### Pitfall 3: CSS-in-JS Style Injection Order Causing Specificity Conflicts

**What goes wrong:**
antd v5 uses `@ant-design/cssinjs` (Emotion-like runtime style injection) which inserts `<style>` tags into `<head>` at render time. When a consumer's app also uses another CSS-in-JS library (e.g., Emotion, styled-components, MUI), or has global CSS resets, injection order becomes non-deterministic. Antd styles may be inserted after or before global styles, causing visual regressions that are hard to reproduce.

**Why it happens:**
antd v5's CSS-in-JS injects based on component first-render order, not import order. This is fine in a single-app context, but in a library where the consumer's app has its own styles, the insertion point is not controlled.

**How to avoid:**
- Instruct consumers to always place `GravityProvider` at the top of the React tree so antd styles inject before any child library styles.
- Document that `StyleProvider` from `@ant-design/cssinjs` can be used to control injection target (e.g., `StyleProvider container={shadowRoot}` for web components, or `StyleProvider hashPriority="high"` for specificity boosting).
- For Storybook, add a decorator that wraps stories in the `GravityProvider` to ensure consistent injection.
- Do NOT ship any global CSS resets in the library — only token-based styles via `ConfigProvider`.

**Warning signs:**
- antd button styles appear unstyled in consumer apps that have a CSS reset applied via `<link>` before React mounts.
- Storybook stories look correct but consumer app looks broken.
- Styles flicker on first render in SSR-adjacent setups (hydration).

**Phase to address:**
Phase 1 (Theming architecture) and Phase 3 (Storybook setup) — provider wrapper and Storybook decorator must both be correct.

---

### Pitfall 4: TypeScript Declaration Files Not Exported Correctly

**What goes wrong:**
The library ships `index.js` and `index.cjs` but consumers get `Module '"gravity-components"' has no exported member 'X'` or `Could not find a declaration file for module 'gravity-components'`. The types exist on disk but aren't wired up in `package.json`.

**Why it happens:**
`package.json` `exports` field with `types` condition requires specific ordering. TypeScript resolvers (depending on `moduleResolution` mode) look for types differently. Common mistakes: (1) `"types"` field pointing to wrong path, (2) `exports` missing the `"types"` condition entirely, (3) tsup's `--dts` output goes to `dist/index.d.ts` but `package.json` points to `dist/types/index.d.ts`.

**How to avoid:**
Use this exact `package.json` exports pattern for dual CJS/ESM with types:
```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./theme": {
      "types": "./dist/theme.d.ts",
      "import": "./dist/theme.js",
      "require": "./dist/theme.cjs"
    }
  }
}
```
- Set `"moduleResolution": "bundler"` or `"node16"` in `tsconfig.json` and verify consumer can resolve.
- Run `npx @arethetypeswrong/cli` (attw) on the packed tarball to verify all entrypoints resolve correctly before publishing.
- Add `"files": ["dist"]` to exclude source files from the published package.

**Warning signs:**
- TypeScript errors in consumer apps referencing library types.
- `tsc --noEmit` passes in the library but fails in consumer.
- `require()` works but `import` doesn't (or vice versa).
- `attw` reports "masquerading as CJS" or "missing exports" errors.

**Phase to address:**
Phase 2 (Build pipeline) — validated with `attw` before any component is considered "done."

---

### Pitfall 5: antd Icon Package Not Externalized — Bundle Size Explosion

**What goes wrong:**
`@ant-design/icons` contains ~800 SVG icons, totaling ~1MB+ when bundled. If not externalized, the entire icon set ships inside the library even if only a few icons are used.

**Why it happens:**
Developers externalize `antd` but forget `@ant-design/icons`, which is a separate package that antd itself depends on but does not re-export cleanly. It also has tree-shaking issues in certain bundler configurations.

**How to avoid:**
- Add `@ant-design/icons` to both `peerDependencies` and the `external` array in `tsup.config.ts`.
- Only use named icon imports (`import { SettingOutlined } from '@ant-design/icons'`) — never import the barrel `import * from '@ant-design/icons'`.
- Verify with `npx bundlephobia` or `source-map-explorer` on a consumer test app after publishing.

**Warning signs:**
- `npm pack` tarball is larger than 1MB for a thin wrapper.
- `source-map-explorer` in a consumer app shows `@ant-design/icons` inside `gravity-components` chunk.

**Phase to address:**
Phase 2 (Build pipeline) — checked in the same pass as peer dependency configuration.

---

### Pitfall 6: Storybook Cannot Resolve antd Themes Without a Decorator

**What goes wrong:**
Stories render antd components without any `ConfigProvider` wrapping, so components render with antd's default theme instead of the admin theme. The Storybook preview looks completely wrong, undermining the whole documentation purpose. Worse, token-based customization cannot be tested interactively.

**Why it happens:**
Storybook 8 renders stories in isolation. Without a global decorator that wraps every story in `GravityProvider`, the admin tokens are never applied. Developers often add the decorator to individual stories rather than globally, creating inconsistent docs.

**How to avoid:**
- Add a global decorator in `.storybook/preview.tsx` that wraps all stories in `GravityProvider`:
  ```tsx
  export const decorators = [
    (Story) => (
      <GravityProvider>
        <Story />
      </GravityProvider>
    ),
  ];
  ```
- Export `parameters.backgrounds` presets that match the admin theme's dark sidebar and neutral body background.
- Test by running a story for a component that uses a custom token (e.g., primary color) and verifying it differs from antd default blue.

**Warning signs:**
- Storybook shows antd default blue (`#1677ff`) instead of the admin theme primary color.
- Modal/Drawer stories have no backdrop.
- `useToken()` returns default antd values inside stories.

**Phase to address:**
Phase 3 (Storybook setup) — the global decorator is the first thing to configure before writing any stories.

---

### Pitfall 7: Token Override Specificity — `theme.components` vs `theme.token` Confusion

**What goes wrong:**
Developers put everything in `theme.token` (global design tokens) but some component-level overrides require `theme.components.Button.colorPrimary` etc. When the global token is overridden but the component-level token is also set (by antd's internal defaults), the global override has no effect on that component.

**Why it happens:**
antd v5's token system has two tiers: (1) global tokens (`theme.token`) which are the "seed" and (2) component-level tokens (`theme.components`) which override per-component. Component tokens take precedence over global tokens. If a consumer's `ConfigProvider` sets `theme.components.Button.colorPrimary`, it wins over the library's `theme.token.colorPrimary`. This cascading is not obvious.

**How to avoid:**
- Map ALL design tokens in the admin theme explicitly at both global and component level where needed. Do not rely on "antd will derive it from the global token."
- Use `theme.algorithm` (e.g., `theme.darkAlgorithm`) carefully — it recalculates many derived tokens and may override hand-set values unexpectedly.
- Document which tokens the admin theme sets and at which tier, so consumers know what is safe to override vs. what will break the admin aesthetic.
- Test each component in isolation after every token change, not just the `Button`.

**Warning signs:**
- Changing `token.colorPrimary` updates most components but `Alert` or `Tag` still shows the old color.
- The admin theme's `Table` header color is correct in isolation but changes when wrapped in a consumer's `ConfigProvider`.
- `useToken()` returns the expected global token but the rendered color is different (component-level override is winning).

**Phase to address:**
Phase 1 (Theming architecture) — establish the full token map before building components. Revisit in Phase 2 (component implementation) for each component.

---

### Pitfall 8: Peer Dependency Version Range Too Narrow or Too Loose

**What goes wrong:**
Too narrow (`"antd": "5.14.2"` exact): consumers on `antd@5.15.0` get `ERESOLVE` install errors. Too loose (`"antd": ">=4"`): consumers on antd v4 install the library and get runtime crashes because the token API doesn't exist in v4.

**Why it happens:**
Developers copy the exact version they tested with (too narrow) or use `>=` to be "safe" (too loose). Neither is correct for a library that relies on a specific API surface.

**How to avoid:**
Use a `^` range anchored to the minimum antd v5 version where the APIs you use were stable:
```json
"peerDependencies": {
  "antd": "^5.0.0",
  "react": "^18.0.0",
  "react-dom": "^18.0.0"
}
```
- Pin your internal `devDependencies` to the latest minor you've tested: `"antd": "5.x.x"`.
- Add `peerDependenciesMeta` for any truly optional peer deps.
- In CI, test against the minimum peer dep version and the latest version separately.

**Warning signs:**
- Consumer installs report version conflict warnings even for minor antd updates.
- `npm install` fails with `ERESOLVE` for new antd patch releases.

**Phase to address:**
Phase 2 (Build pipeline / npm publishing setup) — set peer dep ranges before first publish. Never change them without a semver bump.

---

### Pitfall 9: Missing or Broken `sideEffects` Field Breaks Tree-Shaking

**What goes wrong:**
Without `"sideEffects": false` in `package.json`, bundlers (webpack, Vite, Rollup) cannot tree-shake unused exports from the library. Consumers importing one component get the entire library in their bundle. Conversely, setting `"sideEffects": false` incorrectly (when there ARE side effects) causes CSS or style injection code to be dropped, breaking component rendering.

**Why it happens:**
antd v5's CSS-in-JS means styles are injected as a side effect of rendering (not as static CSS imports), so in theory there are no CSS file side-effects. However, if any module in the library does something like registering globals or patching prototypes at module load time, `"sideEffects": false` will silently drop it.

**How to avoid:**
- Because this library uses antd's CSS-in-JS (no imported `.css` files), `"sideEffects": false` is safe and should be set.
- Never perform side effects at module-load time in any library file (no `console.log`, no prototype patches, no global registrations outside of React components).
- Verify tree-shaking works by creating a consumer test app that imports only `Button` and running `rollup-plugin-visualizer` or Vite's `--analyze` to confirm only `Button`-related code is in the bundle.

**Warning signs:**
- Consumer test app bundle size does not decrease when fewer components are imported.
- `rollup-plugin-visualizer` shows the entire `gravity-components` module even when only one component is used.

**Phase to address:**
Phase 2 (Build pipeline) — set `sideEffects` as part of `package.json` configuration. Verify with a consumer test before first publish.

---

### Pitfall 10: Storybook + antd Theme Token Controls Not Wired

**What goes wrong:**
Storybook's Controls addon can expose theme tokens as interactive knobs (e.g., let users pick a primary color and see how it affects components). Without this, Storybook is only a static gallery and loses most of its value for demonstrating theme customization — which is a core selling point of this library.

**Why it happens:**
Theme token integration with Storybook Controls requires intentional setup: a global story arg for `theme`, a decorator that reads it and passes to `GravityProvider`, and a `argTypes` configuration for each token. This is non-trivial and is often skipped in the initial setup.

**How to avoid:**
- Create a `theme` global story arg in `.storybook/preview.tsx` with argTypes for key tokens (primary color, border radius, font size base).
- The global decorator reads `args.theme` and merges it into `GravityProvider`'s `theme` prop.
- Add a dedicated "Theme Playground" story that shows all components reacting to token changes simultaneously.
- This is a documented pattern in the Storybook ecosystem (globals + decorator pattern).

**Warning signs:**
- Stories have no Controls for theme tokens.
- Changing a token requires editing source code and restarting Storybook.
- The "admin theme" preset can't be demonstrated interactively.

**Phase to address:**
Phase 3 (Storybook setup) — wire globals before writing individual component stories.

---

### Pitfall 11: Publishing Without Testing the Packed Artifact

**What goes wrong:**
The library works perfectly in development (via `npm link` or monorepo workspace) but breaks for real consumers. Common failure: `package.json` `exports` map references a file path that exists locally but isn't in the published `files` list. Consumer gets `Cannot find module 'gravity-components/theme'`.

**Why it happens:**
`npm publish` only ships files listed in `"files"` in `package.json`. Everything else is excluded. Developers test with the raw workspace, which has all files available, not the packed artifact.

**How to avoid:**
- Always run `npm pack --dry-run` before every publish. Review the file list output.
- Run `npx @arethetypeswrong/cli ./gravity-components-x.y.z.tgz` on the packed tarball to validate all exports resolve.
- In CI, add a step that: packs the tarball, installs it into a fresh consumer test project, and runs `tsc --noEmit` + a smoke import test.
- Use `publint` (`npx publint`) to catch common `package.json` publishing mistakes before shipping.

**Warning signs:**
- Consumer reports `Cannot find module` for a specific import that works in dev.
- `package.json` `exports` has subpaths that aren't in the `files` array.
- TypeScript types resolve in the workspace but not after `npm install`.

**Phase to address:**
Phase 4 (npm publishing) — the CI publish pipeline must include pack-and-test before every release.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Wrapping every antd component in a new component with `forwardRef` only where needed later | Faster initial build | Consumers can't pass `ref` to components that need it (form inputs, modals); breaking change to add later | Never — add `forwardRef` from the start for all form-control and focusable components |
| Hard-coding color values instead of using `theme.token` | Simpler component code | Colors don't respond to consumer theme overrides; dark mode won't work | Never for any color that should be brand-configurable |
| Exporting components without prop type documentation (`/** */` JSDoc) | Faster authoring | Storybook ArgTable and IDE tooltips are empty; consumers have no discoverability | Acceptable in spike/prototype phase only, never in published release |
| Skipping `displayName` on wrapped/anonymous components | Trivial to skip | React DevTools and error stack traces show `Unknown` or `Wrapper` | Never — one line per component |
| Using `any` for complex antd prop pass-through types | Avoids complex generics | TypeScript consumers lose autocomplete for those props | Acceptable only in internal implementation types, never on public API |
| Bundling all components into one entry point initially | Simpler build | Prevents effective tree-shaking for consumers importing just one component | Acceptable in v1 if `sideEffects: false` is set and bundler can tree-shake barrel exports |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| antd `Form` + custom input components | Forgetting to forward `value`, `onChange`, `onBlur` from `Form.Item` via `React.cloneElement` or the `Form.Item` `getValueFromEvent` API | Implement the `Form` value/onChange contract explicitly; test with `Form.Item` `rules` to verify validation triggers |
| antd `Modal` + `z-index` in Storybook | Default antd Modal `z-index` (1000+) conflicts with Storybook's panel overlays | Add `getContainer={() => document.getElementById('storybook-root')!}` to Modal in stories, or configure antd's `Modal.config` globally in preview |
| `@ant-design/charts` (AntV G2) as optional component | Bundling `@ant-design/charts` inflates library by 1MB+ | Treat charts as a separate optional entry point (`gravity-components/charts`), not part of the main barrel |
| Storybook 8 + `@storybook/react-vite` + antd CSS-in-JS | Vite dev server HMR invalidates antd CSS-in-JS cache on every hot reload, causing flash-of-unstyled-content | Add antd's Vite plugin (`vite-plugin-top-level-await` may be needed) or configure `StyleProvider` with a stable hash key in Storybook preview |
| Consumer using Next.js (App Router) | antd v5 CSS-in-JS requires client-side render; App Router defaults to RSC | Consumer must add `'use client'` to any component that uses `GravityProvider` — document this prominently |
| TypeScript strict mode in consumer with `moduleResolution: node` | Library's `exports` map is ignored by old `node` resolution; types don't resolve | Document that consumers must use `moduleResolution: bundler` or `node16`/`nodenext` — list this as a peer requirement |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| antd CSS-in-JS generating new class hashes on every render | Micro-stutters, excessive style tag churn in DevTools, high style recalculation in profiler | Never create theme objects inline inside JSX (`theme={{ token: { ... } }}`); define theme objects outside components or memoize with `useMemo` | Any component that re-renders frequently (form fields, table rows) |
| Barrel export importing everything at module init | Consumer's initial JS parse time increases even for small imports | Use named exports with proper tree-shaking; ensure `sideEffects: false`; consider sub-path exports for heavy components | At moderate consumer app scale — noticeable on mobile devices with slow parse times |
| antd `Table` without `virtual` prop on large datasets | Browser freeze at 500+ rows | Always document `virtual` prop usage for data grids; consider wrapping with `virtual` enabled by default in `DataGrid` component | At 200+ rows without virtualization |
| Creating `ConfigProvider`-wrapped components as class components or without memoization | Entire subtree re-renders on every parent render | Use `React.memo` on all exported components; test with React DevTools Profiler | With complex admin panel layouts that update frequently |

---

## "Looks Done But Isn't" Checklist

- [ ] **Types:** Consumer can import and use all exported types without any `@ts-ignore` — verify by running `tsc --noEmit` in a fresh consumer project pointing at the packed tarball
- [ ] **Tree-shaking:** Importing only `Button` from the library produces a consumer bundle that does NOT include `Table`, `Form`, or other unused components — verify with `rollup-plugin-visualizer`
- [ ] **Theme merging:** A consumer's `ConfigProvider` with a different `colorPrimary` correctly overrides the admin default — verify visually with a consumer test app
- [ ] **Peer dep resolution:** Installing the library with the minimum declared peer dep versions (e.g., `antd@5.0.0`) succeeds without warnings — test in a fresh `npm` environment
- [ ] **All exports resolve:** Every entry in `package.json` `exports` returns the correct type and runtime module — verify with `@arethetypeswrong/cli` and `publint`
- [ ] **Storybook admin theme:** Every story visually reflects the admin theme (not antd defaults) on first load without manual configuration
- [ ] **`ref` forwarding:** Form controls and focusable elements accept and forward `ref` — verify with a consumer test that focuses an input via ref
- [ ] **No global CSS:** The library ships zero CSS files — verify the `dist/` folder contains only `.js`, `.cjs`, `.d.ts` files
- [ ] **Icons externalized:** The packed tarball does NOT contain `@ant-design/icons` source — verify with `npm pack --dry-run` and tarball inspection
- [ ] **displayName set:** All components show correct names in React DevTools — verify by inspecting the component tree in a consumer app

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| antd bundled (not peer dep) | HIGH | Re-configure tsup externals, rebuild, republish as patch. Consumer must reinstall. May require deduplication in consumer with `npm dedupe`. |
| ConfigProvider nesting conflict | MEDIUM | Introduce `GravityProvider` as a new top-level export, deprecate any internal wrapping, republish. Consumer migration is a one-line change but requires communication. |
| Broken TypeScript exports | MEDIUM | Fix `package.json` exports map and tsup `dts` config, republish. Consumers may need to clear TypeScript cache (`tsc --build --clean`). |
| Wrong `sideEffects` value dropping styles | HIGH | Styles silently break in consumer production builds only (dev uses different bundling). Hard to detect. Fix requires republish and consumer rebuild. |
| Wrong peer dep version range | LOW-MEDIUM | Republish with corrected range. Consumers on mismatched versions must update. No code changes needed if API is compatible. |
| Storybook missing global decorator | LOW | Add decorator to `preview.tsx`, restart Storybook. Only affects docs appearance, not library correctness. |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| antd bundled as dependency | Phase 1: Scaffolding + Build Pipeline | `npm pack` tarball < 100KB; `source-map-explorer` shows no antd in bundle |
| Double ConfigProvider conflicts | Phase 1: Theming Architecture | Consumer test app with competing `ConfigProvider` — verify token merging |
| CSS-in-JS injection order | Phase 1: Theming Architecture + Phase 3: Storybook | Stories look correct; consumer app with CSS reset looks correct |
| TypeScript declaration files | Phase 2: Build Pipeline | `attw` reports no errors on packed tarball |
| Icon package not externalized | Phase 2: Build Pipeline | Tarball inspection; bundle size check |
| Storybook missing decorator | Phase 3: Storybook Setup | Every story shows admin theme colors, not antd defaults |
| Token specificity (`token` vs `components`) | Phase 1-2: Theme + Components | Per-component visual regression test after token changes |
| Peer dep version ranges | Phase 2: npm Publishing Setup | CI test matrix against min and max peer dep versions |
| `sideEffects` field | Phase 2: Build Pipeline | Tree-shaking verification in consumer test app |
| Storybook token Controls | Phase 3: Storybook Setup | Theme Playground story works with interactive token controls |
| Publishing without testing artifact | Phase 4: npm Publishing | CI pack-and-test step passes before every `npm publish` |
| `ref` forwarding gaps | Phase 2: Component Implementation | Consumer test with `ref` on every form control |

---

## Sources

- Ant Design v5 official documentation (theming, ConfigProvider, CSS-in-JS, SSR) — training data, MEDIUM confidence
- tsup documentation on externals and dual CJS/ESM output — training data, MEDIUM confidence
- `@arethetypeswrong/cli` (attw) — known tool for validating TypeScript package exports, HIGH confidence
- `publint` — known npm publishing linter, HIGH confidence
- Storybook 8 globals and decorators pattern — HIGH confidence (established pattern)
- antd v5 token system two-tier hierarchy (global vs. component tokens) — HIGH confidence (core antd v5 design)
- antd GitHub issues: double ConfigProvider, icon bundle size, SSR hydration — MEDIUM confidence (training data patterns)
- Community discussions on antd + Next.js App Router compatibility — MEDIUM confidence

---
*Pitfalls research for: React component library on Ant Design v5 (Gravity Components)*
*Researched: 2026-03-30*
