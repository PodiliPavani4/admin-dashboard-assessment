import { useState } from 'react';

export function useTableState(initialConfig = {}) {
  const initialPage = initialConfig.initialPage || 1;
  const initialLimit = initialConfig.initialLimit || 5;
  const initialSortBy = initialConfig.initialSortBy || 'createdAt';
  const initialSortOrder = initialConfig.initialSortOrder || 'desc';
  const initialSearch = initialConfig.initialSearch || '';
  const initialFilters = initialConfig.initialFilters || {};

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState(initialFilters);

  function handleSort(columnKey) {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(columnKey);
      setSortOrder('asc');
    }
    setPage(1);
  }

  function handlePageChange(newPage) {
    setPage(newPage);
  }

  function handleLimitChange(newLimit) {
    setLimit(newLimit);
    setPage(1);
  }

  function handleSearchChange(query) {
    setSearch(query);
    setPage(1);
  }

  function handleFilterChange(filterName, value) {
    setFilters({
      ...filters,
      [filterName]: value,
    });
    setPage(1);
  }

  function resetTableState() {
    setPage(initialPage);
    setLimit(initialLimit);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
    setSearch(initialSearch);
    setFilters(initialFilters);
  }

  return {
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    filters,
    handleSort,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
    handleFilterChange,
    resetTableState,
    setPage,
  };
}
