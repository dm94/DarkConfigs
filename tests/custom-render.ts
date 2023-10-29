import { render } from "@testing-library/vue";

import { RouteName } from "../src/types/routename";
import { createRouter, createWebHistory } from "vue-router";
import { createI18n } from "vue-i18n";
import { messages } from "../src/i18n/messages";

const routes = [
  {
    path: "/",
    name: RouteName.HOME,
    component: () => "<p>Mock</p>",
  },
  {
    path: "/config/:id",
    name: RouteName.CONFIG_DETAIL,
    component: () => "<p>Mock</p>",
  },
  {
    path: "/upload",
    name: RouteName.UPLOAD,
    component: () => "<p>Mock</p>",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

const i18n = createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export const customRender = (view) =>
  render(view, {
    global: {
      plugins: [router, i18n],
    },
  });
