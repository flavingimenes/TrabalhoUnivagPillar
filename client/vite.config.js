import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Pillar BNCC',
        short_name: 'Pillar',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d6efd',
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' }
        ],
        screenshots: [
          {
            src: '/screenshot-desktop.png', // Você precisa criar essa imagem e por na pasta public
            sizes: '1280x720',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Pillar no Desktop'
          },
          {
            src: '/screenshot-mobile.png', // Você precisa criar essa imagem e por na pasta public
            sizes: '720x1280',
            type: 'image/png',
            form_factor: 'narrow',
            label: 'Pillar no Celular'
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https?:\/\/localhost:3001\/api\/.*$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3000,
    open: true
  }
})
