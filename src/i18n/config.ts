
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation imports
import commonAr from '../locales/ar/common.json';
import authAr from '../locales/ar/auth.json';
import skillsAr from '../locales/ar/skills.json';
import bookingsAr from '../locales/ar/bookings.json';
import profileAr from '../locales/ar/profile.json';

// English translations (basic fallback)
const commonEn = {
  app: {
    name: "SkillTime",
    tagline: "Where skills meet and opportunities flow"
  },
  navigation: {
    home: "Home",
    browse: "Browse",
    bookings: "Bookings",
    profile: "Profile"
  },
  buttons: {
    search: "Search",
    filter: "Filter",
    book_now: "Book Now",
    cancel: "Cancel",
    save: "Save",
    back: "Back",
    try_again: "Try Again",
    view_more: "View More",
    install_app: "Install App",
    refresh: "Refresh"
  },
  labels: {
    loading: "Loading...",
    search_placeholder: "Search for skills...",
    price: "Price",
    duration: "Duration",
    location: "Location",
    rating: "Rating",
    reviews: "Reviews",
    skills: "skill",
    skills_plural: "skills"
  },
  language: {
    toggle: "Toggle Language",
    arabic: "Arabic",
    english: "English"
  }
};

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
