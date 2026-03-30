import { Table as AntTable } from 'antd'
import type { TableProps } from './Table.types'

export function Table<RecordType extends object = Record<string, unknown>>(
  props: TableProps<RecordType>,
) {
  return <AntTable<RecordType> {...props} />
}

Table.displayName = 'Table'
