import path from "path";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), tanstackStart(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  envPrefix: "PUBLIC",
  server: {
    port: 3000,
  },
});
