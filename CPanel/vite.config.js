import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cpanel/",
  server: {
    open: true,
    host: '0.0.0.0',
    port: 444,
  },
  build: {
    outDir: 'var/www/cpanel',
    emptyOutDir: true,
  },
});
