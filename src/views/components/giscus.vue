<script setup lang="ts">
import Giscus from "@giscus/vue";
import { onBeforeMount, ref } from "vue";

const showGitCus = ref(false);

const GISCUS_REPO = import.meta.env.VITE_APP_GISCUS_REPO;
const GISCUS_REPO_ID = import.meta.env.VITE_APP_GISCUS_REPO_ID;
const GISCUS_CATEGORY = import.meta.env.VITE_APP_GISCUS_CATEGORY;
const GISCUS_CATEGORY_ID = import.meta.env.VITE_APP_GISCUS_CATEGORY_ID;

onBeforeMount(() => {
  if (localStorage.getItem("accept-cookies")) {
    showGitCus.value = true;
  }
});

</script>

<template>
  <div
    v-if="showGitCus"
    class="flex container mx-auto p-2 gap-4 flex-col bg-neutral-400 max-w-xl rounded-lg border border-neutral-700"
  >
    <Giscus
      id="comments"
      :repo="GISCUS_REPO"
      :repo-id="GISCUS_REPO_ID"
      :category="GISCUS_CATEGORY"
      :category-id="GISCUS_CATEGORY_ID"
      mapping="pathname"
      reactions-enabled="1"
      emit-metadata="0"
      input-position="top"
      theme="dark_tritanopia"
      lang="en"
      loading="lazy"
    />
  </div>
</template>