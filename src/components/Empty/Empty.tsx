import { Empty as AntEmpty, Button } from 'antd'
import type { EmptyProps } from './Empty.types'

export function Empty({
  description = 'No data',
  action,
  actionText,
  onAction,
  image,
  ...props
}: EmptyProps) {
  return (
    <AntEmpty
      image={image ?? AntEmpty.PRESENTED_IMAGE_SIMPLE}
      description={description}
      {...props}
    >
      {action ??
        (actionText && onAction ? (
          <Button type="primary" onClick={onAction}>
            {actionText}
          </Button>
        ) : null)}
    </AntEmpty>
  )
}

Empty.displayName = 'Empty'
