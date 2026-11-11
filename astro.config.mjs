// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const runtimeShim = fileURLToPath(new URL('./src/lib/framer-runtime.js', import.meta.url));
const motionShim = fileURLToPath(new URL('./src/lib/framer-motion.js', import.meta.url));

/** @param {string} value */
const normalize = (value) => value.replaceAll('\\', '/');

/**
 * The vendored Framer marketplace modules import the private Framer runtime and
 * `framer-motion`. Rewrite those two specifiers, but only for the vendored
 * files themselves, so the shims can still import the real `framer-motion`
 * package.
 */
const framerVendorShims = {
  name: 'framer-vendor-shims',
  enforce: /** @type {const} */ ('pre'),
  /** @param {string} source @param {string | undefined} importer */
  resolveId(source, importer) {
    if (!importer) return null;
    if (!normalize(importer).includes('/components/framer/vendor/')) return null;
    if (source === 'framer') return runtimeShim;
    if (source === 'framer-motion') return motionShim;
    return null;
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://ishan.smartfools.in',
  redirects: {
    '/work': '/#work',
  },
  integrations: [
    mdx(),
    react(),
    sitemap({
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  vite: {
    plugins: [framerVendorShims, tailwindcss()],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
