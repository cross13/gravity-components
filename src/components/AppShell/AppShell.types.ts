import type { ReactNode, CSSProperties } from 'react'

export interface AppShellProps {
  /** Sidebar element (typically <Sidebar />) */
  sidebar?: ReactNode
  /** Header content */
  header?: ReactNode
  /** Main content area */
  children: ReactNode
  /** Style overrides for the content area */
  contentStyle?: CSSProperties
  /** Style overrides for the header */
  headerStyle?: CSSProperties
  style?: CSSProperties
  className?: string
}
