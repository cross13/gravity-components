import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Input as AntInput, Select as AntSelect, DatePicker as AntDatePicker, Switch } from 'antd'
import { Form } from '../src/components/Form'
import { Button } from '../src/components/Button'
import { FullWidthPicker, NarrowForm, StatusSelect } from './Form.stories.styles'

const meta: Meta<typeof Form> = {
  title: 'Primitives/Form',
  component: Form,
  argTypes: {
    layout: { control: 'select', options: ['horizontal', 'vertical', 'inline'] },
    size: { control: 'select', options: ['small', 'middle', 'large'] },
    disabled: { control: 'boolean' },
    colon: { control: 'boolean' },
    labelAlign: { control: 'select', options: ['left', 'right'] },
  },
}

export default meta
type Story = StoryObj<typeof Form>

export const Default: Story = {
  render: (args) => (
    <NarrowForm
      {...args}
      onFinish={(values) => {
        console.log('Form submitted:', values)
      }}
    >
      <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
        <AntInput placeholder="John Smith" />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
        <AntInput placeholder="john@company.com" />
      </Form.Item>
      <Form.Item label="Department" name="department" rules={[{ required: true }]}>
        <AntSelect
          placeholder="Select department"
          options={[
            { value: 'engineering', label: 'Engineering' },
            { value: 'design', label: 'Design' },
            { value: 'marketing', label: 'Marketing' },
          ]}
        />
      </Form.Item>
      <Form.Item label="Start Date" name="startDate">
        <FullWidthPicker>
          <AntDatePicker />
        </FullWidthPicker>
      </Form.Item>
      <Form.Item label="Active" name="active" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create Employee
        </Button>
      </Form.Item>
    </NarrowForm>
  ),
  args: {
    layout: 'vertical',
    size: 'middle',
    disabled: false,
    colon: true,
  },
}

export const InlineLayout: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Form layout="inline" onFinish={(values) => console.log(values)}>
      <Form.Item label="Search" name="query">
        <AntInput placeholder="Order ID or customer..." />
      </Form.Item>
      <Form.Item label="Status" name="status">
        <StatusSelect>
          <AntSelect
            placeholder="All"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'pending', label: 'Pending' },
              { value: 'closed', label: 'Closed' },
            ]}
          />
        </StatusSelect>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Filter
        </Button>
      </Form.Item>
    </Form>
  ),
}

export const WithValidation: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <NarrowForm initialValues={{ role: 'viewer' }} onFinish={(values) => console.log(values)}>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Username is required' },
          { min: 3, message: 'Minimum 3 characters' },
        ]}
      >
        <AntInput placeholder="Choose a username" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true },
          { min: 8, message: 'Minimum 8 characters' },
        ]}
      >
        <AntInput.Password placeholder="Strong password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </NarrowForm>
  ),
}
