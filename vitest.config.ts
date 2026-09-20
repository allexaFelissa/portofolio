import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(rootDir, "src"),
      "@/app": resolve(rootDir, "app"),
      "@/content": resolve(rootDir, "src/content"),
      "@/components": resolve(rootDir, "src/components"),
      "@/lib": resolve(rootDir, "src/lib"),
      "@/hooks": resolve(rootDir, "src/hooks"),
    },
  },
  test: {
    // Single-run mode by default; watch is opt-in via `test:watch`.
    watch: false,
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}", "app/**/*.{test,spec}.{ts,tsx}"],
    css: false,
  },
});
