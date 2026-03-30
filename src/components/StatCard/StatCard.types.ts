import type { ReactNode, CSSProperties } from 'react'

export interface StatCardProps {
  /** Label displayed above the value */
  label: string
  /** The main KPI value */
  value: ReactNode
  /** Trend direction indicator */
  trend?: 'up' | 'down' | 'neutral'
  /** Trend text (e.g., "+12.5% from last month") */
  trendValue?: string
  /** Optional sparkline or mini chart (accepts any ReactNode) */
  sparkline?: ReactNode
  /** Prefix text before the value (e.g., "$") */
  prefix?: string
  /** Suffix text after the value (e.g., "%") */
  suffix?: string
  /** Gradient or solid color for the 3px top accent bar */
  accentColor?: string
  style?: CSSProperties
  className?: string
}
