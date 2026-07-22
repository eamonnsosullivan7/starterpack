import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import vercel from '@astrojs/vercel';
import sanity from '@sanity/astro';

import icon from 'astro-icon';

const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
	process.env.NODE_ENV ?? 'development',
	process.cwd(),
	'',
);

export default defineConfig({
	output: 'static', // switch to server if you need on-demand rendering / previewss
	adapter: vercel(),
	integrations: [
		sanity({
			projectId: SANITY_PROJECT_ID,
			dataset: SANITY_DATASET || 'production',
			useCdn: true,
			apiVersion: 1.0,
		}),
		icon(),
	],
});
