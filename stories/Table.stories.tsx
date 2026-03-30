import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space, Tag as AntTag } from 'antd'
import { Table } from '../src/components/Table'
import { Button } from '../src/components/Button'

interface Employee {
  key: string
  name: string
  email: string
  department: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  salary: number
}

const employees: Employee[] = [
  { key: '1', name: 'Sarah Connor', email: 'sarah@acme.io', department: 'Engineering', role: 'Staff Engineer', status: 'active', salary: 185000 },
  { key: '2', name: 'John Martinez', email: 'john@acme.io', department: 'Design', role: 'Senior Designer', status: 'active', salary: 142000 },
  { key: '3', name: 'Emily Zhang', email: 'emily@acme.io', department: 'Marketing', role: 'Marketing Lead', status: 'active', salary: 128000 },
  { key: '4', name: 'Michael Brown', email: 'michael@acme.io', department: 'Engineering', role: 'Junior Developer', status: 'pending', salary: 92000 },
  { key: '5', name: 'Lisa Anderson', email: 'lisa@acme.io', department: 'Sales', role: 'Account Executive', status: 'inactive', salary: 115000 },
]

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a: Employee, b: Employee) => a.name.localeCompare(b.name) },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Department', dataIndex: 'department', key: 'department', filters: [{ text: 'Engineering', value: 'Engineering' }, { text: 'Design', value: 'Design' }, { text: 'Marketing', value: 'Marketing' }], onFilter: (value: unknown, record: Employee) => record.department === value },
  { title: 'Role', dataIndex: 'role', key: 'role' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const colorMap: Record<string, string> = { active: 'success', inactive: 'default', pending: 'warning' }
      return <AntTag color={colorMap[status]}>{status.charAt(0).toUpperCase() + status.slice(1)}</AntTag>
    },
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
    key: 'salary',
    sorter: (a: Employee, b: Employee) => a.salary - b.salary,
    render: (val: number) => `$${val.toLocaleString()}`,
    align: 'right' as const,
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => (
      <Space>
        <Button type="link" size="small">Edit</Button>
        <Button type="link" size="small" danger>Remove</Button>
      </Space>
    ),
  },
]

type TableStoryArgs = Omit<
  React.ComponentProps<typeof Table>,
  'dataSource' | 'columns' | 'pagination'
> & {
  pagination?: boolean
}

const meta: Meta<TableStoryArgs> = {
  title: 'Data Display/Table',
  component: Table,
  argTypes: {
    bordered: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    showHeader: { control: 'boolean' },
    tableLayout: { control: 'select', options: ['auto', 'fixed'] },
    pagination: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<TableStoryArgs>

function tablePagination(show?: boolean) {
  if (show === false) return false
  return undefined
}

export const Default: Story = {
  render: (args) => {
    const { pagination, ...rest } = args
    return (
      <Table
        {...rest}
        pagination={tablePagination(pagination)}
        dataSource={employees}
        columns={columns}
      />
    )
  },
  args: {
    bordered: false,
    loading: false,
    size: 'middle',
    showHeader: true,
    pagination: true,
  },
}

export const WithSelection: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Table
      dataSource={employees}
      columns={columns}
      rowSelection={{ type: 'checkbox' }}
    />
  ),
}

export const Loading: Story = {
  render: (args) => {
    const { pagination, ...rest } = args
    return (
      <Table
        {...rest}
        pagination={tablePagination(pagination)}
        dataSource={[]}
        columns={columns}
      />
    )
  },
  args: {
    loading: true,
    bordered: false,
    size: 'middle',
    pagination: false,
  },
}

export const EmptyState: Story = {
  render: (args) => {
    const { pagination, ...rest } = args
    return (
      <Table
        {...rest}
        pagination={tablePagination(pagination)}
        dataSource={[]}
        columns={columns}
      />
    )
  },
  args: {
    loading: false,
    bordered: false,
    size: 'middle',
    pagination: true,
  },
}
