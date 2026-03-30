import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Tag as AntTag, Space } from 'antd'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import { DataGrid } from '../src/components/DataGrid'
import { Button } from '../src/components/Button'
import type { DataGridFetchParams } from '../src/components/DataGrid'

interface Order {
  key: string
  orderId: string
  customer: string
  amount: number
  status: 'completed' | 'processing' | 'pending' | 'cancelled'
  date: string
}

const allOrders: Order[] = Array.from({ length: 47 }, (_, i) => ({
  key: String(i + 1),
  orderId: `ORD-2024-${String(i + 1001).padStart(4, '0')}`,
  customer: ['Acme Corp', 'Globex Inc', 'Wayne Enterprises', 'Stark Industries', 'Umbrella Corp'][i % 5],
  amount: Math.round(Math.random() * 50000 + 500),
  status: (['completed', 'processing', 'pending', 'cancelled'] as const)[i % 4],
  date: `2024-0${(i % 9) + 1}-${String((i % 28) + 1).padStart(2, '0')}`,
}))

const columns = [
  { title: 'Order ID', dataIndex: 'orderId', key: 'orderId' },
  { title: 'Customer', dataIndex: 'customer', key: 'customer' },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (val: number) => `$${val.toLocaleString()}`,
    align: 'right' as const,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = {
        completed: 'success',
        processing: 'processing',
        pending: 'warning',
        cancelled: 'error',
      }
      return <AntTag color={colorMap[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</AntTag>
    },
  },
  { title: 'Date', dataIndex: 'date', key: 'date' },
]

const meta: Meta<typeof DataGrid> = {
  title: 'Enhanced/DataGrid',
  component: DataGrid,
  argTypes: {
    searchable: { control: 'boolean' },
    searchPlaceholder: { control: 'text' },
    pageSize: { control: 'number' },
    emptyText: { control: 'text' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof DataGrid>

const toolbar = (
  <Space>
    <Button icon={<DownloadOutlined />}>Export</Button>
    <Button type="primary" icon={<PlusOutlined />}>
      New Order
    </Button>
  </Space>
)

export const ClientSide: Story = {
  render: (args) => (
    <DataGrid<Order> {...args} columns={columns} dataSource={allOrders} toolbar={toolbar} />
  ),
  args: {
    searchable: true,
    searchPlaceholder: 'Search by order ID or customer...',
    pageSize: 10,
    loading: false,
    emptyText: 'No data found',
  },
}

export const ServerSide: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const handleFetch = async ({ page, pageSize, search }: DataGridFetchParams) => {
      await new Promise((r) => setTimeout(r, 500))
      let filtered = allOrders
      if (search) {
        const q = search.toLowerCase()
        filtered = allOrders.filter(
          (o) => o.orderId.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q),
        )
      }
      const start = (page - 1) * pageSize
      return {
        data: filtered.slice(start, start + pageSize),
        total: filtered.length,
      }
    }

    return (
      <DataGrid<Order>
        columns={columns}
        onFetch={handleFetch}
        searchPlaceholder="Search by order ID or customer..."
        toolbar={<Button type="primary" icon={<PlusOutlined />}>New Order</Button>}
      />
    )
  },
}

export const EmptyState: Story = {
  render: (args) => (
    <DataGrid<Order>
      {...args}
      columns={columns}
      dataSource={[]}
      emptyAction={<Button type="primary">Create First Order</Button>}
    />
  ),
  args: {
    emptyText: 'No orders match your criteria',
    searchable: true,
  },
}

export const Loading: Story = {
  render: (args) => (
    <DataGrid<Order> {...args} columns={columns} dataSource={[]} />
  ),
  args: {
    loading: true,
    searchable: false,
  },
}
