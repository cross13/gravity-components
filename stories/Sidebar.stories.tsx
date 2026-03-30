import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Typography } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  SettingOutlined,
  TeamOutlined,
  BarChartOutlined,
  FundOutlined,
  BankOutlined,
  BellOutlined,
} from '@ant-design/icons'
import { Sidebar } from '../src/components/Sidebar'
import * as Chrome from './shared/demoChrome.styles'
import { StoryMain, StoryShell } from './Sidebar.stories.styles'

const meta: Meta<typeof Sidebar> = {
  title: 'Composites/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    collapsed: { control: 'boolean' },
    width: { control: 'number' },
    collapsedWidth: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof Sidebar>

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
      { key: 'clients-premium', label: 'Premium' },
    ],
  },
  { key: 'transactions', icon: <ShoppingCartOutlined />, label: 'Transactions' },
  { key: 'reports', icon: <FileTextOutlined />, label: 'Reports' },
  { key: 'compliance', icon: <BankOutlined />, label: 'Compliance' },
  { key: 'team', icon: <TeamOutlined />, label: 'Team' },
  { key: 'notifications', icon: <BellOutlined />, label: 'Notifications' },
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

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('dashboard')
    return (
      <StoryShell>
        <Sidebar
          {...args}
          items={navItems}
          selectedKey={selected}
          onSelect={setSelected}
          logo={<Logo />}
          collapsedLogo={<CollapsedLogo />}
        />
        <StoryMain>
          <Typography.Title level={4}>Selected: {selected}</Typography.Title>
          <Typography.Paragraph type="secondary">
            Click sidebar items to navigate. Use the collapse toggle at the bottom.
          </Typography.Paragraph>
        </StoryMain>
      </StoryShell>
    )
  },
  args: {
    collapsed: false,
    width: 240,
    collapsedWidth: 80,
  },
}

export const Collapsed: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryShell>
      <Sidebar
        items={navItems}
        selectedKey="dashboard"
        collapsed={true}
        logo={<Logo />}
        collapsedLogo={<CollapsedLogo />}
      />
      <StoryMain>
        <Typography.Text>Sidebar is collapsed to icon-only mode</Typography.Text>
      </StoryMain>
    </StoryShell>
  ),
}
