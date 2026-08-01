import { urlFor } from './sanity';
import type { SanityImage } from './types';

interface ImageUrlOptions {
	width?: number;
	height?: number;
}

// Wraps the "turn a Sanity image field into a URL, or null if there isn't
// one" pattern that used to be repeated at every call site.
export function imageUrl(
	image: SanityImage | null | undefined,
	{ width, height }: ImageUrlOptions = {},
): string | null {
	if (!image) return null;
	let builder = urlFor(image);
	if (width) builder = builder.width(width);
	if (height) builder = builder.height(height);
	return builder.auto('format').url();
}
