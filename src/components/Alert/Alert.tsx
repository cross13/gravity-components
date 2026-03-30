import { Alert as AntAlert } from 'antd'
import type { AlertProps } from './Alert.types'

export function Alert({ showIcon = true, ...props }: AlertProps) {
  return <AntAlert showIcon={showIcon} {...props} />
}

Alert.displayName = 'Alert'
