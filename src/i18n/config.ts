
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Arabic translation imports
import commonAr from '../locales/ar/common.json';
import authAr from '../locales/ar/auth.json';
import skillsAr from '../locales/ar/skills.json';
import bookingsAr from '../locales/ar/bookings.json';
import profileAr from '../locales/ar/profile.json';
import createSkillAr from '../locales/ar/create-skill.json';
import reviewsAr from '../locales/ar/reviews.json';
import notificationsAr from '../locales/ar/notifications.json';
import searchAr from '../locales/ar/search.json';
import pwaAr from '../locales/ar/pwa.json';
import errorsAr from '../locales/ar/errors.json';
import navigationAr from '../locales/ar/navigation.json';
import uiAr from '../locales/ar/ui.json';
import discoveryAr from '../locales/ar/discovery.json';

// English translation imports
import commonEn from '../locales/en/common.json';
import authEn from '../locales/en/auth.json';
import skillsEn from '../locales/en/skills.json';
import bookingsEn from '../locales/en/bookings.json';
import profileEn from '../locales/en/profile.json';
import createSkillEn from '../locales/en/create-skill.json';
import reviewsEn from '../locales/en/reviews.json';
import notificationsEn from '../locales/en/notifications.json';
import searchEn from '../locales/en/search.json';
import pwaEn from '../locales/en/pwa.json';
import errorsEn from '../locales/en/errors.json';
import navigationEn from '../locales/en/navigation.json';
import uiEn from '../locales/en/ui.json';
import discoveryEn from '../locales/en/discovery.json';

const resources = {
  ar: {
    common: commonAr,
    auth: authAr,
    skills: skillsAr,
    bookings: bookingsAr,
    profile: profileAr,
    'create-skill': createSkillAr,
    reviews: reviewsAr,
    notifications: notificationsAr,
    search: searchAr,
    pwa: pwaAr,
    errors: errorsAr,
    navigation: navigationAr,
    ui: uiAr,
    discovery: discoveryAr,
  },
  en: {
    common: commonEn,
    auth: authEn,
    skills: skillsEn,
    bookings: bookingsEn,
    profile: profileEn,
    'create-skill': createSkillEn,
    reviews: reviewsEn,
    notifications: notificationsEn,
    search: searchEn,
    pwa: pwaEn,
    errors: errorsEn,
    navigation: navigationEn,
    ui: uiEn,
    discovery: discoveryEn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language is Arabic
    fallbackLng: 'en', // Fallback to English
    debug: false,
    
    // Configure namespaces
    defaultNS: 'common',
    ns: ['common', 'auth', 'skills', 'bookings', 'profile', 'create-skill', 'reviews', 'notifications', 'search', 'pwa', 'errors', 'navigation', 'ui', 'discovery'],
    
    interpolation: {
      escapeValue: false,
    },
    
    // RTL configuration
    react: {
      useSuspense: false,
    },
    
    // Ensure proper fallback behavior
    fallbackNS: 'common',
    returnEmptyString: false,
    returnNull: false,
    
    // Language detection options
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
