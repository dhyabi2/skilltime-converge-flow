
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryCardSkeleton = () => {
  return (
    <div className="glass-card rounded-2xl p-4 border border-white/20 animate-pulse glass-float">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-xl bg-white/20" />
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2 bg-white/20" />
          <Skeleton className="h-4 w-20 bg-white/15" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-8 rounded-lg bg-white/15" />
        <Skeleton className="h-8 rounded-lg bg-white/15" />
        <Skeleton className="h-8 rounded-lg bg-white/15" />
        <Skeleton className="h-8 rounded-lg bg-white/15" />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
