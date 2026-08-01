import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'answer', type: 'text', rows: 3, validation: (Rule) => Rule.required() }),
  ],
  preview: {
    select: { title: 'question', subtitle: 'answer' },
  },
});
