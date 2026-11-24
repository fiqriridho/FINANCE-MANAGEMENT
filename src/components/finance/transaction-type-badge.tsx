import { TransactionType } from '@/types/finance';
import { Badge } from '@/components/ui/badge';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionTypeBadgeProps {
  type: TransactionType;
  className?: string;
}

export function TransactionTypeBadge({
  type,
  className,
}: TransactionTypeBadgeProps) {
  const isIncome = type === 'income';

  return (
    <Badge
      variant={isIncome ? 'success' : 'destructive'}
      className={cn(
        'inline-flex items-center gap-1 font-medium capitalize',
        className,
      )}
    >
      {isIncome ? (
        <ArrowDownLeft className="h-3.5 w-3.5 text-emerald-600" />
      ) : (
        <ArrowUpRight className="h-3.5 w-3.5 text-rose-600" />
      )}
      <span>{isIncome ? 'Pemasukan' : 'Pengeluaran'}</span>
    </Badge>
  );
}
