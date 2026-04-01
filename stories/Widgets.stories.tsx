import type { Meta, StoryObj } from '@storybook/react'
import React, { useMemo, useState } from 'react'
import {
  AdvisorTotalTimelineWidget,
  type AdvisorTotalTimelinePoint,
  type DashboardCurrency,
} from '../src/components/widgets/AdvisorTotalTimelineWidget'

const meta: Meta<typeof AdvisorTotalTimelineWidget> = {
  title: 'Widgets/Dashboard',
  component: AdvisorTotalTimelineWidget,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Widgets para tableros. Los totales y el alcance de clientes (admin vs asesor) deben resolverse en el backend; el componente solo muestra la serie ya filtrada y el formato de moneda.',
      },
    },
  },
  argTypes: {
    currency: { control: 'inline-radio', options: ['ARS', 'USD'] },
    viewerRole: { control: 'inline-radio', options: ['admin', 'advisor'] },
  },
}

export default meta

const adminTimelineArs: AdvisorTotalTimelinePoint[] = [
  { period: 'Ene', total: 42_800_000 },
  { period: 'Feb', total: 44_200_000 },
  { period: 'Mar', total: 43_100_000 },
  { period: 'Abr', total: 46_500_000 },
  { period: 'May', total: 48_900_000 },
  { period: 'Jun', total: 47_200_000 },
  { period: 'Jul', total: 51_000_000 },
  { period: 'Ago', total: 52_400_000 },
  { period: 'Sep', total: 50_800_000 },
  { period: 'Oct', total: 54_200_000 },
  { period: 'Nov', total: 55_600_000 },
  { period: 'Dic', total: 56_900_000 },
]

const advisorTimelineArs: AdvisorTotalTimelinePoint[] = [
  { period: 'Ene', total: 8_200_000 },
  { period: 'Feb', total: 8_450_000 },
  { period: 'Mar', total: 8_100_000 },
  { period: 'Abr', total: 8_900_000 },
  { period: 'May', total: 9_200_000 },
  { period: 'Jun', total: 8_950_000 },
  { period: 'Jul', total: 9_600_000 },
  { period: 'Ago', total: 9_850_000 },
  { period: 'Sep', total: 9_400_000 },
  { period: 'Oct', total: 10_100_000 },
  { period: 'Nov', total: 10_350_000 },
  { period: 'Dic', total: 10_500_000 },
]

/** Rough mock FX for Storybook only — real apps fetch USD series from the API. */
function mockConvertSeries(
  points: AdvisorTotalTimelinePoint[],
  to: DashboardCurrency,
): AdvisorTotalTimelinePoint[] {
  if (to === 'ARS') return points
  const rate = 1 / 1420
  return points.map((p) => ({ ...p, total: Math.round(p.total * rate) }))
}

function TimelineWithCurrencyToggle({
  baseDataArs,
  viewerRole,
  advisorName,
}: {
  baseDataArs: AdvisorTotalTimelinePoint[]
  viewerRole: 'admin' | 'advisor'
  advisorName?: string
}) {
  const [currency, setCurrency] = useState<DashboardCurrency>('ARS')
  const data = useMemo(() => mockConvertSeries(baseDataArs, currency), [baseDataArs, currency])

  return (
    <AdvisorTotalTimelineWidget
      data={data}
      currency={currency}
      onCurrencyChange={setCurrency}
      viewerRole={viewerRole}
      advisorName={advisorName}
    />
  )
}

export const AdminTodosLosClientes: StoryObj<typeof AdvisorTotalTimelineWidget> = {
  name: 'Línea del tiempo — Admin (todos los clientes)',
  render: () => (
    <TimelineWithCurrencyToggle baseDataArs={adminTimelineArs} viewerRole="admin" />
  ),
}

export const AdvisorSusClientes: StoryObj<typeof AdvisorTotalTimelineWidget> = {
  name: 'Línea del tiempo — Asesor (sus clientes)',
  render: () => (
    <TimelineWithCurrencyToggle
      baseDataArs={advisorTimelineArs}
      viewerRole="advisor"
      advisorName="María López"
    />
  ),
}

export const SoloARS: StoryObj<typeof AdvisorTotalTimelineWidget> = {
  name: 'Línea del tiempo — Solo ARS (sin toggle)',
  args: {
    data: adminTimelineArs,
    currency: 'ARS',
    viewerRole: 'admin',
  },
}

export const SoloUSD: StoryObj<typeof AdvisorTotalTimelineWidget> = {
  name: 'Línea del tiempo — Solo USD (sin toggle)',
  args: {
    data: mockConvertSeries(adminTimelineArs, 'USD'),
    currency: 'USD',
    viewerRole: 'advisor',
    advisorName: 'Carlos Pérez',
  },
}
