import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => {
  console.log("command", command);
  return {
    base: "/todolist",
    plugins: [react()],
    build: {
      outDir: "dist",
    },
    test: {
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
    },
    css: {
      modules: {
        localsConvention: "camelCaseOnly",
      },
    },
  };
});
