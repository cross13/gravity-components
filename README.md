# Gravity Components

A drop-in, fully themed admin UI kit built on [Ant Design v5](https://ant.design/). Install from npm, apply your brand in minutes, and get Storybook-documented components ready to use.

## Installation

```bash
npm install gravity-components antd react react-dom dayjs
```

## Quick Start

```tsx
import { GravityProvider, Button, Table, adminTheme } from 'gravity-components'

function App() {
  return (
    <GravityProvider>
      <Button type="primary">Get Started</Button>
    </GravityProvider>
  )
}
```

## Theme Customization

Override any token while keeping the admin defaults:

```tsx
import { GravityProvider } from 'gravity-components'

<GravityProvider tokens={{ colorPrimary: '#7C3AED', borderRadius: 8 }}>
  <App />
</GravityProvider>
```

Or merge a full custom theme:

```tsx
import { GravityProvider, adminTheme, mergeTheme } from 'gravity-components'

const myTheme = mergeTheme(adminTheme, {
  token: { colorPrimary: '#059669' },
  components: { Button: { borderRadius: 12 } },
})

<GravityProvider theme={myTheme}>
  <App />
</GravityProvider>
```

## Components

### Primitives
Button, Input, Select, DatePicker, Form, Modal, Drawer, Tag, Badge, Typography

### Layout
AppShell, Sidebar, PageHeader, PageContainer

### Data Display
Table, Card, StatCard

### Feedback
Alert, Empty, Spin, Skeleton, useNotification, useMessage

### Enhanced
DataGrid (Table + search + toolbar + pagination), Upload, Dragger

## Development

```bash
npm run storybook    # Launch Storybook on port 6006
npm run build        # Build with tsup (ESM + CJS + .d.ts)
npm test             # Run tests with Vitest
npm run lint         # Lint with ESLint
```

## Requirements

- React 18+
- Ant Design 5.x
- TypeScript (recommended, strict types included)

## License

MIT
