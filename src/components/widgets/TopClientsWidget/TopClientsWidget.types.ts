import type { CSSProperties } from 'react'
import type { DashboardViewerRole } from '../dashboardTypes'

export interface TopClientRow {
  id: string
  firstName: string
  lastName: string
  email: string
  /** Cartera asignada, ej. "Moderada — Pesos". */
  walletLabel: string
  amountArs: number
  amountUsd: number
}

export interface TopClientsWidgetProps {
  /** Lista ya ordenada por criterio de negocio (típicamente mayor saldo). */
  clients: TopClientRow[]
  /** Máximo de filas (por defecto 10). */
  maxItems?: number
  viewerRole: DashboardViewerRole
  advisorName?: string
  className?: string
  style?: CSSProperties
}
