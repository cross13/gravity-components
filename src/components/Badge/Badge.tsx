import { Badge as AntBadge } from 'antd'
import type { BadgeProps } from './Badge.types'

export function Badge(props: BadgeProps) {
  return <AntBadge {...props} />
}

Badge.displayName = 'Badge'
Badge.Ribbon = AntBadge.Ribbon
