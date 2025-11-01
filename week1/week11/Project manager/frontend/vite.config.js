
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5189, // frontend runs on 5189
    proxy: {
      "/graphql": "http://localhost:8000",
      
       
      
    },
  },
})