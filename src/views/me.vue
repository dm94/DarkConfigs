<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getMyConfigs, getAuthToken } from "@functions/connector";
import ConfigCard from "@views/components/config-card.vue";
import { deleteConfig } from "@functions/connector";
import router from "@/router";
import { getDomain } from "@/functions/get-domain";

const items = ref([] as any[]);
const isAuthenticated = ref<boolean>(Boolean(getAuthToken()));
const loginUrl = `https://discord.com/api/oauth2/authorize?client_id=${
    import.meta.env.VITE_DISCORD_CLIENT_ID as string
  }&redirect_uri=${getDomain()}/auth/callback&scope=identify%20guilds&response_type=code`;

onMounted(async () => {
  if (!isAuthenticated.value) {
    return;
  }
  try {
    const response = await getMyConfigs();
    items.value = response;
  } catch {
    // If token invalid or expired, go to auth
    router.replace({ path: "/auth/callback" });
  }
});

const removeItem = async (id: string) => {
  await deleteConfig(id);
  items.value = items.value.filter((i: any) => i.configId !== id);
};
</script>
<template>
  <div class="flex py-4 gap-8 flex-col">
    <div v-if="!isAuthenticated" class="flex container mx-auto p-2 gap-4 flex-col bg-neutral-400 max-w-xl rounded-lg border border-neutral-700">
      <p class="text-xl">Login required</p>
      <a :href="loginUrl" class="mx-auto text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Login with Discord</a>
    </div>
    <div v-else class="flex container mx-auto p-2 gap-4 flex-wrap bg-neutral-400 rounded-lg border border-neutral-700">
      <div v-for="item in items" :key="item.configId" class="relative">
        <ConfigCard v-bind="item" />
        <button class="absolute top-2 right-2 bg-red-700 text-white rounded px-2 py-1 text-xs"
          @click="() => removeItem(item.configId)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
