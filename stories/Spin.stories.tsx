import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space, Typography } from 'antd'
import { Spin } from '../src/components/Spin'
import { Skeleton } from '../src/components/Skeleton'
import { SkeletonStack, SpinContentCard } from './Spin.stories.styles'

const meta: Meta<typeof Spin> = {
  title: 'Feedback/Loading',
  component: Spin,
  argTypes: {
    size: { control: 'select', options: ['small', 'default', 'large'] },
    tip: { control: 'text' },
    spinning: { control: 'boolean' },
    fullscreen: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Spin>

export const Playground: Story = {
  name: 'Spin',
  args: {
    size: 'default',
    tip: '',
    spinning: true,
  },
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space size="large" align="center">
      <Spin size="small" />
      <Spin />
      <Spin size="large" />
    </Space>
  ),
}

export const SpinWithContent: Story = {
  name: 'Spin with Content',
  parameters: { controls: { disable: true } },
  render: () => (
    <Spin tip="Loading dashboard data...">
      <SpinContentCard>
        <Typography.Paragraph>This content is loading...</Typography.Paragraph>
      </SpinContentCard>
    </Spin>
  ),
}

export const SkeletonDefault: StoryObj<typeof Skeleton> = {
  name: 'Skeleton',
  parameters: { controls: { disable: true } },
  render: () => (
    <SkeletonStack>
      <Skeleton active />
      <Skeleton active avatar paragraph={{ rows: 2 }} />
    </SkeletonStack>
  ),
}

export const SkeletonPlayground: StoryObj<typeof Skeleton> = {
  render: (args) => <Skeleton {...args} paragraph={{ rows: 3 }} />,
  args: {
    active: true,
    title: true,
    avatar: false,
  },
  argTypes: {
    active: { control: 'boolean' },
    title: { control: 'boolean' },
    avatar: { control: 'boolean' },
  },
}
