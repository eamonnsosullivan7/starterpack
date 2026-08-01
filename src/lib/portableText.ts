import type { PortableText } from './types';

// Minimal portable text renderer — plain paragraphs only, and it also
// accepts a plain string so the same helper works for portable-text body
// fields (About page sections) and simple text fields (homepage teaser).
// Swap in @portabletext/to-html once real bold/links/lists are needed.
export function blocksToParagraphs(input?: PortableText | string | null): string[] {
	if (!input) return [];
	if (typeof input === 'string') return [input];
	return input.map((block) => (block.children ?? []).map((c) => c.text ?? '').join(''));
}
