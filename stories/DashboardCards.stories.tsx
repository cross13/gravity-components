import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Row, Col, Avatar, Typography, Tag as AntTag } from 'antd'
import {
  PlusOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  ExclamationCircleOutlined,
  FilterOutlined,
} from '@ant-design/icons'
import { StatCard } from '../src/components/StatCard'
import { Card } from '../src/components/Card'
import { Table } from '../src/components/Table'
import { Button } from '../src/components/Button'
import { Alert } from '../src/components/Alert'
import * as DS from './DashboardCards.stories.styles'

const { Text } = Typography

const meta: Meta = {
  title: 'Dashboard/Cards',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
}

export default meta

/* ─── Shared Helpers ──────────────────────────── */

const SparklineBars = ({
  color,
  heights,
}: {
  color: string
  heights: number[]
}) => (
  <DS.SparklineBarsRow>
    {heights.map((h, i) => (
      <DS.SparklineBarSeg
        key={i}
        $heightPct={h}
        $color={color}
        $opacity={0.12 + (i / heights.length) * 0.78}
      />
    ))}
  </DS.SparklineBarsRow>
)

const GradientProgress = ({
  label,
  percent,
  gradient,
}: {
  label: string
  percent: number
  gradient: string
}) => (
  <DS.GradientRoot>
    <DS.GradientLabels>
      <Text type="secondary">{label}</Text>
      <Text strong>{percent}%</Text>
    </DS.GradientLabels>
    <DS.GradientTrack>
      <DS.GradientFill $percent={percent} $gradient={gradient} />
    </DS.GradientTrack>
  </DS.GradientRoot>
)

/* ─── Stat Cards Row ──────────────────────────── */

export const StatCardsRow: StoryObj = {
  name: 'Stat Cards Row',
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

/* ─── Transaction Table Card ─────────────────── */

interface Transaction {
  key: string
  reference: string
  clientName: string
  clientType: string
  clientInitials: string
  avatarGradient: string
  type: string
  typeColor: string
  amount: string
  status: string
  statusColor: string
  date: string
}

const transactions: Transaction[] = [
  {
    key: '1',
    reference: '#TXN-9401',
    clientName: 'Martin Garcia',
    clientType: 'Premium Account',
    clientInitials: 'MG',
    avatarGradient: 'linear-gradient(135deg, #003973, #0077FF)',
    type: 'Buy',
    typeColor: 'cyan',
    amount: '$45,200.00',
    status: 'Settled',
    statusColor: 'success',
    date: 'Mar 28, 2026',
  },
  {
    key: '2',
    reference: '#TXN-9400',
    clientName: 'Sofia Fernandez',
    clientType: 'Institutional',
    clientInitials: 'SF',
    avatarGradient: 'linear-gradient(135deg, #00BBDD, #00D4FA)',
    type: 'Sell',
    typeColor: 'blue',
    amount: '$128,500.00',
    status: 'Settled',
    statusColor: 'success',
    date: 'Mar 27, 2026',
  },
  {
    key: '3',
    reference: '#TXN-9399',
    clientName: 'Ricardo Becerra',
    clientType: 'Standard',
    clientInitials: 'RB',
    avatarGradient: 'linear-gradient(135deg, #00B67A, #34D399)',
    type: 'Buy',
    typeColor: 'cyan',
    amount: '$12,800.00',
    status: 'Pending',
    statusColor: 'warning',
    date: 'Mar 27, 2026',
  },
  {
    key: '4',
    reference: '#TXN-9398',
    clientName: 'Camila Lopez',
    clientType: 'Premium Account',
    clientInitials: 'CL',
    avatarGradient: 'linear-gradient(135deg, #F5A623, #FBBF24)',
    type: 'Transfer',
    typeColor: 'default',
    amount: '$8,340.00',
    status: 'Failed',
    statusColor: 'error',
    date: 'Mar 26, 2026',
  },
  {
    key: '5',
    reference: '#TXN-9397',
    clientName: 'Juan Martinez',
    clientType: 'Institutional',
    clientInitials: 'JM',
    avatarGradient: 'linear-gradient(135deg, #E62626, #F87171)',
    type: 'Sell',
    typeColor: 'blue',
    amount: '$256,000.00',
    status: 'Processing',
    statusColor: 'processing',
    date: 'Mar 25, 2026',
  },
]

const txnColumns = [
  {
    title: 'Reference',
    dataIndex: 'reference',
    key: 'reference',
    render: (val: string) => <Text strong>{val}</Text>,
  },
  {
    title: 'Client',
    dataIndex: 'clientName',
    key: 'clientName',
    render: (_: unknown, record: Transaction) => (
      <DS.TxnClientRow>
        <DS.TxnClientAvatar size={32} $gradient={record.avatarGradient}>
          {record.clientInitials}
        </DS.TxnClientAvatar>
        <div>
          <DS.TxnClientName>{record.clientName}</DS.TxnClientName>
          <DS.TxnClientType>{record.clientType}</DS.TxnClientType>
        </div>
      </DS.TxnClientRow>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (val: string, record: Transaction) => (
      <AntTag color={record.typeColor}>{val}</AntTag>
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (val: string) => <DS.TxnAmountCell>{val}</DS.TxnAmountCell>,
    align: 'right' as const,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (val: string, record: Transaction) => (
      <AntTag color={record.statusColor}>{val}</AntTag>
    ),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (val: string) => <Text type="secondary">{val}</Text>,
  },
]

export const TransactionTable: StoryObj = {
  name: 'Transaction Table Card',
  render: () => (
    <Card
      variant="borderless"
      title="Recent Transactions"
      extra={
        <DS.CardExtraActions>
          <Button size="small" type="text">
            Export
          </Button>
          <Button size="small">View all</Button>
        </DS.CardExtraActions>
      }
      styles={{ body: { padding: 0 } }}
    >
      <Table
        dataSource={transactions}
        columns={txnColumns}
        pagination={false}
        size="middle"
      />
    </Card>
  ),
}

/* ─── Activity Feed Card ─────────────────────── */

interface ActivityItem {
  key: string
  icon: React.ReactNode
  iconBg: string
  iconColor: string
  text: React.ReactNode
  time: string
}

const activityItems: ActivityItem[] = [
  {
    key: '1',
    icon: <PlusOutlined />,
    iconBg: '#E5F9FD',
    iconColor: '#009BB8',
    text: (
      <>
        <strong>New account</strong> opened by Martin Garcia
      </>
    ),
    time: '5 min ago',
  },
  {
    key: '2',
    icon: <CheckCircleOutlined />,
    iconBg: '#E6F9F2',
    iconColor: '#00B67A',
    text: (
      <>
        <strong>Settlement complete</strong> for #TXN-9401
      </>
    ),
    time: '12 min ago',
  },
  {
    key: '3',
    icon: <FileTextOutlined />,
    iconBg: '#E8F0FA',
    iconColor: '#003973',
    text: (
      <>
        <strong>Report generated</strong> Q1 2026 Portfolio
      </>
    ),
    time: '1 hour ago',
  },
  {
    key: '4',
    icon: <ExclamationCircleOutlined />,
    iconBg: '#FFF8ED',
    iconColor: '#F5A623',
    text: (
      <>
        <strong>Compliance alert</strong> on transfer #TXN-9398
      </>
    ),
    time: '3 hours ago',
  },
]

export const ActivityFeed: StoryObj = {
  name: 'Activity Feed Card',
  render: () => (
    <DS.ActivityCardNarrow
      variant="borderless"
      title="Activity"
      extra={
        <Button size="small" type="text">
          View all
        </Button>
      }
      styles={{ body: { paddingTop: 8, paddingBottom: 8 } }}
    >
      {activityItems.map((item, idx) => (
        <DS.ActivityRow key={item.key} $showBorder={idx < activityItems.length - 1}>
          <DS.ActivityIconWrap $bg={item.iconBg} $color={item.iconColor}>
            {item.icon}
          </DS.ActivityIconWrap>
          <DS.ActivityBody>
            <DS.ActivityText>{item.text}</DS.ActivityText>
            <DS.ActivityTime>{item.time}</DS.ActivityTime>
          </DS.ActivityBody>
        </DS.ActivityRow>
      ))}
    </DS.ActivityCardNarrow>
  ),
}

/* ─── Progress Bars Card ─────────────────────── */

export const ProgressBarsCard: StoryObj = {
  name: 'Progress Bars Card',
  render: () => (
    <DS.MetricsCard variant="borderless" title="Performance Metrics">
      <DS.StackGap16>
        <GradientProgress
          label="Portfolio allocation"
          percent={78}
          gradient="linear-gradient(90deg, #003973, #0077FF)"
        />
        <GradientProgress
          label="Compliance check"
          percent={100}
          gradient="linear-gradient(90deg, #00B67A, #34D399)"
        />
        <GradientProgress
          label="Settlement queue"
          percent={62}
          gradient="linear-gradient(90deg, #00BBDD, #00D4FA)"
        />
        <GradientProgress
          label="Risk assessment"
          percent={45}
          gradient="linear-gradient(90deg, #F5A623, #FBBF24)"
        />
      </DS.StackGap16>
    </DS.MetricsCard>
  ),
}

/* ─── Bento Grid (Table + Activity) ──────────── */

export const BentoGrid: StoryObj = {
  name: 'Bento Grid Layout',
  render: () => (
    <Row gutter={[20, 20]}>
      <Col span={16}>
        <Card
          variant="borderless"
          title="Recent Transactions"
          extra={
            <DS.CardExtraActions>
              <Button size="small" type="text">
                Export
              </Button>
              <Button size="small">View all</Button>
            </DS.CardExtraActions>
          }
          styles={{ body: { padding: 0 } }}
        >
          <Table
            dataSource={transactions}
            columns={txnColumns}
            pagination={false}
            size="middle"
          />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          variant="borderless"
          title="Activity"
          extra={
            <Button size="small" type="text">
              View all
            </Button>
          }
          styles={{ body: { paddingTop: 8, paddingBottom: 8 } }}
        >
          {activityItems.map((item, idx) => (
            <DS.ActivityRow key={item.key} $showBorder={idx < activityItems.length - 1}>
              <DS.ActivityIconWrap $bg={item.iconBg} $color={item.iconColor}>
                {item.icon}
              </DS.ActivityIconWrap>
              <DS.ActivityBodyClamp>
                <DS.ActivityText ellipsis>
                  {item.text}
                </DS.ActivityText>
                <DS.ActivityTime>{item.time}</DS.ActivityTime>
              </DS.ActivityBodyClamp>
            </DS.ActivityRow>
          ))}
        </Card>
      </Col>
    </Row>
  ),
}

/* ─── Tags & Progress Card ───────────────────── */

export const TagsAndProgress: StoryObj = {
  name: 'Tags & Progress Card',
  render: () => (
    <DS.TagsProgressCard variant="borderless" title="Tags & Progress">
      <DS.StackGap20>
        <DS.TagWrap>
          <AntTag color="blue">Navy</AntTag>
          <AntTag color="cyan">Cyan</AntTag>
          <AntTag color="success">Settled</AntTag>
          <AntTag color="warning">Pending</AntTag>
          <AntTag color="error">Failed</AntTag>
          <AntTag color="processing">Processing</AntTag>
          <AntTag color="default">Draft</AntTag>
        </DS.TagWrap>
        <div>
          <DS.ProgressSectionLabel>Progress bars</DS.ProgressSectionLabel>
          <DS.StackGap12>
            <GradientProgress
              label="Portfolio allocation"
              percent={78}
              gradient="linear-gradient(90deg, #003973, #0077FF)"
            />
            <GradientProgress
              label="Compliance check"
              percent={100}
              gradient="linear-gradient(90deg, #00B67A, #34D399)"
            />
            <GradientProgress
              label="Settlement queue"
              percent={62}
              gradient="linear-gradient(90deg, #00BBDD, #00D4FA)"
            />
          </DS.StackGap12>
        </div>
      </DS.StackGap20>
    </DS.TagsProgressCard>
  ),
}

/* ─── Financial Alerts Card ──────────────────── */

export const FinancialAlerts: StoryObj = {
  name: 'Financial Alerts Card',
  render: () => (
    <DS.AlertsCard variant="borderless" title="Alerts">
      <DS.StackGap12>
        <Alert
          type="success"
          title="Transaction settled successfully."
          showIcon
        />
        <Alert
          type="warning"
          title="KYC documentation expires in 7 days. Renew now."
          showIcon
        />
        <Alert
          type="error"
          title="Transfer failed. Insufficient funds in source account."
          showIcon
        />
        <Alert
          type="info"
          title="Market closes at 17:00 ART. 2 hours remaining."
          showIcon
        />
      </DS.StackGap12>
    </DS.AlertsCard>
  ),
}

/* ─── Full Dashboard ─────────────────────────── */

export const FullDashboard: StoryObj = {
  name: 'Full Dashboard',
  render: () => (
    <DS.FullDashboardColumn>
      <DS.PageHeaderBar>
        <div>
          <DS.DashPageTitle>Dashboard</DS.DashPageTitle>
          <DS.DashPageSubtitle>
            Overview of your platform metrics and market activity.
          </DS.DashPageSubtitle>
        </div>
        <DS.HeaderButtonGroup>
          <Button icon={<FilterOutlined />}>Filter</Button>
          <DS.CyanPrimaryButton type="primary" icon={<PlusOutlined />}>
            New Report
          </DS.CyanPrimaryButton>
        </DS.HeaderButtonGroup>
      </DS.PageHeaderBar>

      {/* Stat Cards */}
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

      {/* Bento: Table + Activity */}
      <Row gutter={[20, 20]}>
        <Col span={16}>
          <Card
            variant="borderless"
            title="Recent Transactions"
            extra={
              <DS.CardExtraActions>
                <Button size="small" type="text">
                  Export
                </Button>
                <Button size="small">View all</Button>
              </DS.CardExtraActions>
            }
            styles={{ body: { padding: 0 } }}
          >
            <Table
              dataSource={transactions}
              columns={txnColumns}
              pagination={false}
              size="middle"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            variant="borderless"
            title="Activity"
            extra={
              <Button size="small" type="text">
                View all
              </Button>
            }
            styles={{ body: { paddingTop: 8, paddingBottom: 8 } }}
          >
            {activityItems.map((item, idx) => (
              <DS.ActivityRow key={item.key} $showBorder={idx < activityItems.length - 1}>
                <DS.ActivityIconWrap $bg={item.iconBg} $color={item.iconColor}>
                  {item.icon}
                </DS.ActivityIconWrap>
                <DS.ActivityBodyClamp>
                  <DS.ActivityText ellipsis>{item.text}</DS.ActivityText>
                  <DS.ActivityTime>{item.time}</DS.ActivityTime>
                </DS.ActivityBodyClamp>
              </DS.ActivityRow>
            ))}
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Card variant="borderless" title="Tags & Progress">
            <DS.StackGap20>
              <DS.TagWrap>
                <AntTag color="blue">Navy</AntTag>
                <AntTag color="cyan">Cyan</AntTag>
                <AntTag color="success">Settled</AntTag>
                <AntTag color="warning">Pending</AntTag>
                <AntTag color="error">Failed</AntTag>
                <AntTag color="processing">Processing</AntTag>
                <AntTag color="default">Draft</AntTag>
              </DS.TagWrap>
              <div>
                <DS.ProgressSubheading>Progress Bars</DS.ProgressSubheading>
                <DS.StackGap12>
                  <GradientProgress
                    label="Portfolio allocation"
                    percent={78}
                    gradient="linear-gradient(90deg, #003973, #0077FF)"
                  />
                  <GradientProgress
                    label="Compliance check"
                    percent={100}
                    gradient="linear-gradient(90deg, #00B67A, #34D399)"
                  />
                  <GradientProgress
                    label="Settlement queue"
                    percent={62}
                    gradient="linear-gradient(90deg, #00BBDD, #00D4FA)"
                  />
                </DS.StackGap12>
              </div>
            </DS.StackGap20>
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="borderless" title="Alerts">
            <DS.StackGap12>
              <Alert
                type="success"
                title="Transaction settled successfully."
                showIcon
              />
              <Alert
                type="warning"
                title="KYC documentation expires in 7 days. Renew now."
                showIcon
              />
              <Alert
                type="error"
                title="Transfer failed. Insufficient funds in source account."
                showIcon
              />
              <Alert
                type="info"
                title="Market closes at 17:00 ART. 2 hours remaining."
                showIcon
              />
            </DS.StackGap12>
          </Card>
        </Col>
      </Row>
    </DS.FullDashboardColumn>
  ),
}
