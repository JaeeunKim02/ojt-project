import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import koTranslation from './locales/ko.json';
import enTranslation from './locales/en.json';

const resources = {
  ko: {
    translation: koTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

i18n
  .use(initReactI18next) //초기화
  .init({
    resources,
    lng: 'en', // 기본 설정 언어
    fallbackLng: 'en', //언어가 지원되지 않을 때 대체 언어 설정
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
