'use client';

import { useState } from 'react';
import { useTransactions } from '@/hooks/use-transactions';
import { useCategories } from '@/hooks/use-categories';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { TransactionTable } from './transaction-table';
import { TransactionCard } from './transaction-card';
import { TransactionFormDialog } from './transaction-form-dialog';
import { DeleteTransactionDialog } from './delete-transaction-dialog';
import { TransactionDetailDialog } from './transaction-detail-dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Transaction,
  TransactionType,
} from '@/types/finance';
import {
  Search,
  Plus,
  Table as TableIcon,
  LayoutGrid,
  FilterX,
} from 'lucide-react';

export function FinanceWorkspace() {
  // Filter States
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebouncedValue(searchInput, 400);

  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Sorting & Pagination
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('transactionDate');
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('DESC');

  // View Mode: Table vs Cards
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Dialog States
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedTransactionForEdit, setSelectedTransactionForEdit] =
    useState<Transaction | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransactionForDelete, setSelectedTransactionForDelete] =
    useState<Transaction | null>(null);

  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedTransactionForDetail, setSelectedTransactionForDetail] =
    useState<Transaction | null>(null);

  // Queries
  const { data: allCategories } = useCategories();
  const { data: transactionResponse, isLoading } = useTransactions({
    page,
    limit,
    search: debouncedSearch || undefined,
    type:
      typeFilter !== 'all' ? (typeFilter as TransactionType) : undefined,
    categoryId: categoryFilter !== 'all' ? categoryFilter : undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    sortBy,
    sortOrder,
  });

  const transactions = transactionResponse?.data || [];
  const meta = transactionResponse?.meta || null;

  // Sorting Handler
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(column);
      setSortOrder('DESC');
    }
    setPage(1);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchInput('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  const hasActiveFilters =
    !!searchInput ||
    typeFilter !== 'all' ||
    categoryFilter !== 'all' ||
    !!startDate ||
    !!endDate;

  return (
    <div className="space-y-6">
      {/* Toolbar & Filter Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setPage(1);
              }}
              placeholder="Cari transaksi berdasarkan judul..."
              className="pl-9 bg-slate-50 border-slate-200 focus:bg-white"
            />
          </div>

          {/* Action Buttons: Add & View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Tampilan Tabel"
              >
                <TableIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                  viewMode === 'cards'
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Tampilan Grid Kartu"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>

            <Button
              onClick={() => {
                setSelectedTransactionForEdit(null);
                setFormDialogOpen(true);
              }}
              className="gap-1.5 shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Transaksi</span>
            </Button>
          </div>
        </div>

        {/* Filter Row: Type, Category, Date Range, Reset */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-100">
          {/* Filter Tipe */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">
              Jenis Transaksi
            </label>
            <Select
              value={typeFilter}
              onValueChange={(val) => {
                setTypeFilter(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Semua Jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                <SelectItem value="income">Pemasukan (Income)</SelectItem>
                <SelectItem value="expense">Pengeluaran (Expense)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Kategori */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">
              Kategori
            </label>
            <Select
              value={categoryFilter}
              onValueChange={(val) => {
                setCategoryFilter(val);
                setPage(1);
              }}
            >
              <SelectTrigger className="h-9 text-xs">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {(allCategories || []).map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name} ({cat.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter Tanggal Mulai */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">
              Dari Tanggal
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setPage(1);
              }}
              className="h-9 text-xs"
            />
          </div>

          {/* Filter Tanggal Akhir */}
          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">
              Sampai Tanggal
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setPage(1);
              }}
              className="h-9 text-xs"
            />
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              disabled={!hasActiveFilters}
              className="h-9 w-full gap-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              <FilterX className="h-3.5 w-3.5" />
              Reset Filter
            </Button>
          </div>
        </div>
      </div>

      {/* Main Workspace View: Table or Cards */}
      {viewMode === 'table' ? (
        <TransactionTable
          transactions={transactions}
          meta={meta}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={handleSort}
          onPageChange={(newPage) => setPage(newPage)}
          onViewDetail={(tx) => {
            setSelectedTransactionForDetail(tx);
            setDetailDialogOpen(true);
          }}
          onEdit={(tx) => {
            setSelectedTransactionForEdit(tx);
            setFormDialogOpen(true);
          }}
          onDelete={(tx) => {
            setSelectedTransactionForDelete(tx);
            setDeleteDialogOpen(true);
          }}
          isLoading={isLoading}
        />
      ) : (
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-slate-500">
              {isLoading
                ? 'Memuat data transaksi...'
                : 'Tidak ada data transaksi yang sesuai filter.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transactions.map((tx) => (
                <TransactionCard
                  key={tx.id}
                  transaction={tx}
                  onViewDetail={(t) => {
                    setSelectedTransactionForDetail(t);
                    setDetailDialogOpen(true);
                  }}
                  onEdit={(t) => {
                    setSelectedTransactionForEdit(t);
                    setFormDialogOpen(true);
                  }}
                  onDelete={(t) => {
                    setSelectedTransactionForDelete(t);
                    setDeleteDialogOpen(true);
                  }}
                />
              ))}
            </div>
          )}

          {/* Pagination for Cards */}
          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between px-2 pt-2 text-xs text-slate-500">
              <span>
                Halaman {meta.page} dari {meta.totalPages} (Total {meta.totalItems} transaksi)
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p - 1)}
                  disabled={!meta.hasPreviousPage}
                >
                  Sebelumnya
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!meta.hasNextPage}
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form Dialog (Create / Edit) */}
      <TransactionFormDialog
        transaction={selectedTransactionForEdit}
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
      />

      {/* Detail Dialog */}
      <TransactionDetailDialog
        transaction={selectedTransactionForDetail}
        open={detailDialogOpen}
        onOpenChange={setDetailDialogOpen}
        onEdit={(tx) => {
          setSelectedTransactionForEdit(tx);
          setFormDialogOpen(true);
        }}
        onDelete={(tx) => {
          setSelectedTransactionForDelete(tx);
          setDeleteDialogOpen(true);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteTransactionDialog
        transaction={selectedTransactionForDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
}
