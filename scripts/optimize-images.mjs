import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const targets = [
  path.join(root, "src", "assets"),
  path.join(root, "src", "pages", "state"),
  path.join(root, "src", "pages", "Auth"),
];
const supported = new Set([".jpg", ".jpeg", ".png"]);
const minBytes = Number(process.env.IMAGE_MIN_BYTES || 300 * 1024);

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return fullPath;
  }));
  return files.flat();
};

let converted = 0;
let skipped = 0;

for (const target of targets) {
  const files = await walk(target);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!supported.has(ext)) continue;

    const info = await stat(file);
    if (info.size < minBytes) {
      skipped += 1;
      continue;
    }

    const out = file.replace(/\.(jpe?g|png)$/i, ".webp");
    await sharp(file)
      .rotate()
      .resize({ width: 1800, height: 1200, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 76, effort: 5 })
      .toFile(out);
    converted += 1;
  }
}

console.log(`Image optimization complete. Converted ${converted}, skipped ${skipped}.`);
