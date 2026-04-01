import { useId, useMemo } from 'react'
import { Segmented } from 'antd'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Card } from '../../Card'
import type {
  AdvisorTotalTimelineWidgetProps,
  DashboardCurrency,
} from './AdvisorTotalTimelineWidget.types'
import * as S from './AdvisorTotalTimelineWidget.styles'

const CHART_COLORS = {
  stroke: '#003973',
  grid: '#E8EDF2',
  muted: '#8494A7',
  label: '#0D1B2A',
} as const

function formatCompactCurrency(value: number, currency: DashboardCurrency): string {
  const locale = currency === 'ARS' ? 'es-AR' : 'en-US'
  const code = currency === 'ARS' ? 'ARS' : 'USD'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

function formatFullCurrency(value: number, currency: DashboardCurrency): string {
  const locale = currency === 'ARS' ? 'es-AR' : 'en-US'
  const code = currency === 'ARS' ? 'ARS' : 'USD'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 0,
  }).format(value)
}

function scopeDescription(
  viewerRole: AdvisorTotalTimelineWidgetProps['viewerRole'],
  advisorName?: string,
): string {
  if (viewerRole === 'admin') {
    return 'Incluye todos los clientes de la plataforma.'
  }
  if (advisorName) {
    return `Incluye únicamente los clientes asignados a ${advisorName}.`
  }
  return 'Incluye los clientes de este asesor.'
}

export function AdvisorTotalTimelineWidget({
  data,
  currency,
  onCurrencyChange,
  viewerRole,
  advisorName,
  height = 320,
  className,
  style,
}: AdvisorTotalTimelineWidgetProps) {
  const gradientId = useId().replace(/:/g, '')
  const scope = useMemo(() => scopeDescription(viewerRole, advisorName), [viewerRole, advisorName])

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
      title="Línea del tiempo"
      extra={extra}
    >
      <S.ScopeText>{scope}</S.ScopeText>
      <S.ChartWrap $height={height}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={CHART_COLORS.stroke} stopOpacity={0.22} />
                <stop offset="100%" stopColor={CHART_COLORS.stroke} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} vertical={false} />
            <XAxis
              dataKey="period"
              tick={{ fontSize: 11, fontWeight: 500, fill: CHART_COLORS.muted }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fontWeight: 500, fill: CHART_COLORS.muted }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatCompactCurrency(Number(v), currency)}
              width={72}
            />
            <Tooltip
              contentStyle={{
                background: '#FFFFFF',
                border: `1px solid ${CHART_COLORS.grid}`,
                borderRadius: 8,
                boxShadow: '0 4px 12px -2px rgba(0,25,51,0.08)',
                fontSize: 13,
                padding: '10px 14px',
              }}
              labelStyle={{ fontWeight: 600, color: CHART_COLORS.label, marginBottom: 4 }}
              formatter={(value) => {
                const n = typeof value === 'number' ? value : Number(value)
                if (Number.isNaN(n)) return ['—', 'Total']
                return [formatFullCurrency(n, currency), 'Total']
              }}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke={CHART_COLORS.stroke}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={{ r: 3, fill: CHART_COLORS.stroke }}
              activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </S.ChartWrap>
    </Card>
  )
}

AdvisorTotalTimelineWidget.displayName = 'AdvisorTotalTimelineWidget'
