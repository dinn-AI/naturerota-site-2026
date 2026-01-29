// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',
  
  compressHTML: true,
  
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'motion-vendor': ['motion/react'],
            'gsap-vendor': ['gsap'],
          },
        },
      },
    },
  },

  image: {
    domains: ['cdn.sanity.io'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  integrations: [
    react({
      include: ['**/react/*'],
    }),
  ],
});