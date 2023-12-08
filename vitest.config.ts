import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    root: ".",
    coverage: {
      reporter: ["html"],
    },
    environment: "jsdom",
    setupFiles: "./tests/setupTests.js",
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@public": path.resolve(__dirname, "./public/"),
      "@typec": path.resolve(__dirname, "./src/types/"),
      "@functions": path.resolve(__dirname, "./src/functions/"),
      "@views": path.resolve(__dirname, "./src/views/"),
    },
  },
});
