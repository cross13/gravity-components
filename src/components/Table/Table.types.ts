import type { TableProps as AntTableProps, TableColumnType as AntTableColumnType } from 'antd'

export interface TableProps<RecordType extends object = Record<string, unknown>>
  extends AntTableProps<RecordType> {}

export type TableColumnType<RecordType> = AntTableColumnType<RecordType>
