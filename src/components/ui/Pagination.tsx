import React from "react";
import { cn } from "../../lib/utils";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function buildPageNumbers(current: number, total: number): (number | "...")[] {
  // If small, just show all
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Always 5 slots max
  if (current <= 3) {
    return [1, 2, 3, "...", total];
  }

  if (current >= total - 2) {
    return [1, "...", total - 2, total - 1, total];
  }

  // Middle case
  return [1, "...", current, "...", total];
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const handleChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <p className="text-xs text-slate-400 whitespace-nowrap">
        Showing {startItem}–{endItem} of {totalItems}
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => handleChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary disabled:opacity-40"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {buildPageNumbers(currentPage, totalPages).map((page, i) =>
          page === "..." ? (
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
                "w-8 h-8 rounded-md text-xs transition-all",
                currentPage === page
                  ? "bg-brand-primary text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary"
              )}
            >
              {page}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => handleChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary disabled:opacity-40"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;