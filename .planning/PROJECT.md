# Gravity Components

## What This Is

Gravity Components is a React 18+ component library built on top of Ant Design (antd), published to npm. It applies a custom design system on top of antd's token API, ships a full admin-panel component suite (forms, tables, charts, uploads, sidebars, data grids), and exports a built-in "admin" theme preset that end users can import directly. Consumers can also customize it with their own brand tokens.

## Core Value

A drop-in, fully themed admin UI kit that teams can install from npm, apply their brand in minutes, and have Storybook-documented components ready to use — no design system expertise required.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Built on antd as the base component layer
- [ ] Custom visual theme (design tokens) applied over antd's ConfigProvider
- [ ] Full admin component suite: Button, Input, Select, Table, Modal, Form, Typography, Layout, Charts, DatePicker, Upload, Notifications, Sidebar, DataGrid
- [ ] Theme customization via design token system (colors, spacing, typography, border-radius, shadows)
- [ ] Built-in "admin" theme preset shipped as an importable package export
- [ ] Storybook integration for all components with interactive docs
- [ ] Full TypeScript support with strict types and exported token type definitions
- [ ] Published to npm as a public/private package

### Out of Scope

- React 16/17 compatibility — React 18+ only to leverage concurrent features
- CSS-variable runtime theming — design token approach is simpler and sufficient for v1
- Server-side rendering (SSR) specific optimizations — v1 is client-side focus
- Mobile-specific components — admin panels are desktop-first

## Context

- Ant Design v5 introduced a CSS-in-JS token system (`theme.token`, `theme.components`) via ConfigProvider — this is the theming hook we build on
- The library wraps/re-exports antd components with the custom theme baked in, not forking or reimplementing them
- Storybook 8+ supports React 18 and CSF3 stories natively
- The "admin" theme is the flagship preview — built using the ui-ux-pro-max skill to produce a modern, solid admin aesthetic (dark sidebar, neutral body, strong typography hierarchy)
- Rollup or tsup for bundling, ESM + CJS dual output

## Constraints

- **Tech Stack**: antd v5 — locked to v5's token system
- **React**: 18+ only — no legacy lifecycle support
- **Bundler**: tsup (zero-config, supports ESM+CJS dual output, TypeScript out of the box)
- **Styling**: antd CSS-in-JS (no external CSS files to ship) — keeps tree-shaking clean
- **TypeScript**: Strict mode — all public APIs must be typed

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use antd v5 ConfigProvider + token API for theming | Avoids patching antd internals; leverages official theming surface | — Pending |
| tsup over Rollup for bundling | Zero-config, handles TypeScript and dual ESM/CJS output without plugins | — Pending |
| Ship admin theme as a preset export (not just a demo) | Gives immediate value to consumers; differentiates from "just a wrapper" | — Pending |
| Storybook as the primary documentation surface | Industry standard for component libraries; no custom docs site needed in v1 | — Pending |

---
*Last updated: 2026-03-30 after initialization*
