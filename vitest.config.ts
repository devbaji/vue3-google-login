import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "happy-dom",
    include: ["tests/**/*.spec.ts"],
    deps: {
      inline: ["vue"],
    },
    coverage: {
      provider: "c8",
      reporter: ["text", "json-summary"],
      include: ["src/plugin/**/*.{ts,vue}"],
    },
  },
});
