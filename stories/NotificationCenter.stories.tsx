import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Avatar, Button, Space, Typography } from 'antd'
import { NotificationCenter } from '../src/components/NotificationCenter'
import type { NotificationItem } from '../src/components/NotificationCenter'
import { GravityProvider } from '../src/theme/GravityProvider'
import {
  DemoActions,
  DemoAvatar,
  DemoBar,
  DemoBrand,
  DemoHint,
  DemoLogoMark,
  DemoPage,
  IsolatedStage,
} from './NotificationCenter.stories.styles'

const meta: Meta<typeof NotificationCenter> = {
  title: 'Feedback/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <GravityProvider>
        <Story />
      </GravityProvider>
    ),
  ],
  argTypes: {
    placement: { control: false },
    animate: { control: 'boolean' },
    filterable: { control: 'boolean' },
    showMarkAllRead: { control: 'boolean' },
    loading: { control: 'boolean' },
    width: { control: { type: 'number', min: 300, max: 520, step: 10 } },
  },
}

export default meta
type Story = StoryObj<typeof NotificationCenter>

// ---------------------------------------------------------------------------
// Fixtures — `time` accepts a Date and is auto-formatted to a relative string.
// ---------------------------------------------------------------------------

const minsAgo = (m: number) => new Date(Date.now() - m * 60_000)
const hoursAgo = (h: number) => new Date(Date.now() - h * 3_600_000)
const daysAgo = (d: number) => new Date(Date.now() - d * 86_400_000)

const SAMPLE: NotificationItem[] = [
  {
    id: '1',
    type: 'success',
    title: 'Payout of $12,480 settled',
    description: 'Transfer TXN-9401 to Martin Garcia completed successfully.',
    time: minsAgo(2),
  },
  {
    id: '2',
    type: 'warning',
    title: 'KYC review required',
    description: '3 client accounts are awaiting identity verification before trading is enabled.',
    time: minsAgo(26),
  },
  {
    id: '3',
    type: 'error',
    title: 'Transfer TXN-9398 failed',
    description: 'Insufficient funds. The client has been notified automatically.',
    time: hoursAgo(2),
  },
  {
    id: '4',
    type: 'info',
    title: 'New client invitation accepted',
    description: 'Sofia Fernandez joined your advisory workspace.',
    time: hoursAgo(5),
    icon: <Avatar style={{ background: 'linear-gradient(135deg,#003973,#00bbdd)' }}>SF</Avatar>,
  },
  {
    id: '5',
    type: 'info',
    title: 'Weekly portfolio report is ready',
    description: 'Average return +8.7% across 1,847 active accounts.',
    time: daysAgo(1),
    read: true,
  },
  {
    id: '6',
    type: 'success',
    title: 'Compliance audit passed',
    description: 'No exceptions found in the Q1 reconciliation run.',
    time: daysAgo(3),
    read: true,
  },
]

// ---------------------------------------------------------------------------
// In a top bar — the primary, realistic usage.
// ---------------------------------------------------------------------------

export const InTopBar: Story = {
  render: (args) => {
    const [items, setItems] = useState(SAMPLE)
    return (
      <>
        <DemoBar>
          <DemoBrand>
            <DemoLogoMark>G</DemoLogoMark>
            Gravity
          </DemoBrand>
          <DemoActions>
            <NotificationCenter
              {...args}
              items={items}
              onMarkRead={(id) =>
                setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
              }
              onMarkAllRead={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
              onDismiss={(id) => setItems((prev) => prev.filter((n) => n.id !== id))}
              onItemClick={(n) => console.log('open notification', n.id)}
              onViewAll={() => console.log('view all')}
            />
            <DemoAvatar>LB</DemoAvatar>
          </DemoActions>
        </DemoBar>
        <DemoPage>
          <Typography.Title level={4}>Dashboard</Typography.Title>
          <DemoHint>
            The bell rings and pulses while there are unread notifications. Click it to open the
            panel — the current page stays put. Hover a row to mark it read or dismiss it, switch
            between <b>All</b> and <b>Unread</b>, or clear everything with “Mark all as read”.
          </DemoHint>
          <Space>
            <Button onClick={() => setItems(SAMPLE)}>Reset</Button>
            <Button
              type="primary"
              onClick={() =>
                setItems((prev) => [
                  {
                    id: `live-${prev.length + 1}-${prev.length}`,
                    type: 'info',
                    title: 'Live market alert',
                    description: 'AAPL crossed your $220 price target.',
                    time: new Date(),
                  },
                  ...prev,
                ])
              }
            >
              Simulate incoming
            </Button>
          </Space>
        </DemoPage>
      </>
    )
  },
  args: {
    animate: true,
    filterable: true,
    showMarkAllRead: true,
  },
}

// ---------------------------------------------------------------------------
// Isolated — open by default for quick visual inspection of the panel.
// ---------------------------------------------------------------------------

export const PanelOpen: Story = {
  render: (args) => {
    const [items, setItems] = useState(SAMPLE)
    return (
      <DemoPage>
        <IsolatedStage>
          <NotificationCenter
            {...args}
            items={items}
            defaultOpen
            onMarkRead={(id) =>
              setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
            }
            onMarkAllRead={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
            onDismiss={(id) => setItems((prev) => prev.filter((n) => n.id !== id))}
            onViewAll={() => console.log('view all')}
          />
        </IsolatedStage>
      </DemoPage>
    )
  },
  args: {
    placement: 'bottom',
  },
}

// ---------------------------------------------------------------------------
// Empty state.
// ---------------------------------------------------------------------------

export const Empty: Story = {
  render: (args) => (
    <DemoPage>
      <IsolatedStage>
        <NotificationCenter {...args} items={[]} defaultOpen />
      </IsolatedStage>
    </DemoPage>
  ),
  args: { placement: 'bottom' },
}

// ---------------------------------------------------------------------------
// Loading state.
// ---------------------------------------------------------------------------

export const Loading: Story = {
  render: (args) => (
    <DemoPage>
      <IsolatedStage>
        <NotificationCenter {...args} items={[]} loading defaultOpen />
      </IsolatedStage>
    </DemoPage>
  ),
  args: { placement: 'bottom' },
}

// ---------------------------------------------------------------------------
// High volume — exercises the badge "99+" cap and scrolling.
// ---------------------------------------------------------------------------

export const HighVolume: Story = {
  render: (args) => {
    const many: NotificationItem[] = Array.from({ length: 140 }, (_, i) => ({
      id: String(i),
      type: (['info', 'success', 'warning', 'error'] as const)[i % 4],
      title: `Event #${140 - i}`,
      description: 'A simulated notification used to verify scrolling and the badge overflow cap.',
      time: minsAgo(i * 7),
    }))
    return (
      <DemoPage>
        <IsolatedStage>
          <NotificationCenter {...args} items={many} defaultOpen />
        </IsolatedStage>
      </DemoPage>
    )
  },
  args: { placement: 'bottom' },
}

// ---------------------------------------------------------------------------
// All read — quiet bell, no animation, no badge.
// ---------------------------------------------------------------------------

export const AllRead: Story = {
  render: (args) => (
    <DemoPage>
      <IsolatedStage>
        <NotificationCenter
          {...args}
          items={SAMPLE.map((n) => ({ ...n, read: true }))}
          defaultOpen
        />
      </IsolatedStage>
    </DemoPage>
  ),
  args: { placement: 'bottom' },
}

// ---------------------------------------------------------------------------
// Localized copy via `labels`.
// ---------------------------------------------------------------------------

export const Localized: Story = {
  render: (args) => {
    const items: NotificationItem[] = [
      {
        id: '1',
        type: 'success',
        title: 'Pago de $12.480 liquidado',
        description: 'La transferencia TXN-9401 a Martín García se completó con éxito.',
        time: minsAgo(3),
      },
      {
        id: '2',
        type: 'warning',
        title: 'Verificación KYC pendiente',
        description: '3 cuentas esperan verificación de identidad.',
        time: hoursAgo(1),
      },
    ]
    return (
      <DemoPage>
        <IsolatedStage>
          <NotificationCenter
            {...args}
            items={items}
            defaultOpen
            onViewAll={() => {}}
            labels={{
              title: 'Notificaciones',
              markAllRead: 'Marcar todo como leído',
              all: 'Todas',
              unread: 'No leídas',
              viewAll: 'Ver todas las notificaciones',
              empty: 'Estás al día',
              markRead: 'Marcar como leída',
              dismiss: 'Descartar',
            }}
          />
        </IsolatedStage>
      </DemoPage>
    )
  },
  args: { placement: 'bottom' },
}
