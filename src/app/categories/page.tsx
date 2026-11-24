'use client';

import { useState } from 'react';
import { useCategories } from '@/hooks/use-categories';
import { CategoryFormDialog } from '@/components/finance/category-form-dialog';
import { DeleteCategoryDialog } from '@/components/finance/delete-category-dialog';
import { TransactionTypeBadge } from '@/components/finance/transaction-type-badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatDate } from '@/lib/format-date';
import { Category, TransactionType } from '@/types/finance';
import { Plus, Search, Pencil, Trash2, Tags } from 'lucide-react';

export default function CategoriesPage() {
  const [searchInput, setSearchInput] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedCategoryForEdit, setSelectedCategoryForEdit] =
    useState<Category | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategoryForDelete, setSelectedCategoryForDelete] =
    useState<Category | null>(null);

  const { data: categories, isLoading } = useCategories({
    search: searchInput || undefined,
    type: typeFilter !== 'all' ? typeFilter : undefined,
  });

  const categoryList = categories || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl flex items-center gap-2.5">
            <Tags className="h-7 w-7 text-indigo-600" />
            Manajemen Kategori
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola kategori untuk mengelompokkan pemasukan dan pengeluaran Anda.
          </p>
        </div>

        <Button
          onClick={() => {
            setSelectedCategoryForEdit(null);
            setFormDialogOpen(true);
          }}
          className="gap-2 shadow-sm self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Tambah Kategori</span>
        </Button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Cari kategori..."
            className="pl-9 bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>

        <div className="w-full sm:w-48">
          <Select value={typeFilter} onValueChange={(val) => setTypeFilter(val)}>
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="Semua Tipe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Tipe</SelectItem>
              <SelectItem value="income">Pemasukan (Income)</SelectItem>
              <SelectItem value="expense">Pengeluaran (Expense)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px] font-semibold text-slate-700">#</TableHead>
              <TableHead className="font-semibold text-slate-700">Nama Kategori</TableHead>
              <TableHead className="font-semibold text-slate-700">Jenis</TableHead>
              <TableHead className="font-semibold text-slate-700">Dibuat Pada</TableHead>
              <TableHead className="text-right font-semibold text-slate-700">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-slate-500"
                >
                  {isLoading
                    ? 'Memuat daftar kategori...'
                    : 'Belum ada kategori yang ditambahkan.'}
                </TableCell>
              </TableRow>
            ) : (
              categoryList.map((cat, idx) => (
                <TableRow key={cat.id} className="hover:bg-slate-50/80">
                  <TableCell className="text-slate-400 font-mono text-xs">
                    {idx + 1}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {cat.name}
                  </TableCell>
                  <TableCell>
                    <TransactionTypeBadge type={cat.type} />
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    {formatDate(cat.created_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-600 hover:text-amber-600"
                        onClick={() => {
                          setSelectedCategoryForEdit(cat);
                          setFormDialogOpen(true);
                        }}
                        title="Edit Kategori"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-600 hover:text-rose-600"
                        onClick={() => {
                          setSelectedCategoryForDelete(cat);
                          setDeleteDialogOpen(true);
                        }}
                        title="Hapus Kategori"
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

      {/* Form Dialog */}
      <CategoryFormDialog
        category={selectedCategoryForEdit}
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
      />

      {/* Delete Dialog */}
      <DeleteCategoryDialog
        category={selectedCategoryForDelete}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </div>
  );
}
