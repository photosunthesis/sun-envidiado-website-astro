import glob from 'fast-glob';
import fs from 'fs/promises';
import sharp from 'sharp';

const MAX_DIMENSION = 1280;

async function optimizeImages() {
  console.log('🔍 Scanning for images...');

  const files = await glob(['public/**/*.{png,jpg,jpeg,webp}', 'src/**/*.{png,jpg,jpeg,webp}'], {
    ignore: ['**/node_modules/**'],
  });

  console.log(`found ${files.length} images.`);

  let processedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const image = sharp(file);
      const metadata = await image.metadata();

      if (!metadata.width || !metadata.height) {
        console.warn(`⚠️  Could not read metadata for ${file}`);
        errorCount++;
        continue;
      }

      if (metadata.width > MAX_DIMENSION || metadata.height > MAX_DIMENSION) {
        console.log(`✨ Optimizing ${file} (${metadata.width}x${metadata.height})...`);

        const buffer = await image
          .resize({
            width: MAX_DIMENSION,
            height: MAX_DIMENSION,
            fit: 'inside',
            withoutEnlargement: true,
          })
          .toBuffer();

        await fs.writeFile(file, new Uint8Array(buffer));
        processedCount++;
      } else {
        skippedCount++;
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error);
      errorCount++;
    }
  }

  console.log('\n🎉 Optimization complete!');
  console.log(`   Processed: ${processedCount}`);
  console.log(`   Skipped:   ${skippedCount}`);
  console.log(`   Errors:    ${errorCount}`);
}

optimizeImages();
