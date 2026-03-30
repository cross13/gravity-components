import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space, Avatar } from 'antd'
import { BellOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { Badge } from '../src/components/Badge'
import { MutedAvatar } from './Badge.stories.styles'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  argTypes: {
    count: { control: 'number' },
    dot: { control: 'boolean' },
    showZero: { control: 'boolean' },
    overflowCount: { control: 'number' },
    color: { control: 'color' },
    status: {
      control: 'select',
      options: ['success', 'processing', 'default', 'error', 'warning'],
    },
    text: { control: 'text' },
    size: { control: 'select', options: ['default', 'small'] },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
  render: (args) => (
    <Badge {...args}>
      <Avatar shape="square" icon={<MailOutlined />} size="large" />
    </Badge>
  ),
  args: {
    count: 5,
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space size="large">
      <Badge count={5}>
        <Avatar shape="square" icon={<MailOutlined />} size="large" />
      </Badge>
      <Badge count={12}>
        <Avatar shape="square" icon={<BellOutlined />} size="large" />
      </Badge>
      <Badge dot>
        <Avatar icon={<UserOutlined />} size="large" />
      </Badge>
    </Space>
  ),
}

export const StatusAndOverflow: Story = {
  name: 'Status & overflow',
  render: (args) => (
    <Space size="large" wrap>
      <Badge {...args} count={3} color="blue">
        <MutedAvatar shape="square" size="large">
          Tasks
        </MutedAvatar>
      </Badge>
      <Badge {...args} count={99} overflowCount={50}>
        <MutedAvatar shape="square" size="large">
          Alerts
        </MutedAvatar>
      </Badge>
      <Badge {...args} status="processing" text="Syncing data" />
      <Badge {...args} status="success" text="All systems operational" />
      <Badge {...args} status="warning" text="High memory usage" />
      <Badge {...args} status="error" text="Service unavailable" />
    </Space>
  ),
  args: {
    count: 3,
  },
}
