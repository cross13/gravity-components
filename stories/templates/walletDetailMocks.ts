import type { AdvisorTotalTimelinePoint } from '../../src/components/widgets/AdvisorTotalTimelineWidget'

export type Currency = 'ARS' | 'USD'

export const ARS_USD_RATE = 1420 // 1 USD = 1420 ARS (mock)

export interface WalletSummary {
  clientName: string
  accountId: string
  walletLabel: string
  walletProfile: 'Conservadora' | 'Moderada' | 'Agresiva'
  currencyOfRecord: 'Pesos' | 'Dólar'
  openedAt: string
  totalArs: number
  unrealizedPnlArs: number
  unrealizedPnlPct: number
  monthlyReturnPct: number
  monthlyReturnDeltaPct: number
  cashAvailableArs: number
  ytdReturnPct: number
}

export const walletSummary: WalletSummary = {
  clientName: 'Martín García',
  accountId: 'MOD-PESOS-001847',
  walletLabel: 'Moderada — Pesos',
  walletProfile: 'Moderada',
  currencyOfRecord: 'Pesos',
  openedAt: '2022-08-14',
  totalArs: 142_000_000,
  unrealizedPnlArs: 8_200_000,
  unrealizedPnlPct: 6.13,
  monthlyReturnPct: 2.4,
  monthlyReturnDeltaPct: 0.3,
  cashAvailableArs: 4_500_000,
  ytdReturnPct: 12.4,
}

export const walletTimelineArs: AdvisorTotalTimelinePoint[] = [
  { period: 'Ene 25', total: 102_400_000 },
  { period: 'Feb 25', total: 99_800_000 },
  { period: 'Mar 25', total: 105_200_000 },
  { period: 'Abr 25', total: 101_900_000 },
  { period: 'May 25', total: 108_750_000 },
  { period: 'Jun 25', total: 111_300_000 },
  { period: 'Jul 25', total: 116_100_000 },
  { period: 'Ago 25', total: 113_400_000 },
  { period: 'Sep 25', total: 119_800_000 },
  { period: 'Oct 25', total: 117_200_000 },
  { period: 'Nov 25', total: 124_500_000 },
  { period: 'Dic 25', total: 121_900_000 },
  { period: 'Ene 26', total: 128_750_000 },
  { period: 'Feb 26', total: 132_100_000 },
  { period: 'Mar 26', total: 137_650_000 },
  { period: 'Abr 26', total: 142_000_000 },
]

export interface HoldingRow {
  key: string
  ticker: string
  name: string
  assetClass: 'Bonos' | 'Acciones' | 'CEDEAR' | 'FCI' | 'Caja'
  quantity: number
  avgCostArs: number
  marketPriceArs: number
  marketValueArs: number
  weightPct: number
  unrealizedPnlArs: number
  unrealizedPnlPct: number
}

export const holdings: HoldingRow[] = [
  {
    key: 'al30',
    ticker: 'AL30',
    name: 'Bonar 2030',
    assetClass: 'Bonos',
    quantity: 18_500,
    avgCostArs: 1_820,
    marketPriceArs: 2_010,
    marketValueArs: 37_185_000,
    weightPct: 26.2,
    unrealizedPnlArs: 3_515_000,
    unrealizedPnlPct: 10.4,
  },
  {
    key: 'gd30',
    ticker: 'GD30',
    name: 'Bonar Global 2030',
    assetClass: 'Bonos',
    quantity: 12_000,
    avgCostArs: 2_150,
    marketPriceArs: 2_245,
    marketValueArs: 26_940_000,
    weightPct: 19.0,
    unrealizedPnlArs: 1_140_000,
    unrealizedPnlPct: 4.4,
  },
  {
    key: 'ggal',
    ticker: 'GGAL',
    name: 'Grupo Financiero Galicia',
    assetClass: 'Acciones',
    quantity: 6_400,
    avgCostArs: 3_120,
    marketPriceArs: 3_540,
    marketValueArs: 22_656_000,
    weightPct: 16.0,
    unrealizedPnlArs: 2_688_000,
    unrealizedPnlPct: 13.5,
  },
  {
    key: 'ypfd',
    ticker: 'YPFD',
    name: 'YPF S.A.',
    assetClass: 'Acciones',
    quantity: 1_800,
    avgCostArs: 9_400,
    marketPriceArs: 10_120,
    marketValueArs: 18_216_000,
    weightPct: 12.8,
    unrealizedPnlArs: 1_296_000,
    unrealizedPnlPct: 7.7,
  },
  {
    key: 'aapl-cedear',
    ticker: 'AAPL',
    name: 'Apple Inc. (CEDEAR)',
    assetClass: 'CEDEAR',
    quantity: 950,
    avgCostArs: 14_200,
    marketPriceArs: 14_980,
    marketValueArs: 14_231_000,
    weightPct: 10.0,
    unrealizedPnlArs: 741_000,
    unrealizedPnlPct: 5.5,
  },
  {
    key: 'fci-renta-fija',
    ticker: 'PIO-RF',
    name: 'FCI Renta Fija Plus',
    assetClass: 'FCI',
    quantity: 1,
    avgCostArs: 18_272_000,
    marketPriceArs: 18_272_000,
    marketValueArs: 18_272_000,
    weightPct: 12.9,
    unrealizedPnlArs: 0,
    unrealizedPnlPct: 0,
  },
  {
    key: 'cash',
    ticker: '—',
    name: 'Efectivo disponible',
    assetClass: 'Caja',
    quantity: 1,
    avgCostArs: 4_500_000,
    marketPriceArs: 4_500_000,
    marketValueArs: 4_500_000,
    weightPct: 3.1,
    unrealizedPnlArs: 0,
    unrealizedPnlPct: 0,
  },
]

export type MovementType = 'deposit' | 'withdrawal' | 'transfer-in' | 'transfer-out'

export interface MovementRow {
  key: string
  date: string
  reference: string
  type: MovementType
  description: string
  amountArs: number
  balanceAfterArs: number
}

export const movements: MovementRow[] = [
  {
    key: 'm1',
    date: '2026-04-22',
    reference: 'MV-820134',
    type: 'deposit',
    description: 'Transferencia bancaria — Banco Galicia',
    amountArs: 6_500_000,
    balanceAfterArs: 142_000_000,
  },
  {
    key: 'm2',
    date: '2026-04-09',
    reference: 'MV-819842',
    type: 'withdrawal',
    description: 'Retiro a CBU titular',
    amountArs: -2_200_000,
    balanceAfterArs: 135_500_000,
  },
  {
    key: 'm3',
    date: '2026-03-18',
    reference: 'MV-819204',
    type: 'transfer-in',
    description: 'Transferencia interna desde MOD-USD-002344',
    amountArs: 4_800_000,
    balanceAfterArs: 137_700_000,
  },
  {
    key: 'm4',
    date: '2026-02-12',
    reference: 'MV-818011',
    type: 'deposit',
    description: 'Transferencia bancaria — Banco Macro',
    amountArs: 3_000_000,
    balanceAfterArs: 132_900_000,
  },
  {
    key: 'm5',
    date: '2026-01-08',
    reference: 'MV-817556',
    type: 'transfer-out',
    description: 'Transferencia interna a MOD-USD-002344',
    amountArs: -1_500_000,
    balanceAfterArs: 129_900_000,
  },
]

export type TradeSide = 'buy' | 'sell'

export interface TradeRow {
  key: string
  date: string
  reference: string
  side: TradeSide
  ticker: string
  quantity: number
  priceArs: number
  amountArs: number
  feeArs: number
  status: 'settled' | 'pending'
}

export const trades: TradeRow[] = [
  {
    key: 't1',
    date: '2026-04-24',
    reference: 'TR-440882',
    side: 'buy',
    ticker: 'AL30',
    quantity: 1_500,
    priceArs: 2_010,
    amountArs: 3_015_000,
    feeArs: 9_045,
    status: 'settled',
  },
  {
    key: 't2',
    date: '2026-04-18',
    reference: 'TR-440719',
    side: 'sell',
    ticker: 'COME',
    quantity: 4_200,
    priceArs: 412,
    amountArs: 1_730_400,
    feeArs: 5_191,
    status: 'settled',
  },
  {
    key: 't3',
    date: '2026-04-15',
    reference: 'TR-440611',
    side: 'buy',
    ticker: 'GGAL',
    quantity: 800,
    priceArs: 3_540,
    amountArs: 2_832_000,
    feeArs: 8_496,
    status: 'settled',
  },
  {
    key: 't4',
    date: '2026-04-04',
    reference: 'TR-440388',
    side: 'buy',
    ticker: 'AAPL',
    quantity: 120,
    priceArs: 14_980,
    amountArs: 1_797_600,
    feeArs: 5_393,
    status: 'pending',
  },
  {
    key: 't5',
    date: '2026-03-27',
    reference: 'TR-440150',
    side: 'sell',
    ticker: 'YPFD',
    quantity: 200,
    priceArs: 10_120,
    amountArs: 2_024_000,
    feeArs: 6_072,
    status: 'settled',
  },
]

export interface ResultRow {
  key: string
  ticker: string
  name: string
  closedAt: string
  quantity: number
  costArs: number
  proceedsArs: number
  realizedPnlArs: number
  realizedPnlPct: number
  taxArs: number
}

export const results: ResultRow[] = [
  {
    key: 'r1',
    ticker: 'COME',
    name: 'Sociedad Comercial del Plata',
    closedAt: '2026-04-18',
    quantity: 4_200,
    costArs: 1_512_000,
    proceedsArs: 1_730_400,
    realizedPnlArs: 218_400,
    realizedPnlPct: 14.4,
    taxArs: 32_760,
  },
  {
    key: 'r2',
    ticker: 'YPFD',
    name: 'YPF S.A.',
    closedAt: '2026-03-27',
    quantity: 200,
    costArs: 1_880_000,
    proceedsArs: 2_024_000,
    realizedPnlArs: 144_000,
    realizedPnlPct: 7.7,
    taxArs: 21_600,
  },
  {
    key: 'r3',
    ticker: 'PAMP',
    name: 'Pampa Energía',
    closedAt: '2026-02-21',
    quantity: 900,
    costArs: 1_080_000,
    proceedsArs: 1_044_000,
    realizedPnlArs: -36_000,
    realizedPnlPct: -3.3,
    taxArs: 0,
  },
  {
    key: 'r4',
    ticker: 'TXAR',
    name: 'Ternium Argentina',
    closedAt: '2026-01-30',
    quantity: 2_000,
    costArs: 2_580_000,
    proceedsArs: 2_812_000,
    realizedPnlArs: 232_000,
    realizedPnlPct: 9.0,
    taxArs: 34_800,
  },
]

export function convertArsTo(value: number, currency: Currency): number {
  if (currency === 'ARS') return value
  return Math.round(value / ARS_USD_RATE)
}

export function formatCurrency(value: number, currency: Currency): string {
  const locale = currency === 'ARS' ? 'es-AR' : 'en-US'
  const code = currency === 'ARS' ? 'ARS' : 'USD'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 0,
  }).format(convertArsTo(value, currency))
}

export function formatPercent(value: number, withSign = true): string {
  const sign = withSign && value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}
