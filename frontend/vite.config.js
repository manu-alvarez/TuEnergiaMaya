import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.png', 'assets/**/*.png', 'assets/**/*.mp3'],
      manifest: {
        name: "Tu Energía Maya",
        short_name: "TuEnergíaMaya",
        description: "Descubre tu Kin del día según el Tzolkin Maya",
        theme_color: "#00d4aa",
        background_color: "#0a0a0f",
        display: "standalone",
        orientation: "portrait-primary",
        icons: [
          {
            src: "assets/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "assets/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ],
  base: './',
  server: {
    allowedHosts: true
  }
})
