import type { CSSProperties, ReactNode } from 'react'
import type { DropdownProps } from 'antd'

export interface UserMenuLanguage {
  /** Language code, e.g. "en". Used as the value in callbacks. */
  code: string
  /** Short label shown in the switch, e.g. "EN". */
  label: string
}

export interface UserMenuItem {
  /** Stable key — used as React key and passed to `onSelect`. */
  key: string
  /** Row label. */
  label: ReactNode
  /** Leading icon. */
  icon?: ReactNode
  /** Per-item click handler (also receives the key via `onSelect`). */
  onClick?: () => void
  /** Render in the danger (red) tone. */
  danger?: boolean
  /** Trailing element (badge, shortcut hint). */
  extra?: ReactNode
  /** Render a divider above this item. */
  divider?: boolean
}

export interface UserMenuLabels {
  /** Label above the language switch. Default: "Language". */
  language?: string
  /** Logout button text. Default: "Sign out". */
  logout?: string
}

export interface UserMenuProps {
  /** Display name. */
  name: string
  /** Secondary line in the panel header (commonly an email). */
  email?: ReactNode
  /** Role / permission label, shown as a pill. */
  role?: ReactNode
  /**
   * Avatar source: an image URL, or any node (e.g. an `<Avatar>`). When omitted,
   * initials are derived from `name` (or `initials`) over a brand gradient.
   */
  avatar?: ReactNode
  /** Explicit initials fallback. Defaults to the first letters of `name`. */
  initials?: string
  /**
   * Avatar background — any CSS background value (color or gradient).
   * Defaults to the brand gradient for initials, or a neutral placeholder
   * behind an image.
   */
  avatarBackground?: string
  /** Avatar foreground color (initials / icon). Default: white. */
  avatarColor?: string

  /** Custom menu rows (profile, settings, billing…). */
  items?: UserMenuItem[]
  /** Fired when a custom item is selected. */
  onSelect?: (key: string) => void

  /** Show the EN/ES language switch. Default: true. */
  showLanguageSwitch?: boolean
  /** Languages offered in the switch. Default: EN + ES. */
  languages?: UserMenuLanguage[]
  /** Controlled selected language code. */
  language?: string
  /** Initial language code when uncontrolled. Defaults to the first language. */
  defaultLanguage?: string
  /** Fired when the language changes. */
  onLanguageChange?: (code: string) => void

  /** Show the logout button. Default: true. */
  showLogout?: boolean
  /** Fired when logout is pressed. */
  onLogout?: () => void

  /** Show name + role next to the avatar in the trigger. Default: true. */
  showText?: boolean

  /** Controlled open state. */
  open?: boolean
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean
  /** Fired when the menu opens or closes. */
  onOpenChange?: (open: boolean) => void

  /** Dropdown placement. Default: "bottomRight". */
  placement?: DropdownProps['placement']
  /** Panel width in px. Default: 280. */
  width?: number

  /** Override copy for i18n. */
  labels?: UserMenuLabels

  className?: string
  style?: CSSProperties
}
