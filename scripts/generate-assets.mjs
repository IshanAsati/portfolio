import { chromium } from 'playwright';
import { mkdir, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const publicDir = path.join(root, 'public');
await mkdir(publicDir, { recursive: true });

const font = (name) => pathToFileURL(path.join(root, 'public', 'fonts', name)).href;
const portraitBuffer = await readFile(path.join(root, 'src', 'assets', 'ishan-avatar.jpg'));
const portrait = `data:image/jpeg;base64,${portraitBuffer.toString('base64')}`;

const shared = `
  @font-face {
    font-family: "Fraunces";
    src: url("${font('fraunces-latin-var.woff2')}") format("woff2-variations");
    font-weight: 100 900; font-style: normal;
  }
  @font-face {
    font-family: "Fraunces";
    src: url("${font('fraunces-latin-var-italic.woff2')}") format("woff2-variations");
    font-weight: 100 900; font-style: italic;
  }
  @font-face {
    font-family: "Newsreader";
    src: url("${font('newsreader-latin-var.woff2')}") format("woff2-variations");
    font-weight: 200 800; font-style: normal;
  }
  @font-face {
    font-family: "IBM Plex Mono";
    src: url("${font('ibm-plex-mono-latin-400.woff2')}") format("woff2");
    font-weight: 400; font-style: normal;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #131110; color: #f4efe6; }
`;

const ogHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
${shared}
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: #131110;
    font-family: "Newsreader", Georgia, serif;
  }
  .frame { position: absolute; inset: 24px; border: 1px solid #3a342e; }
  .masthead {
    position: absolute; top: 52px; left: 60px; right: 60px;
    display: flex; align-items: flex-start; justify-content: space-between;
    padding-bottom: 16px; border-bottom: 1px solid #2c2621;
  }
  .brand {
    display: flex; align-items: center; gap: 11px;
    font-family: "Fraunces", Georgia, serif; font-size: 34px; font-weight: 500;
    letter-spacing: -0.035em; line-height: 1;
  }
  .brand .mark { width: 17px; height: 17px; color: #cf5a3c; }
  .brand .dot { color: #cf5a3c; }
  .issue {
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px; font-weight: 400; letter-spacing: 0.12em; text-transform: uppercase;
    color: #a49b8c; text-align: right; line-height: 1.9;
  }
  .issue b { display: block; font-weight: 500; color: #f4efe6; }
  .main {
    position: absolute; top: 176px; left: 60px; width: 740px;
  }
  .eyebrow {
    display: flex; align-items: center; gap: 9px;
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px; font-weight: 400; letter-spacing: 0.16em; text-transform: uppercase;
    color: #a49b8c; margin-bottom: 22px;
  }
  .eyebrow::before { content: ""; width: 5px; height: 5px; background: #8d9a6b; }
  .title {
    font-family: "Fraunces", Georgia, serif; font-weight: 400;
    font-size: 116px; letter-spacing: -0.045em; line-height: 0.94;
  }
  .title em { font-style: italic; color: #cf5a3c; }
  .deck {
    max-width: 560px; margin-top: 26px;
    color: #d9d1c4; font-size: 21px; line-height: 1.55;
  }
  .bottom {
    position: absolute; left: 60px; right: 60px; bottom: 44px;
    display: flex; align-items: flex-end; justify-content: space-between;
    padding-top: 14px; border-top: 1px solid #2c2621;
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase;
    color: #a49b8c; line-height: 1.8;
  }
  .bottom b { font-weight: 500; color: #f4efe6; }
  .bottom .domain { color: #cf5a3c; }
  .portrait-wrap { position: absolute; top: 172px; right: 60px; width: 288px; }
  .portrait {
    position: relative; overflow: hidden;
    border: 1px solid #3a342e; background: #1b1816;
  }
  .portrait img {
    display: block; width: 100%; height: 326px; object-fit: cover; object-position: center 28%;
    filter: grayscale(1) contrast(1.05);
  }
  .portrait-mark {
    position: absolute; right: 12px; bottom: 12px;
    padding: 5px 8px; border: 1px solid #5d3d31;
    background: #32211bdd; color: #e79a78;
    font-family: "IBM Plex Mono", monospace;
    font-size: 8px; font-weight: 400; letter-spacing: 0.12em;
  }
  .caption {
    display: flex; justify-content: space-between; margin-top: 9px;
    font-family: "IBM Plex Mono", monospace;
    font-size: 8px; font-weight: 400; letter-spacing: 0.09em; text-transform: uppercase; color: #a49b8c;
  }
</style></head>
<body>
  <div class="frame"></div>

  <div class="masthead">
    <div class="brand">
      <svg class="mark" viewBox="0 0 24 24" fill="none"><path d="M12 2.6c.7 4.6 4.1 8 8.7 8.7-4.6.7-8 4.1-8.7 8.7-.7-4.6-4.1-8-8.7-8.7 4.6-.7 8-4.1 8.7-8.7Z" fill="currentColor"/></svg>
      ishan.asati<span class="dot">.</span>
    </div>
    <div class="issue"><b>Vol. 01 / 2026</b>Independent portfolio<br>India</div>
  </div>

  <div class="main">
    <p class="eyebrow">Student · Developer · Maker</p>
    <h1 class="title">I build to<br><em>understand.</em></h1>
    <p class="deck">Notes from a student who learns by making things: AI, software, and the occasional circuit.</p>
  </div>

  <div class="portrait-wrap">
    <div class="portrait">
      <img src="${portrait}" alt="">
      <span class="portrait-mark">IA / 26</span>
    </div>
    <div class="caption"><span>Ishan Asati</span><span>Fig. 01</span></div>
  </div>

  <div class="bottom">
    <span><b>AI / Software / Hardware</b><br><span class="domain">ishan.smartfools.in</span></span>
    <span>Build · Observe · Revise</span>
  </div>
</body></html>`;

const iconHtml = (size) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
${shared}
  body { width: ${size}px; height: ${size}px; overflow: hidden; }
  .icon {
    position: relative; width: 100%; height: 100%; background: #131110; color: #f4efe6;
    display: flex; align-items: center; justify-content: center;
  }
  .icon::before {
    content: ""; position: absolute; top: ${Math.round(size * 0.1)}px; left: ${Math.round(size * 0.1)}px;
    right: ${Math.round(size * 0.1)}px; bottom: ${Math.round(size * 0.1)}px;
    border: 1px solid #3a342e; border-radius: 2px;
  }
  .icon span {
    position: relative; font-family: "Fraunces", Georgia, serif; font-weight: 500;
    font-size: ${Math.round(size * 0.5)}px; letter-spacing: -0.05em; line-height: 1;
  }
  .icon span::after { content: "."; color: #cf5a3c; }
</style></head><body><div class="icon"><span>ia</span></div></body></html>`;

const browser = await chromium.launch();

async function shoot(html, width, height, output) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: output });
  await page.close();
  console.log(`wrote ${path.relative(root, output)}`);
}

await shoot(ogHtml, 1200, 630, path.join(publicDir, 'og.png'));
await shoot(iconHtml(180), 180, 180, path.join(publicDir, 'apple-touch-icon.png'));
await shoot(iconHtml(192), 192, 192, path.join(publicDir, 'icon-192.png'));
await shoot(iconHtml(512), 512, 512, path.join(publicDir, 'icon-512.png'));

await browser.close();
