<script setup lang="ts">
import menuHeader from "@views/components/header.vue";
import notifications from "@views/components/notifications.vue";
</script>
<template>
  <menu-header />
  <router-view />
  <notifications />
</template>
