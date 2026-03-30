import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import { Empty } from '../src/components/Empty'

const meta: Meta<typeof Empty> = {
  title: 'Feedback/Empty',
  component: Empty,
  argTypes: {
    description: { control: 'text' },
    actionText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  args: {
    description: 'No orders found',
  },
}

export const WithAction: Story = {
  args: {
    description: 'No projects yet',
    actionText: 'Create Your First Project',
    onAction: () => console.log('Create clicked'),
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space size="large">
      <Empty description="No search results" />
      <Empty description="No team members" actionText="Invite Members" onAction={() => {}} />
    </Space>
  ),
}
