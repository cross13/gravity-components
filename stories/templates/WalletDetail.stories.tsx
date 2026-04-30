import type { Meta, StoryObj } from '@storybook/react'
import React, { useMemo, useState } from 'react'
import { Tag, Space } from 'antd'
import {
  DownloadOutlined,
  PlusOutlined,
  ShareAltOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons'
import { PageHeader } from '../../src/components/PageHeader'
import { PageContainer } from '../../src/components/PageContainer'
import { Button } from '../../src/components/Button'
import { StatCard } from '../../src/components/StatCard'
import { Table } from '../../src/components/Table'
import { AdvisorTotalTimelineWidget } from '../../src/components/widgets/AdvisorTotalTimelineWidget'
import {
  walletSummary,
  walletTimelineArs,
  holdings,
  movements,
  trades,
  results,
  formatCurrency,
  formatPercent,
  convertArsTo,
} from './walletDetailMocks'
import type {
  Currency,
  HoldingRow,
  MovementRow,
  MovementType,
  ResultRow,
  TradeRow,
  TradeSide,
} from './walletDetailMocks'
import {
  PageBackground,
  HeaderBadgeRow,
  ProfilePill,
  StatGrid,
  ChartSection,
  TabPanel,
  TabHeader,
  TabHeaderTitle,
  TabHeaderHint,
  TableScroll,
  Amount,
  Muted,
  TickerCell,
  TickerSymbol,
  TickerName,
  WeightBarTrack,
  WeightBarFill,
  WeightCell,
  WeightValue,
} from './WalletDetail.stories.styles'

const TAB_KEYS = ['resumen', 'movimientos', 'transacciones', 'resultados', 'posiciones'] as const
type TabKey = (typeof TAB_KEYS)[number]

const profileToneMap = {
  Conservadora: 'conservative',
  Moderada: 'moderate',
  Agresiva: 'aggressive',
} as const

const movementTypeLabel: Record<MovementType, string> = {
  deposit: 'Depósito',
  withdrawal: 'Retiro',
  'transfer-in': 'Transferencia entrante',
  'transfer-out': 'Transferencia saliente',
}

const tradeSideLabel: Record<TradeSide, { label: string; color: string }> = {
  buy: { label: 'Compra', color: 'blue' },
  sell: { label: 'Venta', color: 'gold' },
}

function holdingsColumns(currency: Currency) {
  return [
    {
      title: 'Activo',
      dataIndex: 'ticker',
      key: 'ticker',
      render: (_: unknown, row: HoldingRow) => (
        <TickerCell>
          <TickerSymbol>{row.ticker}</TickerSymbol>
          <TickerName>{row.name}</TickerName>
        </TickerCell>
      ),
    },
    {
      title: 'Clase',
      dataIndex: 'assetClass',
      key: 'assetClass',
      render: (v: string) => <Tag bordered={false}>{v}</Tag>,
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right' as const,
      render: (v: number) => v.toLocaleString('es-AR'),
    },
    {
      title: 'Precio mercado',
      dataIndex: 'marketPriceArs',
      key: 'price',
      align: 'right' as const,
      render: (v: number) => <Muted>{formatCurrency(v, currency)}</Muted>,
    },
    {
      title: 'Valor mercado',
      dataIndex: 'marketValueArs',
      key: 'value',
      align: 'right' as const,
      render: (v: number) => <Amount>{formatCurrency(v, currency)}</Amount>,
    },
    {
      title: 'Peso',
      dataIndex: 'weightPct',
      key: 'weight',
      width: 160,
      render: (v: number) => (
        <WeightCell>
          <WeightValue>{v.toFixed(1)}%</WeightValue>
          <WeightBarTrack>
            <WeightBarFill $pct={v} />
          </WeightBarTrack>
        </WeightCell>
      ),
    },
    {
      title: 'P&L no realizado',
      dataIndex: 'unrealizedPnlArs',
      key: 'pnl',
      align: 'right' as const,
      render: (_: unknown, row: HoldingRow) => {
        const tone = row.unrealizedPnlArs > 0 ? 'positive' : row.unrealizedPnlArs < 0 ? 'negative' : 'neutral'
        return (
          <Space size={4} direction="vertical" style={{ alignItems: 'flex-end' }}>
            <Amount $tone={tone}>{formatCurrency(row.unrealizedPnlArs, currency)}</Amount>
            <Muted>{formatPercent(row.unrealizedPnlPct)}</Muted>
          </Space>
        )
      },
    },
  ]
}

function movementsColumns(currency: Currency) {
  return [
    { title: 'Fecha', dataIndex: 'date', key: 'date' },
    {
      title: 'Referencia',
      dataIndex: 'reference',
      key: 'reference',
      render: (v: string) => <Muted>{v}</Muted>,
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (t: MovementType) => movementTypeLabel[t],
    },
    { title: 'Descripción', dataIndex: 'description', key: 'description' },
    {
      title: 'Importe',
      dataIndex: 'amountArs',
      key: 'amount',
      align: 'right' as const,
      render: (v: number) => (
        <Space size={6}>
          {v >= 0 ? (
            <ArrowUpOutlined style={{ color: '#0A6B47' }} />
          ) : (
            <ArrowDownOutlined style={{ color: '#A11717' }} />
          )}
          <Amount $tone={v >= 0 ? 'positive' : 'negative'}>{formatCurrency(v, currency)}</Amount>
        </Space>
      ),
    },
    {
      title: 'Saldo posterior',
      dataIndex: 'balanceAfterArs',
      key: 'balance',
      align: 'right' as const,
      render: (v: number) => <Muted>{formatCurrency(v, currency)}</Muted>,
    },
  ]
}

function tradesColumns(currency: Currency) {
  return [
    { title: 'Fecha', dataIndex: 'date', key: 'date' },
    {
      title: 'Referencia',
      dataIndex: 'reference',
      key: 'reference',
      render: (v: string) => <Muted>{v}</Muted>,
    },
    {
      title: 'Tipo',
      dataIndex: 'side',
      key: 'side',
      render: (s: TradeSide) => {
        const { label, color } = tradeSideLabel[s]
        return <Tag color={color}>{label}</Tag>
      },
    },
    { title: 'Activo', dataIndex: 'ticker', key: 'ticker' },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right' as const,
      render: (v: number) => v.toLocaleString('es-AR'),
    },
    {
      title: 'Precio',
      dataIndex: 'priceArs',
      key: 'price',
      align: 'right' as const,
      render: (v: number) => <Muted>{formatCurrency(v, currency)}</Muted>,
    },
    {
      title: 'Importe',
      dataIndex: 'amountArs',
      key: 'amount',
      align: 'right' as const,
      render: (v: number) => <Amount>{formatCurrency(v, currency)}</Amount>,
    },
    {
      title: 'Comisión',
      dataIndex: 'feeArs',
      key: 'fee',
      align: 'right' as const,
      render: (v: number) => <Muted>{formatCurrency(v, currency)}</Muted>,
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key: 'status',
      render: (s: TradeRow['status']) => (
        <Tag color={s === 'settled' ? 'success' : 'processing'}>
          {s === 'settled' ? 'Liquidado' : 'Pendiente'}
        </Tag>
      ),
    },
  ]
}

function resultsColumns(currency: Currency) {
  return [
    { title: 'Cierre', dataIndex: 'closedAt', key: 'closedAt' },
    {
      title: 'Activo',
      dataIndex: 'ticker',
      key: 'ticker',
      render: (_: unknown, row: ResultRow) => (
        <TickerCell>
          <TickerSymbol>{row.ticker}</TickerSymbol>
          <TickerName>{row.name}</TickerName>
        </TickerCell>
      ),
    },
    {
      title: 'Cantidad',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right' as const,
      render: (v: number) => v.toLocaleString('es-AR'),
    },
    {
      title: 'Costo',
      dataIndex: 'costArs',
      key: 'cost',
      align: 'right' as const,
      render: (v: number) => <Muted>{formatCurrency(v, currency)}</Muted>,
    },
    {
      title: 'Ingreso',
      dataIndex: 'proceedsArs',
      key: 'proceeds',
      align: 'right' as const,
      render: (v: number) => <Muted>{formatCurrency(v, currency)}</Muted>,
    },
    {
      title: 'Resultado realizado',
      dataIndex: 'realizedPnlArs',
      key: 'realized',
      align: 'right' as const,
      render: (_: unknown, row: ResultRow) => {
        const tone = row.realizedPnlArs > 0 ? 'positive' : row.realizedPnlArs < 0 ? 'negative' : 'neutral'
        return (
          <Space size={4} direction="vertical" style={{ alignItems: 'flex-end' }}>
            <Amount $tone={tone}>{formatCurrency(row.realizedPnlArs, currency)}</Amount>
            <Muted>{formatPercent(row.realizedPnlPct)}</Muted>
          </Space>
        )
      },
    },
    {
      title: 'Impuesto estimado',
      dataIndex: 'taxArs',
      key: 'tax',
      align: 'right' as const,
      render: (v: number) =>
        v === 0 ? <Muted>—</Muted> : <Muted>{formatCurrency(v, currency)}</Muted>,
    },
  ]
}

function ResumenPanel({ currency }: { currency: Currency }) {
  const topHoldings = useMemo(() => holdings.slice(0, 5), [])
  return (
    <TabPanel>
      <TabHeader>
        <div>
          <TabHeaderTitle>Resumen de posiciones</TabHeaderTitle>
          <TabHeaderHint>Top 5 posiciones por peso. Cambia a la solapa Posiciones para ver el detalle completo.</TabHeaderHint>
        </div>
        <Button icon={<DownloadOutlined />}>Descargar resumen</Button>
      </TabHeader>
      <TableScroll>
        <Table<HoldingRow>
          columns={holdingsColumns(currency)}
          dataSource={topHoldings}
          pagination={false}
          rowKey="key"
        />
      </TableScroll>
    </TabPanel>
  )
}

function MovimientosPanel({ currency }: { currency: Currency }) {
  return (
    <TabPanel>
      <TabHeader>
        <div>
          <TabHeaderTitle>Movimientos de cuenta</TabHeaderTitle>
          <TabHeaderHint>Depósitos, retiros y transferencias internas.</TabHeaderHint>
        </div>
        <Space>
          <Button icon={<DownloadOutlined />}>Exportar</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Nuevo movimiento
          </Button>
        </Space>
      </TabHeader>
      <TableScroll>
        <Table<MovementRow>
          columns={movementsColumns(currency)}
          dataSource={movements}
          pagination={{ pageSize: 10, showTotal: (t) => `${t} movimientos` }}
          rowKey="key"
        />
      </TableScroll>
    </TabPanel>
  )
}

function TransaccionesPanel({ currency }: { currency: Currency }) {
  return (
    <TabPanel>
      <TabHeader>
        <div>
          <TabHeaderTitle>Operaciones bursátiles</TabHeaderTitle>
          <TabHeaderHint>Compras y ventas con su comisión y estado de liquidación.</TabHeaderHint>
        </div>
        <Space>
          <Button icon={<DownloadOutlined />}>Exportar</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            Nueva operación
          </Button>
        </Space>
      </TabHeader>
      <TableScroll>
        <Table<TradeRow>
          columns={tradesColumns(currency)}
          dataSource={trades}
          pagination={{ pageSize: 10, showTotal: (t) => `${t} operaciones` }}
          rowKey="key"
        />
      </TableScroll>
    </TabPanel>
  )
}

function ResultadosPanel({ currency }: { currency: Currency }) {
  return (
    <TabPanel>
      <TabHeader>
        <div>
          <TabHeaderTitle>Resultados realizados</TabHeaderTitle>
          <TabHeaderHint>Posiciones cerradas en el período con resultado e impuesto estimado.</TabHeaderHint>
        </div>
        <Button icon={<DownloadOutlined />}>Exportar</Button>
      </TabHeader>
      <TableScroll>
        <Table<ResultRow>
          columns={resultsColumns(currency)}
          dataSource={results}
          pagination={{ pageSize: 10, showTotal: (t) => `${t} resultados` }}
          rowKey="key"
        />
      </TableScroll>
    </TabPanel>
  )
}

function PosicionesPanel({ currency }: { currency: Currency }) {
  return (
    <TabPanel>
      <TabHeader>
        <div>
          <TabHeaderTitle>Posiciones abiertas</TabHeaderTitle>
          <TabHeaderHint>Tenencias actuales con valor de mercado y resultado no realizado.</TabHeaderHint>
        </div>
        <Button icon={<DownloadOutlined />}>Exportar</Button>
      </TabHeader>
      <TableScroll>
        <Table<HoldingRow>
          columns={holdingsColumns(currency)}
          dataSource={holdings}
          pagination={false}
          rowKey="key"
        />
      </TableScroll>
    </TabPanel>
  )
}

function WalletDetailPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('resumen')
  const [currency, setCurrency] = useState<Currency>('ARS')

  const timelineData = useMemo(
    () =>
      walletTimelineArs.map((p) => ({ ...p, total: convertArsTo(p.total, currency) })),
    [currency],
  )

  const tabItems = [
    { key: 'resumen', label: 'Resumen' },
    { key: 'movimientos', label: 'Movimientos' },
    { key: 'transacciones', label: 'Transacciones' },
    { key: 'resultados', label: 'Resultados' },
    { key: 'posiciones', label: 'Posiciones' },
  ]

  const profileTone = profileToneMap[walletSummary.walletProfile]
  const pnlTone =
    walletSummary.unrealizedPnlArs > 0
      ? 'up'
      : walletSummary.unrealizedPnlArs < 0
        ? 'down'
        : 'neutral'

  return (
    <PageBackground>
      <PageContainer maxWidth={1440} padding={32}>
        <PageHeader
          breadcrumb={[
            { title: 'Inicio' },
            { title: 'Comercial' },
            { title: 'Clientes' },
            { title: walletSummary.clientName },
            { title: walletSummary.walletLabel },
          ]}
          onBack={() => undefined}
          title={
            <HeaderBadgeRow>
              <span>{walletSummary.walletLabel}</span>
              <ProfilePill $tone={profileTone}>{walletSummary.walletProfile}</ProfilePill>
            </HeaderBadgeRow>
          }
          subtitle={
            <span>
              {walletSummary.clientName} · Cuenta <strong>{walletSummary.accountId}</strong> ·
              Apertura {walletSummary.openedAt}
            </span>
          }
          actions={
            <>
              <Button icon={<ShareAltOutlined />}>Compartir</Button>
              <Button icon={<DownloadOutlined />}>Exportar</Button>
              <Button type="primary" icon={<PlusOutlined />}>
                Nueva operación
              </Button>
            </>
          }
          tabs={{
            items: tabItems,
            activeKey: activeTab,
            onChange: (k) => setActiveTab(k as TabKey),
          }}
        />

        <StatGrid>
          <StatCard
            label="Patrimonio total"
            value={formatCurrency(walletSummary.totalArs, currency)}
            trend="up"
            trendValue={`${formatPercent(walletSummary.ytdReturnPct)} YTD`}
            accentColor="linear-gradient(90deg, #003973, #0077FF)"
          />
          <StatCard
            label="Resultado no realizado"
            value={formatCurrency(walletSummary.unrealizedPnlArs, currency)}
            trend={pnlTone}
            trendValue={formatPercent(walletSummary.unrealizedPnlPct)}
            accentColor="linear-gradient(90deg, #00B67A, #34D399)"
          />
          <StatCard
            label="Rendimiento mensual"
            value={walletSummary.monthlyReturnPct.toFixed(2)}
            suffix="%"
            trend={walletSummary.monthlyReturnDeltaPct >= 0 ? 'up' : 'down'}
            trendValue={`${formatPercent(walletSummary.monthlyReturnDeltaPct)} vs prom.`}
            accentColor="linear-gradient(90deg, #00BBDD, #00D4FA)"
          />
          <StatCard
            label="Efectivo disponible"
            value={formatCurrency(walletSummary.cashAvailableArs, currency)}
            trend="neutral"
            trendValue={`${((walletSummary.cashAvailableArs / walletSummary.totalArs) * 100).toFixed(1)}% del total`}
            accentColor="linear-gradient(90deg, #F5A623, #FBBF24)"
          />
        </StatGrid>

        <ChartSection>
          <AdvisorTotalTimelineWidget
            data={timelineData}
            currency={currency}
            onCurrencyChange={setCurrency}
            viewerRole="advisor"
            advisorName={walletSummary.clientName}
            height={320}
          />
        </ChartSection>

        {activeTab === 'resumen' && <ResumenPanel currency={currency} />}
        {activeTab === 'movimientos' && <MovimientosPanel currency={currency} />}
        {activeTab === 'transacciones' && <TransaccionesPanel currency={currency} />}
        {activeTab === 'resultados' && <ResultadosPanel currency={currency} />}
        {activeTab === 'posiciones' && <PosicionesPanel currency={currency} />}
      </PageContainer>
    </PageBackground>
  )
}

const meta: Meta = {
  title: 'Templates/Wallet Detail',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    backgrounds: { default: 'canvas', values: [{ name: 'canvas', value: '#f0f3f7' }] },
    docs: {
      description: {
        component:
          'Detail page template for an investment wallet. Composes PageHeader (with back, breadcrumb, tabs, actions), ' +
          'a StatCard summary row, the AdvisorTotalTimelineWidget evolution chart with ARS/USD toggle, and tabbed ' +
          'panels for Resumen / Movimientos / Transacciones / Resultados / Posiciones.',
      },
    },
  },
}

export default meta

export const Cartera: StoryObj = {
  name: 'Cartera del cliente',
  render: () => <WalletDetailPage />,
}
