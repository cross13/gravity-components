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

function formatWeightFraction(fraction: number, totalAmount: number): string {
  if (totalAmount <= 0 || !Number.isFinite(fraction)) {
    return '—'
  }
  return new Intl.NumberFormat('es-AR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(fraction)
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
        <S.CurrencyToggleLabel>Moneda</S.CurrencyToggleLabel>
        <S.CurrencyToggle>
          <Segmented
            size="small"
            value={currency}
            onChange={(v) => onCurrencyChange(v as DashboardCurrency)}
            options={[
              { label: 'ARS', value: 'ARS' },
              { label: 'USD', value: 'USD' },
            ]}
          />
        </S.CurrencyToggle>
      </S.CardExtra>
    ) : undefined

  const walletCount = rows.length

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
        <>
          <S.KpiStrip role="region" aria-label="Resumen de carteras">
            <S.KpiTile>
              <S.KpiLabel>Patrimonio bajo gestión</S.KpiLabel>
              <S.KpiValue>{formatCurrency(totals.amount, currency)}</S.KpiValue>
              <S.KpiHint>En la moneda seleccionada</S.KpiHint>
            </S.KpiTile>
            <S.KpiTile>
              <S.KpiLabel>Cuentas</S.KpiLabel>
              <S.KpiValue>{formatCount(totals.accounts)}</S.KpiValue>
              <S.KpiHint>Total de posiciones</S.KpiHint>
            </S.KpiTile>
            <S.KpiTile>
              <S.KpiLabel>Perfiles activos</S.KpiLabel>
              <S.KpiValue>{formatCount(walletCount)}</S.KpiValue>
              <S.KpiHint>Segmentos en cartera</S.KpiHint>
            </S.KpiTile>
          </S.KpiStrip>

          <S.TableWrap>
            <S.Table>
              <thead>
                <S.TheadRow>
                  <S.Th $align="left">Cartera</S.Th>
                  <S.Th $align="right">Cuentas</S.Th>
                  <S.Th $align="right">Monto</S.Th>
                  <S.Th $align="left">Peso</S.Th>
                </S.TheadRow>
              </thead>
              <tbody>
                {rows.map((row, index) => {
                  const tone = row.tone ?? DEFAULT_TONES[index % DEFAULT_TONES.length]
                  const weightPct =
                    totals.amount > 0 ? Math.min(100, (row.totalAmount / totals.amount) * 100) : 0
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
                        <S.AmountStack>
                          <S.CurrencyCell>{formatCurrency(row.totalAmount, currency)}</S.CurrencyCell>
                          <S.AllocationTrack aria-hidden>
                            <S.AllocationFill
                              $tone={tone ?? 'neutral'}
                              style={{ width: `${weightPct}%` }}
                            />
                          </S.AllocationTrack>
                        </S.AmountStack>
                      </S.Td>
                      <S.Td $align="left">
                        <S.WeightCell>
                          <S.WeightFigure>
                            {formatWeightFraction(
                              totals.amount > 0 ? row.totalAmount / totals.amount : 0,
                              totals.amount,
                            )}
                          </S.WeightFigure>
                        </S.WeightCell>
                      </S.Td>
                    </S.TbodyRow>
                  )
                })}
              </tbody>
              <tfoot>
                <S.TfootRow>
                  <S.TfootTd $align="left">
                    <S.TfootLabel>Total consolidado</S.TfootLabel>
                  </S.TfootTd>
                  <S.TfootTd $align="right">
                    <S.NumericCell>{formatCount(totals.accounts)}</S.NumericCell>
                  </S.TfootTd>
                  <S.TfootTd $align="right">
                    <S.FooterAmount>{formatCurrency(totals.amount, currency)}</S.FooterAmount>
                  </S.TfootTd>
                  <S.TfootTd $align="left">
                    <S.WeightFigure>100%</S.WeightFigure>
                  </S.TfootTd>
                </S.TfootRow>
              </tfoot>
            </S.Table>
          </S.TableWrap>
        </>
      )}
    </Card>
  )
}

WalletStatisticsWidget.displayName = 'WalletStatisticsWidget'
