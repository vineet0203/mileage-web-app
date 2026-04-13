import React, { useState, useMemo } from 'react'
import { cn } from '../../lib/utils'
import Pagination from './Pagination'

export interface ColumnDef<T extends Record<string, unknown>> {
  key: string
  header: string
  accessor: keyof T
  render?: (value: T[keyof T], row: T) => React.ReactNode
  align?: 'left' | 'center' | 'right'
  className?: string
  headerClassName?: string
}

export interface PaginationConfig {
  pageSize?: number
  totalItems?: number
  currentPage?: number
  onPageChange?: (page: number) => void
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: ColumnDef<T>[]
  data: T[]
  title?: string
  pagination?: PaginationConfig | false
  className?: string
  emptyMessage?: string
}

const alignClass = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
} as const

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  title,
  pagination = { pageSize: 10 },
  className,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) {
  const [internalPage, setInternalPage] = useState(1)

  const isServerSide = pagination !== false && pagination.totalItems !== undefined

  const pageSize = pagination !== false ? (pagination.pageSize ?? 10) : data.length
  const totalItems = isServerSide
    ? (pagination as PaginationConfig).totalItems!
    : data.length
  const totalPages = Math.ceil(totalItems / pageSize)

  const currentPage = isServerSide
    ? ((pagination as PaginationConfig).currentPage ?? internalPage)
    : internalPage

  const handlePageChange = (page: number) => {
    if (!isServerSide) setInternalPage(page)
    if (pagination !== false && pagination.onPageChange) {
      pagination.onPageChange(page)
    }
  }

  const rows = useMemo(() => {
    if (pagination === false || isServerSide) return data
    const start = (currentPage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, currentPage, pageSize, pagination, isServerSide])

  return (
    <div className={cn('bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden', className)}>
      {title && (
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg md:text-xl font-bold text-slate-800">{title}</h3>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={cn(
                    'px-5 py-3 text-xs font-semibold text-slate-500 whitespace-nowrap',
                    alignClass[col.align ?? 'left'],
                    col.headerClassName,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-10 text-center text-sm text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  {columns.map(col => {
                    const cellValue = row[col.accessor]
                    return (
                      <td
                        key={col.key}
                        className={cn(
                          'px-5 py-3.5 text-sm text-slate-600',
                          alignClass[col.align ?? 'left'],
                          col.className,
                        )}
                      >
                        {col.render
                          ? col.render(cellValue, row)
                          : (cellValue as React.ReactNode)}
                      </td>
                    )
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination !== false && totalPages > 0 && (
        <div className="px-6 py-3.5 border-t border-slate-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  )
}

export default DataTable
