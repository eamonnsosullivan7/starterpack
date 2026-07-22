import { defineField, defineType } from 'sanity';

// Singleton — restrict to a single document in the Studio structure.
export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeading', title: 'Hero heading', type: 'string' }),
    defineField({ name: 'heroSubheading', title: 'Hero subheading', type: 'text', rows: 2 }),
    defineField({ name: 'heroImage', title: 'Hero image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'aboutHeading', title: 'About heading', type: 'string' }),
    defineField({ name: 'aboutText', title: 'About text', type: 'text', rows: 4 }),
    defineField({ name: 'aboutImage', title: 'About image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'featuredServices',
      title: 'Featured services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: (Rule) => Rule.max(3).warning('Usually looks best with 3 or fewer on the homepage'),
    }),
    defineField({
      name: 'featuredTestimonials',
      title: 'Featured testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
    defineField({
      name: 'selectedWork',
      title: 'Selected work',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      validation: (Rule) => Rule.max(3).warning('Usually looks best with 3 or fewer on the homepage'),
    }),
  ],
});
