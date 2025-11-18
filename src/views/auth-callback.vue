<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import router from "@/router";
import { discordCallback } from "@functions/connector";

enum AuthStatus {
  Processing,
  Success,
  Error,
}

const status = ref<AuthStatus>(AuthStatus.Processing);
const { t } = useI18n();

onMounted(async () => {
  const search = new URLSearchParams(globalThis.location.search);
  const code = search.get("code");
  if (code) {
    try {
      await discordCallback(code);
      status.value = AuthStatus.Success;
    } catch {
      status.value = AuthStatus.Error;
      router.replace({ path: "/" });
      return;
    }
  } else {
    status.value = AuthStatus.Error;
    router.replace({ path: "/" });
    return;
  }
  router.replace({ path: "/" });
  globalThis.location.reload();
});
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 px-4">
    <div class="w-full max-w-md rounded-2xl bg-neutral-800/70 backdrop-blur-lg shadow-xl border border-neutral-700 p-6 text-center">
      <div class="mx-auto mb-4 h-12 w-12 text-green-400" :class="{ 'animate-spin': status === AuthStatus.Processing }" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity="0.25" stroke-width="4" />
          <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" stroke-width="4" stroke-linecap="round" />
        </svg>
      </div>
      <h1 class="text-lg font-semibold text-neutral-100">{{ t('authCallback.title') }}</h1>
      <p class="mt-2 text-neutral-300" aria-live="polite">
        <span v-if="status === AuthStatus.Processing">{{ t('authCallback.processing') }}</span>
        <span v-else-if="status === AuthStatus.Success">{{ t('authCallback.success') }}</span>
        <span v-else>{{ t('authCallback.error') }}</span>
      </p>
    </div>
  </div>
</template>
