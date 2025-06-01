
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation imports
import commonAr from '../locales/ar/common.json';
import authAr from '../locales/ar/auth.json';
import skillsAr from '../locales/ar/skills.json';
import bookingsAr from '../locales/ar/bookings.json';
import profileAr from '../locales/ar/profile.json';

const resources = {
  ar: {
    common: commonAr,
    auth: authAr,
    skills: skillsAr,
    bookings: bookingsAr,
    profile: profileAr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language is Arabic
    fallbackLng: 'ar',
    debug: false,
    
    // Configure namespaces
    defaultNS: 'common',
    ns: ['common', 'auth', 'skills', 'bookings', 'profile'],
    
    interpolation: {
      escapeValue: false,
    },
    
    // RTL configuration
    react: {
      useSuspense: false,
    },
  });

export default i18n;
