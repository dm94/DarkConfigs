<script setup lang="ts">
import menuHeader from "@views/components/header.vue";
import notifications from "@views/components/notifications.vue";
import CookieAdvert from "./views/components/cookie-advert.vue";
</script>
<template>
  <menu-header />
  <router-view />
  <notifications />
  <cookie-advert />
</template>
