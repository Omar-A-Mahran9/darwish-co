/**
 * Writes brotli (.br) and gzip (.gz) copies of the build's text files (JS, CSS, SVG, JSON, XML, TXT) so the
 * server can send them compressed without compressing on every request (server/delivery.ts picks one).
 * Runs last in `pnpm build`. Files under 1 KB are left alone: compressing them saves nothing.
 */
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const root = path.resolve(import.meta.dirname, "..", "dist", "public");
const EXTENSIONS = new Set([".js", ".mjs", ".css", ".svg", ".json", ".xml", ".txt"]);
let count = 0, before = 0, after = 0;

for (const entry of fs.readdirSync(root, { recursive: true, withFileTypes: true })) {
  if (!entry.isFile() || !EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue;
  const file = path.join(entry.parentPath, entry.name);
  const data = fs.readFileSync(file);
  if (data.length < 1024) continue;
  const br = zlib.brotliCompressSync(data, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11, [zlib.constants.BROTLI_PARAM_SIZE_HINT]: data.length } });
  fs.writeFileSync(file + ".br", br);
  fs.writeFileSync(file + ".gz", zlib.gzipSync(data, { level: 9 }));
  count++, before += data.length, after += br.length;
}
console.log(`[precompress] ${count} files, ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB with brotli`);
