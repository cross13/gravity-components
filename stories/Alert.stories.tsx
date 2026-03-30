import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Alert } from '../src/components/Alert'
import { AlertStack } from './Alert.stories.styles'

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  argTypes: {
    type: { control: 'select', options: ['success', 'info', 'warning', 'error'] },
    title: { control: 'text' },
    description: { control: 'text' },
    closable: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    banner: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  args: {
    title: 'Your subscription renews in 3 days',
    type: 'info',
    showIcon: true,
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <AlertStack>
      <Alert title="Deployment completed successfully" type="success" />
      <Alert
        title="New feature available: Dark Mode"
        description="You can now switch to dark mode in your profile settings. Try it out!"
        type="info"
      />
      <Alert
        title="API rate limit approaching"
        description="You've used 85% of your monthly quota. Consider upgrading your plan."
        type="warning"
      />
      <Alert
        title="Payment failed"
        description="The card ending in 4242 was declined. Please update your payment method."
        type="error"
      />
      <Alert title="Maintenance scheduled" type="warning" closable />
    </AlertStack>
  ),
}
