import type { CSSProperties } from 'react'
import type { DashboardCurrency, DashboardViewerRole } from '../dashboardTypes'

/** Visual accent for each row (optional; defaults by index in the widget). */
export type WalletStatisticTone = 'conservative' | 'moderate' | 'aggressive' | 'neutral'

export interface WalletStatisticRow {
  /** Unique key for React lists. */
  id: string
  /** Risk / profile name, e.g. Conservadora, Moderada, Agresiva. */
  profileLabel: string
  /** Bucket denomination label, e.g. Pesos, Dólar. */
  denominationLabel: string
  /** Number of accounts in this wallet bucket. */
  accountCount: number
  /** Total invested, already in the active `currency` from your backend. */
  totalAmount: number
  tone?: WalletStatisticTone
}

export interface WalletStatisticsWidgetProps {
  rows: WalletStatisticRow[]
  currency: DashboardCurrency
  onCurrencyChange?: (currency: DashboardCurrency) => void
  viewerRole: DashboardViewerRole
  advisorName?: string
  className?: string
  style?: CSSProperties
}
