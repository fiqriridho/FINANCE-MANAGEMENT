import type { Metadata } from 'next';
import './globals.css';
import { QueryProvider } from '@/providers/query-provider';
import { AppHeader } from '@/components/layout/app-header';
import { AppFooter } from '@/components/layout/app-footer';

export const metadata: Metadata = {
  title: 'Finance Management',
  description: 'Aplikasi Web Pengelolaan Keuangan Sederhana',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 flex min-h-screen flex-col antialiased">
        <QueryProvider>
          <AppHeader />
          <main className="flex-1 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <AppFooter />
        </QueryProvider>
      </body>
    </html>
  );
}
