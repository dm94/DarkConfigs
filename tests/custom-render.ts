import { render } from "@testing-library/vue";

import { RouteName } from "../src/types/routename";
import { createRouter, createWebHistory } from "vue-router";
import { createI18n } from "vue-i18n";
import { messages } from "../src/i18n/messages";

const mockComponent = { template: "<p>Mock</p>" };

const routes = [
  {
    path: "/",
    name: RouteName.HOME,
    component: mockComponent,
  },
  {
    path: "/config/:id",
    name: RouteName.CONFIG_DETAIL,
    component: mockComponent,
  },
  {
    path: "/upload",
    name: RouteName.UPLOAD,
    component: mockComponent,
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
