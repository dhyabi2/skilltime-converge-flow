
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useRTL = () => {
  const { i18n } = useTranslation();
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl');
  
  useEffect(() => {
    // Set initial direction based on current language
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    setDirection(dir);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', i18n.language);
    
    // Listen for language changes
    const handleLanguageChange = (lng: string) => {
      const newDir = lng === 'ar' ? 'rtl' : 'ltr';
      setDirection(newDir);
      document.documentElement.setAttribute('dir', newDir);
      document.documentElement.setAttribute('lang', lng);
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return {
    isRTL: direction === 'rtl',
    direction
  };
};
