import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Typography, Space, Dropdown, Row, Col, Table, Tag as AntTag } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  SettingOutlined,
  BellOutlined,
  BarChartOutlined,
  TeamOutlined,
  PlusOutlined,
  FundOutlined,
  BankOutlined,
} from '@ant-design/icons'
import { AppShell } from '../src/components/AppShell'
import { Sidebar } from '../src/components/Sidebar'
import { PageHeader } from '../src/components/PageHeader'
import { StatCard } from '../src/components/StatCard'
import { Button } from '../src/components/Button'
import { Badge } from '../src/components/Badge'
import * as Chrome from './shared/demoChrome.styles'
import {
  HeaderBar,
  HeaderBell,
  HeaderDate,
  TransactionsCard,
  TxnAmount,
  TxnRef,
  UserAvatar,
  UserLines,
  UserMenuSpace,
  UserName,
  UserRole,
} from './AppShell.stories.styles'

const meta: Meta<typeof AppShell> = {
  title: 'Composites/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
}

export default meta
type Story = StoryObj<typeof AppShell>

const navItems = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: 'analytics', icon: <BarChartOutlined />, label: 'Analytics' },
  { key: 'portfolio', icon: <FundOutlined />, label: 'Portfolio' },
  {
    key: 'clients',
    icon: <UserOutlined />,
    label: 'Clients',
    children: [
      { key: 'clients-list', label: 'All Clients' },
      { key: 'clients-institutional', label: 'Institutional' },
    ],
  },
  { key: 'transactions', icon: <ShoppingCartOutlined />, label: 'Transactions' },
  { key: 'reports', icon: <FileTextOutlined />, label: 'Reports' },
  { key: 'compliance', icon: <BankOutlined />, label: 'Compliance' },
  { key: 'team', icon: <TeamOutlined />, label: 'Team' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
]

const Logo = () => (
  <Chrome.DemoLogoRow>
    <Chrome.DemoLogoMark>
      <Chrome.DemoLogoLetter>G</Chrome.DemoLogoLetter>
    </Chrome.DemoLogoMark>
    <Chrome.DemoWordmark>Gravity</Chrome.DemoWordmark>
  </Chrome.DemoLogoRow>
)

const CollapsedLogo = () => (
  <Chrome.DemoCollapsedMark>
    <Chrome.DemoCollapsedLetter>G</Chrome.DemoCollapsedLetter>
  </Chrome.DemoCollapsedMark>
)

const HeaderContent = () => (
  <HeaderBar>
    <HeaderDate>Monday, March 30 2026</HeaderDate>
    <Space size="middle" align="center">
      <Badge count={3} size="small">
        <HeaderBell />
      </Badge>
      <Dropdown
        menu={{
          items: [
            { key: 'profile', label: 'My Profile' },
            { key: 'settings', label: 'Settings' },
            { type: 'divider' },
            { key: 'logout', label: 'Sign Out', danger: true },
          ],
        }}
      >
        <UserMenuSpace size={8}>
          <UserAvatar>LB</UserAvatar>
          <UserLines>
            <UserName>Lucas Borella</UserName>
            <UserRole>Administrator</UserRole>
          </UserLines>
        </UserMenuSpace>
      </Dropdown>
    </Space>
  </HeaderBar>
)

const recentTransactions = [
  { key: '1', id: 'TXN-9401', client: 'Martin Garcia', amount: '$45,200', type: 'Buy', status: 'settled', date: 'Mar 28' },
  { key: '2', id: 'TXN-9400', client: 'Sofia Fernandez', amount: '$128,500', type: 'Sell', status: 'settled', date: 'Mar 27' },
  { key: '3', id: 'TXN-9399', client: 'Ricardo Becerra', amount: '$12,800', type: 'Buy', status: 'pending', date: 'Mar 27' },
  { key: '4', id: 'TXN-9398', client: 'Camila Lopez', amount: '$8,340', type: 'Transfer', status: 'failed', date: 'Mar 26' },
  { key: '5', id: 'TXN-9397', client: 'Juan Martinez', amount: '$256,000', type: 'Sell', status: 'processing', date: 'Mar 25' },
]

const txnColumns = [
  {
    title: 'Reference',
    dataIndex: 'id',
    key: 'id',
    render: (v: string) => <TxnRef>{v}</TxnRef>,
  },
  { title: 'Client', dataIndex: 'client', key: 'client' },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (t: string) => {
      const colorMap: Record<string, string> = { Buy: 'cyan', Sell: 'blue', Transfer: 'default' }
      return <AntTag color={colorMap[t] || 'default'}>{t}</AntTag>
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    align: 'right' as const,
    render: (v: string) => <TxnAmount>{v}</TxnAmount>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (s: string) => {
      const map: Record<string, string> = {
        settled: 'success',
        processing: 'processing',
        pending: 'warning',
        failed: 'error',
      }
      return <AntTag color={map[s]}>{s.charAt(0).toUpperCase() + s.slice(1)}</AntTag>
    },
  },
  { title: 'Date', dataIndex: 'date', key: 'date' },
]

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('dashboard')
    return (
      <AppShell
        sidebar={
          <Sidebar
            items={navItems}
            selectedKey={selected}
            onSelect={setSelected}
            logo={<Logo />}
            collapsedLogo={<CollapsedLogo />}
          />
        }
        header={<HeaderContent />}
      >
        <PageHeader
          title="Dashboard"
          breadcrumb={[{ title: 'Home' }, { title: 'Dashboard' }]}
          actions={
            <Button type="primary" icon={<PlusOutlined />}>
              New Report
            </Button>
          }
        />

        <Row gutter={[20, 20]}>
          <Col span={6}>
            <StatCard label="Total AUM" value="$12.4M" trend="up" trendValue="+14.2%" />
          </Col>
          <Col span={6}>
            <StatCard label="Active Accounts" value="1,847" trend="up" trendValue="+6.8%" />
          </Col>
          <Col span={6}>
            <StatCard label="Daily Volume" value="$2.1M" trend="up" trendValue="+22.5%" />
          </Col>
          <Col span={6}>
            <StatCard
              label="Avg. Return"
              value="8.7"
              suffix="%"
              trend="down"
              trendValue="-1.3%"
            />
          </Col>
        </Row>

        <TransactionsCard title="Recent Transactions">
          <Table
            dataSource={recentTransactions}
            columns={txnColumns}
            pagination={false}
            size="middle"
          />
        </TransactionsCard>
      </AppShell>
    )
  },
}
