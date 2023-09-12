<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, onMounted, ref } from "vue";
import router from "../router";
import { RouteName } from "@/types";
import { useI18n } from "vue-i18n";
import { getConfigFile, getConfig } from "@/functions/connector";
import { cleanConfig } from "@/functions/configcleaner";
import { ConfigInfo } from "@/types/configfile";
import { getJsonFileName } from "@/functions/general";

const config = ref<ConfigInfo>();

const { t } = useI18n();

onMounted(async () => {
  const route = useRoute();

  if (!route?.params?.id) {
    router.push({ name: RouteName.HOME });
    return;
  }

  try {
    const responseConfig = await getConfig(route?.params?.id as string);
    if (responseConfig) {
      config.value = responseConfig;
    }
  } catch (error) {
    console.error(error);
  }

  if (!config.value) {
    router.push({ name: RouteName.HOME });
  }
});

const karmaClasses = computed(() => {
  const classes = [
    "rounded-full",
    "px-3",
    "py-1",
    "py-1",
    "text-sm",
    "font-semibold",
    "text-gray-700",
    "flex",
    "gap-2",
    "items-center",
  ];

  if (!config.value) {
    return classes;
  }

  if (config.value.karma == 0) {
    classes.push("bg-gray-200");
  } else if (config.value.karma > 0) {
    classes.push("bg-green-200");
  } else if (config.value.karma < 0) {
    classes.push("bg-red-200");
  }
  return classes;
});

const download = (filename: string, text: string) => {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
};

const downloadConfig = async () => {
  if (!config.value) {
    return;
  }
  try {
    const responseConfig = await getConfigFile(config.value.configId);

    const configParsed = cleanConfig(responseConfig);
    download(getJsonFileName(config.value.name), JSON.stringify(configParsed));
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div v-if="config" class="flex container mx-auto p-4 gap-8 flex-col">
    <h1 class="text-5xl font-bold mx-auto">{{ config.name }}</h1>
    <div
      class="flex container mx-auto p-2 gap-4 flex-col bg-neutral-400 max-w-xl rounded-lg border border-neutral-700"
    >
      <div class="flex container mx-auto gap-2 flex-col">
        <p class="text-xl">{{ t("configDetail.title") }}</p>
        <p
          class="bg-neutral-700 border border-gray-900 text-gray-300 p-1 rounded"
        >
          {{ config.name }}
        </p>
      </div>
      <div class="flex container mx-auto gap-2 flex-col">
        <p class="text-xl">{{ t("configDetail.description") }}</p>
        <p
          class="bg-neutral-700 border border-gray-900 text-gray-300 p-1 rounded"
        >
          {{ config.description }}
        </p>
      </div>
      <div class="flex container gap-4 justify-end">
        <button :class="karmaClasses">
          <svg
            width="16"
            height="16"
            viewBox="0 -0.5 1025 1025"
            class="icon"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M512.8 977.4c-26.1 0-50.1-7.3-71.5-21.7C323.5 897 0 675.3 0 400.5 0 212 153.4 58.6 341.9 58.6c60.5 0 119 15.8 170.9 45.9 51.9-30.1 110.5-45.9 170.9-45.9 188.5 0 341.9 153.4 341.9 341.9 0 274.8-323.5 496.6-441.3 555.2-21.4 14.4-45.4 21.7-71.5 21.7zM341.9 144.1c-141.4 0-256.4 115-256.4 256.4 0 117.2 80.6 225.2 148.2 295.1 86.1 89 187.5 155.2 248.1 184.8l6.1 3.7c15.1 10.8 34.6 10.8 49.7 0l6.1-3.7C604.4 850.7 705.8 784.6 791.8 695.6c67.6-69.9 148.2-177.8 148.2-295.1 0-141.4-115-256.4-256.4-256.4-52.6 0-103.2 16-146.5 46.1L512.8 207.3l-24.5-17.1c-43.2-30.2-93.9-46.1-146.4-46.1z"
              fill="currentColor"
            />
          </svg>
          <span>{{ config.karma }}</span>
        </button>
        <button
          class="flex gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 items-center"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 3V16M12 16L16 11.625M12 16L8 11.625"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>{{ config.downloads }}</span>
        </button>
      </div>
    </div>
    <div
      class="flex container mx-auto p-2 gap-4 flex-col bg-neutral-400 max-w-xl rounded-lg border border-neutral-700"
    >
      <p class="text-xl">{{ t("configDetail.features") }}</p>
      <div class="flex container mx-auto gap-2 flex-col">
        <p
          v-for="(feature, index) in config.features"
          class="bg-neutral-700 border border-gray-900 text-gray-300 p-1 rounded"
          :key="`feature-${index}`"
        >
          {{ feature }}
        </p>
      </div>
    </div>
    <button
      class="mx-auto max-w-xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      @click="downloadConfig"
    >
      {{ t("configDetail.downloadButton") }}
    </button>
  </div>
</template>
