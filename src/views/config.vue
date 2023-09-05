<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import router from "../router";
import { RouteName } from "@/types";

const config = ref({
  id: "",
  title: "",
  description: "",
  downloads: 0,
  karma: 0,
});

onMounted(() => {
  const route = useRoute();

  if (!route?.params?.id) {
    router.push({ name: RouteName.HOME });
    return;
  }

  config.value = {
    id: route.params.id as string,
    title: "Paladio",
    description: "Farmea paladio",
    downloads: 1000,
    karma: 1000,
  };
});

const downloadConfig = (id: string) => {
  console.log("Download", id);
};
</script>
<template>
  <p>Config {{ config.id }}</p>
</template>
