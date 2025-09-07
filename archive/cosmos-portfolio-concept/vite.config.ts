import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for production deployment
  build: {
    outDir: '../dist', // Build output will go to D:\CodeBase\Portfolio\dist
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Ensure all JS and CSS are inlined or bundled into minimal files
        manualChunks: undefined,
        inlineDynamicImports: true,
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    },
    // Ensure assets are properly processed
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
    cssCodeSplit: false // Combine all CSS into one file
  },
  // Define public directory for static assets
  publicDir: 'public'
})
