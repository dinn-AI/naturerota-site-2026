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

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Desabilitar cache que pode estar causando problemas
    cacheDir: false,
    // Timeouts de arquivo e operações
    fs: {
      strict: false,
      allow: ['/'],
      // Aumentar timeout para operações de arquivo (padrão é 5000ms)
      cachedChecks: false,
    },
    // Desabilitar algumas otimizações que podem causar timeout
    build: {
      minify: false,
      sourcemap: false,
    },
    // Configurações de otimização
    esbuild: {
      // Desabilitar transforms que podem causar timeout
      drop: [],
    },
    ssr: {
      noExternal: [],
    },
  },

  image: {
    domains: ['cdn.sanity.io'],
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  integrations: [react()],
  output: 'static',
});
