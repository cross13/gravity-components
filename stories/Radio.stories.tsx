import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import { Radio } from '../src/components/Radio'

const meta: Meta<typeof Radio> = {
  title: 'Primitives/Radio',
  component: Radio,
}

export default meta
type Story = StoryObj<typeof Radio>

const planOptions = [
  { value: 'starter', label: 'Starter' },
  { value: 'growth', label: 'Growth' },
  { value: 'scale', label: 'Scale' },
]

export const Default: Story = {
  render: () => (
    <Radio.Group defaultValue="growth" options={planOptions} />
  ),
}

export const Standalone: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" size="middle">
      <Radio defaultChecked>Enabled & checked</Radio>
      <Radio>Enabled</Radio>
      <Radio disabled>Disabled</Radio>
      <Radio disabled defaultChecked>
        Disabled & checked
      </Radio>
    </Space>
  ),
}

export const VerticalGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Radio.Group defaultValue="scale">
      <Space direction="vertical" size="small">
        <Radio value="starter">Starter — $0/mo</Radio>
        <Radio value="growth">Growth — $49/mo</Radio>
        <Radio value="scale">Scale — $199/mo</Radio>
      </Space>
    </Radio.Group>
  ),
}

export const ButtonGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" size="middle">
      <Radio.Group defaultValue="month">
        <Radio.Button value="day">Day</Radio.Button>
        <Radio.Button value="week">Week</Radio.Button>
        <Radio.Button value="month">Month</Radio.Button>
        <Radio.Button value="year">Year</Radio.Button>
      </Radio.Group>
      <Radio.Group defaultValue="all" disabled>
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="active">Active</Radio.Button>
        <Radio.Button value="archived">Archived</Radio.Button>
      </Radio.Group>
    </Space>
  ),
}
