<script setup lang="ts">
import { reactive, ref } from "vue";
import router from "@/router";
import { RouteName } from "@/types";
import { useI18n } from "vue-i18n";
import { uploadConfigFile } from "@/functions/connector";
import { cleanConfig, getEnabledFeatures } from "@/functions/configcleaner";
import { ConfigFile } from "@/types/configfile";

const configFeatures = ref<string[]>([]);

const form = reactive<{
  name: string;
  description: string;
  config: ConfigFile | undefined;
}>({
  name: "",
  description: "",
  config: undefined,
});

const { t } = useI18n();

const readFile = (event: DragEvent | Event) => {
  if (!event?.target) {
    return;
  }

  if (!(<HTMLInputElement>event.target)?.files?.[0]) {
    return;
  }

  let file = (<HTMLInputElement>event.target).files?.[0];

  if (!file) {
    return;
  }

  try {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
      if (readerEvent?.target?.result) {
        const json: ConfigFile = JSON.parse(
          readerEvent.target.result.toString()
        );
        form.config = cleanConfig(json);
        configFeatures.value = getEnabledFeatures(json);
      }
    };
  } catch (error) {
    console.error(error);
  }
};

const uploadConfig = async () => {
  if (configFeatures.value.length <= 0 || !form.config) {
    console.error("Error: Upload a valid config");
    return;
  }

  try {
    const response = await uploadConfigFile(
      form.name,
      form.description,
      form.config
    );

    if (response) {
      router.push({
        name: RouteName.CONFIG_DETAIL,
        params: {
          id: response.configId,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <form class="flex py-4 gap-8 flex-col" @submit.prevent="uploadConfig">
    <div
      class="flex container mx-auto p-2 gap-4 flex-col bg-neutral-400 max-w-xl rounded-lg border border-neutral-700"
    >
      <div class="flex container mx-auto gap-2 flex-col">
        <p class="text-xl">{{ t("uploadPage.title") }}</p>
        <input
          v-model="form.name"
          type="text"
          class="bg-neutral-700 border border-gray-900 text-gray-300 p-1 rounded"
          max-lenght="15"
          required
        />
      </div>
      <div class="flex container mx-auto gap-2 flex-col">
        <p class="text-xl">{{ t("uploadPage.description") }}</p>
        <textarea
          v-model="form.description"
          class="bg-neutral-700 border border-gray-900 text-gray-300 p-1 rounded"
          max-lenght="150"
          required
        />
      </div>
      <div class="flex container mx-auto gap-2 flex-col">
        <p class="text-xl">{{ t("uploadPage.config") }}</p>
        <input
          class="bg-neutral-700 border border-gray-900 text-gray-300 p-1 rounded"
          type="file"
          :multiple="false"
          accept=".json"
          @change="readFile"
          required
        />
      </div>
    </div>
    <div
      v-if="configFeatures.length > 0"
      class="flex container mx-auto p-2 gap-4 flex-col bg-neutral-400 max-w-xl rounded-lg border border-neutral-700"
    >
      <div class="flex">
        <p class="text-xl">{{ t("uploadPage.features") }}</p>
      </div>
      <div class="flex container mx-auto gap-2 flex-col">
        <p
          v-for="(feature, index) in configFeatures"
          class="bg-neutral-700 border border-gray-900 text-gray-300 p-1 rounded"
          :key="`feature-${index}`"
        >
          {{ feature }}
        </p>
      </div>
    </div>
    <button
      type="submit"
      class="mx-auto max-w-xl text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
    >
      {{ t("uploadPage.saveButton") }}
    </button>
  </form>
</template>
