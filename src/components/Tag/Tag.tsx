import { Tag as AntTag } from 'antd'
import type { TagProps } from './Tag.types'

export function Tag(props: TagProps) {
  return <AntTag {...props} />
}

Tag.displayName = 'Tag'
Tag.CheckableTag = AntTag.CheckableTag
