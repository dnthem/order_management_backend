/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import htmlPurge from 'vite-plugin-purgecss'

// https://vitejs.dev/config/
export default defineConfig({
  test:  {
    coverage: {
      all: true,
      include: ['src/**/*.js'],
      reportsDirectory: './coverage',
      exclude: ['src/**/*.test.jsx', 'src/**/*.test.js', 'src/**/*.e2e.jsx', 'src/**/*.e2e.js'],

    },
    testTimeout: 15_000,
    hookTimeout: 15_000,
  },
  server: {
    host: true,
    https: false
  },
  plugins: [
    htmlPurge({ 
      content: ['./src/index.html', './src/**/*.jsx'],
      css: ['./src/style.css', './src/**/*.css'],
      variables: true,
      safelist: ['html', 'body']
    }),
    react(),
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
      includeAssets: ['template.jpg','favicon.ico'],
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
     }),
  ],
})
