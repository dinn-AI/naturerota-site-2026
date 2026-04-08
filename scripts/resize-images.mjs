import sharp from 'sharp';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

const imagesToResize = [
  'public/curso-cgdv/IMG_9893.avif',
  'public/curso-cgdv/IMG_9198.avif'
];

const widths = [400, 800];

async function resizeImages() {
  for (const imagePath of imagesToResize) {
    const fullPath = join(ROOT_DIR, imagePath);
    const ext = '.avif';
    const baseName = imagePath.replace(ext, '');
    
    for (const width of widths) {
      const outputPath = join(ROOT_DIR, `${baseName}-${width}w${ext}`);
      console.log(`Resizing ${imagePath} to ${width}w -> ${outputPath}`);
      
      try {
        await sharp(fullPath)
          .resize(width)
          .toFile(outputPath);
        console.log(`✓ Created ${outputPath}`);
      } catch (err) {
        console.error(`✗ Error resizing ${imagePath} to ${width}w:`, err);
      }
    }
  }
}

resizeImages();
