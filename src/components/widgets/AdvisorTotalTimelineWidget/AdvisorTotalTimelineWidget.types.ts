import type { CSSProperties } from 'react'
import type { DashboardCurrency, DashboardViewerRole } from '../dashboardTypes'

export type { DashboardCurrency, DashboardViewerRole } from '../dashboardTypes'

/** One point on the timeline; `total` is in the active currency (your API supplies scoped totals). */
export interface AdvisorTotalTimelinePoint {
  /** X-axis label (e.g. month name or ISO date). */
  period: string
  /** Aggregated total for that period (all accessible clients). */
  total: number
}

export interface AdvisorTotalTimelineWidgetProps {
  /** Series to plot; must already reflect admin vs advisor client scope from your backend. */
  data: AdvisorTotalTimelinePoint[]
  /** Display and format amounts in pesos or dollars. */
  currency: DashboardCurrency
  /** When set with `currency`, shows a segmented control and calls back on change. */
  onCurrencyChange?: (currency: DashboardCurrency) => void
  /** Drives the scope description: all clients vs this advisor’s book. */
  viewerRole: DashboardViewerRole
  /** Required when `viewerRole` is `advisor` for a clear subtitle. */
  advisorName?: string
  /** Chart height in pixels. */
  height?: number
  className?: string
  style?: CSSProperties
}
