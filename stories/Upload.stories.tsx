import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Space } from 'antd'
import { Upload, Dragger } from '../src/components/Upload'

type UploadStoryArgs = React.ComponentProps<typeof Upload> & {
  buttonLabel?: string
}

const meta: Meta<UploadStoryArgs> = {
  title: 'Enhanced/Upload',
  component: Upload,
  argTypes: {
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    listType: { control: 'select', options: ['text', 'picture', 'picture-card', 'picture-circle'] },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
    showUploadList: { control: 'boolean' },
    buttonLabel: { control: 'text', name: 'Button label' },
  },
}

export default meta
type Story = StoryObj<UploadStoryArgs>

export const Default: Story = {
  render: (args) => {
    const { buttonLabel, ...uploadArgs } = args
    return (
      <Upload
        action="https://httpbin.org/post"
        {...uploadArgs}
        onUploadSuccess={(file) => console.log('Uploaded:', file.name)}
        onUploadError={(err) => console.error('Error:', err)}
      >
        {buttonLabel}
      </Upload>
    )
  },
  args: {
    accept: 'image/*,.pdf',
    maxSize: 5 * 1024 * 1024,
    listType: 'text',
    buttonLabel: undefined,
    multiple: false,
  },
}

type DraggerStoryArgs = React.ComponentProps<typeof Dragger>

export const DragAndDrop: StoryObj<DraggerStoryArgs> = {
  render: (args) => (
    <Dragger
      action="https://httpbin.org/post"
      {...args}
      onUploadSuccess={(file) => console.log('Uploaded:', file.name)}
      onUploadError={(err) => console.error('Error:', err)}
    />
  ),
  args: {
    accept: 'image/*,.pdf,.docx',
    maxSize: 10 * 1024 * 1024,
    description: 'Click or drag files to upload',
    hint: 'Supports images, PDFs, and Word documents up to 10MB',
    multiple: true,
  },
  argTypes: {
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    description: { control: 'text' },
    hint: { control: 'text' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export const ImageUpload: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Upload
      action="https://httpbin.org/post"
      accept="image/*"
      maxSize={2 * 1024 * 1024}
      listType="picture-card"
      onUploadSuccess={(file) => console.log('Uploaded:', file.name)}
      onUploadError={(err) => console.error('Error:', err)}
    >
      + Upload Photo
    </Upload>
  ),
}
