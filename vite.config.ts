import react from '@vitejs/plugin-react'
import { defineConfig, lazyPlugins } from 'vite-plus'

// Single Vite+ config: tests, lint and formatting. Storybook also reads it.
// The library build itself is handled separately (see the `build` script).
// https://viteplus.dev/config/
export default defineConfig({
  plugins: lazyPlugins(() => [react()]),
})
