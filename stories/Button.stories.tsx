import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import { DownloadOutlined, PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button } from '../src/components/Button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'default', 'dashed', 'text', 'link'],
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large'],
    },
    iconPlacement: {
      control: 'select',
      options: ['start', 'end'],
    },
    danger: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    block: { control: 'boolean' },
    ghost: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Create User',
    type: 'primary',
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" size="middle">
      <Space>
        <Button type="primary">Create Invoice</Button>
        <Button>View Details</Button>
        <Button type="dashed">Add Field</Button>
        <Button type="text">Cancel</Button>
        <Button type="link">Learn More</Button>
      </Space>
      <Space>
        <Button type="primary" danger>
          Delete Account
        </Button>
        <Button danger>Remove Item</Button>
      </Space>
      <Space>
        <Button type="primary" icon={<PlusOutlined />}>
          New Project
        </Button>
        <Button icon={<DownloadOutlined />}>Export CSV</Button>
        <Button icon={<EditOutlined />}>Edit</Button>
        <Button type="primary" danger icon={<DeleteOutlined />}>
          Delete
        </Button>
      </Space>
    </Space>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <Space>
      <Button {...args} size="small">
        Small
      </Button>
      <Button {...args} size="middle">
        Medium
      </Button>
      <Button {...args} size="large">
        Large
      </Button>
    </Space>
  ),
  args: {
    children: 'Button',
    type: 'primary',
  },
}

export const Loading: Story = {
  args: {
    children: 'Saving...',
    type: 'primary',
    loading: true,
  },
}

export const Disabled: Story = {
  render: (args) => (
    <Space>
      <Button {...args} type="primary" disabled>
        Submit
      </Button>
      <Button {...args} type="default" disabled>
        Cancel
      </Button>
    </Space>
  ),
  args: {
    children: 'Submit',
  },
}
