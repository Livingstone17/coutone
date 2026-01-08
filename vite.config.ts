// import { defineConfig } from 'vite'
// import path from 'path'
// import tailwindcss from '@tailwindcss/vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [
//     // The React and Tailwind plugins are both required for Make, even if
//     // Tailwind is not being actively used – do not remove them
//     react(),
//     tailwindcss(),
//   ],
//   resolve: {
//     alias: {
//       // Alias @ to the src directory
//       '@': path.resolve(__dirname, './src'),
//     },
//   },
// })

// vite.config.ts
import { defineConfig } from 'vite';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa'; // 👈 Add this import

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // 👇 Add PWA plugin here
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        // Ensure SW handles navigation
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      // Manifest for your PWA
      manifest: {
        name: 'Coutone',
        short_name: 'Coutone',
        description: 'Style starts with one piece. Build perfect outfits from any clothing item.',
        theme_color: '#6B5B95', // your brand mauve
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      // Optional: inject manifest + register SW in HTML
      injectRegister: 'auto',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});