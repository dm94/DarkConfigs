import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@views/Home.vue"),
  },
  {
    path: "/config/:id",
    name: "Config",
    component: {
      template: "<p>In development</p>",
    },
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
