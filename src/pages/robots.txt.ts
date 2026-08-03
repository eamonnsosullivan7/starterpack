import type { APIRoute } from 'astro';

// A plain public/robots.txt would hardcode one client's sitemap URL for
// every client this template gets copied for — generating it here lets it
// follow whatever SITE_URL that deployment is configured with.
export const GET: APIRoute = ({ site }) => {
	const sitemapUrl = new URL('sitemap-index.xml', site).href;
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
		headers: { 'Content-Type': 'text/plain' },
	});
};
