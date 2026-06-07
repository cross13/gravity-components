import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import { InputNumber } from '../src/components/InputNumber'

const meta: Meta<typeof InputNumber> = {
  title: 'Primitives/InputNumber',
  component: InputNumber,
  argTypes: {
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof InputNumber>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 12,
    style: { width: 200 },
  },
  render: (args) => <InputNumber {...args} />,
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" size="middle">
      <InputNumber min={0} max={100} defaultValue={42} style={{ width: 200 }} />
      <InputNumber
        defaultValue={1000}
        style={{ width: 200 }}
        formatter={(v) => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={(v) => (v ? Number(v.replace(/\$\s?|(,*)/g, '')) : 0)}
      />
      <InputNumber defaultValue={50} addonAfter="%" style={{ width: 200 }} />
      <InputNumber defaultValue={5} addonBefore="Qty" style={{ width: 200 }} />
      <InputNumber min={0} step={0.5} defaultValue={2.5} style={{ width: 200 }} />
      <InputNumber defaultValue={10} disabled style={{ width: 200 }} />
    </Space>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" size="middle">
      <InputNumber size="small" defaultValue={3} style={{ width: 200 }} />
      <InputNumber size="middle" defaultValue={3} style={{ width: 200 }} />
      <InputNumber size="large" defaultValue={3} style={{ width: 200 }} />
    </Space>
  ),
}
