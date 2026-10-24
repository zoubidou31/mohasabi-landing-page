import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { seoPrerender } from './scripts/seo-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPrerender()],
  base: process.env.BASE_PATH || '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})