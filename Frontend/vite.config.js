import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@emotion/styled', '@emotion/react'],
  },
  server: {
    open: true,
    host: '0.0.0.0',
    port: 443,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './certs', 'privkey.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './certs', 'cert.pem')),
      ca: fs.readFileSync(path.resolve(__dirname, './certs', 'chain.pem')),
    },
    proxy: {
      '/api': {
        target: 'https://sombat.cc:3000/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
});