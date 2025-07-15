
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, X, Smartphone, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { usePWA } from '@/hooks/usePWA';

export const InstallPrompt = () => {
  const { isInstallable, installApp, dismissInstallPrompt } = usePWA();
  const { t } = useTranslation('pwa');
  const [dismissed, setDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isInstallable && !dismissed) {
      // Show prompt after a delay to not be intrusive
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isInstallable, dismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setDismissed(true);
      dismissInstallPrompt();
    }, 300);
  };

  const handleInstall = async () => {
    await installApp();
    setIsVisible(false);
  };

  if (!isInstallable || dismissed || !isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end justify-center p-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-sm shadow-2xl border-0 bg-gradient-to-br from-white via-white to-blue-50 transform animate-in slide-in-from-bottom duration-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
                <Smartphone className="h-4 w-4 text-white" />
              </div>
              {t('install.title')}
            </CardTitle>
            <CardDescription className="text-sm text-slate-600">
              {t('install.description')}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full"
          >
            <X className="h-4 w-4 text-slate-500" />
          </Button>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-4">
          {/* Benefits list */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="h-3 w-3 text-green-600" />
              </div>
              <span>{t('install.benefits.faster')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Smartphone className="h-3 w-3 text-blue-600" />
              </div>
              <span>{t('install.benefits.offline')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-700">
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                <Download className="h-3 w-3 text-purple-600" />
              </div>
              <span>{t('install.benefits.native')}</span>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              variant="outline" 
              onClick={handleDismiss}
              className="flex-1 text-slate-600 border-slate-200 hover:bg-slate-50"
            >
              {t('install.later')}
            </Button>
            <Button 
              onClick={handleInstall} 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Download className="mr-2 rtl:mr-0 rtl:ml-2 h-4 w-4" />
              {t('install.button')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
