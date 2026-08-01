import { createClient } from '@sanity/client';
import {
	createImageUrlBuilder,
	type SanityImageSource,
} from '@sanity/image-url';
import type {
	AboutPage,
	Faq,
	Homepage,
	Project,
	Service,
	SimplePage,
	SiteSettings,
	SocialLink,
	Testimonial,
} from './types';

export const client = createClient({
	projectId: import.meta.env.SANITY_PROJECT_ID,
	dataset: import.meta.env.SANITY_DATASET || 'production',
	apiVersion: '2024-01-01',
	useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

// --- Site-wide -----------------------------------------------------------

export async function getSiteSettings() {
	return client.fetch<SiteSettings | null>(`*[_type == "siteSettings"][0]{
    title,
    description,
    logo,
    favicon,
    "navItems": nav[]{ label, path },
    socialLinks,
    colors,
    companyName,
    companyAddress,
    phone
  }`);
}

export function findSocialLink(
	socialLinks: SocialLink[] | undefined,
	platform: string,
): string | undefined {
	return socialLinks?.find((link) => link.platform?.toLowerCase() === platform.toLowerCase())
		?.url;
}

// Falls back to the template's default palette wherever a client hasn't set
// a brand color in Site Settings yet.
export function getThemeColors(settings: SiteSettings | null) {
	return {
		colorPrimary: settings?.colors?.primary ?? '#111111',
		colorSecondary: settings?.colors?.secondary ?? '#555555',
		colorAccent: settings?.colors?.accent ?? '#2563eb',
		colorTextPrimary: settings?.colors?.textPrimary ?? '#111111',
		colorTextSecondary: settings?.colors?.textSecondary ?? '#555555',
		colorTextTertiary: settings?.colors?.textTertiary ?? '#666',
	} satisfies Record<string, string>;
}

// --- Homepage (singleton) -------------------------------------------------

export async function getHomepage() {
	return client.fetch<Homepage | null>(`*[_type == "homepage"][0]{
    heroHeading,
    heroSubheading,
    heroImage,
    aboutHeading,
    aboutText,
    aboutImage,
    "featuredServices": featuredServices[]->{ _id, title, summary, icon, slug },
    "featuredTestimonials": featuredTestimonials[]->{ _id, quote, authorName, authorRole, authorPhoto },
    "selectedWork": selectedWork[]->{ _id, title, shortDescription, coverImage, slug },
    faqHeading,
    "featuredFaqs": featuredFaqs[]->{ _id, question, answer }
  }`);
}

// --- About page (singleton) -----------------------------------------------

export async function getAboutPage() {
	return client.fetch<AboutPage | null>(`*[_type == "aboutPage"][0]{
    seoDescription,
    heroHeading,
    heroSubheading,
    heroImage,
    sections[]{ heading, text, image, imagePosition }
  }`);
}

// --- Services --------------------------------------------------------------

export async function getAllServices() {
	return client.fetch<Service[]>(`*[_type == "service"] | order(orderRank asc) {
    _id, title, summary, description, icon, slug, price
  }`);
}

export async function getServiceBySlug(slug: string) {
	return client.fetch<Service | null>(
		`*[_type == "service" && slug.current == $slug][0]{
      title, summary, description, icon, price
    }`,
		{ slug },
	);
}

// --- Testimonials ------------------------------------------------------------

export async function getAllTestimonials() {
	return client.fetch<Testimonial[]>(`*[_type == "testimonial"] | order(_createdAt desc) {
    _id, quote, authorName, authorRole, authorPhoto
  }`);
}

// --- FAQs --------------------------------------------------------------------

export async function getAllFaqs() {
	return client.fetch<Faq[]>(`*[_type == "faq"] | order(_createdAt desc) {
    _id, question, answer
  }`);
}

// --- Projects ----------------------------------------------------------------

export async function getAllProjects() {
	return client.fetch<Project[]>(`*[_type == "project"] | order(orderRank asc) {
    _id, title, shortDescription, coverImage, slug
  }`);
}

export async function getProjectBySlug(slug: string) {
	return client.fetch<Project | null>(
		`*[_type == "project" && slug.current == $slug][0]{
      title, description, coverImage, gallery, slug
    }`,
		{ slug },
	);
}

// --- Simple content pages (Contact intro, Privacy Policy, etc.) ------------
// For pages that are just "a heading and some rich text" rather than a
// structured content type of their own.

export async function getSimplePageBySlug(slug: string) {
	return client.fetch<SimplePage | null>(
		`*[_type == "simplePage" && slug.current == $slug][0]{
      title, seoDescription, body
    }`,
		{ slug },
	);
}
