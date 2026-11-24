import { Skeleton } from '@/components/ui/skeleton';

export default function TransactionLoading() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Skeleton className="h-6 w-36" />
      <Skeleton className="h-80 w-full rounded-xl" />
    </div>
  );
}
