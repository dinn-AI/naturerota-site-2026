// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Em build: usar .public-build (preparado por scripts/prepare-public.mjs) para evitar timeout em arquivos offloaded (ex. iCloud)
const publicDir = process.env.ASTRO_PUBLIC_BUILD_DIR || 'public';

// https://astro.build/config
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'http://localhost:4321',

  vite: {
    publicDir: path.join(__dirname, publicDir),
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Cache em node_modules/.vite (padrão correto)
    cacheDir: 'node_modules/.vite',
    server: {
      fs: {
        strict: false,
        allow: ['/'],
      },
    },
    build: {
      minify: true,
      sourcemap: false,
    },
  },

  image: {
    domains: ['cdn.sanity.io'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  integrations: [react()],
  adapter: vercel({
    webAnalytics: { enabled: true },
    imagesConfig: { domains: ['cdn.sanity.io'], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840] }
  }),
  output: 'static',
});
