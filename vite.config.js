import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/api': {
        target: 'https://www.purandaradasa.org',
        changeOrigin: true,
        secure: false, // ignores self-signed / expired SSL certificate warning
      },
      '/media': {
        target: 'https://www.purandaradasa.org',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
