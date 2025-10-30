// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/create-checkout-session": "http://localhost:3000",
//       "/checkout-session": "http://localhost:3000",
//       "/orders": "http://localhost:000"
//     }
//   }
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5189, // frontend runs on 5189
    proxy: {
      "/create-checkout-session": "http://localhost:3000",
      "/checkout-session": "http://localhost:3000",
      "/orders": "http://localhost:3000",
       
      
    },
  },
})