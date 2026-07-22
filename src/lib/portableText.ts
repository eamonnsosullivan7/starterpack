// Minimal portable text renderer — plain paragraphs only, and it also
// accepts a plain string so the same helper works for portable-text body
// fields (About page sections) and simple text fields (homepage teaser).
// Swap in @portabletext/to-html once real bold/links/lists are needed.
export function blocksToParagraphs(input: any): string[] {
	if (!input) return [];
	if (typeof input === 'string') return [input];
	return input.map((block: any) => (block.children || []).map((c: any) => c.text).join(''));
}
