import { RouteName } from "./types";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: RouteName.HOME,
    component: () => import("@views/home.vue"),
  },
  {
    path: "/config/:id",
    name: RouteName.CONFIG_DETAIL,
    component: () => import("@views/config-detail.vue"),
  },
  {
    path: "/upload",
    name: RouteName.UPLOAD,
    component: () => import("@views/upload.vue"),
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
