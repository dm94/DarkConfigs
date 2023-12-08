<script setup lang="ts">
import { computed } from "vue";
import { RouteName } from "@typec/routename";

const props = withDefaults(
  defineProps<{
    configId: string;
    name: string;
    description?: string;
    downloads?: number;
    karma?: number;
  }>(),
  {
    description: "",
    downloads: 0,
    karma: 0,
  },
);

const karmaClasses = computed(() => {
  const classes = [
    "rounded-full",
    "px-3",
    "py-1",
    "py-1",
    "text-sm",
    "font-semibold",
    "text-gray-700",
    "flex",
    "gap-2",
    "items-center",
  ];

  if (props.karma == 0) {
    classes.push("bg-gray-200");
  } else if (props.karma > 0) {
    classes.push("bg-green-200");
  } else if (props.karma < 0) {
    classes.push("bg-red-200");
  }
  return classes;
});
</script>
<template>
  <router-link :to="{
    name: RouteName.CONFIG_DETAIL,
    params: {
      id: props.configId,
    },
  }">
    <div data-testid="config-card"
      class="max-w-sm rounded overflow-hidden shadow-lg bg-neutral-400 w-72 py-4 px-6 flex gap-4 flex-col">
      <div class="font-bold text-xl mb-2 title">{{ props.name }}</div>
      <p class="text-gray-700 text-base description">
        {{ props.description }}
      </p>
      <div class="flex gap-2 flex-wrap">
        <div :class="karmaClasses">
          <svg width="16" height="16" viewBox="0 -0.5 1025 1025" class="icon" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M512.8 977.4c-26.1 0-50.1-7.3-71.5-21.7C323.5 897 0 675.3 0 400.5 0 212 153.4 58.6 341.9 58.6c60.5 0 119 15.8 170.9 45.9 51.9-30.1 110.5-45.9 170.9-45.9 188.5 0 341.9 153.4 341.9 341.9 0 274.8-323.5 496.6-441.3 555.2-21.4 14.4-45.4 21.7-71.5 21.7zM341.9 144.1c-141.4 0-256.4 115-256.4 256.4 0 117.2 80.6 225.2 148.2 295.1 86.1 89 187.5 155.2 248.1 184.8l6.1 3.7c15.1 10.8 34.6 10.8 49.7 0l6.1-3.7C604.4 850.7 705.8 784.6 791.8 695.6c67.6-69.9 148.2-177.8 148.2-295.1 0-141.4-115-256.4-256.4-256.4-52.6 0-103.2 16-146.5 46.1L512.8 207.3l-24.5-17.1c-43.2-30.2-93.9-46.1-146.4-46.1z"
              fill="currentColor" />
          </svg>
          <span>{{ karma }}</span>
        </div>
        <div class="flex gap-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 items-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 3V16M12 16L16 11.625M12 16L8 11.625" stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span>{{ downloads }}</span>
        </div>
      </div>
    </div>
  </router-link>
</template>
<style scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description {
  max-height: 6rem;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
