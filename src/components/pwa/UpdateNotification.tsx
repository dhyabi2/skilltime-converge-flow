
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Download, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePWA } from '@/hooks/usePWA';

export const UpdateNotification = () => {
  const { updateAvailable, updateApp } = usePWA();
  const { t } = useTranslation('pwa');
  const [dismissed, setDismissed] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    await updateApp();
  };

  const handleDismiss = () => {
    setDismissed(true);
  };

  if (!updateAvailable || dismissed) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4 animate-in slide-in-from-bottom duration-500">
      <Alert className="border-blue-200 bg-blue-50/95 backdrop-blur-sm shadow-lg">
        <Download className="h-4 w-4 text-blue-600" />
        <div className="flex items-start justify-between w-full">
          <div className="flex-1">
            <AlertTitle className="text-blue-800 font-semibold">
              {t('update.available')}
            </AlertTitle>
            <AlertDescription className="text-blue-700 mt-1 text-sm">
              {t('update.message')}
            </AlertDescription>
            <div className="flex gap-2 mt-3">
              <Button
                size="sm"
                onClick={handleUpdate}
                disabled={isUpdating}
                className="bg-blue-600 hover:bg-blue-700 text-white h-8"
              >
                {isUpdating ? (
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : (
                  <Download className="h-3 w-3 mr-2 rtl:mr-0 rtl:ml-2" />
                )}
                {t('update.button')}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
                className="border-blue-300 text-blue-700 hover:bg-blue-100 h-8"
              >
                {t('update.later')}
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 hover:bg-blue-100 rounded-full ml-2"
          >
            <X className="h-3 w-3 text-blue-600" />
          </Button>
        </div>
      </Alert>
    </div>
  );
};
