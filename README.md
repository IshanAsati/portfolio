# Ishan Asati — Portfolio

The personal portfolio of **Ishan Asati** — an independent, editorial-style record of projects, prototypes and experiments across AI, software engineering, hardware and creative programming.

Built as a static site with Astro, TypeScript, Tailwind CSS, MDX and self-hosted fonts. Designed as a technical field journal: asymmetric grids, folio metadata and charcoal exhibit plates.

## Stack

- **Astro** — static site generation, content collections, image optimisation
- **TypeScript** — typed content schemas and components
- **Tailwind CSS** — design tokens and utilities
- **MDX** — project case studies and notes
- **Lucide** — icon set
- **Playwright** — generates the OG image and app icons (`npm run assets`)

## Commands

| Command           | Action                                      |
| :---------------- | :------------------------------------------ |
| `npm install`     | Install dependencies                        |
| `npm run dev`     | Start the dev server at `localhost:4321`    |
| `npm run build`   | Build the production site to `./dist/`      |
| `npm run preview` | Preview the production build locally        |
| `npm run check`   | Run Astro's type and content checks         |
| `npm run assets`  | Regenerate `og.png` and the app icons       |

## Structure

```text
src/
├── assets/          # portrait and project screenshots
├── components/      # Header, Footer, artwork, links
├── content/
│   ├── projects/    # MDX case studies
│   └── notes/       # MDX notes (currently empty by design)
├── layouts/         # BaseLayout with SEO and schema
├── pages/           # routes, RSS, 404
├── styles/          # global design system
└── config.ts        # identity, email, links, navigation
public/              # fonts, OG image, icons, robots.txt
scripts/             # asset generation
```

## Content notes

Project entries are written to reflect the real stage of the work. DermoAI is a research study and is explicitly not clinically validated. Atlas Fit is under active development. The robotics entry documents prototypes and concepts, and the programming experiments entry is an honest placeholder.

The Notes collection is intentionally empty until real writing exists. The build logs a benign warning for the empty directory.

## Deployment

The site deploys to Vercel from the `main` branch of [IshanAsati/portfolio](https://github.com/IshanAsati/portfolio) and is live at `https://ishan.smartfools.in`. `https://ishanasati.vercel.app` also serves the deployment.

Canonical URLs come from `site` in `astro.config.mjs` and `site.url` in `src/config.ts`. If a custom domain is connected later, update both, update `public/robots.txt`, and run `npm run assets` to regenerate the OG image.
