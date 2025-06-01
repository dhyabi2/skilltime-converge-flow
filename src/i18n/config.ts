
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Arabic translation imports
import commonAr from '../locales/ar/common.json';
import authAr from '../locales/ar/auth.json';
import skillsAr from '../locales/ar/skills.json';
import bookingsAr from '../locales/ar/bookings.json';
import profileAr from '../locales/ar/profile.json';

// English translation imports
import commonEn from '../locales/en/common.json';
import authEn from '../locales/en/auth.json';
import skillsEn from '../locales/en/skills.json';
import bookingsEn from '../locales/en/bookings.json';
import profileEn from '../locales/en/profile.json';

const resources = {
  ar: {
    common: commonAr,
    auth: authAr,
    skills: skillsAr,
    bookings: bookingsAr,
    profile: profileAr,
  },
  en: {
    common: commonEn,
    auth: authEn,
    skills: skillsEn,
    bookings: bookingsEn,
    profile: profileEn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language is Arabic
    fallbackLng: 'en', // Changed fallback to English
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
