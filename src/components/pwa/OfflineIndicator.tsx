
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff } from 'lucide-react';
import { usePWA } from '@/hooks/usePWA';

export const OfflineIndicator = () => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <Alert className="fixed top-4 right-4 w-80 z-50 border-orange-200 bg-orange-50">
      <WifiOff className="h-4 w-4" />
      <AlertDescription className="text-orange-800">
        You're currently offline. Some features may be limited.
      </AlertDescription>
    </Alert>
  );
};
