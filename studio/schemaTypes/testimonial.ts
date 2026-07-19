import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: 'authorName', title: 'Author name', type: 'string' }),
    defineField({ name: 'authorRole', title: 'Author role / company', type: 'string' }),
    defineField({ name: 'authorPhoto', title: 'Author photo', type: 'image', options: { hotspot: true } }),
  ],
  preview: {
    select: { title: 'authorName', subtitle: 'quote' },
  },
});
