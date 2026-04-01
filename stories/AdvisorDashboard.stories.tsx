import type { Meta, StoryObj } from '@storybook/react'
import React, { useMemo, useState } from 'react'
import type { DashboardCurrency } from '../src/components/widgets/dashboardTypes'
import { AdvisorTotalTimelineWidget } from '../src/components/widgets/AdvisorTotalTimelineWidget'
import type { AdvisorTotalTimelinePoint } from '../src/components/widgets/AdvisorTotalTimelineWidget'
import { WalletStatisticsWidget } from '../src/components/widgets/WalletStatisticsWidget'
import type { WalletStatisticRow } from '../src/components/widgets/WalletStatisticsWidget'
import { TopClientsWidget } from '../src/components/widgets/TopClientsWidget'
import type { TopClientRow } from '../src/components/widgets/TopClientsWidget'
import * as S from './AdvisorDashboard.stories.styles'
import { advisorTimelineArs } from './mocks/timelineStoryData'

const ADVISOR_NAME = 'María López'

const walletsAdvisorArs: WalletStatisticRow[] = [
  {
    id: 'a1',
    profileLabel: 'Conservadora',
    denominationLabel: 'Pesos',
    accountCount: 6,
    totalAmount: 24_000_000,
    tone: 'conservative',
  },
  {
    id: 'a2',
    profileLabel: 'Moderada',
    denominationLabel: 'Pesos',
    accountCount: 4,
    totalAmount: 185_000_000,
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

const advisorTopClients: TopClientRow[] = [
  {
    id: '1',
    firstName: 'Martín',
    lastName: 'García',
    email: 'm.garcia@email.com',
    walletLabel: 'Agresiva — Dólar',
    amountArs: 218_000_000,
    amountUsd: 153_521,
  },
  {
    id: '2',
    firstName: 'Sofía',
    lastName: 'Fernández',
    email: 'sofia.fernandez@empresa.com.ar',
    walletLabel: 'Moderada — Pesos',
    amountArs: 142_000_000,
    amountUsd: 100_000,
  },
  {
    id: '3',
    firstName: 'Ricardo',
    lastName: 'Becerra',
    email: 'rbecerra@gmail.com',
    walletLabel: 'Conservadora — Pesos',
    amountArs: 98_050_000,
    amountUsd: 69_119,
  },
  {
    id: '4',
    firstName: 'Camila',
    lastName: 'López',
    email: 'camila.lopez@outlook.com',
    walletLabel: 'Moderada — Dólar',
    amountArs: 61_200_000,
    amountUsd: 43_100,
  },
  {
    id: '5',
    firstName: 'Juan',
    lastName: 'Martínez',
    email: 'jmartinez@instituto.org',
    walletLabel: 'Agresiva — Pesos',
    amountArs: 44_500_000,
    amountUsd: 31_338,
  },
  {
    id: '6',
    firstName: 'Valentina',
    lastName: 'Ruiz',
    email: 'v.ruiz@mail.com',
    walletLabel: 'Conservadora — Dólar',
    amountArs: 39_800_000,
    amountUsd: 28_028,
  },
  {
    id: '7',
    firstName: 'Diego',
    lastName: 'Acosta',
    email: 'dacosta@empresa.com',
    walletLabel: 'Moderada — Pesos',
    amountArs: 31_240_000,
    amountUsd: 22_000,
  },
  {
    id: '8',
    firstName: 'Lucía',
    lastName: 'Herrera',
    email: 'lucia.herrera@pm.me',
    walletLabel: 'Moderada — Pesos',
    amountArs: 28_900_000,
    amountUsd: 20_352,
  },
  {
    id: '9',
    firstName: 'Federico',
    lastName: 'Núñez',
    email: 'fnunez@yahoo.com.ar',
    walletLabel: 'Conservadora — Pesos',
    amountArs: 20_100_000,
    amountUsd: 14_155,
  },
  {
    id: '10',
    firstName: 'Paula',
    lastName: 'Domínguez',
    email: 'paula.dominguez@live.com',
    walletLabel: 'Agresiva — Dólar',
    amountArs: 17_850_000,
    amountUsd: 12_570,
  },
]

function mockConvertSeries(
  points: AdvisorTotalTimelinePoint[],
  to: DashboardCurrency,
): AdvisorTotalTimelinePoint[] {
  if (to === 'ARS') return points
  const rate = 1 / 1420
  return points.map((p) => ({ ...p, total: Math.round(p.total * rate) }))
}

function mockConvertWalletRows(
  rows: WalletStatisticRow[],
  to: DashboardCurrency,
): WalletStatisticRow[] {
  if (to === 'ARS') return rows
  const rate = 1 / 1420
  return rows.map((r) => ({ ...r, totalAmount: Math.round(r.totalAmount * rate) }))
}

function AdvisorDashboardPanel() {
  const [currency, setCurrency] = useState<DashboardCurrency>('ARS')
  const timelineData = useMemo(() => mockConvertSeries(advisorTimelineArs, currency), [currency])
  const walletRows = useMemo(() => mockConvertWalletRows(walletsAdvisorArs, currency), [currency])

  return (
    <S.PageRoot>
      <S.Content>
        <S.TopAccent aria-hidden />
        <S.Header>
          <S.HeaderLead>
            <S.PageTitle>Panel del asesor</S.PageTitle>
            <S.PageSubtitle>
              Vista consolidada de evolución de patrimonio, distribución por cartera y principales
              clientes. Los datos reflejan únicamente tu cartera asignada.
            </S.PageSubtitle>
          </S.HeaderLead>
          <S.HeaderRight>
            <S.DatePill>31 mar 2026 · Mercados abiertos</S.DatePill>
            <S.CurrencySegmented
              value={currency}
              onChange={(v) => setCurrency(v as DashboardCurrency)}
              options={[
                { label: 'Pesos (ARS)', value: 'ARS' },
                { label: 'Dólares (USD)', value: 'USD' },
              ]}
            />
          </S.HeaderRight>
        </S.Header>

        <S.TimelineSection>
          <S.SectionHint>Evolución</S.SectionHint>
          <AdvisorTotalTimelineWidget
            data={timelineData}
            currency={currency}
            viewerRole="advisor"
            advisorName={ADVISOR_NAME}
            height={340}
          />
        </S.TimelineSection>

        <S.LowerGrid>
          <S.WalletColumn>
            <S.SectionHint>Distribución</S.SectionHint>
            <WalletStatisticsWidget
              rows={walletRows}
              currency={currency}
              viewerRole="advisor"
              advisorName={ADVISOR_NAME}
            />
          </S.WalletColumn>
          <S.ClientsColumn>
            <S.SectionHint>Ranking</S.SectionHint>
            <TopClientsWidget
              clients={advisorTopClients}
              viewerRole="advisor"
              advisorName={ADVISOR_NAME}
              maxItems={10}
            />
          </S.ClientsColumn>
        </S.LowerGrid>
      </S.Content>
    </S.PageRoot>
  )
}

const meta: Meta = {
  title: 'Dashboard/Asesor',
  parameters: {
    layout: 'fullscreen',
    embedBrowserFrame: false,
    controls: { disable: true },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#e4eaf2' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    docs: {
      description: {
        story:
          'Composición de ejemplo para un asesor: línea del tiempo, estadísticas por cartera y top clientes, con un único control de moneda en el encabezado (ARS/USD).',
      },
    },
  },
}

export default meta

export const PanelCompleto: StoryObj = {
  name: 'Panel completo',
  render: () => <AdvisorDashboardPanel />,
}
