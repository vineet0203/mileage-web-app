import React from 'react'
import { cn } from '../../lib/utils'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  className?: string
}

function buildPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total]
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const handleChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <p className="text-xs text-slate-400 whitespace-nowrap">
        Showing {startItem}–{endItem} out of {totalItems} results
      </p>

      <div className="flex items-center gap-1">
        {buildPageNumbers(currentPage, totalPages).map((page, i) =>
          page === '...' ? (
            <span
              key={`ellipsis-${i}`}
              className="w-8 h-8 flex items-center justify-center text-xs text-slate-400"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handleChange(page as number)}
              className={cn(
                'w-8 h-8 rounded-sm text-xs font-semibold transition-all',
                currentPage === page
                  ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/30'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary',
              )}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  )
}

export default Pagination
