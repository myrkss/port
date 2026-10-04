// one-off: builds web-ready copies of the source artwork into public/assets.
// originals are never modified. usage: node scripts/prepare-assets.mjs [source dir]
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const src = process.argv[2] || "C:/Users/userr/Desktop/assets";
const out = path.join(import.meta.dirname, "..", "public", "assets");
const open = (f, o = {}) => sharp(path.join(src, f), { limitInputPixels: false, ...o });

(async () => {
  fs.mkdirSync(out, { recursive: true });

  // website screenshots: keep native resolution so ui text stays readable
  // the capture has an empty white band under the hero: trimmed
  await open("6fb5c58a-3d79-4ab7-9211-a38b9b25d11d.png").extract({ left: 0, top: 0, width: 1848, height: 830 }).webp({ quality: 92 }).toFile(path.join(out, "zane-website.webp"));
  await open("Изображение ChatGPT 4 окт. 2026 г., 18_56_50.png").webp({ quality: 92 }).toFile(path.join(out, "old-traditions.webp"));

  // mm44
  // logo33.png is only 621px wide: upscale + re-threshold the alpha so it stays sharp when oversized
  const logoW = 621 * 4, logoH = 113 * 4;
  const alpha = await open("logo33.png").extractChannel("alpha").resize(logoW, logoH, { kernel: "cubic" }).blur(2.2).threshold(128).blur(0.6).raw().toBuffer();
  await sharp({ create: { width: logoW, height: logoH, channels: 3, background: "#f5f5f5" } })
    .joinChannel(alpha, { raw: { width: logoW, height: logoH, channels: 1 } })
    .png({ compressionLevel: 9 }).toFile(path.join(out, "mm44-logo.png"));
  fs.copyFileSync(path.join(src, "we are cloth.png"), path.join(out, "mm44-we-are-cloth.png"));
  await open("IMG_0274.PNG").flatten({ background: "#ffffff" }).resize(2400).webp({ quality: 86 }).toFile(path.join(out, "mm44-hoodie.webp"));
  await open("0001-0110-1--unscreen.gif", { animated: true }).webp({ quality: 72, effort: 5 }).toFile(path.join(out, "mm44-motion.webp"));
  await open("unnamed (2).jpg").rotate().resize(2400).webp({ quality: 84 }).toFile(path.join(out, "mm44-look.webp"));

  // visual experiments
  await open("plakat888.png").resize(2000).webp({ quality: 86 }).toFile(path.join(out, "visual-poster.webp"));
  await open("plakat2.jpg").rotate().resize(2000).webp({ quality: 86 }).toFile(path.join(out, "visual-plakat2.webp"));

  for (const f of fs.readdirSync(out)) {
    const m = await sharp(path.join(out, f), { animated: true }).metadata();
    console.log(f.padEnd(26), `${m.width}x${m.pageHeight || m.height}`, `${(fs.statSync(path.join(out, f)).size / 1024).toFixed(0)}kb`);
  }
})();
