import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'summary', title: 'Short summary', type: 'text', rows: 2 }),
    defineField({ name: 'description', title: 'Full description', type: 'text', rows: 6 }),
    defineField({ name: 'icon', title: 'Icon (emoji or short label)', type: 'string' }),
    defineField({ name: 'price', title: 'Price (display text, e.g. "From $500")', type: 'string' }),
    defineField({
      name: 'orderRank',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers show first.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary' },
  },
});
