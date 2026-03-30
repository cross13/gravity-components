import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space, Col, Input, Tag as AntTag, Switch, Avatar } from 'antd'
import {
  CheckCircleOutlined,
  SearchOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons'
import { Button } from '../src/components/Button'
import { Card } from '../src/components/Card'
import { StatCard } from '../src/components/StatCard'
import { Alert } from '../src/components/Alert'
import { Text } from '../src/components/Typography'
import {
  AlertWrap,
  AvatarMg,
  AvatarRb,
  AvatarSf,
  ButtonSectionCard,
  FullWidthStack,
  HeroBlock,
  HeroLead,
  HeroTitle,
  PageWrap,
  PaletteCell,
  PaletteHex,
  PaletteLabel,
  PaletteRow,
  PaletteSwatch,
  StatRow,
  SwitchRow,
  TwoColRow,
} from './Welcome.stories.styles'

function ThemeShowcase() {
  return (
    <PageWrap>
      <HeroBlock>
        <HeroTitle>Gravity Components</HeroTitle>
        <HeroLead>
          A premium admin UI kit built on Ant Design v6 — featuring a deep navy &amp; cyan
          palette inspired by professional financial interfaces.
        </HeroLead>
      </HeroBlock>

      <AlertWrap>
        <Alert
          title="BBSA-Inspired Theme"
          description="Deep navy primary (#003973), bright cyan accents (#00BBDD), cool-toned neutrals, refined shadows, and generous spacing for a professional financial admin experience."
          type="info"
        />
      </AlertWrap>

      <StatRow gutter={[16, 16]}>
        <Col span={8}>
          <StatCard label="Total AUM" value="$12.4M" trend="up" trendValue="+14.2%" />
        </Col>
        <Col span={8}>
          <StatCard label="Active Accounts" value="1,847" trend="up" trendValue="+6.8%" />
        </Col>
        <Col span={8}>
          <StatCard label="Avg. Return" value="8.7" suffix="%" trend="down" trendValue="-1.3%" />
        </Col>
      </StatRow>

      <ButtonSectionCard title="Button Variants">
        <Space direction="vertical" size="middle">
          <Space wrap>
            <Button type="primary">Primary Action</Button>
            <Button>Secondary</Button>
            <Button type="dashed">Tertiary</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
          </Space>
          <Space wrap>
            <Button type="primary" danger>
              Delete
            </Button>
            <Button danger>Remove</Button>
            <Button type="primary" loading>
              Processing...
            </Button>
            <Button type="primary" icon={<ArrowRightOutlined />}>
              Continue
            </Button>
          </Space>
          <Space wrap>
            <Button size="small">Small</Button>
            <Button size="middle">Medium</Button>
            <Button size="large">Large</Button>
          </Space>
        </Space>
      </ButtonSectionCard>

      <TwoColRow gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Form Controls">
            <FullWidthStack>
              <Input placeholder="Search clients..." prefix={<SearchOutlined />} />
              <Input.Password placeholder="Password" />
              <SwitchRow>
                <Switch defaultChecked />
                <Text>Enable email alerts</Text>
              </SwitchRow>
            </FullWidthStack>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Tags & Status">
            <Space direction="vertical" size="middle">
              <Space wrap>
                <AntTag color="success" icon={<CheckCircleOutlined />}>
                  Settled
                </AntTag>
                <AntTag color="processing">Processing</AntTag>
                <AntTag color="warning">Pending</AntTag>
                <AntTag color="error">Failed</AntTag>
                <AntTag>Draft</AntTag>
              </Space>
              <Space wrap>
                <AntTag color="blue">Equities</AntTag>
                <AntTag color="cyan">Fixed Income</AntTag>
                <AntTag color="geekblue">Derivatives</AntTag>
                <AntTag color="green">FCI</AntTag>
              </Space>
              <Space>
                <Avatar.Group>
                  <AvatarMg>MG</AvatarMg>
                  <AvatarSf>SF</AvatarSf>
                  <AvatarRb>RB</AvatarRb>
                  <Avatar>+12</Avatar>
                </Avatar.Group>
              </Space>
            </Space>
          </Card>
        </Col>
      </TwoColRow>

      <Card title="Color Palette" styles={{ body: { padding: 0 } }}>
        <PaletteRow>
          {[
            { label: 'Primary', value: '#003973' },
            { label: 'Accent', value: '#00BBDD' },
            { label: 'Highlight', value: '#0077FF' },
            { label: 'Success', value: '#00B67A' },
            { label: 'Warning', value: '#F5A623' },
            { label: 'Error', value: '#E62626' },
            { label: 'Sidebar', value: '#001224' },
            { label: 'Layout', value: '#F0F3F7' },
          ].map((c) => (
            <PaletteCell key={c.label}>
              <PaletteSwatch $hex={c.value} />
              <PaletteLabel>{c.label}</PaletteLabel>
              <PaletteHex>{c.value}</PaletteHex>
            </PaletteCell>
          ))}
        </PaletteRow>
      </Card>
    </PageWrap>
  )
}

const meta: Meta = {
  title: 'Introduction/Welcome',
  component: ThemeShowcase,
  parameters: {
    controls: { disable: true },
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {}
