import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space, Typography } from 'antd'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Switch } from '../src/components/Switch'

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: { control: 'select', options: ['default', 'small'] },
  },
}

export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {
  args: { defaultChecked: true },
  render: (args) => <Switch {...args} />,
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" size="middle">
      <Space size="middle" align="center">
        <Switch defaultChecked />
        <Typography.Text type="secondary">On</Typography.Text>
      </Space>
      <Space size="middle" align="center">
        <Switch />
        <Typography.Text type="secondary">Off</Typography.Text>
      </Space>
      <Space size="middle" align="center">
        <Switch size="small" defaultChecked />
        <Typography.Text type="secondary">Small</Typography.Text>
      </Space>
      <Space size="middle" align="center">
        <Switch loading defaultChecked />
        <Typography.Text type="secondary">Loading</Typography.Text>
      </Space>
      <Space size="middle" align="center">
        <Switch disabled defaultChecked />
        <Typography.Text type="secondary">Disabled</Typography.Text>
      </Space>
      <Space size="middle" align="center">
        <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked />
        <Typography.Text type="secondary">With icons</Typography.Text>
      </Space>
      <Space size="middle" align="center">
        <Switch checkedChildren="ON" unCheckedChildren="OFF" />
        <Typography.Text type="secondary">With labels</Typography.Text>
      </Space>
    </Space>
  ),
}
