import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './locales/en.json';
import translationUZ from './locales/uz.json';
import translationUZk from './locales/uzk.json';
import translationRU from './locales/ru.json';

const resources = {
  en: { translation: translationEN },
  uz: { translation: translationUZ },
  uzk: { translation: translationUZk },
  ru: { translation: translationRU },
};

export const initI18n = (defaultLang = 'en') => {
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLang,
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;

