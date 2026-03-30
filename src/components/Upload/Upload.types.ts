import type { UploadProps as AntUploadProps, UploadFile } from 'antd'
import type { ReactNode } from 'react'

export interface UploadProps extends Omit<AntUploadProps, 'beforeUpload'> {
  /** Accepted file types (MIME types or extensions, e.g., "image/*,.pdf") */
  accept?: string
  /** Maximum file size in bytes */
  maxSize?: number
  /** Called when a file upload completes successfully */
  onUploadSuccess?: (file: UploadFile) => void
  /** Called when a file is rejected or upload fails */
  onUploadError?: (error: string) => void
}

export interface DraggerProps extends Omit<UploadProps, 'children'> {
  /** Drag area description text */
  description?: string
  /** Hint text below the description */
  hint?: string
}
