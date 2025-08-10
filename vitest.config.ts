import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createHash } from "crypto";

// Polyfill for crypto.hash bug in Vite 7.x
if (typeof globalThis.crypto === "object" && !globalThis.crypto?.hash) {
  Object.defineProperty(globalThis.crypto, "hash", {
    value: (algorithm: string, data: string | Buffer, encoding?: string) => {
      const hash = createHash(algorithm);
      hash.update(data);
      return encoding ? hash.digest(encoding as any) : hash.digest();
    },
    writable: true,
    configurable: true,
  });
}

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
      "@": path.resolve(__dirname, "./src/"),
      "@public": path.resolve(__dirname, "./public/"),
      "@typec": path.resolve(__dirname, "./src/types/"),
      "@functions": path.resolve(__dirname, "./src/functions/"),
      "@views": path.resolve(__dirname, "./src/views/"),
    },
  },
});
