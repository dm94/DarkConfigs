<script setup lang="ts">
import Giscus from "@giscus/vue";
import { onBeforeMount, ref } from "vue";

const showGitCus = ref(false);

onBeforeMount(() => {
  if (localStorage.getItem("accept-cookies")) {
    showGitCus.value = true;
  }
});

</script>

<template>
  <div  v-if="showGitCus" class="flex container mx-auto p-2 gap-4 flex-col bg-neutral-400 max-w-xl rounded-lg border border-neutral-700">
    <Giscus
    id="comments"
    repo="dm94/DarkConfigs"
    repo-id="R_kgDOKPybJw"
    category="Configs"
    category-id="DIC_kwDOKPybJ84Ccv7p"
    mapping="url"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    theme="dark_tritanopia"
    lang="en"
    loading="lazy"
  />
    </div>
</template>