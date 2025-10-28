
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  base: '/', // Ensure base URL is set to '/' for client-side routing
  server: {
    host: "::",
    port: 8080,
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-XSS-Protection': '1; mode=block',
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.gpteng.co; style-src 'self' 'unsafe-inline' https://rsms.me; font-src 'self' https://rsms.me; img-src 'self' data: blob:; connect-src 'self' https://bxojxrcerefklsrqkmrs.supabase.co wss://bxojxrcerefklsrqkmrs.supabase.co; frame-ancestors 'self' https://*.lovableproject.com https://*.lovable.app https://*.lovable.dev; media-src 'self';",
      'Permissions-Policy': 'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'max-age=31536000, immutable',
    }
  },
  plugins: [
    react(),
    process.env.NODE_ENV === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return 'assets/[name].[hash][extname]';
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          // Don't hash logo files
          if (assetInfo.name.includes('logo-')) {
            return `assets/images/[name][extname]`;
          }
          // Hash other image files
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name].[hash][extname]`;
          }
          return `assets/[name].[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
      }
    }
  }
});
