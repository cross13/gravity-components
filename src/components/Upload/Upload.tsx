import { Upload as AntUpload, App } from 'antd'
import { InboxOutlined, UploadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import type { UploadProps, DraggerProps } from './Upload.types'
import type { UploadFile, RcFile } from 'antd/es/upload'

function validateFile(
  file: RcFile,
  accept?: string,
  maxSize?: number,
): string | null {
  if (accept) {
    const acceptedTypes = accept.split(',').map((t) => t.trim())
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
    const isAccepted = acceptedTypes.some(
      (type) =>
        type === file.type ||
        type === fileExtension ||
        (type.endsWith('/*') && file.type.startsWith(type.replace('/*', '/'))),
    )
    if (!isAccepted) return `${file.name} is not an accepted file type`
  }
  if (maxSize && file.size > maxSize) {
    const maxMB = (maxSize / 1024 / 1024).toFixed(1)
    return `${file.name} exceeds the ${maxMB}MB size limit`
  }
  return null
}

export function Upload({
  accept,
  maxSize,
  onUploadSuccess,
  onUploadError,
  children,
  ...props
}: UploadProps) {
  const beforeUpload = (file: RcFile) => {
    const error = validateFile(file, accept, maxSize)
    if (error) {
      onUploadError?.(error)
      return AntUpload.LIST_IGNORE
    }
    return true
  }

  const handleChange = (info: { file: UploadFile }) => {
    if (info.file.status === 'done') {
      onUploadSuccess?.(info.file)
    } else if (info.file.status === 'error') {
      onUploadError?.(`${info.file.name} upload failed`)
    }
  }

  return (
    <AntUpload
      accept={accept}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      {...props}
    >
      {children ?? (
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      )}
    </AntUpload>
  )
}

Upload.displayName = 'Upload'

export function Dragger({
  accept,
  maxSize,
  onUploadSuccess,
  onUploadError,
  description = 'Click or drag file to this area to upload',
  hint,
  ...props
}: DraggerProps) {
  const beforeUpload = (file: RcFile) => {
    const error = validateFile(file, accept, maxSize)
    if (error) {
      onUploadError?.(error)
      return AntUpload.LIST_IGNORE
    }
    return true
  }

  const handleChange = (info: { file: UploadFile }) => {
    if (info.file.status === 'done') {
      onUploadSuccess?.(info.file)
    } else if (info.file.status === 'error') {
      onUploadError?.(`${info.file.name} upload failed`)
    }
  }

  return (
    <AntUpload.Dragger
      accept={accept}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      {...props}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">{description}</p>
      {hint && <p className="ant-upload-hint">{hint}</p>}
    </AntUpload.Dragger>
  )
}

Dragger.displayName = 'Upload.Dragger'
