import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Descriptions, Space, Tag as AntTag, Typography } from 'antd'
import { Drawer } from '../src/components/Drawer'
import { Button } from '../src/components/Button'
import { DrawerNotes } from './Drawer.stories.styles'

const meta: Meta<typeof Drawer> = {
  title: 'Primitives/Drawer',
  component: Drawer,
  argTypes: {
    title: { control: 'text' },
    placement: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    size: { control: 'number' },
    closable: { control: 'boolean' },
    maskClosable: { control: 'boolean' },
    destroyOnClose: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

function DrawerWithTrigger(props: React.ComponentProps<typeof Drawer>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        View Order Details
      </Button>
      <Drawer
        {...props}
        open={open}
        onClose={() => setOpen(false)}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary">Approve</Button>
          </Space>
        }
      >
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Customer">Acme Corporation</Descriptions.Item>
          <Descriptions.Item label="Amount">$12,450.00</Descriptions.Item>
          <Descriptions.Item label="Status">
            <AntTag color="processing">Processing</AntTag>
          </Descriptions.Item>
          <Descriptions.Item label="Created">March 15, 2024</Descriptions.Item>
          <Descriptions.Item label="Items">24 units</Descriptions.Item>
        </Descriptions>
        <DrawerNotes>
          <Typography.Text strong>Notes:</Typography.Text> Priority shipment requested. Customer is
          a VIP account holder since 2019.
        </DrawerNotes>
      </Drawer>
    </>
  )
}

export const Default: Story = {
  render: (args) => <DrawerWithTrigger {...args} />,
  args: {
    title: 'Order #ORD-2024-0847',
    placement: 'right',
    size: 480,
  },
}
