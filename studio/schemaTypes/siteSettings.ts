import { defineField, defineType } from 'sanity';

// Singleton — restrict to a single document in the Studio structure.
export default defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fieldsets: [
		{
			name: 'footer',
			title: 'Footer details',
			options: { collapsible: true, collapsed: false },
		},
	],
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
		defineField({ name: 'companyName', title: 'Company name', type: 'string', fieldset: 'footer' }),
		defineField({
			name: 'companyAddress',
			title: 'Company address',
			type: 'text',
			rows: 2,
			fieldset: 'footer',
		}),
		defineField({ name: 'phone', title: 'Phone number', type: 'string', fieldset: 'footer' }),
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
		defineField({
			name: 'colors',
			title: 'Brand colors',
			type: 'object',
			description:
				'Hex codes, e.g. #1a73e8. Leave any of these blank to fall back to the template default.',
			fields: [
				defineField({
					name: 'primary',
					title: 'Primary',
					type: 'string',
					validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, { name: 'hex color' }),
				}),
				defineField({
					name: 'secondary',
					title: 'Secondary',
					type: 'string',
					validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, { name: 'hex color' }),
				}),
				defineField({
					name: 'accent',
					title: 'Accent',
					type: 'string',
					validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, { name: 'hex color' }),
				}),
				defineField({
					name: 'textPrimary',
					title: 'Text color — primary',
					type: 'string',
					validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, { name: 'hex color' }),
				}),
				defineField({
					name: 'textSecondary',
					title: 'Text color — secondary',
					type: 'string',
					validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, { name: 'hex color' }),
				}),
				defineField({
					name: 'textTertiary',
					title: 'Text color — tertiary',
					type: 'string',
					validation: (Rule) => Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, { name: 'hex color' }),
				}),
			],
		}),
	],
});
