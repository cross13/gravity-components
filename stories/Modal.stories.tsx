import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Space, Input as AntInput, Typography } from 'antd'
import { Modal } from '../src/components/Modal'
import { Button } from '../src/components/Button'
import { ModalBodyStack } from './Modal.stories.styles'

const meta: Meta<typeof Modal> = {
  title: 'Primitives/Modal',
  component: Modal,
  argTypes: {
    title: { control: 'text' },
    okText: { control: 'text' },
    cancelText: { control: 'text' },
    centered: { control: 'boolean' },
    closable: { control: 'boolean' },
    maskClosable: { control: 'boolean' },
    destroyOnClose: { control: 'boolean' },
    width: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof Modal>

function ModalWithTrigger(props: React.ComponentProps<typeof Modal>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open modal
      </Button>
      <Modal
        {...props}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <ModalBodyStack direction="vertical" size="middle">
          <div>
            <Typography.Text strong>Full Name</Typography.Text>
            <AntInput defaultValue="Sarah Connor" />
          </div>
          <div>
            <Typography.Text strong>Email</Typography.Text>
            <AntInput defaultValue="sarah@skynet.io" />
          </div>
        </ModalBodyStack>
      </Modal>
    </>
  )
}

export const Default: Story = {
  render: (args) => <ModalWithTrigger {...args} />,
  args: {
    title: 'Edit User Profile',
    okText: 'Save Changes',
    cancelText: 'Cancel',
    centered: true,
    width: 520,
  },
}

export const Confirmation: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button danger onClick={() => setOpen(true)}>
          Delete Account
        </Button>
        <Modal
          title="Delete Account"
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          okText="Yes, Delete"
          okButtonProps={{ danger: true }}
          cancelText="Keep Account"
        >
          <Typography.Paragraph>
            Are you sure you want to permanently delete this account? This action cannot be undone
            and all associated data will be lost.
          </Typography.Paragraph>
        </Modal>
      </>
    )
  },
}
