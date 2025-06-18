
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const CategoryCardSkeleton = () => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-soft-blue-100 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1">
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-8 rounded-lg" />
        <Skeleton className="h-8 rounded-lg" />
        <Skeleton className="h-8 rounded-lg" />
        <Skeleton className="h-8 rounded-lg" />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
