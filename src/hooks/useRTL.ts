import { useEffect, useState } from 'react';

export const useRTL = () => {
  // Initialize with a safer default that doesn't depend on string comparison
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl'); // Default to RTL for Arabic
  const [language, setLanguage] = useState('ar');
  
  useEffect(() => {
    // Set initial direction based on language
    const dir = language === 'ar' ? 'rtl' : 'ltr';
    setDirection(dir);
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
    
    // Listen for language changes if i18n is available
    const checkI18n = () => {
      try {
        // Try to access i18n if it's available
        const i18n = (window as any).i18n;
        if (i18n && i18n.language) {
          const newDir = i18n.language === 'ar' ? 'rtl' : 'ltr';
          setDirection(newDir);
          setLanguage(i18n.language);
          document.documentElement.setAttribute('dir', newDir);
          document.documentElement.setAttribute('lang', i18n.language);
        }
      } catch (error) {
        // Silently handle any errors and keep default values
        console.log('i18n not yet available, using defaults');
      }
    };
    
    // Check periodically for i18n availability
    const interval = setInterval(checkI18n, 100);
    
    // Clean up
    return () => clearInterval(interval);
  }, [language]);

  return {
    isRTL: direction === 'rtl',
    direction
  };
};
