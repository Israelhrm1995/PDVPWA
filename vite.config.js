import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      VitePWA({
        strategies: 'injectManifest',
        injectManifest: {
          swSrc: resolve(__dirname, 'src/custom-sw.ts'),
          swDest: 'service-worker.js',
        },
        registerType: 'autoUpdate',
        devOptions: {
          enabled: false,
        },
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
        }
      })
    ],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'), // ✅ apenas o index
        }
      }
    },
    publicDir: 'public',
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  };
});
