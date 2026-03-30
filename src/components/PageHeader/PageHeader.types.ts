import type { ReactNode, CSSProperties } from 'react'
import type { BreadcrumbProps } from 'antd'

export interface PageHeaderProps {
  /** Page title */
  title: ReactNode
  /** Breadcrumb items array */
  breadcrumb?: BreadcrumbProps['items']
  /** Action elements rendered to the right of the title */
  actions?: ReactNode
  style?: CSSProperties
  className?: string
}
