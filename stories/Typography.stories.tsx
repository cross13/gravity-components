import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space, Divider } from 'antd'
import { Text, Title, Paragraph, Link } from '../src/components/Typography'
import { Showcase as ShowcaseRoot } from './Typography.stories.styles'

const meta: Meta<typeof Title> = {
  title: 'Primitives/Typography',
  component: Title,
  argTypes: {
    level: { control: 'select', options: [1, 2, 3, 4, 5] },
    children: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Title>

export const TitlePlayground: Story = {
  name: 'Title',
  args: {
    level: 2,
    children: 'Revenue Report',
  },
}

type TextStoryArgs = Omit<React.ComponentProps<typeof Text>, 'type'> & {
  tone?: 'default' | 'secondary' | 'success' | 'warning' | 'danger'
}

export const TextPlayground: StoryObj<TextStoryArgs> = {
  name: 'Text',
  render: (args) => {
    const { tone, ...rest } = args
    return <Text {...rest} type={tone === 'default' ? undefined : tone} />
  },
  args: {
    tone: 'default',
    children: 'Regular text — order descriptions',
    strong: false,
    italic: false,
    disabled: false,
  },
  argTypes: {
    tone: { control: 'select', options: ['default', 'secondary', 'success', 'warning', 'danger'] },
    strong: { control: 'boolean' },
    italic: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
}

export const Showcase: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ShowcaseRoot>
      <Title>Dashboard Overview</Title>
      <Title level={2}>Revenue Report</Title>
      <Title level={3}>Q1 2024 Summary</Title>
      <Title level={4}>Monthly Breakdown</Title>
      <Title level={5}>Key Metrics</Title>

      <Divider />

      <Paragraph>
        Total revenue for Q1 2024 reached <Text strong>$2.4M</Text>, representing a{' '}
        <Text type="success">+18.3%</Text> increase compared to the previous quarter. Customer
        acquisition cost decreased to <Text code>$42.50</Text> per user.
      </Paragraph>

      <Space direction="vertical">
        <Text>Regular text — order descriptions</Text>
        <Text type="secondary">Secondary text — timestamps, metadata</Text>
        <Text type="success">Success — +$12,430.00 revenue</Text>
        <Text type="warning">Warning — 3 invoices overdue</Text>
        <Text type="danger">Error — Payment failed</Text>
        <Text disabled>Disabled — archived record</Text>
        <Link href="#">View full financial report →</Link>
      </Space>
    </ShowcaseRoot>
  ),
}
