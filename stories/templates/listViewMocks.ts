export type ClientStatus = 'active' | 'pending' | 'inactive'

export interface ClientRow {
  key: string
  clientId: string
  firstName: string
  lastName: string
  email: string
  advisor: string
  walletLabel: string
  walletTone: 'conservative' | 'moderate' | 'aggressive'
  totalArs: number
  status: ClientStatus
  joinedAt: string
}

export type TxType = 'deposit' | 'withdrawal' | 'buy' | 'sell' | 'dividend' | 'fee'
export type TxStatus = 'settled' | 'pending' | 'rejected'

export interface TransactionRow {
  key: string
  reference: string
  date: string
  type: TxType
  asset: string
  quantity: number | null
  amountArs: number
  client: string
  account: string
  status: TxStatus
}

const FIRST_NAMES = [
  'Martín', 'Sofía', 'Ricardo', 'Camila', 'Juan', 'Valentina', 'Diego',
  'Lucía', 'Federico', 'Paula', 'Tomás', 'Florencia', 'Mateo', 'Agustina',
  'Nicolás', 'Carolina', 'Alejandro', 'Belén', 'Joaquín', 'Mariana',
]
const LAST_NAMES = [
  'García', 'Fernández', 'Becerra', 'López', 'Martínez', 'Ruiz', 'Acosta',
  'Herrera', 'Núñez', 'Domínguez', 'Suárez', 'Gómez', 'Pérez', 'Romero',
  'Torres', 'Castro', 'Vega', 'Molina', 'Sosa', 'Álvarez',
]
const ADVISORS = ['María López', 'Pablo Quiroga', 'Inés Bravo', 'Eduardo Sánchez']
const WALLETS: { label: string; tone: ClientRow['walletTone'] }[] = [
  { label: 'Conservadora — Pesos', tone: 'conservative' },
  { label: 'Conservadora — Dólar', tone: 'conservative' },
  { label: 'Moderada — Pesos', tone: 'moderate' },
  { label: 'Moderada — Dólar', tone: 'moderate' },
  { label: 'Agresiva — Pesos', tone: 'aggressive' },
  { label: 'Agresiva — Dólar', tone: 'aggressive' },
]
const STATUSES: ClientStatus[] = ['active', 'active', 'active', 'pending', 'inactive']

export const mockClients: ClientRow[] = Array.from({ length: 64 }, (_, i) => {
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length]
  const lastName = LAST_NAMES[(i * 3) % LAST_NAMES.length]
  const wallet = WALLETS[i % WALLETS.length]
  const totalArs = Math.round(8_000_000 + ((i * 991_337) % 240_000_000))
  const month = ((i * 5) % 12) + 1
  const day = ((i * 7) % 27) + 1
  return {
    key: String(i + 1),
    clientId: `CL-${String(2024_001 + i)}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${i % 2 === 0 ? 'mail.com' : 'empresa.com.ar'}`
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, ''),
    advisor: ADVISORS[i % ADVISORS.length],
    walletLabel: wallet.label,
    walletTone: wallet.tone,
    totalArs,
    status: STATUSES[i % STATUSES.length],
    joinedAt: `2024-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
  }
})

const TX_ASSETS = ['AL30', 'GD30', 'YPFD', 'PAMP', 'BMA', 'GGAL', 'TXAR', 'COME', 'BYMA', 'TGSU2']
const TX_TYPES: TxType[] = ['buy', 'sell', 'deposit', 'withdrawal', 'dividend', 'fee']
const TX_STATUSES: TxStatus[] = ['settled', 'settled', 'settled', 'settled', 'pending', 'rejected']

export const mockTransactions: TransactionRow[] = Array.from({ length: 92 }, (_, i) => {
  const type = TX_TYPES[i % TX_TYPES.length]
  const isAssetMove = type === 'buy' || type === 'sell' || type === 'dividend'
  const asset = isAssetMove ? TX_ASSETS[i % TX_ASSETS.length] : '—'
  const qty = isAssetMove ? Math.round(50 + ((i * 173) % 1500)) : null
  const baseAmount = Math.round(50_000 + ((i * 87_413) % 12_000_000))
  const amountArs =
    type === 'withdrawal' || type === 'fee' ? -baseAmount : baseAmount
  const month = ((i * 2) % 12) + 1
  const day = ((i * 11) % 27) + 1
  const firstName = FIRST_NAMES[i % FIRST_NAMES.length]
  const lastName = LAST_NAMES[(i * 5) % LAST_NAMES.length]
  return {
    key: String(i + 1),
    reference: `TX-${String(900_001 + i)}`,
    date: `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    type,
    asset,
    quantity: qty,
    amountArs,
    client: `${firstName} ${lastName}`,
    account: `MOD-PESOS-${String(1000 + (i % 99)).padStart(4, '0')}`,
    status: TX_STATUSES[i % TX_STATUSES.length],
  }
})

export function paginate<T>(rows: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  return rows.slice(start, start + pageSize)
}

export function formatArs(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value)
}
