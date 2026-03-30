import { useState, useCallback, useEffect } from 'react'
import { Table, Space, Empty as AntEmpty } from 'antd'
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons'
import type { DataGridProps, DataGridFetchParams } from './DataGrid.types'
import { RefreshIconButton, Root, StyledSearch, Toolbar } from './DataGrid.styles'

export function DataGrid<RecordType extends object = Record<string, unknown>>({
  columns,
  onFetch,
  dataSource: controlledData,
  toolbar,
  searchPlaceholder = 'Search...',
  searchable = true,
  pageSize: initialPageSize = 10,
  emptyText = 'No data found',
  emptyAction,
  rowKey = 'key',
  rowSelection,
  loading: controlledLoading,
  style,
  className,
}: DataGridProps<RecordType>) {
  const [data, setData] = useState<RecordType[]>([])
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [searchQuery, setSearchQuery] = useState('')

  const isServerSide = !!onFetch
  const displayData = isServerSide ? data : controlledData ?? []
  const isLoading = controlledLoading ?? loading

  const fetchData = useCallback(
    async (params: DataGridFetchParams) => {
      if (!onFetch) return
      setLoading(true)
      try {
        const result = await onFetch(params)
        setData(result.data)
        setTotal(result.total)
      } finally {
        setLoading(false)
      }
    },
    [onFetch],
  )

  useEffect(() => {
    if (isServerSide) {
      fetchData({ page, pageSize, search: searchQuery })
    }
  }, [page, pageSize, searchQuery, fetchData, isServerSide])

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value)
    setPage(1)
  }, [])

  const handleRefresh = useCallback(() => {
    if (isServerSide) {
      fetchData({ page, pageSize, search: searchQuery })
    }
  }, [fetchData, page, pageSize, searchQuery, isServerSide])

  return (
    <Root style={style} className={className}>
      {(searchable || toolbar) && (
        <Toolbar>
          {searchable ? (
            <StyledSearch
              placeholder={searchPlaceholder}
              onSearch={handleSearch}
              allowClear
              prefix={<SearchOutlined />}
            />
          ) : (
            <div />
          )}
          <Space>
            {toolbar}
            {isServerSide && (
              <RefreshIconButton type="button" onClick={handleRefresh} aria-label="Refresh data">
                <ReloadOutlined />
              </RefreshIconButton>
            )}
          </Space>
        </Toolbar>
      )}
      <Table<RecordType>
        columns={columns}
        dataSource={displayData}
        loading={isLoading}
        rowKey={rowKey}
        rowSelection={rowSelection}
        pagination={
          isServerSide
            ? {
                current: page,
                pageSize,
                total,
                onChange: (p, ps) => {
                  setPage(p)
                  setPageSize(ps)
                },
                showSizeChanger: true,
                showTotal: (t) => `${t} total records`,
              }
            : { pageSize, showSizeChanger: true, showTotal: (t) => `${t} total records` }
        }
        locale={{
          emptyText: (
            <AntEmpty description={emptyText}>
              {emptyAction}
            </AntEmpty>
          ),
        }}
      />
    </Root>
  )
}

DataGrid.displayName = 'DataGrid'
