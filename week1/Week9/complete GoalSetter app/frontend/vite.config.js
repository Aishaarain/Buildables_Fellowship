import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5182, // frontend runs on 5182
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
