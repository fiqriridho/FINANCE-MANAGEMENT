import { SummaryCards } from '@/components/finance/summary-cards';
import { FinanceWorkspace } from '@/components/finance/finance-workspace';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Page Title & Overview */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Ringkasan Keuangan
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Pantau arus kas masuk, pengeluaran, dan saldo keuangan secara real-time.
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Main Transactions Workspace */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Riwayat Transaksi</h2>
          <p className="text-xs text-slate-500">
            Kelola, filter, dan cari seluruh aktivitas transaksi Anda.
          </p>
        </div>

        <FinanceWorkspace />
      </div>
    </div>
  );
}
