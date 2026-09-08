import React from 'react';
import Button from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TablePagination({
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  limit = 5,
  onPageChange,
  onLimitChange,
}) {
  const startItem = totalCount === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalCount);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 text-xs text-slate-600 border-t border-slate-200">
      <div className="flex items-center gap-4">
        <span>
          Showing <strong className="font-semibold text-slate-900">{startItem}</strong> to{' '}
          <strong className="font-semibold text-slate-900">{endItem}</strong> of{' '}
          <strong className="font-semibold text-slate-900">{totalCount}</strong> results
        </span>

        {onLimitChange && (
          <div className="flex items-center gap-2">
            <span>Rows:</span>
            <Select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              options={[
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 20, label: '20' },
              ]}
              className="w-16"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          <ChevronLeft size={16} className="mr-1 inline" /> Previous
        </Button>
        <span className="px-2 py-1 font-semibold text-slate-800">
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next <ChevronRight size={16} className="ml-1 inline" />
        </Button>
      </div>
    </div>
  );
}
