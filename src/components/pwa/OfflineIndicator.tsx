
import React from 'react';
import { WifiOff } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

const OfflineIndicator = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-2 z-50">
      <div className="flex items-center justify-center space-x-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">You're offline</span>
      </div>
    </div>
  );
};

export default OfflineIndicator;
