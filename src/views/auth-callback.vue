<script setup lang="ts">
import { onMounted } from "vue";
import router from "@/router";
import { discordCallback } from "@functions/connector";

onMounted(async () => {
  const search = new URLSearchParams(window.location.search);
  const code = search.get("code");
  if (code) {
    await discordCallback(code);
  }
  router.replace({ path: "/" });
});
</script>
<template>
  <div class="flex py-10 justify-center">
    <div class="text-center text-neutral-200">Procesando autenticación…</div>
  </div>
</template>
