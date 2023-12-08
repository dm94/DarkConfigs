<script setup lang="ts">
import { RouteName } from "@typec/routename";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const discordUrl = (import.meta.env.VITE_APP_DISCORD as string) ?? "";
</script>
<template>
  <header class="w-full">
    <nav
      class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start">
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <ul itemscope itemtype="https://schema.org/SiteNavigationElement"
          class="mr-auto flex flex-row w-full gap-2 justify-around lg:justify-start">
          <li itemprop="name">
            <router-link :to="{ name: RouteName.HOME }"
              class="block disabled:text-black/30 dark:text-white lg:p-2 hover:text-green-200" :title="RouteName.HOME">{{
                t("header.home") }}</router-link>
          </li>
          <li itemprop="name">
            <router-link :to="{ name: RouteName.UPLOAD }"
              class="block disabled:text-black/30 dark:text-white lg:p-2 hover:text-green-200"
              :title="RouteName.UPLOAD">{{ t("header.uploadConfig") }}</router-link>
          </li>
          <li itemprop="name">
            <router-link :to="{ name: RouteName.CONDITION_MAKER }"
              class="block disabled:text-black/30 dark:text-white lg:p-2 hover:text-green-200"
              :title="RouteName.CONDITION_MAKER">{{ t("header.maker") }}</router-link>
          </li>
          <li itemprop="name">
            <a class="block disabled:text-black/30 dark:text-white lg:p-2 hover:text-green-200" :href="discordUrl"
              rel="external nofollow noopener" target="_blank">{{ t("header.discord") }}</a>
          </li>
          <li itemprop="name" class="lg:ml-auto">
            <router-link :to="{ name: RouteName.TERMS_AND_CONDITIONS }"
              class="block disabled:text-black/30 dark:text-white lg:p-2 hover:text-green-200"
              :title="RouteName.TERMS_AND_CONDITIONS">{{ t("header.tos") }}</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
