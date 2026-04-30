import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
  CheckCircleOutlined,
  TeamOutlined,
  WalletOutlined,
  TagOutlined,
  CalendarOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Filters } from '../src/components/Filters'
import type { FilterField, FilterValues } from '../src/components/Filters'

const fields: FilterField[] = [
  {
    key: 'status',
    label: 'Status',
    type: 'select',
    icon: <CheckCircleOutlined />,
    options: [
      { label: 'Active', value: 'active' },
      { label: 'Pending', value: 'pending' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
  {
    key: 'team',
    label: 'Advisor',
    type: 'multi-select',
    icon: <TeamOutlined />,
    options: [
      { label: 'María López', value: 'maria' },
      { label: 'Pablo Quiroga', value: 'pablo' },
      { label: 'Inés Bravo', value: 'ines' },
      { label: 'Eduardo Sánchez', value: 'eduardo' },
    ],
  },
  {
    key: 'wallet',
    label: 'Wallet',
    type: 'multi-select',
    icon: <WalletOutlined />,
    options: [
      { label: 'Conservadora — Pesos', value: 'cons-ars' },
      { label: 'Moderada — Pesos', value: 'mod-ars' },
      { label: 'Agresiva — Pesos', value: 'agg-ars' },
      { label: 'Moderada — Dólar', value: 'mod-usd' },
      { label: 'Agresiva — Dólar', value: 'agg-usd' },
    ],
  },
  {
    key: 'asset',
    label: 'Asset',
    type: 'text',
    icon: <TagOutlined />,
    placeholder: 'Ticker (e.g. AL30)',
  },
  {
    key: 'date',
    label: 'Date',
    type: 'date-range',
    icon: <CalendarOutlined />,
    placeholder: ['From', 'To'],
  },
  {
    key: 'name',
    label: 'Client name',
    type: 'text',
    icon: <UserOutlined />,
    placeholder: 'Search by name...',
  },
]

function ControlledFilters() {
  const [value, setValue] = useState<FilterValues>({})
  const total = 1842
  const matched =
    Math.max(0, Math.round(total / Math.max(1, Object.keys(value).length + 1)))
  const hasFilters = Object.keys(value).length > 0
  return (
    <div style={{ width: '100%', maxWidth: 1100 }}>
      <Filters
        fields={fields}
        value={value}
        onChange={setValue}
        resultSummary={hasFilters ? `${matched.toLocaleString()} of ${total.toLocaleString()} results` : null}
      />
      <pre
        style={{
          marginTop: 24,
          padding: 16,
          background: '#0d1b2a',
          color: '#a3e8ff',
          borderRadius: 8,
          fontSize: 12,
          lineHeight: 1.6,
        }}
      >
        {JSON.stringify(value, null, 2)}
      </pre>
    </div>
  )
}

const meta: Meta<typeof Filters> = {
  title: 'Enhanced/Filters',
  component: Filters,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Chip-based filter bar. Declare fields with `type: select | multi-select | date-range | text`. ' +
          'Click "Add filter" to pick a field, edit in the popover, Apply to commit. Closing without Apply cancels. ' +
          'Single-select commits on click. Controlled via `value` + `onChange`, or use `defaultValue` for uncontrolled.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Filters>

export const Empty: Story = {
  parameters: { controls: { disable: true } },
  render: () => <ControlledFilters />,
}

export const PreFilled: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    function PreFilledInner() {
      const [value, setValue] = useState<FilterValues>({
        status: 'active',
        team: ['maria', 'pablo'],
      })
      return (
        <div style={{ width: '100%', maxWidth: 1100 }}>
          <Filters
            fields={fields}
            value={value}
            onChange={setValue}
            resultSummary="312 of 1,842 results"
          />
        </div>
      )
    }
    return <PreFilledInner />
  },
}

export const Uncontrolled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ width: '100%', maxWidth: 1100 }}>
      <Filters fields={fields} defaultValue={{ status: 'active' }} />
    </div>
  ),
}
