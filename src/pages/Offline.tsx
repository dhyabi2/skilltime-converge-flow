
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Offline = () => {
  const { t } = useTranslation('common');
  
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <WifiOff className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle>{t('offline.title')}</CardTitle>
          <CardDescription>
            {t('offline.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleRefresh} className="w-full">
            <RefreshCw className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4" />
            {t('buttons.try_again')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Offline;
