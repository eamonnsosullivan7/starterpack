import { defineField, defineType } from 'sanity';

// Display order is drag-and-drop via the "Services" list in the Studio
// sidebar (see sanity.config.ts) — orderRank is hidden because the
// orderable-document-list plugin writes to it directly; it's not meant to
// be typed in by hand.
export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'orderRank', type: 'string', hidden: true }),
    defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'summary', title: 'Short summary', type: 'text', rows: 2 }),
    defineField({ name: 'description', title: 'Full description', type: 'text', rows: 6 }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description:
        'An Iconoir icon name, e.g. "code-bracket" — browse names at icon-sets.iconify.design/iconoir (omit the "iconoir:" prefix).',
    }),
    defineField({ name: 'price', title: 'Price (display text, e.g. "From $500")', type: 'string' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'summary' },
  },
});
