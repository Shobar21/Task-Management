import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    // every request starting with /api is forwarded to the Express server,
    // so the browser never has to deal with CORS or cross-site cookies
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
