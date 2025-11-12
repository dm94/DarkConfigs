import { RouteName } from "./types/routename";
import { createRouter, createWebHistory } from "vue-router";
import { initPlausible } from "./functions/plausible";

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
    path: "/auth/callback",
    name: RouteName.AUTH_CALLBACK,
    component: () => import("@views/auth-callback.vue"),
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
  {
    path: "/me",
    name: RouteName.PROFILE,
    component: () => import("@views/me.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach(() => initPlausible());

export default router;
