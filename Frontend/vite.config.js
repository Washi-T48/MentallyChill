import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/styled', '@emotion/react'],
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 8000,
  }
});
