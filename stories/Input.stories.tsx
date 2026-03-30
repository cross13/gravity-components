import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons'
import { Input, Password, Search, TextArea } from '../src/components/Input'
import { VerticalFieldStack, W360 } from './Input.stories.styles'

type InputStoryArgs = Omit<React.ComponentProps<typeof Input>, 'status'> & {
  status?: 'none' | 'error' | 'warning'
}

const meta: Meta<InputStoryArgs> = {
  title: 'Primitives/Input',
  component: Input,
  argTypes: {
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    status: { control: 'select', options: ['none', 'error', 'warning'] },
    variant: { control: 'select', options: ['outlined', 'filled', 'borderless'] },
    disabled: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    placeholder: { control: 'text' },
    maxLength: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<InputStoryArgs>

export const Default: Story = {
  render: (args) => {
    const { status, style, ...rest } = args
    return (
      <W360 style={style}>
        <Input {...rest} status={status === 'none' ? undefined : status} />
      </W360>
    )
  },
  args: {
    placeholder: 'Enter employee name...',
    status: 'none',
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VerticalFieldStack direction="vertical" size="middle">
      <Input placeholder="Full name" prefix={<UserOutlined />} />
      <Input placeholder="Email address" prefix={<MailOutlined />} />
      <Password placeholder="Password" prefix={<LockOutlined />} />
      <Search placeholder="Search orders..." enterButton />
      <TextArea placeholder="Add a note about this customer..." rows={4} />
      <Input status="error" placeholder="Required field" />
      <Input status="warning" placeholder="Duplicate email detected" />
    </VerticalFieldStack>
  ),
}

export const WithAddon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <VerticalFieldStack direction="vertical" size="middle">
      <Input addonBefore="https://" placeholder="company-domain.com" />
      <Input addonBefore="$" addonAfter="USD" placeholder="0.00" />
    </VerticalFieldStack>
  ),
}

export const PasswordField: StoryObj<typeof Password> = {
  name: 'Password',
  render: (args) => (
    <W360>
      <Password {...args} prefix={<LockOutlined />} />
    </W360>
  ),
  args: {
    placeholder: 'Enter password',
  },
  argTypes: {
    visibilityToggle: { control: 'boolean' },
  },
}

export const SearchField: StoryObj<typeof Search> = {
  name: 'Search',
  render: (args) => (
    <W360>
      <Search {...args} />
    </W360>
  ),
  args: {
    placeholder: 'Search…',
    enterButton: true,
  },
}

export const TextAreaField: StoryObj<typeof TextArea> = {
  name: 'TextArea',
  render: (args) => (
    <W360>
      <TextArea {...args} />
    </W360>
  ),
  args: {
    placeholder: 'Notes…',
    rows: 4,
    showCount: true,
    maxLength: 200,
  },
}
