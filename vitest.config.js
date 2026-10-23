import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { getPublicVideoFiles } from "./config/video-manifest.js";
export default defineConfig({
  define: {
    "import.meta.env.GTI_PUBLIC_VIDEO_FILES": JSON.stringify(getPublicVideoFiles()),
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    include: ["src/**/*.{test,spec}.{js,jsx}"],
  },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
