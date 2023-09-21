<script setup lang="ts">
import { RouteName } from "@/types/routename";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>
<template>
  <header class="w-full">
    <nav
      class="relative flex w-full items-center justify-between bg-white py-2 text-neutral-600 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 dark:text-neutral-200 md:flex-wrap md:justify-start"
    >
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <ul class="mr-auto flex flex-col lg:flex-row">
          <li class="lg:mb-0 lg:pr-2">
            <router-link
              :to="{ name: RouteName.HOME }"
              data-te-nav-link-ref
              data-te-ripple-init
              data-te-ripple-color="light"
              class="block disabled:text-black/30 dark:text-white lg:p-2"
              >{{ t("header.home") }}</router-link
            >
          </li>
          <li class="lg:mb-0 lg:pr-2">
            <router-link
              :to="{ name: RouteName.UPLOAD }"
              data-te-nav-link-ref
              data-te-ripple-init
              data-te-ripple-color="light"
              class="block disabled:text-black/30 dark:text-white lg:p-2"
              >{{ t("header.uploadConfig") }}</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>
@/types/types
