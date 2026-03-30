import type { ReactNode } from 'react'
import type { TableProps, TableColumnType } from 'antd'

export interface DataGridFetchParams {
  page: number
  pageSize: number
  search?: string
}

export interface DataGridFetchResult<RecordType> {
  data: RecordType[]
  total: number
}

export interface DataGridProps<RecordType extends object = Record<string, unknown>> {
  /** Table column definitions */
  columns: TableColumnType<RecordType>[]
  /** Server-side fetch callback. Return data + total for pagination. */
  onFetch?: (params: DataGridFetchParams) => Promise<DataGridFetchResult<RecordType>>
  /** Client-side data source (used when onFetch is not provided) */
  dataSource?: RecordType[]
  /** Toolbar actions rendered to the right of the search bar */
  toolbar?: ReactNode
  /** Search input placeholder */
  searchPlaceholder?: string
  /** Show/hide the search bar (default: true) */
  searchable?: boolean
  /** Initial page size (default: 10) */
  pageSize?: number
  /** Empty state description */
  emptyText?: string
  /** Empty state action button */
  emptyAction?: ReactNode
  /** Row key field or getter */
  rowKey?: string | ((record: RecordType) => string)
  /** Row selection config */
  rowSelection?: TableProps<RecordType>['rowSelection']
  /** Override loading state */
  loading?: boolean
  style?: React.CSSProperties
  className?: string
}
