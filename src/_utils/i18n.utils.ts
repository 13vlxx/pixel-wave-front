import { Locales, translations } from "@assets/locales";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatTranslation = (value: any, format?: string) => {
  if (typeof value === "string" && format === "uppercase") {
    return value.toUpperCase();
  }

  if (typeof value === "string" && format === "lowercase") {
    return value.toLowerCase();
  }

  if (typeof value === "string" && format === "capitalize") {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return value;
};

i18n.use(initReactI18next).init({
  resources: translations,
  fallbackLng: Locales.FR,
  lng: window.navigator.language,
  returnObjects: true,
  returnNull: true,
  interpolation: {
    escapeValue: false,
    format: formatTranslation,
  },
});

export default i18n;
