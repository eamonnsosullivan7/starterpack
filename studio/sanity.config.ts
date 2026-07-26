import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemaTypes } from './schemaTypes';

// Types with their own drag-to-reorder list view (see the structure below).
// Kept out of the default alphabetical document list so they don't show up
// twice.
const orderableTypes = ['service', 'project'];

export default defineConfig({
	name: 'default',
	title: 'Starterpack Studio',

	projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
	dataset: process.env.SANITY_STUDIO_DATASET || 'production',

	plugins: [
		structureTool({
			structure: (S, context) =>
				S.list()
					.title('Content')
					.items([
						orderableDocumentListDeskItem({ type: 'service', title: 'Services', S, context }),
						orderableDocumentListDeskItem({ type: 'project', title: 'Projects', S, context }),
						S.divider(),
						...S.documentTypeListItems().filter(
							(listItem) => !orderableTypes.includes(listItem.getId() ?? ''),
						),
					]),
		}),
	],

	schema: {
		types: schemaTypes,
	},
});
