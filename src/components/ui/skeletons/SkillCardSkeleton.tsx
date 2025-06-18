
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkillCardSkeleton = () => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-soft-blue-100 animate-pulse">
      <div className="flex gap-4">
        <Skeleton className="w-16 h-16 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-6 w-16 ml-auto" />
          <Skeleton className="h-4 w-12 ml-auto" />
        </div>
      </div>
    </div>
  );
};

export default SkillCardSkeleton;
