'use client';

import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TransactionTypeBadge } from './transaction-type-badge';
import { formatRupiah } from '@/lib/utils';
import { formatDate, formatDateTime } from '@/lib/format-date';
import { Transaction } from '@/types/finance';
import { ExternalLink } from 'lucide-react';

interface TransactionDetailDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: (tx: Transaction) => void;
  onDelete?: (tx: Transaction) => void;
}

export function TransactionDetailDialog({
  transaction,
  open,
  onOpenChange,
  onEdit,
  onDelete,
}: TransactionDetailDialogProps) {
  if (!transaction) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="flex items-center justify-between pr-6">
            <DialogTitle>Detail Transaksi</DialogTitle>
            <TransactionTypeBadge type={transaction.type} />
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2 text-sm">
          <div>
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Judul
            </span>
            <p className="mt-1 text-base font-semibold text-slate-900">
              {transaction.title}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Nominal
              </span>
              <p
                className={`mt-1 text-lg font-bold ${
                  transaction.type === 'income'
                    ? 'text-emerald-600'
                    : 'text-rose-600'
                }`}
              >
                {transaction.type === 'income' ? '+ ' : '- '}
                {formatRupiah(transaction.amount)}
              </p>
            </div>

            <div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Kategori
              </span>
              <p className="mt-1 font-medium text-slate-900">
                {transaction.category?.name || 'Tanpa Kategori'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Tanggal Transaksi
              </span>
              <p className="mt-1 font-medium text-slate-900">
                {formatDate(transaction.transactionDate)}
              </p>
            </div>

            <div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Dicatat Pada
              </span>
              <p className="mt-1 text-xs text-slate-600">
                {formatDateTime(transaction.created_at)}
              </p>
            </div>
          </div>

          {transaction.description && (
            <div>
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Keterangan
              </span>
              <p className="mt-1 rounded-md bg-slate-50 p-3 text-slate-700 whitespace-pre-wrap">
                {transaction.description}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Link
            href={`/transactions/${transaction.id}`}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 font-medium mr-auto"
          >
            <span>Buka Halaman Penuh</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              onEdit?.(transaction);
            }}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onOpenChange(false);
              onDelete?.(transaction);
            }}
          >
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
