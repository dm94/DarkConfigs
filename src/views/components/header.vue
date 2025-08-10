<script setup lang="ts">
import { ref } from "vue";
import { RouteName } from "@typec/routename";
import { useI18n } from "vue-i18n";
import LanguageSelector from "./language-selector.vue";

const { t } = useI18n();

const discordUrl = (import.meta.env.VITE_APP_DISCORD as string) ?? "";
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};
</script>
<template>
  <header class="w-full">
    <nav
      class="relative flex w-full items-center justify-between bg-white py-3 px-4 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200">
      <div class="flex items-center">
        <router-link :to="{ name: RouteName.HOME }"
          class="text-lg font-semibold text-neutral-800 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
          :title="t('header.home')">
          DarkConfigs
        </router-link>
      </div>
      <ul itemscope itemtype="https://schema.org/SiteNavigationElement"
        class="hidden md:flex items-center space-x-6">
        <li itemprop="name">
          <router-link :to="{ name: RouteName.HOME }"
            class="block px-3 py-2 text-sm font-medium disabled:text-black/30 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            :title="t('header.home')">
            {{ t("header.home") }}
          </router-link>
        </li>
        <li itemprop="name">
          <router-link :to="{ name: RouteName.UPLOAD }"
            class="block px-3 py-2 text-sm font-medium disabled:text-black/30 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            :title="t('header.uploadConfig')">
            {{ t("header.uploadConfig") }}
          </router-link>
        </li>
        <li itemprop="name">
          <router-link :to="{ name: RouteName.CONDITION_MAKER }"
            class="block px-3 py-2 text-sm font-medium disabled:text-black/30 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            :title="t('header.maker')">
            {{ t("header.maker") }}
          </router-link>
        </li>
        <li itemprop="name">
          <a class="block px-3 py-2 text-sm font-medium disabled:text-black/30 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            :href="discordUrl" rel="external nofollow noopener" target="_blank">
            {{ t("header.discord") }}
          </a>
        </li>
        <li itemprop="name">
          <router-link :to="{ name: RouteName.TERMS_AND_CONDITIONS }"
            class="block px-3 py-2 text-sm font-medium disabled:text-black/30 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
            :title="t('header.tos')">
            {{ t("header.tos") }}
          </router-link>
        </li>
      </ul>

      <div class="flex items-center space-x-4">
        <LanguageSelector />
        
        <button
          @click="toggleMobileMenu"
          class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-600 dark:text-neutral-200 hover:text-green-600 dark:hover:text-green-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition-colors duration-200"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!isMobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div v-show="isMobileMenuOpen" class="absolute top-full left-0 right-0 md:hidden bg-white dark:bg-neutral-600 shadow-lg border-t border-neutral-200 dark:border-neutral-500 z-50">
        <ul itemscope itemtype="https://schema.org/SiteNavigationElement" class="py-2">
          <li itemprop="name">
            <router-link :to="{ name: RouteName.HOME }"
              @click="isMobileMenuOpen = false"
              class="block px-4 py-3 text-base font-medium text-neutral-600 dark:text-white hover:text-green-600 dark:hover:text-green-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
              :title="t('header.home')">
              {{ t("header.home") }}
            </router-link>
          </li>
          <li itemprop="name">
            <router-link :to="{ name: RouteName.UPLOAD }"
              @click="isMobileMenuOpen = false"
              class="block px-4 py-3 text-base font-medium text-neutral-600 dark:text-white hover:text-green-600 dark:hover:text-green-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
              :title="t('header.uploadConfig')">
              {{ t("header.uploadConfig") }}
            </router-link>
          </li>
          <li itemprop="name">
            <router-link :to="{ name: RouteName.CONDITION_MAKER }"
              @click="isMobileMenuOpen = false"
              class="block px-4 py-3 text-base font-medium text-neutral-600 dark:text-white hover:text-green-600 dark:hover:text-green-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
              :title="t('header.maker')">
              {{ t("header.maker") }}
            </router-link>
          </li>
          <li itemprop="name">
            <a class="block px-4 py-3 text-base font-medium text-neutral-600 dark:text-white hover:text-green-600 dark:hover:text-green-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
              :href="discordUrl" rel="external nofollow noopener" target="_blank"
              @click="isMobileMenuOpen = false">
              {{ t("header.discord") }}
            </a>
          </li>
          <li itemprop="name">
            <router-link :to="{ name: RouteName.TERMS_AND_CONDITIONS }"
              @click="isMobileMenuOpen = false"
              class="block px-4 py-3 text-base font-medium text-neutral-600 dark:text-white hover:text-green-600 dark:hover:text-green-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors duration-200"
              :title="t('header.tos')">
              {{ t("header.tos") }}
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
