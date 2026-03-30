import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space, Typography, Avatar, Statistic, Row, Col } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import { Card } from '../src/components/Card'
import {
  BodyParagraph,
  DemoCard,
  MetaCard,
  SecondaryHint,
  SuccessHint,
  WarningHint,
} from './Card.stories.styles'

type CardStoryArgs = React.ComponentProps<typeof Card> & { bodyText?: string }

const meta: Meta<CardStoryArgs> = {
  title: 'Data Display/Card',
  component: Card,
  argTypes: {
    title: { control: 'text' },
    variant: { control: 'select', options: ['outlined', 'borderless'] },
    loading: { control: 'boolean' },
    hoverable: { control: 'boolean' },
    bodyText: { control: 'text', name: 'Body (text)' },
  },
}

export default meta
type Story = StoryObj<CardStoryArgs>

export const Default: Story = {
  render: (args) => {
    const { bodyText, ...cardProps } = args
    return (
      <DemoCard>
        <Card {...cardProps}>
          <BodyParagraph>{bodyText}</BodyParagraph>
        </Card>
      </DemoCard>
    )
  },
  args: {
    title: 'Project Summary',
    bodyText:
      'Gravity Components v1.0 — 27 requirements across 5 phases. Currently on track for Q2 delivery.',
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card title="Monthly Revenue" variant="borderless">
          <Statistic value={124500} prefix="$" precision={0} />
          <SuccessHint>+12.5% from last month</SuccessHint>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Active Users" variant="borderless">
          <Statistic value={8432} />
          <SecondaryHint>Updated 5 min ago</SecondaryHint>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Open Tickets" variant="borderless">
          <Statistic value={23} />
          <WarningHint>4 require immediate attention</WarningHint>
        </Card>
      </Col>
    </Row>
  ),
}

export const WithActions: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <MetaCard>
      <Card
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="more" />,
        ]}
      >
        <Card.Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
          title="Alex Johnson"
          description="Senior Product Manager — Joined March 2022"
        />
      </Card>
    </MetaCard>
  ),
}
