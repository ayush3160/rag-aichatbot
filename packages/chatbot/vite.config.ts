// vite.config.ts
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  define: {
    "process.env.VITE_REACT_APP_API_URL": JSON.stringify(
      process.env.VITE_REACT_APP_API_URL
    ),
    baseUrl: JSON.stringify(process.env.VITE_REACT_APP_API_URL),
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react",
      //@ts-expect-error
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    svgr(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/main.tsx"),
      },
      output: {
        format: "iife",
        entryFileNames: "index.js",
        dir: "dist",
        inlineDynamicImports: true,
      },
    },
  },
  css: {
    modules: {
      scopeBehaviour: 'local',
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@emotion/react": path.resolve(__dirname, "./node_modules/@emotion/react"),
      tailwindcss: path.resolve(__dirname, "./node_modules/tailwindcss"),
    },
  },
});