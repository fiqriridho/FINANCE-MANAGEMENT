'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Transaction } from '@/types/finance';
import { TransactionTypeBadge } from './transaction-type-badge';
import { TransactionFormDialog } from './transaction-form-dialog';
import { DeleteTransactionDialog } from './delete-transaction-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatRupiah } from '@/lib/utils';
import { formatDate, formatDateTime } from '@/lib/format-date';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Calendar,
  Tag,
  Clock,
  FileText,
} from 'lucide-react';

interface TransactionDetailPageViewProps {
  transaction: Transaction;
}

export function TransactionDetailPageView({
  transaction,
}: TransactionDetailPageViewProps) {
  const router = useRouter();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const isIncome = transaction.type === 'income';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali ke Dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
            className="gap-1.5"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="gap-1.5"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Hapus
          </Button>
        </div>
      </div>

      {/* Main Detail Card */}
      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <div
          className={`h-2.5 w-full ${
            isIncome ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        />
        <CardHeader className="p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TransactionTypeBadge type={transaction.type} />
                <span className="text-xs text-slate-400 font-mono">
                  ID: {transaction.id}
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">
                {transaction.title}
              </CardTitle>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                Nominal
              </span>
              <span
                className={`text-3xl font-extrabold ${
                  isIncome ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {isIncome ? '+ ' : '- '}
                {formatRupiah(transaction.amount)}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-2 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 bg-slate-50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                <Tag className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500">
                  Kategori
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  {transaction.category?.name || 'Tanpa Kategori'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-500">
                  Tanggal Transaksi
                </span>
                <p className="text-sm font-semibold text-slate-900">
                  {formatDate(transaction.transactionDate)}
                </p>
              </div>
            </div>
          </div>

          {transaction.description && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                <FileText className="h-3.5 w-3.5" />
                <span>Keterangan / Catatan Tambahan</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                {transaction.description}
              </div>
            </div>
          )}

          <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Dibuat pada: {formatDateTime(transaction.created_at)}</span>
            </div>
            {transaction.updated_at && (
              <div>
                <span>Terakhir diperbarui: {formatDateTime(transaction.updated_at)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit & Delete Dialogs */}
      <TransactionFormDialog
        transaction={transaction}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={() => router.refresh()}
      />

      <DeleteTransactionDialog
        transaction={transaction}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={() => router.push('/')}
      />
    </div>
  );
}
