'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategories } from '@/hooks/use-categories';
import {
  useCreateTransaction,
  useUpdateTransaction,
} from '@/hooks/use-transactions';
import { Transaction, TransactionType } from '@/types/finance';

interface TransactionFormDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function TransactionFormDialog({
  transaction,
  open,
  onOpenChange,
  onSuccess,
}: TransactionFormDialogProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [type, setType] = useState<TransactionType>('expense');
  const [categoryId, setCategoryId] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const { data: allCategories } = useCategories();
  const createMutation = useCreateTransaction();
  const updateMutation = useUpdateTransaction();

  // Filter kategori berdasarkan tipe yang dipilih
  const filteredCategories = (allCategories || []).filter(
    (cat) => cat.type === type,
  );

  useEffect(() => {
    if (transaction) {
      setTitle(transaction.title);
      setAmount(String(transaction.amount));
      setType(transaction.type);
      setCategoryId(transaction.categoryId);
      setTransactionDate(
        transaction.transactionDate
          ? transaction.transactionDate.substring(0, 10)
          : '',
      );
      setDescription(transaction.description || '');
    } else {
      setTitle('');
      setAmount('');
      setType('expense');
      setCategoryId('');
      setTransactionDate(new Date().toISOString().substring(0, 10));
      setDescription('');
    }
    setError('');
  }, [transaction, open]);

  // Ketika type berubah, pastikan categoryId yang dipilih sesuai tipe baru
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    const validCats = (allCategories || []).filter(
      (cat) => cat.type === newType,
    );
    if (!validCats.some((c) => c.id === categoryId)) {
      setCategoryId(validCats.length > 0 ? validCats[0].id : '');
    }
  };

  const isEditing = !!transaction;
  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Judul transaksi tidak boleh kosong');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Nominal harus lebih besar dari 0');
      return;
    }
    if (!categoryId) {
      setError('Kategori wajib dipilih');
      return;
    }
    if (!transactionDate) {
      setError('Tanggal transaksi wajib diisi');
      return;
    }

    try {
      if (isEditing) {
        await updateMutation.mutateAsync({
          id: transaction.id,
          dto: {
            title: title.trim(),
            amount: parsedAmount,
            type,
            categoryId,
            transactionDate,
            description: description.trim() || null,
          },
        });
      } else {
        await createMutation.mutateAsync({
          title: title.trim(),
          amount: parsedAmount,
          type,
          categoryId,
          transactionDate,
          description: description.trim() || null,
        });
      }
      onOpenChange(false);
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || 'Gagal menyimpan transaksi');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Edit Transaksi' : 'Catat Transaksi Baru'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {error && (
              <div className="rounded-md bg-rose-50 p-3 text-sm text-rose-700 border border-rose-200">
                {error}
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="tx-title">Judul Transaksi</Label>
              <Input
                id="tx-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="misal: Gaji Bulanan, Beli Makan Siang, Bayar Listrik"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tx-type">Jenis Transaksi</Label>
                <Select
                  value={type}
                  onValueChange={(val) =>
                    handleTypeChange(val as TransactionType)
                  }
                >
                  <SelectTrigger id="tx-type">
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Pemasukan</SelectItem>
                    <SelectItem value="expense">Pengeluaran</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tx-amount">Nominal (Rp)</Label>
                <Input
                  id="tx-amount"
                  type="number"
                  min="1"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tx-category">Kategori ({type})</Label>
                <Select
                  value={categoryId}
                  onValueChange={(val) => setCategoryId(val)}
                >
                  <SelectTrigger id="tx-category">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredCategories.length === 0 ? (
                      <SelectItem value="_empty" disabled>
                        Tidak ada kategori ({type})
                      </SelectItem>
                    ) : (
                      filteredCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tx-date">Tanggal Transaksi</Label>
                <Input
                  id="tx-date"
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="tx-desc">Keterangan (Opsional)</Label>
              <Textarea
                id="tx-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Catatan tambahan..."
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? 'Menyimpan...'
                : isEditing
                ? 'Simpan Perubahan'
                : 'Tambah Transaksi'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
