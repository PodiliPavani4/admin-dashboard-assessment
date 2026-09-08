import React from 'react';
import { SearchInput } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { RotateCcw } from 'lucide-react';

export function TableFilter({
  searchQuery,
  onSearchChange,
  filters = [],
  onReset,
  className = '',
}) {
  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5 ${className}`}>
      {/* Search Input Box */}
      <div className="w-full sm:max-w-xs">
        <SearchInput
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email, location..."
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-3">
        {filters.map((f) => (
          <div key={f.name} className="min-w-[130px]">
            <Select
              label={f.label}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              options={f.options}
            />
          </div>
        ))}

        {onReset && (
          <div className="flex items-end">
            <Button
              variant="ghost"
              size="md"
              onClick={onReset}
              className="text-slate-500 hover:text-slate-700"
            >
              <RotateCcw size={14} className="mr-1 inline" /> Reset
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
