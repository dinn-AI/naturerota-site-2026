import sharp from 'sharp';
import { join } from 'path';

const input = 'public/curso-cgdv/vsl-thumb.jpg';
const outputs = [
  { width: 700, name: 'public/curso-cgdv/vsl-thumb-700w.webp' },
  { width: 400, name: 'public/curso-cgdv/vsl-thumb-400w.webp' }
];

async function process() {
  for (const out of outputs) {
    try {
      await sharp(input)
        .resize(out.width)
        .webp({ quality: 80 })
        .toFile(out.name);
      console.log(`Created ${out.name}`);
    } catch (err) {
      console.error(`Error processing ${out.name}:`, err);
    }
  }
}

process();
