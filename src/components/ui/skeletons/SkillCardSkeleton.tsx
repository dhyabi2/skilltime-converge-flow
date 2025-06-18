
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SkillCardSkeleton = () => {
  return (
    <div className="glass-card rounded-xl p-4 border border-white/20 animate-pulse glass-float">
      <div className="flex gap-4">
        <Skeleton className="w-16 h-16 rounded-xl bg-white/20" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4 bg-white/20" />
          <Skeleton className="h-4 w-1/2 bg-white/15" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-4 w-16 bg-white/15" />
            <Skeleton className="h-4 w-20 bg-white/15" />
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-6 w-16 ml-auto bg-white/20" />
          <Skeleton className="h-4 w-12 ml-auto bg-white/15" />
        </div>
      </div>
    </div>
  );
};

export default SkillCardSkeleton;
