'use client';

import { useTransactionSummary } from '@/hooks/use-transactions';
import { formatRupiah } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

export function SummaryCards() {
  const { data: summary, isLoading } = useTransactionSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-4 w-28 mb-3" />
            <Skeleton className="h-8 w-40" />
          </Card>
        ))}
      </div>
    );
  }

  const totalIncome = summary?.totalIncome ?? 0;
  const totalExpense = summary?.totalExpense ?? 0;
  const balance = summary?.balance ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Total Pemasukan */}
      <Card className="border-emerald-200/60 bg-gradient-to-br from-emerald-50/50 via-white to-white shadow-sm hover:shadow transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Total Pemasukan
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-emerald-950">
                {formatRupiah(totalIncome)}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <TrendingUp className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Pengeluaran */}
      <Card className="border-rose-200/60 bg-gradient-to-br from-rose-50/50 via-white to-white shadow-sm hover:shadow transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">
                Total Pengeluaran
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-rose-950">
                {formatRupiah(totalExpense)}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
              <TrendingDown className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saldo Saat Ini */}
      <Card className="border-indigo-200/60 bg-gradient-to-br from-indigo-50/50 via-white to-white shadow-sm hover:shadow transition-shadow sm:col-span-2 lg:col-span-1">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                Saldo Saat Ini
              </p>
              <h3
                className={`mt-2 text-2xl font-bold tracking-tight ${
                  balance < 0 ? 'text-rose-600' : 'text-indigo-950'
                }`}
              >
                {formatRupiah(balance)}
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <Wallet className="h-6 w-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
