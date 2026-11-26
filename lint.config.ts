import type { ViteUserConfig } from 'vite-plus'

// Oxlint rules, migrated from the former eslint.config.js (typescript-eslint
// recommended + React hooks). Kept in its own file so vite.config.ts stays
// readable.
export const lint: ViteUserConfig['lint'] = {
  plugins: ['typescript', 'react'],
  categories: {
    correctness: 'error',
  },
  env: {
    builtin: true,
    browser: true,
    node: true,
  },
  ignorePatterns: ['dist', 'storybook-static', 'coverage', '.storybook', '.planning'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/rules-of-hooks': 'error',
    'react/exhaustive-deps': 'warn',
    'typescript/no-empty-object-type': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'vite-plus/prefer-vite-plus-imports': 'error',
    // Reported by Oxlint but never by the former ESLint setup (GVT-3). Kept as
    // warnings until the affected components are reworked; back to 'error' then.
    'react/set-state-in-effect': 'warn',
    'react/refs': 'warn',
  },
  overrides: [
    {
      // Stories were outside the former `eslint src/` run. Storybook `render`
      // functions legitimately call hooks from non-component functions.
      files: ['stories/**'],
      rules: {
        'react/rules-of-hooks': 'off',
        'no-unsafe-optional-chaining': 'warn',
      },
    },
  ],
  jsPlugins: [
    {
      name: 'vite-plus',
      specifier: 'vite-plus/oxlint-plugin',
    },
  ],
}
