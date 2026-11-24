'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TransactionTypeBadge } from './transaction-type-badge';
import { formatRupiah } from '@/lib/utils';
import { formatDate } from '@/lib/format-date';
import { Transaction } from '@/types/finance';
import { Eye, Pencil, Trash2, Calendar, Tag } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
  onViewDetail?: (tx: Transaction) => void;
  onEdit?: (tx: Transaction) => void;
  onDelete?: (tx: Transaction) => void;
}

export function TransactionCard({
  transaction,
  onViewDetail,
  onEdit,
  onDelete,
}: TransactionCardProps) {
  const isIncome = transaction.type === 'income';

  return (
    <Card className="overflow-hidden border-slate-200 shadow-sm transition-all hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <TransactionTypeBadge type={transaction.type} />
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Calendar className="h-3 w-3" />
                {formatDate(transaction.transactionDate)}
              </span>
            </div>
            <h4 className="font-semibold text-slate-900 text-base truncate">
              {transaction.title}
            </h4>
          </div>

          <div className="text-right shrink-0">
            <span
              className={`text-base font-bold ${
                isIncome ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isIncome ? '+ ' : '- '}
              {formatRupiah(transaction.amount)}
            </span>
          </div>
        </div>

        {transaction.description && (
          <p className="mt-2 text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-md">
            {transaction.description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Tag className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium bg-slate-100 px-2 py-0.5 rounded">
              {transaction.category?.name || 'Tanpa Kategori'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-600 hover:text-indigo-600"
              onClick={() => onViewDetail?.(transaction)}
              title="Lihat Detail"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-600 hover:text-amber-600"
              onClick={() => onEdit?.(transaction)}
              title="Edit Transaksi"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-600 hover:text-rose-600"
              onClick={() => onDelete?.(transaction)}
              title="Hapus Transaksi"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
