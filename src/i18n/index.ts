import { createI18n } from "vue-i18n";

import en from "./translations/en.json";

const messages = {
  en,
};

export const i18n = createI18n({
  legacy: false,
  locale: navigator.language ?? "en",
  fallbackLocale: "en",
  messages,
});
