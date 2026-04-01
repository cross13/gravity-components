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
  external: [
    'react',
    'react-dom',
    'antd',
    '@ant-design/icons',
    '@ant-design/cssinjs',
    'dayjs',
    'sonner',
    'styled-components',
    'recharts',
  ],
  splitting: false,
})
