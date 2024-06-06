<script setup lang="ts">
import { ref } from "vue";
import { ConfigFile } from "@typec/configfile";


const firstConfig = ref<ConfigFile>();
const secondConfig = ref<ConfigFile>();
const cleanConfigs = ref<boolean>(false);

</script>
<template>
  <div class="flex py-4 gap-8 flex-col">
    Config merger
  </div>
</template>