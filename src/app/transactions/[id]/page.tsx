'use client';

import { use } from 'react';
import Link from 'next/link';
import { useTransaction } from '@/hooks/use-transactions';
import { TransactionDetailPageView } from '@/components/finance/transaction-detail-page-view';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  // Support both Next 14 & 15 params promise/object unwrapping
  const resolvedParams = 'then' in params ? use(params as Promise<{ id: string }>) : params;
  const id = resolvedParams.id;

  const { data: transaction, isLoading, error } = useTransaction(id);

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-80 w-full rounded-xl" />
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 mx-auto">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">
          Transaksi Tidak Ditemukan
        </h2>
        <p className="text-sm text-slate-500">
          Transaksi dengan ID tersebut tidak ditemukan atau telah dihapus.
        </p>
        <div>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return <TransactionDetailPageView transaction={transaction} />;
}
