import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Typography } from 'antd'
import {
  CreditCardOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { UserMenu } from '../src/components/UserMenu'
import { NotificationCenter } from '../src/components/NotificationCenter'
import type { NotificationItem } from '../src/components/NotificationCenter'
import { GravityProvider } from '../src/theme/GravityProvider'
import {
  DemoActions,
  DemoBar,
  DemoBrand,
  DemoHint,
  DemoLogoMark,
  DemoPage,
  IsolatedStage,
} from './NotificationCenter.stories.styles'

const meta: Meta<typeof UserMenu> = {
  title: 'Composites/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <GravityProvider>
        <Story />
      </GravityProvider>
    ),
  ],
  argTypes: {
    placement: { control: false },
    showText: { control: 'boolean' },
    showLanguageSwitch: { control: 'boolean' },
    showLogout: { control: 'boolean' },
    width: { control: { type: 'number', min: 240, max: 360, step: 10 } },
  },
}

export default meta
type Story = StoryObj<typeof UserMenu>

const MENU_ITEMS = [
  { key: 'profile', icon: <UserOutlined />, label: 'My profile' },
  { key: 'settings', icon: <SettingOutlined />, label: 'Account settings' },
  { key: 'billing', icon: <CreditCardOutlined />, label: 'Billing', extra: 'Pro' },
  { key: 'help', icon: <QuestionCircleOutlined />, label: 'Help & support', divider: true },
]

// ---------------------------------------------------------------------------
// In a top bar — the primary, realistic usage (alongside NotificationCenter).
// ---------------------------------------------------------------------------

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'success',
    title: 'Payout settled',
    description: 'Transfer TXN-9401 completed successfully.',
    time: new Date(Date.now() - 2 * 60_000),
  },
  {
    id: '2',
    type: 'warning',
    title: 'KYC review required',
    description: '3 accounts awaiting verification.',
    time: new Date(Date.now() - 26 * 60_000),
  },
]

export const InTopBar: Story = {
  render: (args) => {
    const [lang, setLang] = useState('en')
    const [log, setLog] = useState<string>('—')
    return (
      <>
        <DemoBar>
          <DemoBrand>
            <DemoLogoMark>G</DemoLogoMark>
            Gravity
          </DemoBrand>
          <DemoActions>
            <NotificationCenter items={NOTIFICATIONS} />
            <UserMenu
              {...args}
              language={lang}
              onLanguageChange={setLang}
              items={MENU_ITEMS}
              onSelect={(key) => setLog(`selected: ${key}`)}
              onLogout={() => setLog('logout')}
            />
          </DemoActions>
        </DemoBar>
        <DemoPage>
          <Typography.Title level={4}>Dashboard</Typography.Title>
          <DemoHint>
            Click the avatar to open the account menu. It animates in from the top-right, the
            chevron flips, and rows nudge on hover. Switch the language between <b>EN</b> and{' '}
            <b>ES</b> without leaving the page.
          </DemoHint>
          <Typography.Paragraph type="secondary">
            Current language: <b>{lang.toUpperCase()}</b> · Last action: <b>{log}</b>
          </Typography.Paragraph>
        </DemoPage>
      </>
    )
  },
  args: {
    name: 'Lucas Borella',
    email: 'lucas@gravity.io',
    role: 'Administrator',
    showText: true,
    showLanguageSwitch: true,
    showLogout: true,
  },
}

// ---------------------------------------------------------------------------
// Open panel — isolated, for quick visual inspection.
// ---------------------------------------------------------------------------

export const PanelOpen: Story = {
  render: (args) => (
    <DemoPage>
      <IsolatedStage>
        <UserMenu {...args} items={MENU_ITEMS} defaultOpen />
      </IsolatedStage>
    </DemoPage>
  ),
  args: {
    name: 'Sofia Fernandez',
    email: 'sofia.fernandez@gravity.io',
    role: 'Portfolio Advisor',
    placement: 'bottom',
  },
}

// ---------------------------------------------------------------------------
// With a photo avatar.
// ---------------------------------------------------------------------------

export const WithPhoto: Story = {
  render: (args) => (
    <DemoPage>
      <IsolatedStage>
        <UserMenu
          {...args}
          avatar="https://i.pravatar.cc/96?img=12"
          items={MENU_ITEMS}
          defaultOpen
        />
      </IsolatedStage>
    </DemoPage>
  ),
  args: {
    name: 'Ricardo Becerra',
    email: 'ricardo@gravity.io',
    role: 'Compliance Officer',
    placement: 'bottom',
  },
}

// ---------------------------------------------------------------------------
// Avatar-only trigger (compact top bars).
// ---------------------------------------------------------------------------

export const AvatarOnly: Story = {
  render: (args) => (
    <DemoPage>
      <IsolatedStage>
        <UserMenu {...args} items={MENU_ITEMS} defaultOpen />
      </IsolatedStage>
    </DemoPage>
  ),
  args: {
    name: 'Camila Lopez',
    email: 'camila@gravity.io',
    role: 'Analyst',
    showText: false,
    placement: 'bottom',
  },
}

// ---------------------------------------------------------------------------
// Minimal — no custom items, just language + logout.
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  render: (args) => (
    <DemoPage>
      <IsolatedStage>
        <UserMenu {...args} defaultOpen />
      </IsolatedStage>
    </DemoPage>
  ),
  args: {
    name: 'Juan Martinez',
    role: 'Viewer',
    placement: 'bottom',
  },
}

// ---------------------------------------------------------------------------
// Localized copy (Spanish) + three languages.
// ---------------------------------------------------------------------------

export const Localized: Story = {
  render: (args) => {
    const [lang, setLang] = useState('es')
    return (
      <DemoPage>
        <IsolatedStage>
          <UserMenu
            {...args}
            language={lang}
            onLanguageChange={setLang}
            languages={[
              { code: 'en', label: 'EN' },
              { code: 'es', label: 'ES' },
              { code: 'pt', label: 'PT' },
            ]}
            items={[
              { key: 'profile', icon: <UserOutlined />, label: 'Mi perfil' },
              { key: 'settings', icon: <SettingOutlined />, label: 'Configuración' },
            ]}
            labels={{ language: 'Idioma', logout: 'Cerrar sesión' }}
            defaultOpen
          />
        </IsolatedStage>
      </DemoPage>
    )
  },
  args: {
    name: 'Martín García',
    email: 'martin.garcia@gravity.io',
    role: 'Administrador',
    placement: 'bottom',
  },
}
