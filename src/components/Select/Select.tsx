import { Select as AntSelect } from 'antd'
import type { SelectProps } from './Select.types'

export function Select<ValueType = string>(props: SelectProps<ValueType>) {
  return <AntSelect<ValueType> {...props} />
}

Select.displayName = 'Select'
