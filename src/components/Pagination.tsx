import React, { useMemo } from "react";

export interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number;
  onChange: (page: number) => void;
}

export function Pagination({
  total,
  pageSize,
  currentPage,
  onChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  // Generate the page numbers to display, including '...'
  const pages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages - 1, totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        2,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }, [currentPage, totalPages]);

  // Keyboard navigation for arrow keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" && currentPage > 1) {
      onChange(currentPage - 1);
    } else if (e.key === "ArrowRight" && currentPage < totalPages) {
      onChange(currentPage + 1);
    }
  };

  if (totalPages === 0) return null;

  const baseBtnStyles =
    "px-4 py-2 font-bold border-2 border-black transition-all duration-200 flex items-center justify-center";
  const activeBtnStyles =
    "bg-yellow-400 text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none";
  const defaultBtnStyles =
    "bg-white text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none";
  const disabledBtnStyles =
    "bg-gray-200 text-gray-500 border-gray-400 shadow-none cursor-not-allowed opacity-70";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center gap-3"
      onKeyDown={handleKeyDown}
    >
      {/* Previous Button */}
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        className={`${baseBtnStyles} ${currentPage === 1 ? disabledBtnStyles : defaultBtnStyles}`}
        aria-label="Go to previous page"
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 font-bold text-xl"
              >
                ...
              </span>
            );
          }

          const isCurrentPage = page === currentPage;

          return (
            <button
              key={`page-${page}`}
              onClick={() => onChange(page as number)}
              aria-current={isCurrentPage ? "page" : undefined}
              className={`${baseBtnStyles} ${isCurrentPage ? activeBtnStyles : defaultBtnStyles}`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        className={`${baseBtnStyles} ${currentPage === totalPages ? disabledBtnStyles : defaultBtnStyles}`}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  );
}
