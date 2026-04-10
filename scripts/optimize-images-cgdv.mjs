import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.join(__dirname, '..');

const testimonialDir = path.join(ROOT_DIR, 'public/depoimentos-curso-CGDV');
const hotmartSeal = path.join(ROOT_DIR, 'public/compra-segura-hotmart-w1000.png');

async function optimizeTestimonials() {
  const files = fs.readdirSync(testimonialDir);
  console.log('Optimizing testimonials...');

  for (const file of files) {
    if (file === '.DS_Store' || !file.match(/\.(avif|jpg|jpeg|png)$/i)) continue;

    const fullPath = path.join(testimonialDir, file);
    
    // Extract number from filename (e.g. "Comentário 9" or "Comentário-13")
    const match = file.match(/(\d+)/);
    if (!match) continue;
    
    const num = match[1].padStart(2, '0');
    const newName = `comentario-${num}.webp`;
    const outputPath = path.join(testimonialDir, newName);

    console.log(`Converting ${file} -> ${newName}`);
    await sharp(fullPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
  }
}

async function optimizeHotmartSeal() {
  console.log('Optimizing Hotmart seal...');
  const outputPath = path.join(ROOT_DIR, 'public/compra-segura-hotmart.webp');
  
  if (fs.existsSync(hotmartSeal)) {
    await sharp(hotmartSeal)
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`Converted Hotmart seal -> compra-segura-hotmart.webp`);
  }
}

async function main() {
  await optimizeTestimonials();
  await optimizeHotmartSeal();
  console.log('Optimization complete!');
}

main().catch(console.error);
