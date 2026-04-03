import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/App.jsx"),
      name: "EnergyCharts",
      fileName: "App",
      formats: ["es"]
    },
    rollupOptions: {
      external: [
        "bootstrap",
        "prop-types",
        "react",
        "react-bootstrap",
        "react-dom",
        "react-icons",
        "react-markdown",
        "react-router",
        "react/jsx-runtime",
        "rehype-raw",
        "remark-gfm",
        "victory",
        "web-vitals"
      ]
    },
    outDir: "dist",
    copyPublicDir: false
  },
  plugins: [react(), svgr({ svgrOptions: { icon: true } })]
});
