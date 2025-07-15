
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WifiOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePWA } from '@/hooks/usePWA';

export const OfflineIndicator = () => {
  const { isOnline } = usePWA();
  const { t } = useTranslation('pwa');

  if (isOnline) return null;

  return (
    <Alert className="fixed top-4 right-4 rtl:right-auto rtl:left-4 w-80 z-50 border-orange-200 bg-orange-50">
      <WifiOff className="h-4 w-4" />
      <AlertDescription className="text-orange-800">
        {t('offline.indicator')}
      </AlertDescription>
    </Alert>
  );
};
