import { RouteName } from "./types/routename";
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
  {
    path: "/terms",
    name: RouteName.TERMS_AND_CONDITIONS,
    component: () => import("@views/terms.vue"),
  },
  {
    path: "/maker",
    name: RouteName.CONDITION_MAKER,
    component: () => import("@views/condition-maker.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
