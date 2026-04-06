import { Skeleton } from '@/components/ui/skeleton';

interface SkeletonCardsProps {
  count?: number;
}

export function SkeletonCards({ count = 6 }: SkeletonCardsProps) {
  return (
    <div className="mt-6 space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="py-5 px-6 rounded-lg bg-muted/40 space-y-2.5">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-3.5 w-1/4" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}
