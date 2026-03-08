import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src")
      }
    },
    server: {
      open: true,
      port: 3000
    },
    build: {
      outDir: "build"
    },
    plugins: [
      react(),
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
