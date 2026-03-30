import { ConfigProvider, App } from 'antd'
import type { ThemeConfig } from 'antd'
import type { ReactNode } from 'react'
import { GravityToaster } from '../components/Toaster/GravityToaster'
import type { GravityToasterProps } from '../components/Toaster/GravityToaster'
import { adminTheme } from './presets/admin'
import type { GravityTokens } from './tokens/global'

export interface GravityProviderProps {
  /** Built-in preset name or a raw antd ThemeConfig */
  theme?: 'admin' | ThemeConfig
  /** Token overrides merged on top of the resolved theme */
  tokens?: Partial<GravityTokens>
  /**
   * Themed Sonner toaster. `true` (default) mounts {@link GravityToaster}, `false` omits it,
   * or pass props to customize position, duration, etc.
   */
  toaster?: boolean | Omit<GravityToasterProps, 'ref'>
  children: ReactNode
}

function renderToaster(
  toaster: GravityProviderProps['toaster'],
): ReactNode {
  if (toaster === false) return null
  const props = toaster === true || toaster === undefined ? {} : toaster
  return <GravityToaster {...props} />
}

export function GravityProvider({
  theme = 'admin',
  tokens,
  toaster,
  children,
}: GravityProviderProps) {
  const base = theme === 'admin' ? adminTheme : theme
  const resolved: ThemeConfig = tokens
    ? {
        ...base,
        token: { ...base.token, ...tokens },
      }
    : base

  return (
    <ConfigProvider theme={resolved}>
      <App>
        {children}
        {renderToaster(toaster)}
      </App>
    </ConfigProvider>
  )
}
