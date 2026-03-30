import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Row, Col, Typography, Space, Tooltip } from 'antd'
import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  Users,
  ArrowRightLeft,
  FileText,
  ShieldCheck,
  Settings,
  Bell,
  Search,
  Plus,
  Download,
  Upload,
  Trash2,
  Edit3,
  Copy,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  Check,
  X,
  AlertTriangle,
  Info,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  CreditCard,
  Landmark,
  PiggyBank,
  Receipt,
  LineChart,
  PieChart,
  CandlestickChart,
  Activity,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Filter,
  SlidersHorizontal,
  RefreshCw,
  LogOut,
  Moon,
  Sun,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '../src/components/Card'
import { Button } from '../src/components/Button'
import { Input } from '../src/components/Input'
import { StatCard } from '../src/components/StatCard'
import * as IS from './Icons.stories.styles'

const { Text } = Typography

/* ─── BBSA Theme Colors ──────────────────────── */

const COLORS = {
  navy: '#003973',
  cyan: '#00BBDD',
  blue: '#0077FF',
  green: '#00B67A',
  amber: '#F5A623',
  red: '#E62626',
  textPrimary: '#0D1B2A',
  textSecondary: '#3D5068',
  textMuted: '#8494A7',
  border: '#E8EDF2',
}

/* ─── Helpers ────────────────────────────────── */

function IconGrid({
  icons,
}: {
  icons: { icon: LucideIcon; name: string }[]
}) {
  return (
    <IS.IconGridRoot>
      {icons.map(({ icon: Icon, name }) => (
        <Tooltip title={name} key={name}>
          <IS.IconCell>
            <Icon size={22} strokeWidth={1.8} color={COLORS.textPrimary} />
            <IS.IconName>{name}</IS.IconName>
          </IS.IconCell>
        </Tooltip>
      ))}
    </IS.IconGridRoot>
  )
}

/* ─── Stories ─────────────────────────────────── */

const meta: Meta = {
  title: 'Icons/Lucide',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
}

export default meta

export const FinanceIcons: StoryObj = {
  name: 'Finance & Trading',
  render: () => (
    <Card variant="borderless" title="Finance & Trading Icons">
      <IconGrid
        icons={[
          { icon: DollarSign, name: 'DollarSign' },
          { icon: CreditCard, name: 'CreditCard' },
          { icon: Landmark, name: 'Landmark' },
          { icon: PiggyBank, name: 'PiggyBank' },
          { icon: Receipt, name: 'Receipt' },
          { icon: Wallet, name: 'Wallet' },
          { icon: TrendingUp, name: 'TrendingUp' },
          { icon: TrendingDown, name: 'TrendingDown' },
          { icon: ArrowUpRight, name: 'ArrowUpRight' },
          { icon: ArrowDownRight, name: 'ArrowDownRight' },
          { icon: ArrowRightLeft, name: 'ArrowRightLeft' },
          { icon: BarChart3, name: 'BarChart3' },
          { icon: LineChart, name: 'LineChart' },
          { icon: PieChart, name: 'PieChart' },
          { icon: CandlestickChart, name: 'CandlestickChart' },
          { icon: Activity, name: 'Activity' },
        ]}
      />
    </Card>
  ),
}

export const NavigationIcons: StoryObj = {
  name: 'Navigation & Actions',
  render: () => (
    <Card variant="borderless" title="Navigation & Action Icons">
      <IconGrid
        icons={[
          { icon: LayoutDashboard, name: 'LayoutDashboard' },
          { icon: Users, name: 'Users' },
          { icon: FileText, name: 'FileText' },
          { icon: Settings, name: 'Settings' },
          { icon: Bell, name: 'Bell' },
          { icon: Search, name: 'Search' },
          { icon: Plus, name: 'Plus' },
          { icon: Download, name: 'Download' },
          { icon: Upload, name: 'Upload' },
          { icon: Trash2, name: 'Trash2' },
          { icon: Edit3, name: 'Edit3' },
          { icon: Copy, name: 'Copy' },
          { icon: ExternalLink, name: 'ExternalLink' },
          { icon: Filter, name: 'Filter' },
          { icon: SlidersHorizontal, name: 'SlidersHorizontal' },
          { icon: RefreshCw, name: 'RefreshCw' },
          { icon: LogOut, name: 'LogOut' },
          { icon: MoreHorizontal, name: 'MoreHorizontal' },
          { icon: ChevronRight, name: 'ChevronRight' },
          { icon: ChevronDown, name: 'ChevronDown' },
        ]}
      />
    </Card>
  ),
}

export const StatusIcons: StoryObj = {
  name: 'Status & Feedback',
  render: () => (
    <Card variant="borderless" title="Status & Feedback Icons">
      <IconGrid
        icons={[
          { icon: Check, name: 'Check' },
          { icon: X, name: 'X' },
          { icon: CheckCircle2, name: 'CheckCircle2' },
          { icon: AlertCircle, name: 'AlertCircle' },
          { icon: AlertTriangle, name: 'AlertTriangle' },
          { icon: Info, name: 'Info' },
          { icon: ShieldCheck, name: 'ShieldCheck' },
          { icon: Lock, name: 'Lock' },
          { icon: Unlock, name: 'Unlock' },
          { icon: Eye, name: 'Eye' },
          { icon: EyeOff, name: 'EyeOff' },
          { icon: Globe, name: 'Globe' },
          { icon: Calendar, name: 'Calendar' },
          { icon: Clock, name: 'Clock' },
          { icon: Moon, name: 'Moon' },
          { icon: Sun, name: 'Sun' },
        ]}
      />
    </Card>
  ),
}

export const StrokeWidths: StoryObj = {
  name: 'Stroke Width Variants',
  render: () => {
    const weights = [
      { width: 1, label: 'Thin (1)' },
      { width: 1.5, label: 'Light (1.5)' },
      { width: 2, label: 'Regular (2)' },
      { width: 2.5, label: 'Medium (2.5)' },
      { width: 3, label: 'Bold (3)' },
    ]

    return (
      <Card variant="borderless" title="Stroke Width Control">
        <IS.StrokeIntro>
          Lucide icons support adjustable <Text code>strokeWidth</Text> for
          visual hierarchy without loading separate icon sets.
        </IS.StrokeIntro>
        <IS.StrokeRow>
          {weights.map(({ width, label }) => (
            <IS.StrokeCol key={width}>
              <IS.StrokeSwatch>
                <Activity
                  size={28}
                  strokeWidth={width}
                  color={COLORS.navy}
                />
              </IS.StrokeSwatch>
              <IS.StrokeLabel>{label}</IS.StrokeLabel>
            </IS.StrokeCol>
          ))}
        </IS.StrokeRow>
      </Card>
    )
  },
}

export const Sizes: StoryObj = {
  name: 'Size Scale',
  render: () => {
    const sizes = [14, 16, 18, 20, 24, 28, 32, 40, 48]

    return (
      <Card variant="borderless" title="Icon Size Scale">
        <IS.SizesRow>
          {sizes.map((size) => (
            <IS.SizeCol key={size}>
              <BarChart3 size={size} strokeWidth={1.8} color={COLORS.navy} />
              <IS.SizeCaption>{size}px</IS.SizeCaption>
            </IS.SizeCol>
          ))}
        </IS.SizesRow>
      </Card>
    )
  },
}

export const ColoredIcons: StoryObj = {
  name: 'Themed Colors',
  render: () => {
    const themed = [
      { icon: Landmark, color: COLORS.navy, bg: '#E8F0FA', label: 'Primary' },
      { icon: Activity, color: COLORS.cyan, bg: '#E5F9FD', label: 'Accent' },
      { icon: TrendingUp, color: COLORS.green, bg: '#E6F9F2', label: 'Success' },
      { icon: AlertTriangle, color: COLORS.amber, bg: '#FFF8ED', label: 'Warning' },
      { icon: AlertCircle, color: COLORS.red, bg: '#FEF0F0', label: 'Error' },
      { icon: Info, color: COLORS.blue, bg: '#EBF4FF', label: 'Info' },
    ]

    return (
      <Card variant="borderless" title="Themed Icon Colors">
        <IS.ThemedRow>
          {themed.map(({ icon: Icon, color, bg, label }) => (
            <IS.ThemedCol key={label}>
              <IS.ThemedSwatch $bg={bg}>
                <Icon size={24} strokeWidth={1.8} color={color} />
              </IS.ThemedSwatch>
              <IS.ThemedLabel>{label}</IS.ThemedLabel>
            </IS.ThemedCol>
          ))}
        </IS.ThemedRow>
      </Card>
    )
  },
}

export const WithComponents: StoryObj = {
  name: 'Icons in Components',
  render: () => (
    <IS.ComponentsStack>
      {/* Buttons with Lucide icons */}
      <Card variant="borderless" title="Buttons with Icons">
        <Space wrap size="middle">
          <Button type="primary" icon={<Plus size={16} strokeWidth={2} />}>
            New Transaction
          </Button>
          <Button icon={<Download size={16} strokeWidth={1.8} />}>
            Export Report
          </Button>
          <Button icon={<Filter size={16} strokeWidth={1.8} />}>
            Filter
          </Button>
          <Button icon={<RefreshCw size={16} strokeWidth={1.8} />}>
            Refresh
          </Button>
          <Button type="primary" danger icon={<Trash2 size={16} strokeWidth={1.8} />}>
            Delete
          </Button>
          <Button type="text" icon={<MoreHorizontal size={16} strokeWidth={1.8} />} />
        </Space>
      </Card>

      {/* Input with icons */}
      <Card variant="borderless" title="Inputs with Icons">
        <Row gutter={16}>
          <Col span={8}>
            <Input
              prefix={<Search size={16} strokeWidth={1.8} color={COLORS.textMuted} />}
              placeholder="Search transactions..."
            />
          </Col>
          <Col span={8}>
            <Input
              prefix={<DollarSign size={16} strokeWidth={1.8} color={COLORS.textMuted} />}
              placeholder="Enter amount"
            />
          </Col>
          <Col span={8}>
            <Input
              prefix={<Globe size={16} strokeWidth={1.8} color={COLORS.textMuted} />}
              suffix={<ChevronDown size={14} strokeWidth={1.8} color={COLORS.textMuted} />}
              placeholder="Select market"
            />
          </Col>
        </Row>
      </Card>

      {/* Stat Cards with Lucide trend icons */}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <StatCard
            label="Portfolio Value"
            prefix="$"
            value="12.4M"
            trend="up"
            trendValue="+14.2%"
            accentColor={`linear-gradient(90deg, ${COLORS.navy}, ${COLORS.blue})`}
            sparkline={
              <IS.StatTrendRow>
                <TrendingUp size={16} strokeWidth={2} color={COLORS.green} />
                <IS.StatTrendText $color={COLORS.green}>Strong uptrend</IS.StatTrendText>
              </IS.StatTrendRow>
            }
          />
        </Col>
        <Col span={8}>
          <StatCard
            label="Active Trades"
            value="284"
            trend="up"
            trendValue="+12 today"
            accentColor={`linear-gradient(90deg, ${COLORS.cyan}, #00D4FA)`}
            sparkline={
              <IS.StatTrendRow>
                <Activity size={16} strokeWidth={2} color={COLORS.cyan} />
                <IS.StatTrendText $color={COLORS.textMuted}>High activity</IS.StatTrendText>
              </IS.StatTrendRow>
            }
          />
        </Col>
        <Col span={8}>
          <StatCard
            label="Risk Score"
            value="3.2"
            suffix="/10"
            trend="down"
            trendValue="-0.5 pts"
            accentColor={`linear-gradient(90deg, ${COLORS.green}, #34D399)`}
            sparkline={
              <IS.StatTrendRow>
                <ShieldCheck size={16} strokeWidth={2} color={COLORS.green} />
                <IS.StatTrendText $color={COLORS.green}>Low risk</IS.StatTrendText>
              </IS.StatTrendRow>
            }
          />
        </Col>
      </Row>

      {/* Sidebar nav simulation */}
      <Card variant="borderless" title="Sidebar Navigation Pattern">
        <IS.SidebarDemo>
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: BarChart3, label: 'Analytics', active: false },
            { icon: Wallet, label: 'Portfolio', active: false },
            { icon: Users, label: 'Clients', active: false, badge: 18 },
            { icon: ArrowRightLeft, label: 'Transactions', active: false },
            { icon: FileText, label: 'Reports', active: false },
            { icon: ShieldCheck, label: 'Compliance', active: false },
            { icon: Settings, label: 'Settings', active: false },
          ].map((item) => (
            <IS.NavItem key={item.label} $active={item.active}>
              {item.active && <IS.NavActiveBar />}
              <item.icon
                size={18}
                strokeWidth={1.8}
                color={
                  item.active
                    ? '#FFFFFF'
                    : 'rgba(255,255,255,0.45)'
                }
              />
              <IS.NavItemLabel $active={item.active}>{item.label}</IS.NavItemLabel>
              {item.badge && (
                <IS.NavItemBadge>{item.badge}</IS.NavItemBadge>
              )}
            </IS.NavItem>
          ))}
        </IS.SidebarDemo>
      </Card>
    </IS.ComponentsStack>
  ),
}
