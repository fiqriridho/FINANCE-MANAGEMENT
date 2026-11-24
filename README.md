# Finance Management - Frontend

Aplikasi Web Pengelolaan Keuangan (Frontend) dibangun dengan Next.js (App Router), TypeScript, Tailwind CSS, dan TanStack Query.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Lucide Icons
- **State & Server Cache**: TanStack Query (React Query v5)
- **UI Components**: Radix UI Primitives

## Fitur Utama
- **Dashboard Ringkasan Keuangan**: Akumulasi total pemasukan, total pengeluaran, dan saldo secara real-time.
- **Manajemen Transaksi**: CRUD transaksi dengan pencarian debounced, filter kategori & tipe (Income/Expense), filter rentang tanggal, sorting, dan pagination.
- **Tampilan Fleksibel**: Toggle tampilan antara Tabel dan Grid Kartu.
- **Manajemen Kategori**: CRUD kategori transaksi dengan pemfilteran dinamis pada form transaksi.
- **Detail Transaksi**: Halaman rincian lengkap untuk setiap transaksi.

## Menjalankan Aplikasi
1. Salin file environment:
   ```bash
   cp .env.example .env
   ```
2. Pastikan backend API aktif di `http://localhost:3000`.
3. Jalankan server development:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan pada port **3001** (`http://localhost:3001`).
