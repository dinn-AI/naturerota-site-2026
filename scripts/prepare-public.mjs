#!/usr/bin/env node
/**
 * Prepara .public-build copiando public/ com timeout por arquivo.
 * Arquivos que falharem (ex.: iCloud offload, timeout) são ignorados.
 * Uso: node scripts/prepare-public.mjs
 * Depois: ASTRO_PUBLIC_BUILD_DIR=.public-build astro build
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public');
const outDir = path.join(root, '.public-build');
const TIMEOUT_MS = 5000;

function copyWithTimeout(src, dest) {
  return Promise.race([
    fs.promises.copyFile(src, dest),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('ETIMEDOUT')), TIMEOUT_MS)
    ),
  ]);
}

async function walk(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const srcPath = path.join(dir, e.name);
    const rel = path.join(base, e.name);
    const destPath = path.join(outDir, rel);
    if (e.isDirectory()) {
      if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
      await walk(srcPath, rel);
    } else {
      try {
        await copyWithTimeout(srcPath, destPath);
      } catch (err) {
        console.warn(`[prepare-public] Pulando ${rel}: ${err.message}`);
      }
    }
  }
}

if (!fs.existsSync(publicDir)) {
  console.warn('[prepare-public] Pasta public/ não encontrada.');
  process.exit(0);
}
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true });
}
fs.mkdirSync(outDir, { recursive: true });
await walk(publicDir);
console.log('[prepare-public] .public-build pronto.');
