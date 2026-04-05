import type { ReactNode, CSSProperties } from 'react'
import type { BreadcrumbProps, TabsProps } from 'antd'

export interface PageHeaderProps {
  /** Page title */
  title: ReactNode
  /** Secondary description below the title */
  subtitle?: ReactNode
  /** Breadcrumb items array */
  breadcrumb?: BreadcrumbProps['items']
  /** Action elements rendered to the right of the title */
  actions?: ReactNode
  /** Callback for back button — renders an arrow button when provided */
  onBack?: () => void
  /** Tabs rendered at the bottom of the header */
  tabs?: TabsProps
  style?: CSSProperties
  className?: string
}
