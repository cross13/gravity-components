import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons'
import { PageHeader } from '../src/components/PageHeader'
import { Button } from '../src/components/Button'

type PageHeaderStoryArgs = React.ComponentProps<typeof PageHeader> & {
  showBreadcrumb?: boolean
}

const meta: Meta<PageHeaderStoryArgs> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '32px 40px', background: '#F0F3F7', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    showBreadcrumb: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<PageHeaderStoryArgs>

const defaultActions = (
  <>
    <Button icon={<DownloadOutlined />}>Export</Button>
    <Button type="primary" icon={<PlusOutlined />}>
      Add Employee
    </Button>
  </>
)

const tabItems = [
  { key: 'overview', label: 'Overview' },
  { key: 'activity', label: 'Activity' },
  { key: 'documents', label: 'Documents' },
  { key: 'settings', label: 'Settings' },
]

export const Default: Story = {
  render: (args) => {
    const { showBreadcrumb, ...rest } = args
    return (
      <PageHeader
        {...rest}
        breadcrumb={
          showBreadcrumb
            ? [{ title: 'Home' }, { title: 'HR' }, { title: 'Employees' }]
            : undefined
        }
        actions={defaultActions}
      />
    )
  },
  args: {
    title: 'Employee Directory',
    showBreadcrumb: true,
  },
}

export const Simple: Story = {
  render: (args) => {
    const { showBreadcrumb, ...rest } = args
    return (
      <PageHeader
        {...rest}
        breadcrumb={
          showBreadcrumb ? [{ title: 'Home' }, { title: 'Settings' }] : undefined
        }
      />
    )
  },
  args: {
    title: 'Settings',
    showBreadcrumb: false,
  },
}

export const WithSubtitle: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageHeader
      title="Employee Directory"
      subtitle="Manage your team members and their account permissions."
      breadcrumb={[{ title: 'Home' }, { title: 'HR' }, { title: 'Employees' }]}
      actions={defaultActions}
    />
  ),
}

export const WithBackButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageHeader
      title="John Appleseed"
      subtitle="Senior Software Engineer · Engineering"
      breadcrumb={[{ title: 'Home' }, { title: 'HR' }, { title: 'Employees' }, { title: 'John Appleseed' }]}
      onBack={() => alert('Back clicked')}
      actions={
        <>
          <Button>Edit Profile</Button>
          <Button type="primary">Send Message</Button>
        </>
      }
    />
  ),
}

export const WithTabs: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageHeader
      title="Project Alpha"
      breadcrumb={[{ title: 'Home' }, { title: 'Projects' }, { title: 'Alpha' }]}
      actions={defaultActions}
      tabs={{ items: tabItems, defaultActiveKey: 'overview' }}
    />
  ),
}

export const WithAll: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageHeader
      title="John Appleseed"
      subtitle="Senior Software Engineer · Engineering"
      breadcrumb={[{ title: 'Home' }, { title: 'HR' }, { title: 'Employees' }, { title: 'John Appleseed' }]}
      onBack={() => alert('Back clicked')}
      actions={
        <>
          <Button icon={<DownloadOutlined />}>Export</Button>
          <Button type="primary" icon={<PlusOutlined />}>
            New Task
          </Button>
        </>
      }
      tabs={{ items: tabItems, defaultActiveKey: 'overview' }}
    />
  ),
}

export const WithBreadcrumbOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageHeader
      title="Invoice #INV-2024-0847"
      breadcrumb={[
        { title: 'Home' },
        { title: 'Finance' },
        { title: 'Invoices' },
        { title: '#INV-2024-0847' },
      ]}
    />
  ),
}
