import { defineField, defineType } from 'sanity';

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
