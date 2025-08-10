import { createI18n } from "vue-i18n";
import { messages } from "./messages";

const getInitialLocale = (): string => {
  // Primero verificar si hay un idioma guardado en localStorage
  const savedLocale = localStorage.getItem('selectedLanguage');
  if (savedLocale && Object.keys(messages).includes(savedLocale)) {
    return savedLocale;
  }
  
  // Si no hay idioma guardado, usar el idioma del navegador
  const browserLocale = navigator?.language?.split('-')[0] ?? 'en';
  if (Object.keys(messages).includes(browserLocale)) {
    return browserLocale;
  }
  
  // Fallback a inglés
  return 'en';
};

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: "en",
  messages,
});
