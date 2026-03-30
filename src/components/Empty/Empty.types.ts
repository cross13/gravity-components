import type { EmptyProps as AntEmptyProps } from 'antd'
import type { ReactNode } from 'react'

export interface EmptyProps extends AntEmptyProps {
  /** Custom action element */
  action?: ReactNode
  /** Quick action button text */
  actionText?: string
  /** Callback for the quick action button */
  onAction?: () => void
}
