import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

export default defineConfig({
	output: 'static', // switch to server if you need on-demand rendering / previewss
	adapter: vercel(),
	integrations: [
		sanity({
			projectId: process.env.SANITY_PROJECT_ID,
			dataset: process.env.SANITY_DATASET || 'production',
			useCdn: true,
			apiVersion: 1.0,
		}),
		react(),
	],
});
