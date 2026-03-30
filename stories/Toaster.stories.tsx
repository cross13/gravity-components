import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import { Button } from '../src/components/Button'
import { toast } from '../src/components/Toaster'

const meta: Meta = {
  title: 'Feedback/Toaster (Sonner)',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Stack toasts powered by [Sonner](https://sonner.emilkowal.ski/), themed with Ant Design tokens via `GravityToaster`. A default instance is mounted by `GravityProvider` (`toaster` prop). Import `toast` from `gravity-components` to trigger notifications.',
      },
    },
  },
}

export default meta

type ToastPlayArgs = {
  variant: 'default' | 'success' | 'info' | 'warning' | 'error' | 'loading'
  title: string
  description: string
}

export const Playground: StoryObj<ToastPlayArgs> = {
  args: {
    variant: 'success',
    title: 'Trade executed',
    description: '500 units of GGAL at $2,450.00 ARS',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'info', 'warning', 'error', 'loading'],
    },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  render: (args) => {
    const { variant, title, description } = args
    const desc = description?.trim()
    const opts = desc ? { description: desc } : undefined
    return (
      <Button
        type="primary"
        onClick={() => {
          switch (variant) {
            case 'success':
              toast.success(title, opts)
              break
            case 'info':
              toast.info(title, opts)
              break
            case 'warning':
              toast.warning(title, opts)
              break
            case 'error':
              toast.error(title, opts)
              break
            case 'loading':
              toast.loading(title)
              break
            default:
              toast(title, opts)
          }
        }}
      >
        Show toast
      </Button>
    )
  },
}

export const Semantic: StoryObj = {
  name: 'Semantic variants',
  parameters: { controls: { disable: true } },
  render: () => (
    <Space wrap>
      <Button
        type="primary"
        onClick={() =>
          toast.success('Trade executed', {
            description: '500 units of GGAL at $2,450.00 ARS',
          })
        }
      >
        Success
      </Button>
      <Button
        onClick={() =>
          toast.info('Market update', {
            description: 'Trading session ends at 17:00 ART.',
          })
        }
      >
        Info
      </Button>
      <Button
        onClick={() =>
          toast.warning('KYC expiring', {
            description: 'Documentation expires in 7 days.',
          })
        }
      >
        Warning
      </Button>
      <Button
        danger
        onClick={() =>
          toast.error('Settlement failed', {
            description: 'Insufficient funds in the source account.',
          })
        }
      >
        Error
      </Button>
      <Button onClick={() => toast.loading('Syncing portfolio…')}>Loading</Button>
      <Button onClick={() => toast('Draft saved', { description: 'You can resume later.' })}>
        Default
      </Button>
    </Space>
  ),
}

export const WithAction: StoryObj = {
  name: 'With action',
  parameters: { controls: { disable: true } },
  render: () => (
    <Button
      type="primary"
      onClick={() =>
        toast('New wire transfer', {
          description: 'Review before approval.',
          action: {
            label: 'Review',
            onClick: () => toast.success('Opening transfer…'),
          },
          cancel: {
            label: 'Dismiss',
            onClick: () => {},
          },
        })
      }
    >
      Toast with action
    </Button>
  ),
}

export const PromiseToast: StoryObj = {
  name: 'Promise',
  parameters: { controls: { disable: true } },
  render: () => (
    <Button
      type="primary"
      onClick={() => {
        const promise = new Promise<{ amount: string }>((resolve) =>
          setTimeout(() => resolve({ amount: '$12,400.00' }), 2000),
        )
        toast.promise(promise, {
          loading: 'Posting settlement…',
          success: (data) => `Settlement complete — ${data.amount}`,
          error: 'Settlement failed',
        })
      }}
    >
      Run promise toast
    </Button>
  ),
}
