import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

const rootDir = import.meta.dirname;

export default defineConfig({
  test: {
    globals: true,
    root: ".",
    coverage: {
      reporter: ["html"],
    },
    environment: "jsdom",
    setupFiles: "./tests/setupTests.js",
    exclude: ["**/node_modules/**", "**/dist/**", "**/public/**"],
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src/"),
      "@public": path.resolve(rootDir, "./public/"),
      "@typec": path.resolve(rootDir, "./src/types/"),
      "@functions": path.resolve(rootDir, "./src/functions/"),
      "@views": path.resolve(rootDir, "./src/views/"),
    },
  },
});
