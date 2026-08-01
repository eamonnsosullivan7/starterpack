import type { SanityImageSource } from '@sanity/image-url';

export type SanityImage = SanityImageSource;

// Portable text is Sanity's block-content type. lib/portableText.ts only ever
// reads `children[].text`, so this is intentionally loose rather than
// modeling every mark/span/list variant.
export interface PortableTextBlock {
	_type: string;
	children?: { text?: string }[];
	[key: string]: unknown;
}
export type PortableText = PortableTextBlock[];

export interface Slug {
	current: string;
}

export interface NavItem {
	label?: string;
	path?: string;
}

export interface SocialLink {
	platform?: string;
	url?: string;
}

export interface BrandColors {
	primary?: string;
	secondary?: string;
	accent?: string;
	textPrimary?: string;
	textSecondary?: string;
	textTertiary?: string;
}

export interface SiteSettings {
	title?: string;
	description?: string;
	logo?: SanityImage;
	favicon?: SanityImage;
	navItems?: NavItem[];
	socialLinks?: SocialLink[];
	colors?: BrandColors;
	companyName?: string;
	companyAddress?: string;
	phone?: string;
}

export interface Project {
	_id?: string;
	title: string;
	shortDescription?: string;
	description?: PortableText;
	coverImage?: SanityImage;
	gallery?: SanityImage[];
	slug?: Slug;
}

export interface Service {
	_id?: string;
	title: string;
	summary?: string;
	description?: string;
	icon?: string;
	slug?: Slug;
	price?: string;
}

export interface Testimonial {
	_id?: string;
	quote: string;
	authorName: string;
	authorRole?: string;
	authorPhoto?: SanityImage;
}

export interface Faq {
	_id?: string;
	question: string;
	answer?: string;
}

export interface Homepage {
	heroHeading?: string;
	heroSubheading?: string;
	heroImage?: SanityImage;
	aboutHeading?: string;
	aboutText?: string;
	aboutImage?: SanityImage;
	featuredServices?: Service[];
	featuredTestimonials?: Testimonial[];
	selectedWork?: Project[];
	faqHeading?: string;
	featuredFaqs?: Faq[];
}

export interface AboutPageSection {
	heading?: string;
	text?: PortableText;
	image?: SanityImage;
	imagePosition?: 'left' | 'right';
}

export interface AboutPage {
	seoDescription?: string;
	heroHeading?: string;
	heroSubheading?: string;
	heroImage?: SanityImage;
	sections?: AboutPageSection[];
}

export interface SimplePage {
	title?: string;
	seoDescription?: string;
	body?: PortableText;
}
