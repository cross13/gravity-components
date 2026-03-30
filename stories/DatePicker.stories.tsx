import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import { DatePicker, RangePicker } from '../src/components/DatePicker'
import { DatePickerStack, W240, W360 } from './DatePicker.stories.styles'

const meta: Meta<typeof DatePicker> = {
  title: 'Primitives/DatePicker',
  component: DatePicker,
  argTypes: {
    picker: { control: 'select', options: ['date', 'week', 'month', 'quarter', 'year'] },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    showToday: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled', 'borderless'] },
  },
}

export default meta
type Story = StoryObj<typeof DatePicker>

export const Default: Story = {
  render: (args) => (
    <W240>
      <DatePicker {...args} />
    </W240>
  ),
  args: {
    placeholder: 'Select hire date',
  },
}

export const Range: StoryObj<typeof RangePicker> = {
  render: (args) => (
    <W360>
      <RangePicker {...args} />
    </W360>
  ),
  args: {
    placeholder: ['Start date', 'End date'],
    allowClear: true,
  },
  argTypes: {
    allowClear: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    variant: { control: 'select', options: ['outlined', 'filled', 'borderless'] },
  },
}

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <DatePickerStack direction="vertical" size="middle">
      <W240>
        <DatePicker placeholder="Invoice date" />
      </W240>
      <W240>
        <DatePicker picker="month" placeholder="Reporting month" />
      </W240>
      <W240>
        <DatePicker picker="year" placeholder="Fiscal year" />
      </W240>
      <W360>
        <RangePicker placeholder={['Start date', 'End date']} />
      </W360>
    </DatePickerStack>
  ),
}
