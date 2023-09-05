<script setup lang="ts">
import { ref } from "vue";
import configCard from "./components/config-detail.vue";
import router from "../router";
import { RouteName } from "@/types";

const searchValue = ref("");

const configs = ref([
  {
    id: "asdasdasd",
    title: "Paladio",
    description: "Farmea paladio",
    downloads: 1000,
    karma: 1000,
  },
  {
    id: "asdadase34",
    title: "Low",
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

const downloadConfig = (id: string) => {
  console.log("Download", id);
};
</script>
<template>
  <div class="flex container mx-auto p-4 gap-8 flex-col">
    <h1 class="text-5xl font-bold mx-auto">Dark Configs</h1>
    <div
      id="search-part"
      class="w-full flex flex-row gap-4 flex-wrap md:flex-nowrap"
    >
      <input
        v-model="searchValue"
        type="text"
        id="search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-neutral-500 focus:border-neutral-500 block w-full p-2.5 dark:bg-neutral-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500 max-w-full"
      />
      <button
        class="bg-transparent hover:bg-neutral-700 text-white-700 font-semibold hover:text-white py-2 px-4 border border-neutral-700 hover:border-transparent rounded w-full md:w-48 max-w-full"
      >
        Search
      </button>
    </div>
    <div class="w-full flex flex-row gap-8 flex-wrap">
      <config-card
        v-for="(config, index) in configs"
        v-bind="config"
        :key="index"
        @show="showConfig(config.id)"
        @like="showConfig(config.id)"
        @download="downloadConfig(config.id)"
      />
    </div>
  </div>
</template>
