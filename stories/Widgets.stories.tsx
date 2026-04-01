import type { Meta, StoryObj } from '@storybook/react'
import React, { useMemo, useState } from 'react'
import {
  AdvisorTotalTimelineWidget,
  type AdvisorTotalTimelinePoint,
  type DashboardCurrency,
} from '../src/components/widgets/AdvisorTotalTimelineWidget'
import { adminTimelineArs, advisorTimelineArs } from './mocks/timelineStoryData'

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
