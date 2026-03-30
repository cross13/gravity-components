import type { Meta, StoryObj } from '@storybook/react'
import React, { useState, useCallback } from 'react'
import {
  Row,
  Col,
  Avatar,
  Typography,
  Tag as AntTag,
  Space,
  Switch,
  Checkbox,
  Radio,
  Tabs,
  Badge as AntBadge,
  Tooltip,
} from 'antd'
import {
  PlusOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  CopyOutlined,
} from '@ant-design/icons'
import { GravityProvider } from '../src/theme/GravityProvider'
import { defaultTokens } from '../src/theme/tokens/global'
import type { GravityTokens } from '../src/theme/tokens/global'
import { StatCard } from '../src/components/StatCard'
import { Card } from '../src/components/Card'
import { Table } from '../src/components/Table'
import { Button } from '../src/components/Button'
import { Input, Password, TextArea } from '../src/components/Input'
import { Select } from '../src/components/Select'
import { Alert } from '../src/components/Alert'
import { DatePicker } from '../src/components/DatePicker'
import * as TP from './ThemePlayground.stories.styles'

const { Text, Paragraph } = Typography

/* ─── Brand Presets ───────────────────────────── */

type BrandPreset = {
  name: string
  tokens: Partial<GravityTokens>
  accent: string
}

const brandPresets: BrandPreset[] = [
  {
    name: 'Gravity (Default)',
    accent: '#003973',
    tokens: {
      colorPrimary: '#003973',
      colorSuccess: '#00B67A',
      colorWarning: '#F5A623',
      colorError: '#E62626',
      colorInfo: '#0077FF',
      borderRadius: 8,
      fontSize: 14,
      colorBgContainer: '#FFFFFF',
      colorBgLayout: '#F0F3F7',
      colorTextBase: '#0D1B2A',
      colorBorder: '#D5DCE5',
      controlHeight: 40,
    },
  },
  {
    name: 'Ocean Teal',
    accent: '#0D9488',
    tokens: {
      colorPrimary: '#0D9488',
      colorSuccess: '#22C55E',
      colorWarning: '#EAB308',
      colorError: '#EF4444',
      colorInfo: '#06B6D4',
      borderRadius: 10,
      fontSize: 14,
      colorBgContainer: '#FFFFFF',
      colorBgLayout: '#F0FDFA',
      colorTextBase: '#0F172A',
      colorBorder: '#CCFBF1',
      controlHeight: 40,
    },
  },
  {
    name: 'Royal Purple',
    accent: '#7C3AED',
    tokens: {
      colorPrimary: '#7C3AED',
      colorSuccess: '#10B981',
      colorWarning: '#F59E0B',
      colorError: '#EF4444',
      colorInfo: '#8B5CF6',
      borderRadius: 12,
      fontSize: 14,
      colorBgContainer: '#FFFFFF',
      colorBgLayout: '#F5F3FF',
      colorTextBase: '#1E1B4B',
      colorBorder: '#E9D5FF',
      controlHeight: 42,
    },
  },
  {
    name: 'Ember Orange',
    accent: '#EA580C',
    tokens: {
      colorPrimary: '#EA580C',
      colorSuccess: '#16A34A',
      colorWarning: '#CA8A04',
      colorError: '#DC2626',
      colorInfo: '#F97316',
      borderRadius: 6,
      fontSize: 14,
      colorBgContainer: '#FFFFFF',
      colorBgLayout: '#FFF7ED',
      colorTextBase: '#1C1917',
      colorBorder: '#FDBA74',
      controlHeight: 38,
    },
  },
  {
    name: 'Slate Minimal',
    accent: '#475569',
    tokens: {
      colorPrimary: '#475569',
      colorSuccess: '#059669',
      colorWarning: '#D97706',
      colorError: '#DC2626',
      colorInfo: '#2563EB',
      borderRadius: 4,
      fontSize: 13,
      colorBgContainer: '#FFFFFF',
      colorBgLayout: '#F8FAFC',
      colorTextBase: '#0F172A',
      colorBorder: '#E2E8F0',
      controlHeight: 36,
    },
  },
  {
    name: 'Forest Green',
    accent: '#15803D',
    tokens: {
      colorPrimary: '#15803D',
      colorSuccess: '#16A34A',
      colorWarning: '#EAB308',
      colorError: '#DC2626',
      colorInfo: '#0284C7',
      borderRadius: 8,
      fontSize: 14,
      colorBgContainer: '#FFFFFF',
      colorBgLayout: '#F0FDF4',
      colorTextBase: '#14532D',
      colorBorder: '#BBF7D0',
      controlHeight: 40,
    },
  },
]

/* ─── Token Editor Panel ─────────────────────── */

function ColorSwatch({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <TP.ColorSwatchRow>
      <TP.ColorPickerInput
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <TP.ColorSwatchMeta>
        <TP.ColorSwatchLabel>{label}</TP.ColorSwatchLabel>
        <TP.ColorSwatchHex>{value}</TP.ColorSwatchHex>
      </TP.ColorSwatchMeta>
    </TP.ColorSwatchRow>
  )
}

function SliderRow({
  label,
  value,
  min,
  max,
  unit,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  unit: string
  onChange: (v: number) => void
}) {
  return (
    <TP.SliderRowRoot>
      <TP.SliderRowHeader>
        <TP.SliderRowLabel>{label}</TP.SliderRowLabel>
        <TP.SliderRowValue>
          {value}
          {unit}
        </TP.SliderRowValue>
      </TP.SliderRowHeader>
      <TP.SliderRangeInput
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </TP.SliderRowRoot>
  )
}

/* ─── Component Showcase ─────────────────────── */

const sampleTableData = [
  {
    key: '1',
    name: 'Martin Garcia',
    email: 'martin@company.com',
    role: 'Admin',
    status: 'active',
  },
  {
    key: '2',
    name: 'Sofia Fernandez',
    email: 'sofia@company.com',
    role: 'Editor',
    status: 'active',
  },
  {
    key: '3',
    name: 'Ricardo Becerra',
    email: 'ricardo@company.com',
    role: 'Viewer',
    status: 'pending',
  },
]

const sampleColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (val: string) => <Text strong>{val}</Text>,
  },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Role', dataIndex: 'role', key: 'role' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (val: string) => (
      <AntTag color={val === 'active' ? 'success' : 'warning'}>
        {val.charAt(0).toUpperCase() + val.slice(1)}
      </AntTag>
    ),
  },
]

function ComponentShowcase({ tokens }: { tokens: Partial<GravityTokens> }) {
  return (
    <GravityProvider tokens={tokens}>
      <TP.ShowcaseColumn>
        {/* Buttons */}
        <Card variant="borderless" title="Buttons">
          <Space wrap size="middle">
            <Button type="primary">Primary</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              With Icon
            </Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="text">Text</Button>
            <Button type="link">Link</Button>
            <Button type="primary" danger>
              Danger
            </Button>
            <Button type="primary" loading>
              Loading
            </Button>
            <Button type="primary" disabled>
              Disabled
            </Button>
          </Space>
          <TP.ButtonSizeBlock>
            <Space>
              <Button type="primary" size="large">
                Large
              </Button>
              <Button type="primary">Medium</Button>
              <Button type="primary" size="small">
                Small
              </Button>
            </Space>
          </TP.ButtonSizeBlock>
        </Card>

        {/* Form Controls */}
        <Card variant="borderless" title="Form Controls">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <TP.FormStack12>
                <Input placeholder="Text input" />
                <Input prefix={<SearchOutlined />} placeholder="Search..." />
                <Password placeholder="Password" />
              </TP.FormStack12>
            </Col>
            <Col span={8}>
              <TP.FormStack12>
                <Select
                  placeholder="Select option"
                  options={[
                    { value: 'opt1', label: 'Option One' },
                    { value: 'opt2', label: 'Option Two' },
                    { value: 'opt3', label: 'Option Three' },
                  ]}
                />
                <DatePicker />
                <TextArea placeholder="Textarea..." rows={2} />
              </TP.FormStack12>
            </Col>
            <Col span={8}>
              <TP.FormStack16>
                <TP.SwitchRow>
                  <Switch defaultChecked />
                  <Text>Toggle option</Text>
                </TP.SwitchRow>
                <Checkbox.Group
                  options={['Option A', 'Option B', 'Option C']}
                  defaultValue={['Option A']}
                />
                <Radio.Group defaultValue="a">
                  <Radio value="a">Radio A</Radio>
                  <Radio value="b">Radio B</Radio>
                </Radio.Group>
              </TP.FormStack16>
            </Col>
          </Row>
        </Card>

        {/* Stat Cards */}
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <StatCard
              label="Total Revenue"
              prefix="$"
              value="847K"
              trend="up"
              trendValue="+12.5% MoM"
              accentColor={`linear-gradient(90deg, ${tokens.colorPrimary || '#003973'}, ${tokens.colorInfo || '#0077FF'})`}
            />
          </Col>
          <Col span={8}>
            <StatCard
              label="Active Users"
              value="3,291"
              trend="up"
              trendValue="+8.4% this week"
              accentColor={`linear-gradient(90deg, ${tokens.colorSuccess || '#00B67A'}, #34D399)`}
            />
          </Col>
          <Col span={8}>
            <StatCard
              label="Bounce Rate"
              value="2.4"
              suffix="%"
              trend="down"
              trendValue="+0.3% this month"
              accentColor={`linear-gradient(90deg, ${tokens.colorWarning || '#F5A623'}, #FBBF24)`}
            />
          </Col>
        </Row>

        {/* Tags & Badges */}
        <Card variant="borderless" title="Tags & Badges">
          <TP.TagsBadgeStack>
            <Space wrap>
              <AntTag color="success">Success</AntTag>
              <AntTag color="processing">Processing</AntTag>
              <AntTag color="warning">Warning</AntTag>
              <AntTag color="error">Error</AntTag>
              <AntTag color="default">Default</AntTag>
              <AntTag color="blue">Blue</AntTag>
              <AntTag color="cyan">Cyan</AntTag>
              <AntTag color="purple">Purple</AntTag>
            </Space>
            <Space size="large">
              <AntBadge count={5}>
                <Avatar shape="square" icon={<BellOutlined />} />
              </AntBadge>
              <AntBadge count={99}>
                <Avatar shape="square" icon={<UserOutlined />} />
              </AntBadge>
              <AntBadge dot>
                <Avatar shape="square" icon={<SettingOutlined />} />
              </AntBadge>
              <AntBadge count={0} showZero>
                <Avatar shape="square" icon={<UserOutlined />} />
              </AntBadge>
            </Space>
          </TP.TagsBadgeStack>
        </Card>

        {/* Alerts */}
        <Card variant="borderless" title="Alerts">
          <TP.AlertsStack>
            <Alert
              type="success"
              title="Operation completed"
              description="Your changes have been saved successfully."
              showIcon
            />
            <Alert
              type="info"
              title="New update available"
              showIcon
            />
            <Alert
              type="warning"
              title="Storage running low"
              showIcon
            />
            <Alert
              type="error"
              title="Connection failed"
              showIcon
            />
          </TP.AlertsStack>
        </Card>

        {/* Table */}
        <Card variant="borderless" title="Data Table" styles={{ body: { padding: 0 } }}>
          <Table
            dataSource={sampleTableData}
            columns={sampleColumns}
            pagination={false}
            size="middle"
          />
        </Card>

        {/* Tabs */}
        <Card variant="borderless" title="Tabs & Navigation">
          <Tabs
            items={[
              {
                key: '1',
                label: 'Overview',
                children: (
                  <Paragraph type="secondary">
                    This is the overview panel. Your brand colors are applied
                    across all tab states and indicators.
                  </Paragraph>
                ),
              },
              {
                key: '2',
                label: 'Analytics',
                children: (
                  <Paragraph type="secondary">
                    Analytics content goes here.
                  </Paragraph>
                ),
              },
              {
                key: '3',
                label: 'Settings',
                children: (
                  <Paragraph type="secondary">
                    Settings panel content.
                  </Paragraph>
                ),
              },
            ]}
          />
        </Card>

        {/* Typography */}
        <Card variant="borderless" title="Typography">
          <TP.TypoTitle2>Heading Level 2</TP.TypoTitle2>
          <TP.TypoTitle4>Heading Level 4</TP.TypoTitle4>
          <Paragraph>
            Body text renders with your configured <Text strong>font size</Text>,{' '}
            <Text type="secondary">secondary color</Text>, and{' '}
            <Text code>code</Text> styles. The theme tokens control everything
            from <a href="#">link colors</a> to text hierarchy.
          </Paragraph>
          <Paragraph type="secondary">
            Secondary paragraph text for descriptions, help text, and metadata.
          </Paragraph>
        </Card>
      </TP.ShowcaseColumn>
    </GravityProvider>
  )
}

/* ─── Theme Playground Story ─────────────────── */

function ThemePlayground() {
  const [tokens, setTokens] = useState<Partial<GravityTokens>>({
    ...defaultTokens,
  })
  const [activePreset, setActivePreset] = useState(0)
  const [copied, setCopied] = useState(false)

  const updateToken = useCallback(
    <K extends keyof GravityTokens>(key: K, value: GravityTokens[K]) => {
      setTokens((prev) => ({ ...prev, [key]: value }))
      setActivePreset(-1)
    },
    [],
  )

  const applyPreset = useCallback((index: number) => {
    setActivePreset(index)
    setTokens((prev) => ({ ...prev, ...brandPresets[index].tokens }))
  }, [])

  const exportTokens = useCallback(() => {
    const clean: Record<string, unknown> = {}
    const keys: (keyof GravityTokens)[] = [
      'colorPrimary',
      'colorSuccess',
      'colorWarning',
      'colorError',
      'colorInfo',
      'borderRadius',
      'fontSize',
      'colorBgContainer',
      'colorBgLayout',
      'colorTextBase',
      'colorBorder',
      'controlHeight',
    ]
    keys.forEach((k) => {
      if (tokens[k] !== undefined) clean[k] = tokens[k]
    })
    const code = `<GravityProvider tokens={${JSON.stringify(clean, null, 2)}}>`
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [tokens])

  return (
    <TP.PlaygroundRoot>
      {/* ── Sidebar: Token Editor ── */}
      <TP.EditorSidebar>
        <TP.EditorHeader>
          <TP.EditorTitle>Theme Playground</TP.EditorTitle>
          <TP.EditorSubtitle>
            Customize tokens to preview your brand.
          </TP.EditorSubtitle>
        </TP.EditorHeader>

        {/* Brand Presets */}
        <TP.EditorSection>
          <TP.EditorSectionHeading>Quick Presets</TP.EditorSectionHeading>
          <TP.PresetGrid>
            {brandPresets.map((preset, i) => (
              <TP.PresetButton
                key={preset.name}
                type="button"
                onClick={() => applyPreset(i)}
                $active={activePreset === i}
                $accent={preset.accent}
              >
                <TP.PresetDot $accent={preset.accent} />
                {preset.name}
              </TP.PresetButton>
            ))}
          </TP.PresetGrid>
        </TP.EditorSection>

        <TP.EditorDivider />

        {/* Brand Colors */}
        <TP.EditorSection>
          <TP.EditorSectionHeadingLoose>Brand Colors</TP.EditorSectionHeadingLoose>
          <TP.SwatchList>
            <ColorSwatch
              label="Primary"
              value={tokens.colorPrimary || '#003973'}
              onChange={(v) => updateToken('colorPrimary', v)}
            />
            <ColorSwatch
              label="Success"
              value={tokens.colorSuccess || '#00B67A'}
              onChange={(v) => updateToken('colorSuccess', v)}
            />
            <ColorSwatch
              label="Warning"
              value={tokens.colorWarning || '#F5A623'}
              onChange={(v) => updateToken('colorWarning', v)}
            />
            <ColorSwatch
              label="Error"
              value={tokens.colorError || '#E62626'}
              onChange={(v) => updateToken('colorError', v)}
            />
            <ColorSwatch
              label="Info"
              value={tokens.colorInfo || '#0077FF'}
              onChange={(v) => updateToken('colorInfo', v)}
            />
          </TP.SwatchList>
        </TP.EditorSection>

        <TP.EditorDivider />

        {/* Surface Colors */}
        <TP.EditorSection>
          <TP.EditorSectionHeadingLoose>Surfaces</TP.EditorSectionHeadingLoose>
          <TP.SwatchList>
            <ColorSwatch
              label="Background"
              value={tokens.colorBgLayout || '#F0F3F7'}
              onChange={(v) => updateToken('colorBgLayout', v)}
            />
            <ColorSwatch
              label="Card / Container"
              value={tokens.colorBgContainer || '#FFFFFF'}
              onChange={(v) => updateToken('colorBgContainer', v)}
            />
            <ColorSwatch
              label="Text"
              value={tokens.colorTextBase || '#0D1B2A'}
              onChange={(v) => updateToken('colorTextBase', v)}
            />
            <ColorSwatch
              label="Border"
              value={tokens.colorBorder || '#D5DCE5'}
              onChange={(v) => updateToken('colorBorder', v)}
            />
          </TP.SwatchList>
        </TP.EditorSection>

        <TP.EditorDivider />

        {/* Sizing */}
        <TP.EditorSection>
          <TP.EditorSectionHeadingLoose>
            Sizing & Shape
          </TP.EditorSectionHeadingLoose>
          <TP.SliderList>
            <SliderRow
              label="Border Radius"
              value={tokens.borderRadius ?? 8}
              min={0}
              max={20}
              unit="px"
              onChange={(v) => updateToken('borderRadius', v)}
            />
            <SliderRow
              label="Font Size"
              value={tokens.fontSize ?? 14}
              min={12}
              max={18}
              unit="px"
              onChange={(v) => updateToken('fontSize', v)}
            />
            <SliderRow
              label="Control Height"
              value={tokens.controlHeight ?? 40}
              min={28}
              max={52}
              unit="px"
              onChange={(v) => updateToken('controlHeight', v)}
            />
          </TP.SliderList>
        </TP.EditorSection>

        <TP.EditorDivider />

        {/* Export */}
        <Tooltip title={copied ? 'Copied!' : 'Copy GravityProvider config'}>
          <Button
            block
            icon={copied ? <CheckCircleOutlined /> : <CopyOutlined />}
            onClick={exportTokens}
            type={copied ? 'primary' : 'default'}
          >
            {copied ? 'Copied!' : 'Export Tokens'}
          </Button>
        </Tooltip>
      </TP.EditorSidebar>

      {/* ── Main: Component Preview ── */}
      <TP.PreviewCanvas $bg={tokens.colorBgLayout || '#F0F3F7'}>
        <ComponentShowcase tokens={tokens} />
      </TP.PreviewCanvas>
    </TP.PlaygroundRoot>
  )
}

/* ─── Story Config ────────────────────────────── */

const meta: Meta = {
  title: 'Theme/Playground',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
}

export default meta

export const Playground: StoryObj = {
  render: () => <ThemePlayground />,
}
