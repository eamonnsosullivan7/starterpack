import { defineField, defineType } from 'sanity';

// Singleton — restrict to a single document in the Studio structure.
export default defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Site title', type: 'string' }),
		defineField({
			name: 'description',
			title: 'Site description',
			type: 'text',
			rows: 2,
		}),
		defineField({ name: 'favicon', title: 'Favicon Logo', type: 'image' }),
		defineField({ name: 'logo', title: 'Logo', type: 'image' }),
		defineField({
			name: 'nav',
			title: 'Navigation',
			description:
				'Links to the fixed routes your developer has built (e.g. /services, /about).',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'navItem',
					fields: [
						{ name: 'label', type: 'string' },
						{
							name: 'path',
							type: 'string',
							description: 'e.g. /services or /about',
						},
					],
				},
			],
		}),
		defineField({
			name: 'socialLinks',
			title: 'Social links',
			type: 'array',
			of: [
				{
					type: 'object',
					name: 'socialLink',
					fields: [
						{ name: 'platform', type: 'string' },
						{ name: 'url', type: 'url' },
					],
				},
			],
		}),
	],
});
