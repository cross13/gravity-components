import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Row, Col } from 'antd'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { Card } from '../src/components/Card'
import * as CS from './Charts.stories.styles'

/* ─── BBSA Theme Colors ──────────────────────── */

const COLORS = {
  navy: '#003973',
  navyLight: '#004A94',
  cyan: '#00BBDD',
  cyanLight: '#00D4FA',
  blue: '#0077FF',
  green: '#00B67A',
  greenLight: '#34D399',
  amber: '#F5A623',
  amberLight: '#FBBF24',
  red: '#E62626',
  textPrimary: '#0D1B2A',
  textSecondary: '#3D5068',
  textMuted: '#8494A7',
  border: '#E8EDF2',
  bg: '#F0F3F7',
}

const PIE_COLORS = [
  COLORS.navy,
  COLORS.cyan,
  COLORS.blue,
  COLORS.green,
  COLORS.amber,
  COLORS.red,
]

/* ─── Financial Data ─────────────────────────── */

const portfolioPerformance = [
  { month: 'Jul', portfolio: 8.2, benchmark: 7.1, bonds: 4.2 },
  { month: 'Aug', portfolio: 9.1, benchmark: 7.8, bonds: 4.5 },
  { month: 'Sep', portfolio: 7.8, benchmark: 6.9, bonds: 4.1 },
  { month: 'Oct', portfolio: 10.4, benchmark: 8.2, bonds: 4.8 },
  { month: 'Nov', portfolio: 11.2, benchmark: 8.9, bonds: 5.0 },
  { month: 'Dec', portfolio: 9.6, benchmark: 8.5, bonds: 4.6 },
  { month: 'Jan', portfolio: 12.1, benchmark: 9.4, bonds: 5.2 },
  { month: 'Feb', portfolio: 11.8, benchmark: 9.1, bonds: 5.1 },
  { month: 'Mar', portfolio: 13.5, benchmark: 10.2, bonds: 5.4 },
  { month: 'Apr', portfolio: 12.4, benchmark: 9.8, bonds: 5.3 },
  { month: 'May', portfolio: 14.2, benchmark: 10.5, bonds: 5.6 },
  { month: 'Jun', portfolio: 14.8, benchmark: 11.0, bonds: 5.8 },
]

const aumHistory = [
  { month: 'Jan', aum: 9.2, inflows: 1.4, outflows: -0.6 },
  { month: 'Feb', aum: 9.8, inflows: 1.2, outflows: -0.5 },
  { month: 'Mar', aum: 10.1, inflows: 0.9, outflows: -0.4 },
  { month: 'Apr', aum: 10.5, inflows: 1.6, outflows: -0.8 },
  { month: 'May', aum: 10.9, inflows: 1.1, outflows: -0.3 },
  { month: 'Jun', aum: 11.2, inflows: 0.8, outflows: -0.5 },
  { month: 'Jul', aum: 11.6, inflows: 1.3, outflows: -0.7 },
  { month: 'Aug', aum: 11.9, inflows: 1.0, outflows: -0.4 },
  { month: 'Sep', aum: 11.5, inflows: 0.6, outflows: -0.9 },
  { month: 'Oct', aum: 12.0, inflows: 1.5, outflows: -0.6 },
  { month: 'Nov', aum: 12.3, inflows: 1.1, outflows: -0.4 },
  { month: 'Dec', aum: 12.4, inflows: 0.7, outflows: -0.3 },
]

const revenueByProduct = [
  { product: 'Equities', revenue: 4.2, margin: 32 },
  { product: 'Fixed Income', revenue: 2.8, margin: 28 },
  { product: 'Commodities', revenue: 1.9, margin: 24 },
  { product: 'Forex', revenue: 1.4, margin: 18 },
  { product: 'Derivatives', revenue: 3.1, margin: 35 },
  { product: 'ETFs', revenue: 2.3, margin: 22 },
]

const allocationData = [
  { name: 'US Equities', value: 35 },
  { name: 'Int\'l Equities', value: 20 },
  { name: 'Fixed Income', value: 25 },
  { name: 'Real Estate', value: 8 },
  { name: 'Commodities', value: 7 },
  { name: 'Cash', value: 5 },
]

const dailyVolume = [
  { day: 'Mon', buy: 2.4, sell: 1.8, transfers: 0.6 },
  { day: 'Tue', buy: 3.1, sell: 2.2, transfers: 0.9 },
  { day: 'Wed', buy: 2.8, sell: 2.5, transfers: 0.7 },
  { day: 'Thu', buy: 3.6, sell: 1.9, transfers: 1.1 },
  { day: 'Fri', buy: 4.2, sell: 3.1, transfers: 0.8 },
]

const riskMetrics = [
  { month: 'Jan', var: -2.1, cvar: -3.4, drawdown: -1.2 },
  { month: 'Feb', var: -1.8, cvar: -2.9, drawdown: -0.8 },
  { month: 'Mar', var: -2.4, cvar: -3.8, drawdown: -1.5 },
  { month: 'Apr', var: -1.5, cvar: -2.5, drawdown: -0.6 },
  { month: 'May', var: -1.9, cvar: -3.1, drawdown: -1.0 },
  { month: 'Jun', var: -2.2, cvar: -3.5, drawdown: -1.3 },
  { month: 'Jul', var: -1.6, cvar: -2.7, drawdown: -0.7 },
  { month: 'Aug', var: -2.0, cvar: -3.2, drawdown: -1.1 },
  { month: 'Sep', var: -2.8, cvar: -4.2, drawdown: -2.0 },
  { month: 'Oct', var: -1.7, cvar: -2.8, drawdown: -0.9 },
  { month: 'Nov', var: -1.4, cvar: -2.3, drawdown: -0.5 },
  { month: 'Dec', var: -1.3, cvar: -2.1, drawdown: -0.4 },
]

/* ─── Shared Chart Config ────────────────────── */

const axisStyle = {
  fontSize: 11,
  fontWeight: 500,
  fill: COLORS.textMuted,
}

const gridStroke = '#E8EDF2'

const tooltipStyle = {
  contentStyle: {
    background: '#FFFFFF',
    border: `1px solid ${COLORS.border}`,
    borderRadius: 8,
    boxShadow: '0 4px 12px -2px rgba(0,25,51,0.08)',
    fontSize: 13,
    padding: '10px 14px',
  },
  labelStyle: {
    fontWeight: 600,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
}

/* ─── Stories ─────────────────────────────────── */

const meta: Meta = {
  title: 'Charts/Finance',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
}

export default meta

export const PortfolioPerformance: StoryObj = {
  name: 'Portfolio Performance (Line)',
  render: () => (
    <Card variant="borderless" title="Portfolio Performance — 12 Month Return (%)">
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={portfolioPerformance}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis
            tick={axisStyle}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 'auto']}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value: number) => [`${value}%`, undefined]}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          />
          <Line
            type="monotone"
            dataKey="portfolio"
            name="Portfolio"
            stroke={COLORS.navy}
            strokeWidth={2.5}
            dot={{ r: 3, fill: COLORS.navy }}
            activeDot={{ r: 5, stroke: '#fff', strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            name="S&P 500"
            stroke={COLORS.cyan}
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={{ r: 3, fill: COLORS.cyan }}
          />
          <Line
            type="monotone"
            dataKey="bonds"
            name="Bond Index"
            stroke={COLORS.amber}
            strokeWidth={1.5}
            strokeDasharray="3 3"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  ),
}

export const AUMGrowth: StoryObj = {
  name: 'AUM Growth (Area)',
  render: () => (
    <Card variant="borderless" title="Assets Under Management — $M">
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={aumHistory}>
          <defs>
            <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.navy} stopOpacity={0.2} />
              <stop offset="100%" stopColor={COLORS.navy} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis
            tick={axisStyle}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}M`}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value: number, name: string) => {
              if (name === 'aum') return [`$${value}M`, 'Total AUM']
              return [`$${Math.abs(value)}M`, undefined]
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Area
            type="monotone"
            dataKey="aum"
            name="Total AUM"
            stroke={COLORS.navy}
            strokeWidth={2.5}
            fill="url(#aumGrad)"
          />
          <Area
            type="monotone"
            dataKey="inflows"
            name="Inflows"
            stroke={COLORS.green}
            strokeWidth={1.5}
            fill={COLORS.green}
            fillOpacity={0.1}
          />
          <Area
            type="monotone"
            dataKey="outflows"
            name="Outflows"
            stroke={COLORS.red}
            strokeWidth={1.5}
            fill={COLORS.red}
            fillOpacity={0.1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  ),
}

export const RevenueByProduct: StoryObj = {
  name: 'Revenue by Product (Bar)',
  render: () => (
    <Card variant="borderless" title="Revenue by Product Line — $M">
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={revenueByProduct} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
          <XAxis dataKey="product" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis
            tick={axisStyle}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}M`}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value: number, name: string) =>
              name === 'Revenue'
                ? [`$${value}M`, name]
                : [`${value}%`, name]
            }
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Bar
            dataKey="revenue"
            name="Revenue"
            fill={COLORS.navy}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="margin"
            name="Margin %"
            fill={COLORS.cyan}
            radius={[4, 4, 0, 0]}
            opacity={0.7}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  ),
}

export const PortfolioAllocation: StoryObj = {
  name: 'Portfolio Allocation (Pie)',
  render: () => (
    <Card variant="borderless" title="Portfolio Allocation">
      <CS.PieSection>
        <ResponsiveContainer width="50%" height={320}>
          <PieChart>
            <Pie
              data={allocationData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={120}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {allocationData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={PIE_COLORS[index % PIE_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              {...tooltipStyle}
              formatter={(value: number) => [`${value}%`, undefined]}
            />
          </PieChart>
        </ResponsiveContainer>
        <CS.PieLegendColumn>
          {allocationData.map((item, i) => (
            <CS.PieLegendRow key={item.name} $showBorder={i < allocationData.length - 1}>
              <CS.PieLegendLeft>
                <CS.PieSwatchLg $color={PIE_COLORS[i % PIE_COLORS.length]} />
                <CS.PieSliceName>{item.name}</CS.PieSliceName>
              </CS.PieLegendLeft>
              <CS.PieSliceValue>{item.value}%</CS.PieSliceValue>
            </CS.PieLegendRow>
          ))}
        </CS.PieLegendColumn>
      </CS.PieSection>
    </Card>
  ),
}

export const TradingVolume: StoryObj = {
  name: 'Trading Volume (Stacked Bar)',
  render: () => (
    <Card variant="borderless" title="Weekly Trading Volume — $M">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={dailyVolume} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
          <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis
            tick={axisStyle}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v}M`}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value: number) => [`$${value}M`, undefined]}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <Bar
            dataKey="buy"
            name="Buy Orders"
            stackId="volume"
            fill={COLORS.green}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="sell"
            name="Sell Orders"
            stackId="volume"
            fill={COLORS.red}
            opacity={0.85}
          />
          <Bar
            dataKey="transfers"
            name="Transfers"
            stackId="volume"
            fill={COLORS.cyan}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  ),
}

export const RiskAnalysis: StoryObj = {
  name: 'Risk Analysis (Composed)',
  render: () => (
    <Card variant="borderless" title="Risk Metrics — Value at Risk (%)">
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={riskMetrics}>
          <defs>
            <linearGradient id="cvarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.red} stopOpacity={0.15} />
              <stop offset="100%" stopColor={COLORS.red} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
          <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis
            tick={axisStyle}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            {...tooltipStyle}
            formatter={(value: number) => [`${value}%`, undefined]}
          />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          <ReferenceLine y={-2} stroke={COLORS.amber} strokeDasharray="6 3" label={{ value: 'VaR Limit', fill: COLORS.amber, fontSize: 11 }} />
          <Area
            type="monotone"
            dataKey="cvar"
            name="CVaR (99%)"
            stroke={COLORS.red}
            strokeWidth={1.5}
            fill="url(#cvarGrad)"
          />
          <Line
            type="monotone"
            dataKey="var"
            name="VaR (95%)"
            stroke={COLORS.navy}
            strokeWidth={2.5}
            dot={{ r: 3, fill: COLORS.navy }}
          />
          <Bar
            dataKey="drawdown"
            name="Max Drawdown"
            fill={COLORS.amber}
            opacity={0.6}
            barSize={16}
            radius={[3, 3, 0, 0]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  ),
}

export const DashboardOverview: StoryObj = {
  name: 'Dashboard Overview',
  render: () => (
    <CS.DashboardStack>
      <Row gutter={[20, 20]}>
        {/* Portfolio mini line chart */}
        <Col span={12}>
          <Card variant="borderless" title="Portfolio Return — YTD">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={portfolioPerformance}>
                <defs>
                  <linearGradient id="miniPortGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={COLORS.navy} stopOpacity={0.15} />
                    <stop offset="100%" stopColor={COLORS.navy} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 'auto']} />
                <Tooltip
                  {...tooltipStyle}
                  formatter={(value: number) => [`${value}%`, undefined]}
                />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stroke={COLORS.navy}
                  strokeWidth={2}
                  fill="url(#miniPortGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Allocation donut */}
        <Col span={12}>
          <Card variant="borderless" title="Asset Allocation">
            <CS.DonutRow>
              <ResponsiveContainer width="50%" height={200}>
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {allocationData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    {...tooltipStyle}
                    formatter={(value: number) => [`${value}%`, undefined]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <CS.DonutLegend>
                {allocationData.slice(0, 4).map((item, i) => (
                  <CS.DonutLegendRow key={item.name}>
                    <CS.DonutSwatch $color={PIE_COLORS[i]} />
                    <CS.DonutName>{item.name}</CS.DonutName>
                    <CS.DonutPct>{item.value}%</CS.DonutPct>
                  </CS.DonutLegendRow>
                ))}
              </CS.DonutLegend>
            </CS.DonutRow>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        {/* Volume bars */}
        <Col span={14}>
          <Card variant="borderless" title="Weekly Volume — $M">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={dailyVolume} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="day" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip
                  {...tooltipStyle}
                  formatter={(value: number) => [`$${value}M`, undefined]}
                />
                <Bar
                  dataKey="buy"
                  name="Buy"
                  stackId="vol"
                  fill={COLORS.green}
                />
                <Bar
                  dataKey="sell"
                  name="Sell"
                  stackId="vol"
                  fill={COLORS.red}
                  opacity={0.85}
                />
                <Bar
                  dataKey="transfers"
                  name="Transfer"
                  stackId="vol"
                  fill={COLORS.cyan}
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Revenue bar */}
        <Col span={10}>
          <Card variant="borderless" title="Revenue by Product">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={revenueByProduct}
                layout="vertical"
                barSize={14}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={false} />
                <XAxis
                  type="number"
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${v}M`}
                />
                <YAxis
                  type="category"
                  dataKey="product"
                  tick={axisStyle}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  {...tooltipStyle}
                  formatter={(value: number) => [`$${value}M`, undefined]}
                />
                <Bar
                  dataKey="revenue"
                  fill={COLORS.navy}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </CS.DashboardStack>
  ),
}
