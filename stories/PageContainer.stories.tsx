import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Typography, Card as AntCard, Row, Col } from 'antd'
import { PageContainer } from '../src/components/PageContainer'
import { PageDemoShell } from './PageContainer.stories.styles'

const meta: Meta<typeof PageContainer> = {
  title: 'Layout/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    maxWidth: { control: 'number' },
    padding: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof PageContainer>

export const Default: Story = {
  render: (args) => (
    <PageDemoShell>
      <PageContainer {...args}>
        <Typography.Title level={3}>Dashboard</Typography.Title>
        <Row gutter={16}>
          <Col span={8}>
            <AntCard title="Revenue">$124,500</AntCard>
          </Col>
          <Col span={8}>
            <AntCard title="Users">8,432</AntCard>
          </Col>
          <Col span={8}>
            <AntCard title="Orders">1,247</AntCard>
          </Col>
        </Row>
      </PageContainer>
    </PageDemoShell>
  ),
  args: {
    maxWidth: 1200,
    padding: 24,
  },
}
