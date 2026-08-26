import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const defaultInput = 'assets/icons/source.png';
const input = process.argv[2] ?? defaultInput;

const root = process.cwd();
const sourcePath = path.resolve(root, input);
const appDir = path.join(root, 'app');

async function resizePng(size) {
  return sharp(sourcePath)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();
}

async function main() {
  try {
    await fs.access(sourcePath);
  } catch {
    throw new Error(
      `Source image not found: ${input}\nPlace a square PNG at ${defaultInput}, then run: npm run icons`
    );
  }

  const metadata = await sharp(sourcePath).metadata();

  if (metadata.format !== 'png') {
    throw new Error('Source image must be a PNG file.');
  }

  if (!metadata.width || !metadata.height) {
    throw new Error('Could not read source image dimensions.');
  }

  if (metadata.width !== metadata.height) {
    console.warn(
      `Warning: source is ${metadata.width}x${metadata.height}. It will be padded to square outputs.`
    );
  }

  await fs.mkdir(appDir, { recursive: true });

  const icon512 = await resizePng(512);
  const appleIcon = await resizePng(180);
  const faviconPngs = await Promise.all([16, 32, 48].map(resizePng));
  const favicon = await pngToIco(faviconPngs);

  await Promise.all([
    fs.writeFile(path.join(appDir, 'icon.png'), icon512),
    fs.writeFile(path.join(appDir, 'apple-icon.png'), appleIcon),
    fs.writeFile(path.join(appDir, 'favicon.ico'), favicon)
  ]);

  console.log('Generated app/favicon.ico');
  console.log('Generated app/icon.png');
  console.log('Generated app/apple-icon.png');
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
