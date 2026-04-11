import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

const SOURCE_DIR = join(ROOT_DIR, 'public');
const DEST_DIR = join(ROOT_DIR, 'public/ebook-4-patas');

if (!fs.existsSync(DEST_DIR)) fs.mkdirSync(DEST_DIR, { recursive: true });

const imageMap = [
  { src: 'IMG_6289.jpeg', name: 'familia-na-praia' },
  { src: 'IMG_4846.JPG',  name: 'husky-no-ombro' },
  { src: 'IMG_4476.JPG',  name: 'kombi-catarina' },
  { src: 'IMG_6460.jpeg', name: 'kombi-na-estrada' },
  { src: 'IMG_5297.jpeg', name: 'husky-no-parque' },
  { src: 'IMG_3487.jpeg', name: 'millena-na-montanha' },
  { src: 'IMG_4210.jpeg', name: 'renan-na-montanha' },
  { src: 'IMG_8337.jpeg', name: 'renan-no-por-do-sol' },
];

const widths = [400, 800];

async function run() {
  for (const img of imageMap) {
    const sourcePath = join(SOURCE_DIR, img.src);

    if (!fs.existsSync(sourcePath)) {
      console.error(`✗ Source not found: ${sourcePath}`);
      continue;
    }

    // Full-size AVIF
    const fullDest = join(DEST_DIR, `${img.name}.avif`);
    await sharp(sourcePath).avif({ quality: 70 }).toFile(fullDest);
    console.log(`✓ ${img.name}.avif`);

    // Responsive variants
    for (const w of widths) {
      const dest = join(DEST_DIR, `${img.name}-${w}w.avif`);
      await sharp(sourcePath).resize(w).avif({ quality: 72 }).toFile(dest);
      console.log(`✓ ${img.name}-${w}w.avif`);
    }
  }
  console.log('\nDone! All images saved to public/ebook-4-patas/');
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
