import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode })=>{
  const env = loadEnv(mode, process.cwd(), "");

  return {
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
          enabled: false
        },
        workbox: {
          skipWaiting: true,
          clientsClaim: true
        }
      }),
      tailwindcss()
    ],
    server: {
      port: Number(env.SERVER_PORT || 7777),
    },
    preview: {
      port: Number(env.PREVIEW_PORT || 7777),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // ✅ permite usar "@/services/..." no seu código
      }
    },
    optimizeDeps: {
      exclude: ["@sankhyalabs/ezui/loader","@sankhyalabs/sankhyablocks/loader"],
    },
  }
});
