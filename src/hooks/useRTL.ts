
import { useEffect, useState } from 'react';

export const useRTL = () => {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl');
  const [language, setLanguage] = useState('ar');
  
  useEffect(() => {
    // Set initial direction based on language
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    setDirection(dir);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return {
    isRTL: direction === 'rtl',
    direction
  };
};
