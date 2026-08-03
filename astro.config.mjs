import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import cloudflare from '@astrojs/cloudflare';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';

import icon from 'astro-icon';

const { SANITY_PROJECT_ID, SANITY_DATASET, SITE_URL } = loadEnv(
	process.env.NODE_ENV ?? 'development',
	process.cwd(),
	'',
);

export default defineConfig({
	output: 'static', // switch to server if you need on-demand rendering / previewss
	// Set SITE_URL per client before going live — the sitemap and structured
	// data both need the real deployed domain to generate correct absolute URLs.
	site: SITE_URL || 'https://example.com',
	adapter: cloudflare(),
	integrations: [
		sanity({
			projectId: SANITY_PROJECT_ID,
			dataset: SANITY_DATASET || 'production',
			useCdn: true,
			apiVersion: 1.0,
		}),
		icon(),
		sitemap(),
	],
	vite: {
		ssr: {
			optimizeDeps: {
				include: ['@iconify/utils'],
			},
		},
	},
});
