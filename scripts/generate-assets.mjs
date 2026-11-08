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
    font-family: "Sora";
    src: url("${font('sora-latin-var.woff2')}") format("woff2");
    font-weight: 100 800; font-style: normal;
  }
  @font-face {
    font-family: "Manrope";
    src: url("${font('manrope-latin-var.woff2')}") format("woff2");
    font-weight: 200 800; font-style: normal;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #141413; color: #faf9f5; }
`;

const ogHtml = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
${shared}
  body {
    width: 1200px; height: 630px; overflow: hidden; position: relative;
    background: #141413;
    font-family: "Manrope", sans-serif;
  }
  .frame { position: absolute; inset: 26px; border: 1px solid #30302c; border-radius: 26px; }
  .masthead {
    position: absolute; top: 54px; left: 64px; right: 64px;
    display: flex; align-items: flex-start; justify-content: space-between;
    padding-bottom: 18px; border-bottom: 1px solid #30302c;
  }
  .brand {
    display: flex; align-items: center; gap: 12px;
    font-family: "Sora", sans-serif; font-size: 36px; font-weight: 600;
    letter-spacing: -0.055em; line-height: 1;
  }
  .brand .mark { width: 18px; height: 18px; color: #d97757; }
  .brand .dot { color: #d97757; }
  .issue {
    font-size: 11px; font-weight: 650; letter-spacing: 0.14em; text-transform: uppercase;
    color: #b0aea5; text-align: right; line-height: 1.8;
  }
  .issue b { display: block; font-weight: 700; color: #faf9f5; }
  .main {
    position: absolute; top: 196px; left: 64px; bottom: 112px; width: 700px;
    display: flex; flex-direction: column; justify-content: center;
  }
  .eyebrow {
    display: flex; align-items: center; gap: 9px;
    font-size: 11px; font-weight: 750; letter-spacing: 0.16em; text-transform: uppercase;
    color: #a9bd8d; margin-bottom: 20px;
  }
  .eyebrow::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: #788c5d; }
  .title {
    font-family: "Sora", sans-serif; font-weight: 500;
    font-size: 110px; letter-spacing: -0.065em; line-height: 0.96;
  }
  .title em { font-style: normal; color: #d97757; }
  .bottom {
    position: absolute; left: 64px; right: 64px; bottom: 46px;
    display: flex; align-items: flex-end; justify-content: space-between;
    padding-top: 16px; border-top: 1px solid #30302c;
    font-size: 11px; font-weight: 650; letter-spacing: 0.1em; text-transform: uppercase;
    color: #b0aea5; line-height: 1.8;
  }
  .bottom b { font-weight: 700; color: #faf9f5; }
  .bottom .domain { color: #d97757; }
  .portrait-wrap { position: absolute; top: 156px; right: 64px; width: 306px; }
  .portrait {
    position: relative; overflow: hidden; padding: 8px;
    border: 1px solid #3b3b35; border-radius: 24px; background: #1e1e1b;
  }
  .portrait img {
    display: block; width: 100%; height: 348px; object-fit: cover; object-position: center 28%;
    border-radius: 17px; filter: saturate(0.92);
  }
  .portrait-mark {
    position: absolute; right: 22px; bottom: 22px;
    padding: 6px 10px; border: 1px solid #59423b; border-radius: 100px;
    background: #352925cc; color: #e8a47f;
    font-size: 9px; font-weight: 700; letter-spacing: 0.12em;
  }
  .caption {
    display: flex; justify-content: space-between; margin-top: 10px;
    font-size: 9px; font-weight: 650; letter-spacing: 0.08em; text-transform: uppercase; color: #b0aea5;
  }
  .page-no { font-family: "Sora", sans-serif; font-size: 24px; font-weight: 600; letter-spacing: -0.04em; color: #d97757; }
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
  </div>

  <div class="portrait-wrap">
    <div class="portrait">
      <img src="${portrait}" alt="">
      <span class="portrait-mark">IA / 26</span>
    </div>
    <div class="caption"><span>Ishan Asati</span><span class="page-no">01</span></div>
  </div>

  <div class="bottom">
    <span><b>AI / Software / Hardware</b><br><span class="domain">ishan.devs.surf</span></span>
    <span>Build · Observe · Revise</span>
  </div>
</body></html>`;

const iconHtml = (size) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
${shared}
  body { width: ${size}px; height: ${size}px; overflow: hidden; }
  .icon {
    position: relative; width: 100%; height: 100%; background: #141413; color: #faf9f5;
    display: flex; align-items: center; justify-content: center;
  }
  .icon::before {
    content: ""; position: absolute; top: ${Math.round(size * 0.1)}px; left: ${Math.round(size * 0.1)}px;
    right: ${Math.round(size * 0.1)}px; bottom: ${Math.round(size * 0.1)}px;
    border: 1px solid #3b3b35; border-radius: ${Math.round(size * 0.22)}px;
  }
  .icon span {
    position: relative; font-family: "Sora", sans-serif; font-weight: 600;
    font-size: ${Math.round(size * 0.5)}px; letter-spacing: -0.07em; line-height: 1;
  }
  .icon span::after { content: "."; color: #d97757; }
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
