import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

 base: "/",

  test: {
    environment: "jsdom",
    exclude: ["node_modules/**", "dist/**", "tests/e2e/**"],
    globals: true,
    setupFiles: "./src/test/setup.js",
  },
});