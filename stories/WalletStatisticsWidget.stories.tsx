import type { Meta, StoryObj } from '@storybook/react'
import React, { useMemo, useState } from 'react'
import type { DashboardCurrency } from '../src/components/widgets/dashboardTypes'
import {
  WalletStatisticsWidget,
  type WalletStatisticRow,
} from '../src/components/widgets/WalletStatisticsWidget'

const meta: Meta<typeof WalletStatisticsWidget> = {
  title: 'Widgets/Dashboard',
  component: WalletStatisticsWidget,
  parameters: {
    layout: 'padded',
  },
}

export default meta

const walletsAdminArs: WalletStatisticRow[] = [
  {
    id: 'cv-ars',
    profileLabel: 'Conservadora',
    denominationLabel: 'Pesos',
    accountCount: 20,
    totalAmount: 10_000_000,
    tone: 'conservative',
  },
  {
    id: 'md-ars',
    profileLabel: 'Moderada',
    denominationLabel: 'Pesos',
    accountCount: 12,
    totalAmount: 233_330_000,
    tone: 'moderate',
  },
  {
    id: 'ag-usd',
    profileLabel: 'Agresiva',
    denominationLabel: 'Dólar',
    accountCount: 8,
    totalAmount: 1_850_000_000,
    tone: 'aggressive',
  },
  {
    id: 'md-usd',
    profileLabel: 'Moderada',
    denominationLabel: 'Dólar',
    accountCount: 15,
    totalAmount: 920_000_000,
    tone: 'neutral',
  },
]

const walletsAdvisorArs: WalletStatisticRow[] = [
  {
    id: 'a1',
    profileLabel: 'Conservadora',
    denominationLabel: 'Pesos',
    accountCount: 6,
    totalAmount: 2_400_000,
    tone: 'conservative',
  },
  {
    id: 'a2',
    profileLabel: 'Moderada',
    denominationLabel: 'Pesos',
    accountCount: 4,
    totalAmount: 18_500_000,
    tone: 'moderate',
  },
  {
    id: 'a3',
    profileLabel: 'Agresiva',
    denominationLabel: 'Dólar',
    accountCount: 3,
    totalAmount: 410_000_000,
    tone: 'aggressive',
  },
]

function mockConvertWalletRows(
  rows: WalletStatisticRow[],
  to: DashboardCurrency,
): WalletStatisticRow[] {
  if (to === 'ARS') return rows
  const rate = 1 / 1420
  return rows.map((r) => ({ ...r, totalAmount: Math.round(r.totalAmount * rate) }))
}

function WalletStatsWithToggle({
  baseRowsArs,
  viewerRole,
  advisorName,
}: {
  baseRowsArs: WalletStatisticRow[]
  viewerRole: 'admin' | 'advisor'
  advisorName?: string
}) {
  const [currency, setCurrency] = useState<DashboardCurrency>('ARS')
  const rows = useMemo(() => mockConvertWalletRows(baseRowsArs, currency), [baseRowsArs, currency])

  return (
    <WalletStatisticsWidget
      rows={rows}
      currency={currency}
      onCurrencyChange={setCurrency}
      viewerRole={viewerRole}
      advisorName={advisorName}
    />
  )
}

export const EstadisticasCarteraAdmin: StoryObj<typeof WalletStatisticsWidget> = {
  name: 'Estadísticas por cartera — Admin',
  render: () => <WalletStatsWithToggle baseRowsArs={walletsAdminArs} viewerRole="admin" />,
}

export const EstadisticasCarteraAsesor: StoryObj<typeof WalletStatisticsWidget> = {
  name: 'Estadísticas por cartera — Asesor',
  render: () => (
    <WalletStatsWithToggle
      baseRowsArs={walletsAdvisorArs}
      viewerRole="advisor"
      advisorName="Lucía Fernández"
    />
  ),
}

export const EstadisticasCarteraSoloARS: StoryObj<typeof WalletStatisticsWidget> = {
  name: 'Estadísticas por cartera — Solo ARS',
  args: {
    rows: walletsAdminArs,
    currency: 'ARS',
    viewerRole: 'admin',
  },
}

export const EstadisticasCarteraVacio: StoryObj<typeof WalletStatisticsWidget> = {
  name: 'Estadísticas por cartera — Sin datos',
  args: {
    rows: [],
    currency: 'ARS',
    viewerRole: 'advisor',
    advisorName: 'Pedro Ruiz',
  },
}
