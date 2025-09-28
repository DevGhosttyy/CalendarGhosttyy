import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/CalendarGhosttyy/' : '/',
  plugins: [
    tsconfigPaths(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Calendario PWA',
        short_name: 'Calendario',
        start_url: '/CalendarGhosttyy/',
        display: 'standalone',
        background_color: '#0b1120',
        theme_color: '#0ea5e9',
        icons: [
          { src: 'icons/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/pwa-512.png', sizes: '512x512', type: 'image/png' }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/events'),
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'api-events' }
          }
        ]
      }
    })
  ]
}));
