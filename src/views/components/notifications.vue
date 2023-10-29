<script setup lang="ts">
import { onBeforeUnmount, ref } from "vue";

const channel = new BroadcastChannel("notifications");
const TIME_NOTIFICATION = 5000;

type Notification = {
  message: string;
  time: number;
};

const notificationList = ref<Notification[]>([]);

channel.onmessage = (e) => {
  notificationList.value = notificationList.value.concat([
    {
      message: e.data,
      time: new Date().getTime(),
    },
  ]);
};

const checkOldNotifications = () => {
  const dateToRemove = new Date().getTime() - TIME_NOTIFICATION;
  notificationList.value = notificationList.value.filter(
    (n) => n.time >= dateToRemove,
  );
};

const interval = setInterval(() => {
  checkOldNotifications();
}, 1000);

onBeforeUnmount(() => {
  channel.close();
  clearInterval(interval);
});
</script>
<template>
  <div v-if="notificationList.length > 0" class="fixed right-0 top-0">
    <div
      v-for="(notification, index) in notificationList"
      :key="`n-${index}-${notification.time}`"
      class="p-3 m-2 bg-yellow-500 border border-1 border-red-900"
    >
      {{ notification.message }}
    </div>
  </div>
</template>
