import type { ThemeConfig } from 'antd'

/**
 * Deep-merge a base theme with consumer overrides.
 * Token-level and component-level overrides are merged separately.
 */
export function mergeTheme(base: ThemeConfig, overrides: ThemeConfig): ThemeConfig {
  return {
    ...base,
    ...overrides,
    token: {
      ...base.token,
      ...overrides.token,
    },
    components: {
      ...base.components,
      ...overrides.components,
    },
  }
}
