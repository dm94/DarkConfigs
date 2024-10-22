<script setup lang="ts">
import { ref, onMounted } from "vue";
import configCard from "./components/config-card.vue";
import { useI18n } from "vue-i18n";
import type { ConfigInfo } from "@typec/configfile";
import { getConfigs } from "@functions/connector";
import { type getConfigParams, OrderByRequest } from "@typec/requests";
import { showError } from "@functions/error-management";
import { plausible } from "@functions/plausible";

const { t } = useI18n();

const searchValue = ref("");
const page = ref<number>(1);
const hasMoreConfigs = ref<boolean>(false);
const CONFIGS_PER_PAGE = 12;
const orderByValue = ref(OrderByRequest.NEWEST);
const configs = ref<ConfigInfo[]>([]);

const loadConfigs = async (params?: getConfigParams) => {
  try {
    const response = await getConfigs({
      ...params,
    });
    if (response) {
      configs.value = response;
    }

    hasMoreConfigs.value = configs.value.length >= CONFIGS_PER_PAGE;
  } catch (error) {
    showError(error as string);
  }
};

onMounted(async () => {
  await loadConfigs({
    page: page.value,
    size: CONFIGS_PER_PAGE,
    orderby: orderByValue.value,
  });
});

const loadMore = async () => {
  page.value = page.value + 1;

  try {
    const response = await getConfigs({
      page: page.value,
      search: searchValue.value,
      size: CONFIGS_PER_PAGE,
      orderby: orderByValue.value,
    });
    if (response) {
      configs.value = configs.value.concat(response);
    }

    hasMoreConfigs.value = response && response.length >= CONFIGS_PER_PAGE;
  } catch (error) {
    showError(error as string);
  }
};

const search = async () => {
  await loadConfigs({
    page: page.value,
    search: searchValue.value,
    size: CONFIGS_PER_PAGE,
    orderby: orderByValue.value,
  });

  plausible("search", { props: { term: searchValue.value } });
};

const updateOrderBy = async () => {
  await loadConfigs({
    page: page.value,
    search: searchValue.value,
    size: CONFIGS_PER_PAGE,
    orderby: orderByValue.value,
  });

  plausible("orderby", { props: { by: orderByValue.value } });
};
</script>
<template>
  <div class="flex container mx-auto p-4 gap-8 flex-col" data-testid="home-page">
    <h1 class="text-5xl font-bold mx-auto">{{ t("home.title") }}</h1>
    <h3 class="text-3xl font-bold mx-auto">{{ t("home.subtitle") }}</h3>
    <div id="search-part" class="w-full flex flex-row gap-4 flex-wrap md:flex-nowrap">
      <input v-model="searchValue" type="text" id="search" :placeholder="t('home.searchInputPlaceHolder')"
        data-testid="input-search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500 max-w-full"
        @keydown.enter="search" />
      <button data-testid="input-button"
        class="bg-neutral-500 hover:bg-neutral-700 text-white-700 font-semibold hover:text-white py-2 px-4 border border-neutral-700 hover:border-transparent rounded w-full md:w-48 max-w-full"
        @click="search">
        {{ t("home.searchButton") }}
      </button>
    </div>
    <div id="orderby-part"
      class="ml-auto w-48 block appearance-none bg-gray-200 border border-gray-200 text-gray-700 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
      <select id="orderby" class="bg-transparent p-1 w-full" v-model="orderByValue" @change="updateOrderBy">
        <i18n-t v-for="order in Object.keys(OrderByRequest)" tag="option" keypath="home.orderby"
          :value="OrderByRequest[order as keyof typeof OrderByRequest]">
          <template #type>
            {{ t(`home.orderbyTypes.${order.toLowerCase()}`) }}
          </template>
        </i18n-t>
      </select>
    </div>
    <div class="w-full flex flex-row gap-8 flex-wrap">
      <config-card v-for="(config, index) in configs" v-bind="config" :key="index" />
    </div>
    <div class="w-full flex flex-row gap-8 flex-wrap">
      <button v-if="hasMoreConfigs" data-testid="load-more-button"
        class="mx-auto max-w-xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        @click="loadMore">
        {{ t("home.loadMoreButton") }}
      </button>
    </div>
  </div>
</template>
