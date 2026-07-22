import { createClient } from '@sanity/client';
import {
	createImageUrlBuilder,
	type SanityImageSource,
} from '@sanity/image-url';

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
	return client.fetch(`*[_type == "siteSettings"][0]{
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

// --- Homepage (singleton) -------------------------------------------------

export async function getHomepage() {
	return client.fetch(`*[_type == "homepage"][0]{
    heroHeading,
    heroSubheading,
    heroImage,
    aboutHeading,
    aboutText,
    aboutImage,
    "featuredServices": featuredServices[]->{ _id, title, summary, icon, slug },
    "featuredTestimonials": featuredTestimonials[]->{ _id, quote, authorName, authorRole, authorPhoto },
    "selectedWork": selectedWork[]->{ _id, title, shortDescription, coverImage, slug }
  }`);
}

// --- About page (singleton) -----------------------------------------------

export async function getAboutPage() {
	return client.fetch(`*[_type == "aboutPage"][0]{
    seoDescription,
    heroHeading,
    heroSubheading,
    heroImage,
    sections[]{ heading, text, image, imagePosition }
  }`);
}

// --- Services --------------------------------------------------------------

export async function getAllServices() {
	return client.fetch(`*[_type == "service"] | order(orderRank asc) {
    _id, title, summary, description, icon, slug, price
  }`);
}

export async function getServiceBySlug(slug: string) {
	return client.fetch(
		`*[_type == "service" && slug.current == $slug][0]{
      title, summary, description, icon, price
    }`,
		{ slug },
	);
}

// --- Testimonials ------------------------------------------------------------

export async function getAllTestimonials() {
	return client.fetch(`*[_type == "testimonial"] | order(_createdAt desc) {
    _id, quote, authorName, authorRole, authorPhoto
  }`);
}

// --- Projects ----------------------------------------------------------------

export async function getAllProjects() {
	return client.fetch(`*[_type == "project"] | order(orderRank asc) {
    _id, title, shortDescription, coverImage, slug
  }`);
}

export async function getProjectBySlug(slug: string) {
	return client.fetch(
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
	return client.fetch(
		`*[_type == "simplePage" && slug.current == $slug][0]{
      title, seoDescription, body
    }`,
		{ slug },
	);
}
