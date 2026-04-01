import { useMemo } from 'react'
import { Card } from '../../Card'
import type { TopClientsWidgetProps } from './TopClientsWidget.types'
import * as S from './TopClientsWidget.styles'

function scopeDescription(
  viewerRole: TopClientsWidgetProps['viewerRole'],
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

function formatArs(value: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function formatShareOfTotal(fraction: number): string {
  if (!Number.isFinite(fraction) || fraction <= 0) {
    return '—'
  }
  return new Intl.NumberFormat('es-AR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(fraction)
}

function fullName(firstName: string, lastName: string): string {
  return [firstName, lastName].filter(Boolean).join(' ').trim() || '—'
}

export function TopClientsWidget({
  clients,
  maxItems = 10,
  viewerRole,
  advisorName,
  className,
  style,
}: TopClientsWidgetProps) {
  const scope = useMemo(() => scopeDescription(viewerRole, advisorName), [viewerRole, advisorName])
  const rows = useMemo(() => clients.slice(0, maxItems), [clients, maxItems])

  const rankingTotals = useMemo(() => {
    return rows.reduce(
      (acc, c) => {
        acc.ars += c.amountArs
        acc.usd += c.amountUsd
        return acc
      },
      { ars: 0, usd: 0 },
    )
  }, [rows])

  return (
    <Card
      className={className}
      style={style}
      variant="borderless"
      title={`Top ${maxItems} clientes por monto`}
    >
      <S.ScopeText>{scope}</S.ScopeText>

      {rows.length === 0 ? (
        <S.TableWrap>
          <S.EmptyState>No hay clientes para mostrar.</S.EmptyState>
        </S.TableWrap>
      ) : (
        <>
          <S.SummaryStrip role="region" aria-label="Totales del ranking mostrado">
            <S.SummaryItem>
              <S.SummaryLabel>Suma en ranking · ARS</S.SummaryLabel>
              <S.SummaryValue>{formatArs(rankingTotals.ars)}</S.SummaryValue>
            </S.SummaryItem>
            <S.SummaryItem>
              <S.SummaryLabel>Suma en ranking · USD</S.SummaryLabel>
              <S.SummaryValue $variant="usd">{formatUsd(rankingTotals.usd)}</S.SummaryValue>
            </S.SummaryItem>
          </S.SummaryStrip>

          <S.TableWrap>
            <S.Table aria-label={`Top ${maxItems} clientes por monto`}>
              <thead>
                <S.TheadRow>
                  <S.Th $align="center">#</S.Th>
                  <S.Th $align="left">Cliente</S.Th>
                  <S.Th $align="left">Correo</S.Th>
                  <S.Th $align="left">Cartera</S.Th>
                  <S.Th $align="right">% del total ARS</S.Th>
                  <S.Th $align="right">ARS</S.Th>
                  <S.Th $align="right">USD</S.Th>
                </S.TheadRow>
              </thead>
              <tbody>
                {rows.map((client, index) => {
                  const rank = index + 1
                  const tier = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : 'rest'
                  const arsShare =
                    rankingTotals.ars > 0 ? client.amountArs / rankingTotals.ars : 0
                  return (
                    <S.TbodyRow key={client.id} $hover>
                      <S.Td $align="center">
                        <S.RankBadge $tier={tier}>{rank}</S.RankBadge>
                      </S.Td>
                      <S.Td $align="left">
                        <S.NameBlock>
                          <S.FullName title={fullName(client.firstName, client.lastName)}>
                            {fullName(client.firstName, client.lastName)}
                          </S.FullName>
                        </S.NameBlock>
                      </S.Td>
                      <S.Td $align="left">
                        <S.EmailText title={client.email}>{client.email}</S.EmailText>
                      </S.Td>
                      <S.Td $align="left">
                        <S.WalletTag title={client.walletLabel}>{client.walletLabel}</S.WalletTag>
                      </S.Td>
                      <S.Td $align="right">
                        <S.ShareCell>{formatShareOfTotal(arsShare)}</S.ShareCell>
                      </S.Td>
                      <S.Td $align="right">
                        <S.ArsCell>{formatArs(client.amountArs)}</S.ArsCell>
                      </S.Td>
                      <S.Td $align="right">
                        <S.UsdCell>{formatUsd(client.amountUsd)}</S.UsdCell>
                      </S.Td>
                    </S.TbodyRow>
                  )
                })}
              </tbody>
            </S.Table>
          </S.TableWrap>
        </>
      )}
    </Card>
  )
}

TopClientsWidget.displayName = 'TopClientsWidget'
