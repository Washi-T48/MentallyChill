import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    host: "0.0.0.0",
    port: 444,
    // https: false,
    https: {
      key: fs.readFileSync(
        `/etc/letsencrypt/live/mindcra.com-0001/privkey.pem`
      ),
      cert: fs.readFileSync(`/etc/letsencrypt/live/mindcra.com-0001/cert.pem`),
      ca: fs.readFileSync(`/etc/letsencrypt/live/mindcra.com-0001/chain.pem`),
    },
    proxy: {
      "/api": {
        target: "https://sombat.cc:3000/",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "var/www/cpanel",
    emptyOutDir: true,
  },
});
