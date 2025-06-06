
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from './en.json'
import translationZH from './zh_cn.json'

const resources = {
  en: {
    translation: translationEN
  },
  zh_cn: {
    translation: translationZH
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: "zh-cn",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;