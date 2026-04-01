import { useMemo } from 'react'
import { Segmented } from 'antd'
import { Card } from '../../Card'
import type { DashboardCurrency } from '../dashboardTypes'
import type { WalletStatisticsWidgetProps, WalletStatisticRow } from './WalletStatisticsWidget.types'
import * as S from './WalletStatisticsWidget.styles'

const DEFAULT_TONES: WalletStatisticRow['tone'][] = [
  'conservative',
  'moderate',
  'aggressive',
  'neutral',
]

function scopeDescription(
  viewerRole: WalletStatisticsWidgetProps['viewerRole'],
  advisorName?: string,
): string {
  if (viewerRole === 'admin') {
    return 'Visibilidad: todos los clientes de la plataforma.'
  }
  if (advisorName) {
    return `Visibilidad: clientes asignados a ${advisorName}.`
  }
  return 'Visibilidad: clientes de este asesor.'
}

function formatCurrency(value: number, currency: DashboardCurrency): string {
  const locale = currency === 'ARS' ? 'es-AR' : 'en-US'
  const code = currency === 'ARS' ? 'ARS' : 'USD'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatCount(n: number): string {
  return new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(n)
}

export function WalletStatisticsWidget({
  rows,
  currency,
  onCurrencyChange,
  viewerRole,
  advisorName,
  className,
  style,
}: WalletStatisticsWidgetProps) {
  const scope = useMemo(() => scopeDescription(viewerRole, advisorName), [viewerRole, advisorName])

  const totals = useMemo(() => {
    return rows.reduce(
      (acc, r) => {
        acc.accounts += r.accountCount
        acc.amount += r.totalAmount
        return acc
      },
      { accounts: 0, amount: 0 },
    )
  }, [rows])

  const extra =
    onCurrencyChange !== undefined ? (
      <S.CardExtra>
        <Segmented
          size="small"
          value={currency}
          onChange={(v) => onCurrencyChange(v as DashboardCurrency)}
          options={[
            { label: 'ARS', value: 'ARS' },
            { label: 'USD', value: 'USD' },
          ]}
        />
      </S.CardExtra>
    ) : undefined

  return (
    <Card
      className={className}
      style={style}
      variant="borderless"
      title="Estadísticas por cartera"
      extra={extra}
    >
      <S.ScopeText>{scope}</S.ScopeText>

      {rows.length === 0 ? (
        <S.TableWrap>
          <S.EmptyState>No hay carteras para mostrar.</S.EmptyState>
        </S.TableWrap>
      ) : (
        <S.TableWrap>
          <S.Table>
            <thead>
              <S.TheadRow>
                <S.Th $align="left">Cartera</S.Th>
                <S.Th $align="right">Cuentas</S.Th>
                <S.Th $align="right">Total invertido</S.Th>
              </S.TheadRow>
            </thead>
            <tbody>
              {rows.map((row, index) => {
                const tone = row.tone ?? DEFAULT_TONES[index % DEFAULT_TONES.length]
                return (
                  <S.TbodyRow key={row.id} $hover>
                    <S.Td $align="left">
                      <S.WalletCell>
                        <S.ToneBar $tone={tone ?? 'neutral'} aria-hidden />
                        <S.WalletTextBlock>
                          <S.ProfileName>{row.profileLabel}</S.ProfileName>
                          <S.DenominationTag>{row.denominationLabel}</S.DenominationTag>
                        </S.WalletTextBlock>
                      </S.WalletCell>
                    </S.Td>
                    <S.Td $align="right">
                      <S.NumericCell>{formatCount(row.accountCount)}</S.NumericCell>
                    </S.Td>
                    <S.Td $align="right">
                      <S.CurrencyCell>{formatCurrency(row.totalAmount, currency)}</S.CurrencyCell>
                    </S.Td>
                  </S.TbodyRow>
                )
              })}
            </tbody>
            <tfoot>
              <S.TfootRow>
                <S.TfootTd $align="left">Total</S.TfootTd>
                <S.TfootTd $align="right">
                  <S.NumericCell>{formatCount(totals.accounts)}</S.NumericCell>
                </S.TfootTd>
                <S.TfootTd $align="right">
                  <S.CurrencyCell>{formatCurrency(totals.amount, currency)}</S.CurrencyCell>
                </S.TfootTd>
              </S.TfootRow>
            </tfoot>
          </S.Table>
        </S.TableWrap>
      )}
    </Card>
  )
}

WalletStatisticsWidget.displayName = 'WalletStatisticsWidget'
