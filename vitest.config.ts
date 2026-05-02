import path from "path";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "happy-dom",
    include: ["tests/**/*.spec.ts"],
    deps: {
      inline: ["vue"],
    },
    coverage: {
      provider: "c8",
      reporter: ["text", "json-summary"],
      include: ["src/**/*.{ts,vue}"],
    },
  },
});
