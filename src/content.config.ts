import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.mdx' }),
  schema: z.object({
    title: z.string(),
    index: z.string(),
    year: z.string(),
    category: z.string(),
    filter: z.enum(['ai', 'software', 'hardware', 'experiments']),
    status: z.string(),
    summary: z.string(),
    deck: z.string(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    cover: z.enum(['dermoai', 'atlas-fit', 'atlas', 'studyflow', 'halcyon', 'robotics', 'programming']),
    tools: z.array(z.string()).default([]),
    repo: z.url().optional(),
    demo: z.url().optional(),
    award: z.string().optional(),
    placeholder: z.boolean().default(false),
    metrics: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
          note: z.string().optional(),
        }),
      )
      .default([]),
  }),
});

const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().default('Notes'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, notes };
