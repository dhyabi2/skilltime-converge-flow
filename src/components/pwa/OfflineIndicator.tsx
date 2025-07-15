
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePWA } from '@/hooks/usePWA';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const OfflineIndicator = () => {
  const { isOnline } = usePWA();
  const { t } = useTranslation('pwa');
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    // Simulate retry delay
    setTimeout(() => {
      setIsRetrying(false);
      window.location.reload();
    }, 1000);
  };

  if (isOnline) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-in slide-in-from-top duration-500">
      <Alert className="border-orange-200 bg-orange-50/95 backdrop-blur-sm shadow-lg">
        <WifiOff className="h-4 w-4 text-orange-600" />
        <AlertTitle className="text-orange-800 font-semibold">
          {t('offline.title')}
        </AlertTitle>
        <AlertDescription className="text-orange-700 mt-1">
          <div className="space-y-2">
            <p className="text-sm">{t('offline.message')}</p>
            <Button
              size="sm"
              variant="outline"
              onClick={handleRetry}
              disabled={isRetrying}
              className="bg-orange-100 border-orange-300 text-orange-800 hover:bg-orange-200 h-8"
            >
              <RefreshCw className={`h-3 w-3 mr-2 rtl:mr-0 rtl:ml-2 ${isRetrying ? 'animate-spin' : ''}`} />
              {t('offline.retry')}
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
};
