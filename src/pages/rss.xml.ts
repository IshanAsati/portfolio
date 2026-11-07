import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { site } from '../config';

export async function GET(context: APIContext) {
  const notes = (await getCollection('notes', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: `${site.brand} — Notes`,
    description:
      'Occasional writing from Ishan Asati on machine learning, software, electronics, Linux and learning by building.',
    site: context.site ?? site.url,
    items: notes.map((note) => ({
      title: note.data.title,
      description: note.data.description,
      pubDate: note.data.pubDate,
      link: `/notes/${note.id}/`,
      categories: [note.data.category],
    })),
    customData: '<language>en-in</language>',
  });
}
