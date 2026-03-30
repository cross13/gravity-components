import type { ReactNode, CSSProperties } from 'react'
import type { MenuProps } from 'antd'

export type SidebarItem = NonNullable<MenuProps['items']>[number]

export interface SidebarProps {
  /** Menu items configuration */
  items: SidebarItem[]
  /** Currently selected menu key (controlled) */
  selectedKey?: string
  /** Sidebar collapse state (controlled). Omit for uncontrolled. */
  collapsed?: boolean
  /** Called when collapse state changes */
  onCollapse?: (collapsed: boolean) => void
  /** Called when a menu item is selected */
  onSelect?: (key: string) => void
  /** Logo element shown in the sidebar header */
  logo?: ReactNode
  /** Logo element shown when sidebar is collapsed */
  collapsedLogo?: ReactNode
  /** Sidebar width when expanded (default: 240) */
  width?: number
  /** Sidebar width when collapsed (default: 80) */
  collapsedWidth?: number
  style?: CSSProperties
  className?: string
}
