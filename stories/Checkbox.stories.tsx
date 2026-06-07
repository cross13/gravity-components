import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { Space } from 'antd'
import { Checkbox } from '../src/components/Checkbox'
import type { CheckboxProps } from '../src/components/Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
}

export default meta
type Story = StoryObj<typeof Checkbox>

const permissionOptions = [
  { value: 'read', label: 'Read' },
  { value: 'write', label: 'Write' },
  { value: 'delete', label: 'Delete' },
]

export const Default: Story = {
  render: () => <Checkbox defaultChecked>Send me product updates</Checkbox>,
}

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Space direction="vertical" size="small">
      <Checkbox defaultChecked>Checked</Checkbox>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox indeterminate>Indeterminate</Checkbox>
      <Checkbox disabled>Disabled</Checkbox>
      <Checkbox disabled defaultChecked>
        Disabled & checked
      </Checkbox>
    </Space>
  ),
}

export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Checkbox.Group defaultValue={['read']} options={permissionOptions} />
  ),
}

export const CheckAll: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const CheckAllExample = () => {
      const [checked, setChecked] = useState<string[]>(['read', 'write'])
      const all = permissionOptions.map((o) => o.value)
      const allChecked = checked.length === all.length
      const indeterminate = checked.length > 0 && checked.length < all.length
      const onCheckAll: CheckboxProps['onChange'] = (e) =>
        setChecked(e.target.checked ? all : [])
      return (
        <Space direction="vertical" size="small">
          <Checkbox indeterminate={indeterminate} checked={allChecked} onChange={onCheckAll}>
            Select all permissions
          </Checkbox>
          <Checkbox.Group
            value={checked}
            options={permissionOptions}
            onChange={(v) => setChecked(v as string[])}
          />
        </Space>
      )
    }
    return <CheckAllExample />
  },
}
