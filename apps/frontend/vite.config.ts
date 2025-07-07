import path from "path";

import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start-plugin";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  // TODO: random bug that cannot hardrefresh. if we add react() cannot load backend at all?
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
