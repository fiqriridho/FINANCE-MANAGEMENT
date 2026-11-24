'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { TransactionTypeBadge } from './transaction-type-badge';
import { formatRupiah } from '@/lib/utils';
import { formatDate } from '@/lib/format-date';
import { Transaction, PaginationMeta } from '@/types/finance';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  meta?: PaginationMeta | null;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  onSort?: (column: string) => void;
  onPageChange?: (page: number) => void;
  onViewDetail?: (tx: Transaction) => void;
  onEdit?: (tx: Transaction) => void;
  onDelete?: (tx: Transaction) => void;
  isLoading?: boolean;
}

export function TransactionTable({
  transactions,
  meta,
  sortBy,
  sortOrder,
  onSort,
  onPageChange,
  onViewDetail,
  onEdit,
  onDelete,
  isLoading,
}: TransactionTableProps) {
  const renderSortIcon = (column: string) => {
    if (sortBy !== column) {
      return <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 opacity-40" />;
    }
    return sortOrder === 'ASC' ? (
      <ArrowUp className="ml-1.5 h-3.5 w-3.5 text-indigo-600" />
    ) : (
      <ArrowDown className="ml-1.5 h-3.5 w-3.5 text-indigo-600" />
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer select-none font-semibold text-slate-700 hover:text-slate-900"
                onClick={() => onSort?.('transactionDate')}
              >
                <div className="flex items-center">
                  Tanggal
                  {renderSortIcon('transactionDate')}
                </div>
              </TableHead>

              <TableHead
                className="cursor-pointer select-none font-semibold text-slate-700 hover:text-slate-900"
                onClick={() => onSort?.('title')}
              >
                <div className="flex items-center">
                  Judul Transaksi
                  {renderSortIcon('title')}
                </div>
              </TableHead>

              <TableHead className="font-semibold text-slate-700">Kategori</TableHead>
              <TableHead className="font-semibold text-slate-700">Jenis</TableHead>

              <TableHead
                className="cursor-pointer select-none text-right font-semibold text-slate-700 hover:text-slate-900"
                onClick={() => onSort?.('amount')}
              >
                <div className="flex items-center justify-end">
                  Nominal
                  {renderSortIcon('amount')}
                </div>
              </TableHead>

              <TableHead className="text-right font-semibold text-slate-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-slate-500"
                >
                  {isLoading
                    ? 'Memuat data transaksi...'
                    : 'Tidak ada data transaksi yang sesuai filter.'}
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-slate-50/80">
                  <TableCell className="font-medium text-slate-600 whitespace-nowrap">
                    {formatDate(tx.transactionDate)}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{tx.title}</div>
                    {tx.description && (
                      <div className="text-xs text-slate-500 line-clamp-1 max-w-xs">
                        {tx.description}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                      {tx.category?.name || 'Tanpa Kategori'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <TransactionTypeBadge type={tx.type} />
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold whitespace-nowrap ${
                      tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                    }`}
                  >
                    {tx.type === 'income' ? '+ ' : '- '}
                    {formatRupiah(tx.amount)}
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-600 hover:text-indigo-600"
                        onClick={() => onViewDetail?.(tx)}
                        title="Lihat Detail"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-600 hover:text-amber-600"
                        onClick={() => onEdit?.(tx)}
                        title="Edit Transaksi"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-600 hover:text-rose-600"
                        onClick={() => onDelete?.(tx)}
                        title="Hapus Transaksi"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Bar */}
      {meta && meta.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-1">
          <p className="text-xs text-slate-500">
            Menampilkan halaman <span className="font-semibold text-slate-700">{meta.page}</span> dari{' '}
            <span className="font-semibold text-slate-700">{meta.totalPages}</span>{' '}
            (Total {meta.totalItems} transaksi)
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(meta.page - 1)}
              disabled={!meta.hasPreviousPage}
              className="h-8 gap-1 text-xs"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Sebelumnya
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange?.(meta.page + 1)}
              disabled={!meta.hasNextPage}
              className="h-8 gap-1 text-xs"
            >
              Selanjutnya
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
