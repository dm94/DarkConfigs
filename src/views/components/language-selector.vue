<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted, onUnmounted } from "vue";

const { locale, availableLocales } = useI18n();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const languages = [
  { code: "en", name: "English", flag: "US" },
  { code: "es", name: "Español", flag: "ES" },
  { code: "bg", name: "Български", flag: "BG" },
  { code: "cs", name: "Čeština", flag: "cz" },
  { code: "de", name: "Deutsch", flag: "DE" },
  { code: "el", name: "Ελληνικά", flag: "GR" },
  { code: "fr", name: "Français", flag: "FR" },
  { code: "hu", name: "Magyar", flag: "HU" },
  { code: "it", name: "Italiano", flag: "IT" },
  { code: "lt", name: "Lietuvių", flag: "LT" },
  { code: "pl", name: "Polski", flag: "PL" },
  { code: "pt", name: "Português", flag: "PT" },
  { code: "ro", name: "Română", flag: "RO" },
  { code: "ru", name: "Русский", flag: "RU" },
  { code: "sv", name: "Svenska", flag: "SE" },
  { code: "tr", name: "Türkçe", flag: "TR" },
  { code: "uk", name: "Українська", flag: "UA" },
];

const availableLanguages = computed(() => {
  return languages.filter((lang) => availableLocales.includes(lang.code));
});

const currentLanguage = computed(() => {
  return languages.find((lang) => lang.code === locale.value) ?? languages[0];
});

const changeLanguage = (languageCode: string) => {
  locale.value = languageCode;
  localStorage.setItem("selectedLanguage", languageCode);
  isOpen.value = false;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left language-dropdown">
    <button
      @click="toggleDropdown"
      class="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600 dark:hover:bg-neutral-600"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="true"
    >
      <span class="mr-2">{{ currentLanguage.flag }}</span>
      <span class="hidden sm:inline">{{ currentLanguage.name }}</span>
      <span class="sm:hidden">{{ currentLanguage.code.toUpperCase() }}</span>
      <svg
        class="w-4 h-4 ml-2 -mr-1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      v-show="isOpen"
      class="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-white border border-gray-300 rounded-md shadow-lg dark:bg-neutral-700 dark:border-neutral-600"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="language-menu"
    >
      <div class="py-1">
        <button
          v-for="language in availableLanguages"
          :key="language.code"
          @click="changeLanguage(language.code)"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-neutral-600"
          :class="{
            'bg-gray-100 text-gray-900 dark:bg-neutral-600': language.code === locale,
          }"
          role="menuitem"
        >
          <span class="mr-3">{{ language.flag }}</span>
          <span>{{ language.name }}</span>
          <span v-if="language.code === locale" class="ml-auto">
            <svg
              class="w-4 h-4 text-green-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>