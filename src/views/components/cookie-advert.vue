<script setup lang="ts">
import { RouteName } from "@/types/routename";
import { onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";

const showAdvert = ref(true);
const { t } = useI18n();

onBeforeMount(() => {
  if (localStorage.getItem("accept-cookies")) {
    showAdvert.value = false;
  }
});

const acceptCookies = () => {
  localStorage.setItem("accept-cookies", "true");
  showAdvert.value = false;
};
</script>
<template>
  <div
    v-if="showAdvert"
    class="w-full flex justify-between p-3 bg-red-900 dark:bg-neutral-600 items-center fixed bottom-0"
  >
    <i18n-t keypath="cookieAdvert.text" tag="p">
      <template #link>
        <router-link
          :to="{ name: RouteName.TERMS_AND_CONDITIONS }"
          class="text-blue-900 hover:text-blue-300 no-underline hover:underline"
          >{{ t("header.termAndConditions") }}</router-link
        >
      </template>
    </i18n-t>
    <div class="flex gap-2">
      <button
        class="flex gap-2 bg-green-900 rounded px-2 py-1 text-gray-200 items-center"
        @click="acceptCookies()"
      >
        {{ t("cookieAdvert.acceptButton") }}
      </button>
      <button
        class="flex gap-2 bg-red-900 rounded px-2 py-1 text-gray-200 items-center"
      >
        {{ t("cookieAdvert.rejectButton") }}
      </button>
    </div>
  </div>
</template>
