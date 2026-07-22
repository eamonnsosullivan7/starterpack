import { defineField, defineType } from 'sanity';

// Singleton — restrict to a single document in the Studio structure.
// Structured (rather than a simplePage) because the About page has a
// fixed layout: a hero, then a repeatable list of image/text sections
// where each section's image can go left or right.
export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 }),
    defineField({ name: 'heroHeading', title: 'Hero heading', type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Hero subheading', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'sections',
      title: 'Content sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'imageTextSection',
          fields: [
            defineField({ name: 'heading', type: 'string' }),
            defineField({ name: 'text', type: 'array', of: [{ type: 'block' }] }),
            defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
            defineField({
              name: 'imagePosition',
              title: 'Image position',
              type: 'string',
              options: {
                list: [
                  { title: 'Image left, text right', value: 'left' },
                  { title: 'Image right, text left', value: 'right' },
                ],
                layout: 'radio',
              },
              initialValue: 'left',
            }),
          ],
          preview: {
            select: { title: 'heading', subtitle: 'imagePosition' },
          },
        },
      ],
    }),
  ],
});
