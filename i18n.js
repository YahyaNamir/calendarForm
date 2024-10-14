import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import translationEN from './locales/en.json';
import translationFR from './locales/fr.json';
import 'intl-pluralrules';

i18n.use(initReactI18next).init({
  resources: {
    en: {translation: translationEN},
    fr: {translation: translationFR},
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
