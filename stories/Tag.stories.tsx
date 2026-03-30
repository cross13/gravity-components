import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { Tag } from '../src/components/Tag'

const meta: Meta<typeof Tag> = {
  title: 'Primitives/Tag',
  component: Tag,
  argTypes: {
    color: {
      control: 'select',
      options: [
        'success',
        'processing',
        'error',
        'warning',
        'default',
        'blue',
        'cyan',
        'green',
        'orange',
        'purple',
        'magenta',
        'red',
        'volcano',
        'gold',
        'lime',
      ],
    },
    variant: { control: 'select', options: ['filled', 'outlined', 'dashed'] },
    closable: { control: 'boolean' },
    bordered: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Default: Story = {
  args: {
    children: 'Active',
    color: 'success',
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" size="middle">
      <Space>
        <Tag color="success">Completed</Tag>
        <Tag color="processing">In Progress</Tag>
        <Tag color="warning">Pending Review</Tag>
        <Tag color="error">Failed</Tag>
        <Tag color="default">Draft</Tag>
      </Space>
      <Space>
        <Tag icon={<CheckCircleOutlined />} color="success">
          Verified
        </Tag>
        <Tag icon={<SyncOutlined spin />} color="processing">
          Syncing
        </Tag>
        <Tag icon={<ClockCircleOutlined />} color="warning">
          Awaiting
        </Tag>
        <Tag icon={<CloseCircleOutlined />} color="error">
          Rejected
        </Tag>
        <Tag icon={<ExclamationCircleOutlined />} color="default">
          Unreviewed
        </Tag>
      </Space>
      <Space>
        <Tag color="blue">Engineering</Tag>
        <Tag color="green">Design</Tag>
        <Tag color="orange">Marketing</Tag>
        <Tag color="purple">Finance</Tag>
      </Space>
    </Space>
  ),
}
