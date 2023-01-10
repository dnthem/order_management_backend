import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    https: true
  },
  plugins: [react(),
    mkcert(),
    VitePWA({ 
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['icon_512x512.png', 'icon_180x180.png', 'favicon.ico'],
      manifest: {
        name: 'Order Management',
        short_name:'Order Management',
        description: 'Order Management and analytics',
        theme_color: '#212529',
        icons: [
          {
            src: 'icon_192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon_512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icon_512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
      }
     })
  ],
})
