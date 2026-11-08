# Portfolio — agent notes

## Commands

- Node ≥ 22.23.4. There is no unit-test suite; `npm run check` (Astro type + content check) is the gate.
- Start the dev server in the background: `npx astro dev --background`. Manage it with `npx astro dev status`, `npx astro dev logs`, and `npx astro dev stop`. Do not run `npm run dev` in the foreground.
- Verify changes with `npm run check && npm run build`.
- `npm run assets` regenerates `public/og.png` and the app icons with Playwright. Run it after changing the site name, domain, or portrait — not on every build.

## Architecture

- Static Astro 7 site. Tailwind v4 is wired through the Vite plugin (`@tailwindcss/vite`), not an Astro integration. No client-side framework; interactivity is inline `<script>`.
- Project case studies are MDX in `src/content/projects/`, rendered by `src/pages/work/[slug].astro`. The schema lives in `src/content.config.ts`.
- `src/pages/index.astro` hardcodes the three featured projects and the extra index link. Adding an MDX entry does **not** add it to the homepage.
- `/work` sorts entries by `order`, but its CSS only assigns grid spans to cards `:nth-child(1)` through `:nth-child(4)`. A fifth entry needs the span rules and both media queries extended.
- `cover` is duplicated: the enum in `src/content.config.ts` and the prop union in `src/components/ProjectArtwork.astro`. Add a new cover kind to both.
- Design tokens and base styles live in `src/styles/global.css`; most page and component styles are scoped `<style>` blocks in `.astro` files.

## Content rules

- Do not invent projects, metrics, testimonials, screenshots, or notes. Describe each project at its real stage.
- DermoAI is a research study, not clinically validated. Keep its historical competition figures (`82.79%` accuracy, `87.30%` cancer-class sensitivity) unless the user explicitly supplies new numbers.
- Atlas Fit is under active development. Programming Experiments is an intentional placeholder.
- The `notes` collection is empty by design. Empty-collection warnings during `check`/`build` are expected; do not add filler notes.
- `private/` is gitignored local-only source material. Never reference or publish it.

## Canonical URL

The domain is duplicated in four places: `astro.config.mjs` (`site`), `src/config.ts` (`site.url`), `public/robots.txt`, and the OG text in `scripts/generate-assets.mjs`. Change all four, then run `npm run assets && npm run check && npm run build`.

## Deploy

Pushing `main` to `IshanAsati/portfolio` triggers a Vercel production deploy at `https://ishan.devs.surf`. Confirm the deployment reports READY before calling a change live.
