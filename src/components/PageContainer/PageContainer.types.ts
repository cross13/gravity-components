import type { ReactNode, CSSProperties } from 'react'

export interface PageContainerProps {
  children: ReactNode
  /** Max width of the content area (default: 1200) */
  maxWidth?: number
  /** Padding around the content (default: 24) */
  padding?: number
  style?: CSSProperties
  className?: string
}
