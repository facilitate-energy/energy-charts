import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src")
      }
    },
    server: {
      open: true
    },
    build: {
      outDir: "build"
    },
    plugins: [
      react(),
      eslint(),
      // svgr options: https://react-svgr.com/docs/options/
      svgr({ svgrOptions: { icon: true } })
    ],
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./tests/setup.js"
    }
  };
});
