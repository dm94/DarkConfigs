<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { getMyConfigs, getAuthToken } from "@functions/connector";
import ConfigCard from "@views/components/config-card.vue";
import { deleteConfig } from "@functions/connector";
import router from "@/router";
import { getDomain } from "@/functions/get-domain";
import { RouteName } from "@/types/routename";

const items = ref([] as any[]);
const isAuthenticated = ref<boolean>(Boolean(getAuthToken()));
const loginUrl = `https://discord.com/api/oauth2/authorize?client_id=${
    import.meta.env.VITE_DISCORD_CLIENT_ID as string
  }&redirect_uri=${getDomain()}/auth/callback&scope=identify%20guilds&response_type=code`;

const { t } = useI18n();

onMounted(async () => {
  if (!isAuthenticated.value) {
    return;
  }
  try {
    const response = await getMyConfigs();
    items.value = response;
  } catch {
    router.push({ name: RouteName.AUTH_CALLBACK });
  }
});

const removeItem = async (id: string) => {
  try {
    await deleteConfig(id);
    items.value = items.value.filter((i: any) => i.configId !== id);
  } catch (error) {
    console.error(error);
  }
};
</script>
<template>
  <div class="flex py-4 gap-8 flex-col">
    <div v-if="!isAuthenticated" class="flex container mx-auto p-2 gap-4 flex-col bg-neutral-400 max-w-xl rounded-lg border border-neutral-700">
      <p class="text-xl">{{ t('profile.loginRequired') }}</p>
      <a :href="loginUrl" class="mx-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{{ t('profile.loginWithDiscord') }}</a>
    </div>
    <div v-else class="flex container mx-auto p-2 gap-4 flex-col bg-neutral-400 rounded-lg border border-neutral-700">
      <div v-if="items.length === 0" class="flex flex-col gap-3 items-center py-6">
        <p class="text-xl">{{ t('profile.noConfigs') }}</p>
        <router-link :to="{ name: RouteName.UPLOAD }" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          {{ t('header.uploadConfig') }}
        </router-link>
      </div>
      <div v-else class="flex gap-4 flex-wrap">
        <div v-for="item in items" :key="item.configId" class="relative">
          <ConfigCard v-bind="item" />
          <button class="absolute top-2 right-2 bg-red-700 text-white rounded px-2 py-1 text-xs"
            @click="() => removeItem(item.configId)">
            {{ t('profile.delete') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
