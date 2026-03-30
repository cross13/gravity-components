import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Row, Col } from 'antd'
import { StatCard } from '../src/components/StatCard'
import { SparklineBar, SparklineRow, SparklineSvg, StatCardNarrow } from './StatCard.stories.styles'

const meta: Meta<typeof StatCard> = {
  title: 'Composites/StatCard',
  component: StatCard,
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    trend: { control: 'select', options: ['up', 'down', 'neutral'] },
    trendValue: { control: 'text' },
    accentColor: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof StatCard>

const SparklineBars = ({
  color,
  heights,
}: {
  color: string
  heights: number[]
}) => (
  <SparklineRow>
    {heights.map((h, i) => (
      <SparklineBar
        key={i}
        $heightPct={h}
        $color={color}
        $opacity={0.12 + (i / heights.length) * 0.78}
      />
    ))}
  </SparklineRow>
)

export const Default: Story = {
  args: {
    label: 'Total AUM',
    value: '12.4M',
    prefix: '$',
    trend: 'up',
    trendValue: '+14.2% from last quarter',
    accentColor: 'linear-gradient(90deg, #003973, #0077FF)',
  },
}

export const WithAccentGradients: Story = {
  name: 'Accent Gradients',
  parameters: { controls: { disable: true } },
  render: () => (
    <Row gutter={[20, 20]}>
      <Col span={6}>
        <StatCard
          label="Total AUM"
          prefix="$"
          value="12.4M"
          trend="up"
          trendValue="+14.2% vs last quarter"
          accentColor="linear-gradient(90deg, #003973, #0077FF)"
          sparkline={
            <SparklineBars
              color="#003973"
              heights={[40, 55, 45, 65, 55, 75, 60, 85, 72, 100]}
            />
          }
        />
      </Col>
      <Col span={6}>
        <StatCard
          label="Active Accounts"
          value="1,847"
          trend="up"
          trendValue="+6.8% from last month"
          accentColor="linear-gradient(90deg, #00BBDD, #00D4FA)"
          sparkline={
            <SparklineBars
              color="#00BBDD"
              heights={[50, 55, 65, 58, 72, 68, 80, 78, 92, 88]}
            />
          }
        />
      </Col>
      <Col span={6}>
        <StatCard
          label="Daily Volume"
          prefix="$"
          value="2.1M"
          trend="up"
          trendValue="+22.5% vs last week"
          accentColor="linear-gradient(90deg, #00B67A, #34D399)"
          sparkline={
            <SparklineBars
              color="#00B67A"
              heights={[30, 60, 40, 80, 50, 70, 65, 95, 85, 100]}
            />
          }
        />
      </Col>
      <Col span={6}>
        <StatCard
          label="Avg. Return"
          value="8.7"
          suffix="%"
          trend="down"
          trendValue="-1.3% from last quarter"
          accentColor="linear-gradient(90deg, #F5A623, #FBBF24)"
          sparkline={
            <SparklineBars
              color="#F5A623"
              heights={[90, 85, 80, 78, 70, 72, 65, 60, 55, 50]}
            />
          }
        />
      </Col>
    </Row>
  ),
}

export const SolidAccents: Story = {
  name: 'Solid Accents',
  parameters: { controls: { disable: true } },
  render: () => (
    <Row gutter={[20, 20]}>
      <Col span={8}>
        <StatCard
          label="Revenue"
          prefix="$"
          value="847K"
          trend="up"
          trendValue="+18% MoM"
          accentColor="#003973"
        />
      </Col>
      <Col span={8}>
        <StatCard
          label="Conversion Rate"
          value="3.2"
          suffix="%"
          trend="neutral"
          trendValue="No change"
          accentColor="#00BBDD"
        />
      </Col>
      <Col span={8}>
        <StatCard
          label="Churn Rate"
          value="1.8"
          suffix="%"
          trend="down"
          trendValue="+0.3% this month"
          accentColor="#E62626"
        />
      </Col>
    </Row>
  ),
}

export const WithSparkline: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StatCardNarrow>
      <StatCard
        label="Daily Volume"
        value="2.1M"
        prefix="$"
        trend="up"
        trendValue="+22.5% from last week"
        accentColor="linear-gradient(90deg, #00B67A, #34D399)"
        sparkline={
          <SparklineSvg viewBox="0 0 200 40">
            <defs>
              <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00B67A" />
                <stop offset="100%" stopColor="#34D399" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="url(#sparkGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points="0,35 30,25 60,30 90,15 120,20 150,8 180,12 200,5"
            />
          </SparklineSvg>
        }
      />
    </StatCardNarrow>
  ),
}

export const Minimal: Story = {
  name: 'No Trend',
  parameters: { controls: { disable: true } },
  render: () => (
    <Row gutter={[20, 20]}>
      <Col span={8}>
        <StatCard label="Total Users" value="24,891" />
      </Col>
      <Col span={8}>
        <StatCard
          label="Open Orders"
          value="142"
          accentColor="linear-gradient(90deg, #003973, #0077FF)"
        />
      </Col>
      <Col span={8}>
        <StatCard label="Pending Reviews" value="7" accentColor="#F5A623" />
      </Col>
    </Row>
  ),
}
