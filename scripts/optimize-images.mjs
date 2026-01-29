#!/usr/bin/env node

/**
 * Script de conversão de imagens para AVIF
 * 
 * Varre recursivamente o repositório em busca de imagens (png, jpg, jpeg, webp)
 * e gera versões AVIF otimizadas preservando a estrutura de pastas.
 * 
 * Uso: node scripts/optimize-images.mjs [--quality=50] [--dry-run]
 */

import { readdir, mkdir, stat } from 'fs/promises';
import { join, dirname, relative, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Configurações
const CONFIG = {
  quality: 50,
  dryRun: false,
  outputDir: 'avif',
  excludeDirs: ['node_modules', '.git', 'dist', 'build', '.sanity', '.vscode', 'avif'],
  imageExtensions: ['.png', '.jpg', '.jpeg', '.webp', '.PNG', '.JPG', '.JPEG', '.WEBP']
};

// Parse argumentos CLI
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--quality=')) {
    CONFIG.quality = parseInt(arg.split('=')[1], 10);
  }
  if (arg === '--dry-run') {
    CONFIG.dryRun = true;
  }
});

// Estatísticas
const stats = {
  total: 0,
  converted: 0,
  skipped: 0,
  failed: 0,
  errors: []
};

/**
 * Verifica se o diretório deve ser excluído
 */
function shouldExcludeDir(dirPath) {
  const parts = dirPath.split('/');
  return parts.some(part => CONFIG.excludeDirs.includes(part));
}

/**
 * Verifica se o arquivo é uma imagem válida
 */
function isValidImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  return CONFIG.imageExtensions.includes(ext);
}

/**
 * Converte uma imagem para AVIF
 */
async function convertToAVIF(sourcePath, outputPath) {
  try {
    await mkdir(dirname(outputPath), { recursive: true });
    
    if (CONFIG.dryRun) {
      console.log(`[DRY-RUN] ${sourcePath} → ${outputPath}`);
      stats.converted++;
      return;
    }

    const startTime = Date.now();
    
    await sharp(sourcePath)
      .avif({
        quality: CONFIG.quality,
        effort: 4 // Balance entre qualidade e velocidade (0-9)
      })
      .toFile(outputPath);
    
    const duration = Date.now() - startTime;
    const sourceStats = await stat(sourcePath);
    const outputStats = await stat(outputPath);
    const reduction = ((1 - outputStats.size / sourceStats.size) * 100).toFixed(1);
    
    console.log(`✓ ${basename(sourcePath)} → ${basename(outputPath)} (${reduction}% menor, ${duration}ms)`);
    stats.converted++;
  } catch (error) {
    console.error(`✗ Erro ao converter ${sourcePath}:`, error.message);
    stats.failed++;
    stats.errors.push({
      file: sourcePath,
      error: error.message
    });
  }
}

/**
 * Varre recursivamente e converte imagens
 */
async function processDirectory(dirPath) {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        if (!shouldExcludeDir(fullPath)) {
          await processDirectory(fullPath);
        }
      } else if (entry.isFile() && isValidImage(entry.name)) {
        stats.total++;
        
        // Calcula o caminho de saída preservando a estrutura
        const relativePath = relative(ROOT_DIR, fullPath);
        const parsedPath = extname(relativePath);
        const nameWithoutExt = relativePath.slice(0, -parsedPath.length);
        const outputPath = join(ROOT_DIR, 'public', CONFIG.outputDir, `${nameWithoutExt}.avif`);
        
        // Converte a imagem
        await convertToAVIF(fullPath, outputPath);
      }
    }
  } catch (error) {
    console.error(`Erro ao processar diretório ${dirPath}:`, error.message);
  }
}

/**
 * Função principal
 */
async function main() {
  console.log('🚀 Iniciando conversão de imagens para AVIF...\n');
  console.log(`Configurações:`);
  console.log(`  - Qualidade: ${CONFIG.quality}`);
  console.log(`  - Dry-run: ${CONFIG.dryRun ? 'SIM' : 'NÃO'}`);
  console.log(`  - Diretório de saída: public/${CONFIG.outputDir}/`);
  console.log(`  - Extensões: ${CONFIG.imageExtensions.join(', ')}\n`);
  
  const startTime = Date.now();
  
  // Processa apenas a pasta public/
  const publicDir = join(ROOT_DIR, 'public');
  await processDirectory(publicDir);
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ Conversão concluída!\n');
  console.log(`Estatísticas:`);
  console.log(`  - Total de imagens encontradas: ${stats.total}`);
  console.log(`  - Convertidas com sucesso: ${stats.converted}`);
  console.log(`  - Falhas: ${stats.failed}`);
  console.log(`  - Tempo total: ${duration}s`);
  
  if (stats.errors.length > 0) {
    console.log('\n❌ Erros encontrados:');
    stats.errors.forEach(({ file, error }) => {
      console.log(`  - ${file}: ${error}`);
    });
  }
  
  console.log('='.repeat(60));
}

// Executa
main().catch(error => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
