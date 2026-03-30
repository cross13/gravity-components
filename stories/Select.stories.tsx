import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import { Select } from '../src/components/Select'
import { SelectStack, W240, W360 } from './Select.stories.styles'

type SelectStoryArgs = Omit<React.ComponentProps<typeof Select>, 'mode'> & {
  mode?: 'single' | 'multiple' | 'tags'
}

const meta: Meta<SelectStoryArgs> = {
  title: 'Primitives/Select',
  component: Select,
  argTypes: {
    mode: { control: 'select', options: ['single', 'multiple', 'tags'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    showSearch: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled', 'borderless'] },
  },
}

export default meta
type Story = StoryObj<SelectStoryArgs>

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
  { value: 'billing', label: 'Billing Manager' },
]

const departmentOptions = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'support', label: 'Customer Support' },
]

export const Default: Story = {
  render: (args) => {
    const { mode, style, ...rest } = args
    const modeProp = mode === 'single' ? undefined : mode
    return (
      <W240 style={style}>
        <Select {...rest} mode={modeProp} />
      </W240>
    )
  },
  args: {
    mode: 'single',
    placeholder: 'Select a role...',
    options: roleOptions,
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <SelectStack direction="vertical" size="middle">
      <W240>
        <Select placeholder="Assign role" options={roleOptions} />
      </W240>
      <W360>
        <Select mode="multiple" placeholder="Select departments" options={departmentOptions} />
      </W360>
      <W240>
        <Select
          showSearch
          placeholder="Search team member..."
          options={roleOptions}
          filterOption={(input, option) =>
            (option?.label as string).toLowerCase().includes(input.toLowerCase())
          }
        />
      </W240>
      <W240>
        <Select placeholder="Disabled" options={roleOptions} disabled />
      </W240>
    </SelectStack>
  ),
}
