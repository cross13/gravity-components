import type { Meta, StoryObj } from '@storybook/react'
import React, { useCallback, useMemo, useState } from 'react'
import type { Dayjs } from 'dayjs'
import { Tag, Space, Dropdown } from 'antd'
import {
  PlusOutlined,
  DownloadOutlined,
  MoreOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  UserOutlined,
  TeamOutlined,
  WalletOutlined,
  CheckCircleOutlined,
  TagOutlined,
  CalendarOutlined,
  AppstoreOutlined,
} from '@ant-design/icons'
import { PageHeader } from '../../src/components/PageHeader'
import { PageContainer } from '../../src/components/PageContainer'
import { Button } from '../../src/components/Button'
import { DataGrid } from '../../src/components/DataGrid'
import type { DataGridFetchParams } from '../../src/components/DataGrid'
import { Filters } from '../../src/components/Filters'
import type { FilterField, FilterValues } from '../../src/components/Filters'
import {
  mockClients,
  mockTransactions,
  paginate,
  formatArs,
} from './listViewMocks'
import type {
  ClientRow,
  ClientStatus,
  TransactionRow,
  TxStatus,
  TxType,
} from './listViewMocks'
import {
  PageBackground,
  SurfaceWrap,
  ClientCell,
  ClientName,
  ClientEmail,
  Amount,
  MutedText,
  FiltersBar,
} from './ListView.stories.styles'

const FETCH_LATENCY_MS = 350

const clientStatusConfig: Record<ClientStatus, { color: string; label: string }> = {
  active: { color: 'success', label: 'Activo' },
  pending: { color: 'warning', label: 'Pendiente' },
  inactive: { color: 'default', label: 'Inactivo' },
}

const walletToneColor: Record<ClientRow['walletTone'], string> = {
  conservative: 'blue',
  moderate: 'gold',
  aggressive: 'volcano',
}

const txTypeLabel: Record<TxType, string> = {
  deposit: 'Depósito',
  withdrawal: 'Retiro',
  buy: 'Compra',
  sell: 'Venta',
  dividend: 'Dividendo',
  fee: 'Comisión',
}

const txStatusConfig: Record<TxStatus, { color: string; label: string }> = {
  settled: { color: 'success', label: 'Liquidado' },
  pending: { color: 'processing', label: 'Pendiente' },
  rejected: { color: 'error', label: 'Rechazado' },
}

const rowMenu = {
  items: [
    { key: 'view', label: 'Ver detalle' },
    { key: 'edit', label: 'Editar' },
    { type: 'divider' as const },
    { key: 'archive', label: 'Archivar', danger: true },
  ],
}

const clientColumns = [
  {
    title: 'Cliente',
    dataIndex: 'firstName',
    key: 'client',
    render: (_: unknown, row: ClientRow) => (
      <ClientCell>
        <ClientName>
          {row.firstName} {row.lastName}
        </ClientName>
        <ClientEmail>{row.email}</ClientEmail>
      </ClientCell>
    ),
  },
  {
    title: 'ID',
    dataIndex: 'clientId',
    key: 'clientId',
    render: (v: string) => <MutedText>{v}</MutedText>,
  },
  { title: 'Asesor', dataIndex: 'advisor', key: 'advisor' },
  {
    title: 'Cartera',
    dataIndex: 'walletLabel',
    key: 'wallet',
    render: (label: string, row: ClientRow) => (
      <Tag color={walletToneColor[row.walletTone]} bordered={false}>
        {label}
      </Tag>
    ),
  },
  {
    title: 'Patrimonio',
    dataIndex: 'totalArs',
    key: 'totalArs',
    align: 'right' as const,
    render: (v: number) => <Amount>{formatArs(v)}</Amount>,
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (s: ClientStatus) => {
      const { color, label } = clientStatusConfig[s]
      return <Tag color={color}>{label}</Tag>
    },
  },
  {
    title: '',
    key: 'actions',
    width: 56,
    render: () => (
      <Dropdown menu={rowMenu} trigger={['click']}>
        <Button type="text" icon={<MoreOutlined />} aria-label="Acciones" />
      </Dropdown>
    ),
  },
]

const txAmountIcon = (amount: number) =>
  amount >= 0 ? (
    <ArrowUpOutlined style={{ color: '#0A6B47' }} />
  ) : (
    <ArrowDownOutlined style={{ color: '#A11717' }} />
  )

const transactionColumns = [
  {
    title: 'Referencia',
    dataIndex: 'reference',
    key: 'reference',
    render: (v: string) => <MutedText>{v}</MutedText>,
  },
  { title: 'Fecha', dataIndex: 'date', key: 'date' },
  {
    title: 'Tipo',
    dataIndex: 'type',
    key: 'type',
    render: (t: TxType) => txTypeLabel[t],
  },
  { title: 'Activo', dataIndex: 'asset', key: 'asset' },
  {
    title: 'Cantidad',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'right' as const,
    render: (v: number | null) =>
      v == null ? <MutedText>—</MutedText> : v.toLocaleString('es-AR'),
  },
  {
    title: 'Importe',
    dataIndex: 'amountArs',
    key: 'amountArs',
    align: 'right' as const,
    render: (v: number) => (
      <Space size={6}>
        {txAmountIcon(v)}
        <Amount $tone={v >= 0 ? 'positive' : 'negative'}>{formatArs(v)}</Amount>
      </Space>
    ),
  },
  { title: 'Cliente', dataIndex: 'client', key: 'client' },
  {
    title: 'Cuenta',
    dataIndex: 'account',
    key: 'account',
    render: (v: string) => <MutedText>{v}</MutedText>,
  },
  {
    title: 'Estado',
    dataIndex: 'status',
    key: 'status',
    render: (s: TxStatus) => {
      const { color, label } = txStatusConfig[s]
      return <Tag color={color}>{label}</Tag>
    },
  },
]

const advisorOptions = Array.from(
  new Set(mockClients.map((c) => c.advisor)),
).map((name) => ({ label: name, value: name }))

const walletOptions = Array.from(
  new Set(mockClients.map((c) => c.walletLabel)),
).map((label) => ({ label, value: label }))

const clientFilterFields: FilterField[] = [
  {
    key: 'status',
    label: 'Estado',
    type: 'select',
    icon: <CheckCircleOutlined />,
    options: [
      { label: 'Activo', value: 'active' },
      { label: 'Pendiente', value: 'pending' },
      { label: 'Inactivo', value: 'inactive' },
    ],
  },
  {
    key: 'advisor',
    label: 'Asesor',
    type: 'multi-select',
    icon: <TeamOutlined />,
    options: advisorOptions,
  },
  {
    key: 'wallet',
    label: 'Cartera',
    type: 'multi-select',
    icon: <WalletOutlined />,
    options: walletOptions,
  },
  {
    key: 'name',
    label: 'Nombre',
    type: 'text',
    icon: <UserOutlined />,
    placeholder: 'Buscar por nombre...',
  },
]

const txFilterFields: FilterField[] = [
  {
    key: 'type',
    label: 'Tipo',
    type: 'multi-select',
    icon: <AppstoreOutlined />,
    options: [
      { label: 'Compra', value: 'buy' },
      { label: 'Venta', value: 'sell' },
      { label: 'Depósito', value: 'deposit' },
      { label: 'Retiro', value: 'withdrawal' },
      { label: 'Dividendo', value: 'dividend' },
      { label: 'Comisión', value: 'fee' },
    ],
  },
  {
    key: 'status',
    label: 'Estado',
    type: 'select',
    icon: <CheckCircleOutlined />,
    options: [
      { label: 'Liquidado', value: 'settled' },
      { label: 'Pendiente', value: 'pending' },
      { label: 'Rechazado', value: 'rejected' },
    ],
  },
  {
    key: 'asset',
    label: 'Activo',
    type: 'text',
    icon: <TagOutlined />,
    placeholder: 'Ticker (ej: AL30)',
  },
  {
    key: 'date',
    label: 'Fecha',
    type: 'date-range',
    icon: <CalendarOutlined />,
    placeholder: ['Desde', 'Hasta'],
  },
]

function applyClientFilters(rows: ClientRow[], filters: FilterValues): ClientRow[] {
  let out = rows
  const status = filters.status as string | undefined
  if (status) out = out.filter((r) => r.status === status)
  const advisors = (filters.advisor as string[] | undefined) ?? []
  if (advisors.length > 0) out = out.filter((r) => advisors.includes(r.advisor))
  const wallets = (filters.wallet as string[] | undefined) ?? []
  if (wallets.length > 0) out = out.filter((r) => wallets.includes(r.walletLabel))
  const name = (filters.name as string | undefined)?.trim().toLowerCase()
  if (name) {
    out = out.filter(
      (r) =>
        r.firstName.toLowerCase().includes(name) ||
        r.lastName.toLowerCase().includes(name),
    )
  }
  return out
}

function applyTxFilters(rows: TransactionRow[], filters: FilterValues): TransactionRow[] {
  let out = rows
  const types = (filters.type as string[] | undefined) ?? []
  if (types.length > 0) out = out.filter((r) => types.includes(r.type))
  const status = filters.status as string | undefined
  if (status) out = out.filter((r) => r.status === status)
  const asset = (filters.asset as string | undefined)?.trim().toUpperCase()
  if (asset) out = out.filter((r) => r.asset.toUpperCase().includes(asset))
  const dateRange = filters.date as [Dayjs | null, Dayjs | null] | undefined
  if (dateRange && dateRange[0] && dateRange[1]) {
    const from = dateRange[0].startOf('day')
    const to = dateRange[1].endOf('day')
    out = out.filter((r) => {
      const d = new Date(r.date).getTime()
      return d >= from.valueOf() && d <= to.valueOf()
    })
  }
  return out
}

function hasAny(filters: FilterValues): boolean {
  return Object.keys(filters).length > 0
}

const headerActions = (newLabel: string) => (
  <>
    <Button icon={<DownloadOutlined />}>Exportar</Button>
    <Button type="primary" icon={<PlusOutlined />}>
      {newLabel}
    </Button>
  </>
)

function ClientsListPage() {
  const [filters, setFilters] = useState<FilterValues>({})

  const filteredAll = useMemo(
    () => applyClientFilters(mockClients, filters),
    [filters],
  )

  const handleFetch = useCallback(
    async ({ page, pageSize, search }: DataGridFetchParams) => {
      await new Promise((r) => setTimeout(r, FETCH_LATENCY_MS))
      let rows = filteredAll
      if (search) {
        const q = search.toLowerCase()
        rows = rows.filter(
          (r) =>
            r.firstName.toLowerCase().includes(q) ||
            r.lastName.toLowerCase().includes(q) ||
            r.email.toLowerCase().includes(q) ||
            r.clientId.toLowerCase().includes(q) ||
            r.advisor.toLowerCase().includes(q),
        )
      }
      return { data: paginate(rows, page, pageSize), total: rows.length }
    },
    [filteredAll],
  )

  const filterKey = useMemo(() => JSON.stringify(filters), [filters])

  return (
    <PageBackground>
      <PageContainer maxWidth={1440} padding={32}>
        <PageHeader
          title="Clientes"
          subtitle="Listado completo de clientes asignados a la plataforma."
          breadcrumb={[
            { title: 'Inicio' },
            { title: 'Comercial' },
            { title: 'Clientes' },
          ]}
          actions={headerActions('Nuevo cliente')}
        />
        <FiltersBar>
          <Filters
            fields={clientFilterFields}
            value={filters}
            onChange={setFilters}
            labels={{
              addFilter: 'Añadir filtro',
              clearAll: 'Limpiar todo',
              apply: 'Aplicar',
              cancel: 'Cancelar',
              empty: 'Sin valor',
            }}
            resultSummary={
              hasAny(filters)
                ? `${filteredAll.length} de ${mockClients.length} clientes`
                : null
            }
          />
        </FiltersBar>
        <SurfaceWrap>
          <DataGrid<ClientRow>
            key={filterKey}
            columns={clientColumns}
            onFetch={handleFetch}
            searchable={false}
            pageSize={10}
            rowSelection={{ type: 'checkbox' }}
          />
        </SurfaceWrap>
      </PageContainer>
    </PageBackground>
  )
}

function TransactionsListPage() {
  const [filters, setFilters] = useState<FilterValues>({})

  const filteredAll = useMemo(
    () => applyTxFilters(mockTransactions, filters),
    [filters],
  )

  const handleFetch = useCallback(
    async ({ page, pageSize, search }: DataGridFetchParams) => {
      await new Promise((r) => setTimeout(r, FETCH_LATENCY_MS))
      let rows = filteredAll
      if (search) {
        const q = search.toLowerCase()
        rows = rows.filter(
          (r) =>
            r.reference.toLowerCase().includes(q) ||
            r.client.toLowerCase().includes(q) ||
            r.account.toLowerCase().includes(q) ||
            r.asset.toLowerCase().includes(q),
        )
      }
      return { data: paginate(rows, page, pageSize), total: rows.length }
    },
    [filteredAll],
  )

  const filterKey = useMemo(() => JSON.stringify(filters), [filters])

  return (
    <PageBackground>
      <PageContainer maxWidth={1440} padding={32}>
        <PageHeader
          title="Transacciones"
          subtitle="Movimientos liquidados, pendientes y rechazados de todas las cuentas."
          breadcrumb={[
            { title: 'Inicio' },
            { title: 'Operaciones' },
            { title: 'Transacciones' },
          ]}
          actions={headerActions('Nueva operación')}
        />
        <FiltersBar>
          <Filters
            fields={txFilterFields}
            value={filters}
            onChange={setFilters}
            labels={{
              addFilter: 'Añadir filtro',
              clearAll: 'Limpiar todo',
              apply: 'Aplicar',
              cancel: 'Cancelar',
              empty: 'Sin valor',
            }}
            resultSummary={
              hasAny(filters)
                ? `${filteredAll.length} de ${mockTransactions.length} transacciones`
                : null
            }
          />
        </FiltersBar>
        <SurfaceWrap>
          <DataGrid<TransactionRow>
            key={filterKey}
            columns={transactionColumns}
            onFetch={handleFetch}
            searchable={false}
            pageSize={10}
          />
        </SurfaceWrap>
      </PageContainer>
    </PageBackground>
  )
}

const meta: Meta = {
  title: 'Templates/List View',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    backgrounds: { default: 'canvas', values: [{ name: 'canvas', value: '#f0f3f7' }] },
    docs: {
      description: {
        component:
          'Page templates for list views: PageHeader + Filters + DataGrid in server-mode. ' +
          'Use these as a starting point for any "list of X" route — clients, transactions, accounts, etc.',
      },
    },
  },
}

export default meta

export const Clientes: StoryObj = {
  name: 'Clientes',
  render: () => <ClientsListPage />,
}

export const Transacciones: StoryObj = {
  name: 'Transacciones',
  render: () => <TransactionsListPage />,
}
