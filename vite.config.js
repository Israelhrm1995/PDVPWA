import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/pwa-primary/", // ✅ Caminho para GitHub Pages
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        includeAssets: [
          'favicon.ico',
          'robots.txt',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png'
        ],
        workbox: {
          skipWaiting: true,
          clientsClaim: true,
          cleanupOutdatedCaches: true
        },
        manifest: {
          name: 'PDV PWA',
          short_name: 'PDV',
          start_url: '/pwa-primary/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#0f172a',
          icons: [
            {
              src: '/pwa-primary/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/pwa-primary/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: '/pwa-primary/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    build: {
      sourcemap: true // ✅ Permite ver os arquivos fonte no DevTools
    },
    server: {
      port: Number(env.SERVER_PORT || 7777),
    },
    preview: {
      port: Number(env.PREVIEW_PORT || 7777),
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    optimizeDeps: {
      exclude: [
        "@sankhyalabs/ezui/loader",
        "@sankhyalabs/sankhyablocks/loader"
      ]
    }
  };
});
