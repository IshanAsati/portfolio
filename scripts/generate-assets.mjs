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
    font-family: "Instrument Serif";
    src: url("${font('instrument-serif-latin-400.woff2')}") format("woff2");
    font-weight: 400; font-style: normal;
  }
  @font-face {
    font-family: "Instrument Serif";
    src: url("${font('instrument-serif-latin-400-italic.woff2')}") format("woff2");
    font-weight: 400; font-style: italic;
  }
  @font-face {
    font-family: "Inter";
    src: url("${font('inter-latin-var.woff2')}") format("woff2");
    font-weight: 100 900; font-style: normal;
  }
  @font-face {
    font-family: "IBM Plex Mono";
    src: url("${font('ibm-plex-mono-latin-400.woff2')}") format("woff2");
    font-weight: 400; font-style: normal;
  }
  @font-face {
    font-family: "IBM Plex Mono";
    src: url("${font('ibm-plex-mono-latin-500.woff2')}") format("woff2");
    font-weight: 500; font-style: normal;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #F3F0E8; color: #252525; }
`;

const ogHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
${shared}
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    background:
      repeating-linear-gradient(90deg, transparent 0, transparent 99px, rgba(37,37,37,.055) 100px),
      #F3F0E8;
    font-family: "Inter", sans-serif;
  }
  .frame { position: absolute; inset: 30px; border: 1px solid rgba(37,37,37,.28); }
  .corner { position: absolute; width: 14px; height: 14px; border-color: #315BE8; border-style: solid; }
  .tl { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
  .tr { top: -1px; right: -1px; border-width: 2px 2px 0 0; }
  .bl { bottom: -1px; left: -1px; border-width: 0 0 2px 2px; }
  .br { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
  .masthead {
    position: absolute; top: 58px; left: 64px; right: 64px;
    display: flex; align-items: flex-start; justify-content: space-between;
    padding-bottom: 16px; border-bottom: 1px solid rgba(37,37,37,.28);
  }
  .brand { font-family: "Instrument Serif", serif; font-size: 44px; letter-spacing: -0.045em; line-height: .8; }
  .brand span { color: #315BE8; }
  .issue { font-family: "IBM Plex Mono", monospace; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: #5D584D; text-align: right; line-height: 1.7; }
  .issue b { display: block; font-weight: 400; color: #252525; }
  .main {
    position: absolute; top: 178px; left: 64px; bottom: 104px; width: 690px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .eyebrow { font-family: "IBM Plex Mono", monospace; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; color: #315BE8; margin-bottom: 22px; }
  .title { font-family: "Instrument Serif", serif; font-weight: 400; font-size: 132px; letter-spacing: -0.055em; line-height: .82; }
  .title em { font-style: italic; color: #315BE8; }
  .bottom {
    position: absolute; left: 64px; right: 64px; bottom: 48px;
    display: flex; align-items: flex-end; justify-content: space-between;
    padding-top: 16px; border-top: 1px solid rgba(37,37,37,.28);
    font-family: "IBM Plex Mono", monospace; font-size: 12px; letter-spacing: .1em; text-transform: uppercase; color: #5D584D;
  }
  .bottom b { font-weight: 400; color: #252525; }
  .portrait-wrap { position: absolute; top: 158px; right: 64px; width: 306px; }
  .portrait {
    position: relative; padding: 8px; border: 1px solid rgba(37,37,37,.3); background: #FAF8F2;
  }
  .portrait img { display: block; width: 100%; height: 352px; object-fit: cover; object-position: center 28%; filter: grayscale(1) contrast(1.05); }
  .portrait::after { content: ""; position: absolute; inset: 8px; background: #315BE8; mix-blend-mode: multiply; opacity: .15; }
  .portrait-mark { position: absolute; right: 18px; bottom: 18px; z-index: 1; color: #F3F0E8; font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: .12em; text-shadow: 0 1px 8px rgba(37,37,37,.5); }
  .caption { display: flex; justify-content: space-between; margin-top: 10px; font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: #5D584D; }
  .page-no { font-family: "Instrument Serif", serif; font-size: 30px; font-style: italic; color: #315BE8; }
</style></head>
<body>
  <div class="frame">
    <span class="corner tl"></span><span class="corner tr"></span><span class="corner bl"></span><span class="corner br"></span>
  </div>

  <div class="masthead">
    <div class="brand">ishan.asati<span>.</span></div>
    <div class="issue"><b>Vol. 01 / 2026</b>Independent portfolio<br>India</div>
  </div>

  <div class="main">
    <p class="eyebrow">Student · Developer · Maker</p>
    <h1 class="title">Ideas<br><em>into things.</em></h1>
  </div>

  <div class="portrait-wrap">
    <div class="portrait">
      <img src="${portrait}" alt="">
      <span class="portrait-mark">IA / 26</span>
    </div>
    <div class="caption"><span>Fig. A — The author</span><span>Ishan Asati</span></div>
  </div>

  <div class="bottom">
    <span><b>AI / Software / Hardware</b><br>ishan.devs.surf</span>
    <span class="page-no">01</span>
  </div>
</body></html>`;

const iconHtml = (size) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
${shared}
  body { width: ${size}px; height: ${size}px; overflow: hidden; }
  .icon {
    width: 100%; height: 100%; background: #252525; color: #F3F0E8;
    display: flex; align-items: center; justify-content: center; position: relative;
  }
  .icon span { font-family: "Instrument Serif", serif; font-size: ${Math.round(size * 0.57)}px; letter-spacing: -0.06em; line-height: 1; transform: translateY(${Math.round(size * -0.02)}px); }
  .icon span::after { content: "."; color: #315BE8; }
  .icon::before { content: ""; position: absolute; top: ${Math.round(size * 0.12)}px; left: ${Math.round(size * 0.12)}px; right: ${Math.round(size * 0.12)}px; height: 1px; background: rgba(243,240,232,.22); }
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
