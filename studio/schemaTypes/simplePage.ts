import { defineField, defineType } from 'sanity';

// For pages that are just "a heading and some rich text" — About, Contact,
// Privacy Policy, etc. — where a full structured content type isn't
// worth building. The Astro side wires each of these to a specific fixed
// route (e.g. src/pages/about.astro), rather than a catch-all slug route.
export default defineType({
  name: 'simplePage',
  title: 'Simple page',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'Must match a route your developer has built, e.g. "about".',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'seoDescription', type: 'text', rows: 2 }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
