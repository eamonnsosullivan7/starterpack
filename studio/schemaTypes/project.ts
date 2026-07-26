import { defineField, defineType } from 'sanity';

// Display order is drag-and-drop via the "Projects" list in the Studio
// sidebar (see sanity.config.ts) — orderRank is hidden because the
// orderable-document-list plugin writes to it directly; it's not meant to
// be typed in by hand.
export default defineType({
  name: 'project',
  title: 'Project',
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
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 2,
      description: 'Used on the homepage and the projects grid card.',
    }),
    defineField({
      name: 'description',
      title: 'Full description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Shown on the individual project page.',
    }),
    defineField({
      name: 'gallery',
      title: 'Additional images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Shown on the individual project page, below the description.',
      validation: (Rule) => Rule.max(3).warning('Usually looks best with 3 or fewer additional images'),
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription', media: 'coverImage' },
  },
});
