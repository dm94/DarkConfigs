<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import { discordCallback } from "@functions/connector";

onMounted(async () => {
  const search = new URLSearchParams(globalThis.location.search);
  const code = search.get("code");
  if (code) {
    try {
      await discordCallback(code);
    } catch {
      router.replace({ path: "/" });
      return;
    }
  }
  router.replace({ path: "/" });
  globalThis.location.reload();
});
</script>
<template>
  <div class="flex py-10 justify-center">
    <div class="text-center text-neutral-200">Procesando autenticación…</div>
  </div>
</template>
