"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { DataTable } from '@/components/data-display/DataTable';
import { TableFilter } from '@/components/data-display/TableFilter';
import Button from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useTableState } from '@/hooks/useTableState';
import { useMockFetch } from '@/hooks/useMockFetch';
import { mockApi } from '@/lib/mockApi';
import { useAuth } from '@/context/AuthContext';
import { formatDate } from '@/lib/utils';
import { UserPlus, Edit3, Trash2, AlertTriangle } from 'lucide-react';

export default function UsersPage() {
  const { canDelete, isReadOnly } = useAuth();

  // Modal deletion state
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Table UI state
  const tableState = useTableState({
    initialLimit: 5,
    initialSortBy: 'createdAt',
    initialSortOrder: 'desc',
    initialFilters: { role: 'All', status: 'All' },
  });

  // Server state fetching
  const { data: usersResponse, loading, error, refetch } = useMockFetch(
    () =>
      mockApi.getUsers({
        search: tableState.search,
        role: tableState.filters.role,
        status: tableState.filters.status,
        page: tableState.page,
        limit: tableState.limit,
        sortBy: tableState.sortBy,
        sortOrder: tableState.sortOrder,
      }),
    [
      tableState.search,
      tableState.filters.role,
      tableState.filters.status,
      tableState.page,
      tableState.limit,
      tableState.sortBy,
      tableState.sortOrder,
    ]
  );

  async function handleDeleteConfirm() {
    if (!userToDelete) return;
    setIsDeleting(true);
    try {
      await mockApi.deleteUser(userToDelete.id);
      setUserToDelete(null);
      refetch();
    } catch (err) {
      alert(err.message || 'Could not delete user.');
    } finally {
      setIsDeleting(false);
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'User Profile',
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-200"
          />
          <div>
            <p className="font-semibold text-slate-900">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-purple-50 text-[#7038d4] border-purple-200">
          {row.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (row) => {
        const isSuccess = row.status === 'Active';
        const isWarning = row.status === 'Pending';
        return (
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
              isSuccess
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : isWarning
                ? 'bg-amber-50 text-amber-700 border-amber-200'
                : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      key: 'location',
      header: 'Location',
      sortable: true,
      render: (row) => <span className="text-xs text-slate-600">{row.location || '—'}</span>,
    },
    {
      key: 'createdAt',
      header: 'Joined Date',
      sortable: true,
      render: (row) => <span className="text-xs text-slate-500">{formatDate(row.createdAt)}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      sortable: false,
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Link href={`/users/${row.id}`}>
            <Button variant="ghost" size="sm">
              <Edit3 size={14} className="mr-1 inline" /> Edit
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setUserToDelete(row)}
            disabled={!canDelete}
            className="text-rose-600 hover:bg-rose-50"
          >
            <Trash2 size={14} className="mr-1 inline" /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users Directory"
        description="Search, filter, sort, and manage organization team members."
        breadcrumbs={[
          { label: 'Home', href: '/dashboard' },
          { label: 'Users' },
        ]}
        actions={
          <Link href="/users/new">
            <Button variant="primary" size="sm" disabled={isReadOnly}>
              <UserPlus size={14} className="mr-1.5 inline" /> Add User
            </Button>
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <TableFilter
        searchQuery={tableState.search}
        onSearchChange={tableState.handleSearchChange}
        filters={[
          {
            name: 'role',
            label: 'Role',
            value: tableState.filters.role,
            onChange: (val) => tableState.handleFilterChange('role', val),
            options: [
              { label: 'All Roles', value: 'All' },
              { label: 'Admin', value: 'Admin' },
              { label: 'Manager', value: 'Manager' },
              { label: 'Editor', value: 'Editor' },
              { label: 'Member', value: 'Member' },
            ],
          },
          {
            name: 'status',
            label: 'Status',
            value: tableState.filters.status,
            onChange: (val) => tableState.handleFilterChange('status', val),
            options: [
              { label: 'All Statuses', value: 'All' },
              { label: 'Active', value: 'Active' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Inactive', value: 'Inactive' },
            ],
          },
        ]}
        onReset={tableState.resetTableState}
      />

      {/* Error View */}
      {error ? (
        <div className="p-8 text-center bg-rose-50 border border-rose-200 rounded-xl">
          <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
          <h3 className="font-semibold text-rose-800">Unable to load users</h3>
          <p className="text-xs text-rose-600 mt-1 mb-4">{error}</p>
          <Button variant="primary" size="sm" onClick={refetch}>
            Retry Fetch
          </Button>
        </div>
      ) : (
        /* Data Table Wrapper */
        <DataTable
          columns={columns}
          data={usersResponse?.data || []}
          sortBy={tableState.sortBy}
          sortOrder={tableState.sortOrder}
          onSort={tableState.handleSort}
          isLoading={loading}
          pagination={{
            currentPage: usersResponse?.meta.currentPage || 1,
            totalPages: usersResponse?.meta.totalPages || 1,
            totalCount: usersResponse?.meta.totalCount || 0,
            limit: tableState.limit,
          }}
          onPageChange={tableState.handlePageChange}
          onLimitChange={tableState.handleLimitChange}
        />
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        title="Confirm User Deletion"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setUserToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete User'}
            </Button>
          </>
        }
      >
        {userToDelete && (
          <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-3">
            <img src={userToDelete.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-bold text-sm text-slate-900">{userToDelete.name}</p>
              <p className="text-xs text-slate-500">{userToDelete.email} • {userToDelete.role}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
