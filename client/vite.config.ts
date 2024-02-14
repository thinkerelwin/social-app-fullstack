import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    istanbul({
      cypress: true,
      include: ["src/*"], // list of all directories/files you want to track coverage for
      exclude: ["node_modules", "cypress/"], // list of all directories/files you do not want to track coverage for
      // requireEnv: true,
    }),
  ],
  build: {
    target: "esnext",
  },
});
