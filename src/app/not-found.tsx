import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4 shadow-sm">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold text-slate-900">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 text-sm text-slate-500 max-w-sm">
        Halaman yang Anda tuju tidak ditemukan atau data telah dihapus.
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
