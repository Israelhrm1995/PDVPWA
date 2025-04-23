import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: resolve(__dirname, 'src/custom-sw.ts'),
        swDest: 'service-worker.js'
      },
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, 
        type: 'module'
      },
      workbox: {
        skipWaiting: true,
        clientsClaim: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // ✅ Isso resolve os imports com @/
    }
  }
});
