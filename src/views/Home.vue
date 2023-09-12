<script setup lang="ts">
import { ref } from "vue";
import configCard from "./components/config-card.vue";
import router from "../router";
import { RouteName } from "@/types";
import { useI18n } from "vue-i18n";
import { ConfigInfo } from "@/types/configfile";
import { getConfigFile } from "@/functions/connector";
import { getJsonFileName } from "@/functions/general";
import { cleanConfig } from "@/functions/configcleaner";

const { t } = useI18n();

const searchValue = ref("");

const configs = ref<ConfigInfo[]>([
  {
    configId: "asdasdasd",
    name: "Paladio",
    description: "Farmea paladio",
    downloads: 1000,
    karma: 1000,
  },
  {
    configId: "asdadase34",
    name: "Low",
    description: "Low GG",
    downloads: 10,
    karma: 0,
  },
]);

const showConfig = (id: string) => {
  router.push({
    name: RouteName.CONFIG_DETAIL,
    params: {
      id,
    },
  });
};

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

const downloadConfig = async (config: ConfigInfo) => {
  if (!config) {
    return;
  }
  try {
    const responseConfig = await getConfigFile(config.configId);

    const configParsed = cleanConfig(responseConfig);
    download(getJsonFileName(config.name), JSON.stringify(configParsed));
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div class="flex container mx-auto p-4 gap-8 flex-col">
    <h1 class="text-5xl font-bold mx-auto">{{ t("home.title") }}</h1>
    <div
      id="search-part"
      class="w-full flex flex-row gap-4 flex-wrap md:flex-nowrap"
    >
      <input
        v-model="searchValue"
        type="text"
        id="search"
        :placeholder="t('home.searchInputPlaceHolder')"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500 max-w-full"
      />
      <button
        class="bg-transparent hover:bg-neutral-700 text-white-700 font-semibold hover:text-white py-2 px-4 border border-neutral-700 hover:border-transparent rounded w-full md:w-48 max-w-full"
      >
        {{ t("home.searchButton") }}
      </button>
    </div>
    <div class="w-full flex flex-row gap-8 flex-wrap">
      <config-card
        v-for="(config, index) in configs"
        v-bind="config"
        :key="index"
        @show="showConfig(config.configId)"
        @like="showConfig(config.configId)"
        @download="downloadConfig(config)"
      />
    </div>
  </div>
</template>
