import react from '@vitejs/plugin-react'
import { defineConfig, lazyPlugins } from 'vite-plus'

import { lint } from './lint.config'

// Single Vite+ config: tests, lint and formatting. Storybook also reads it.
// The library build itself is handled separately (see the `build` script).
// https://viteplus.dev/config/
export default defineConfig({
  plugins: lazyPlugins(() => [react()]),
  lint,
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 2,
    arrowParens: 'always',
    sortPackageJson: false,
    // Only code is formatted: docs, generated files and static assets are left alone.
    ignorePatterns: [
      'dist',
      'storybook-static',
      'coverage',
      '.planning',
      '.changeset',
      '**/*.md',
      '**/*.html',
      'package-lock.json',
    ],
  },
  test: {
    passWithNoTests: true,
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
})
