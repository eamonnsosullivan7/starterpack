import {
	getImageDimensions,
	type SanityImageSource as AssetUtilsImageSource,
} from '@sanity/asset-utils';
import { urlFor } from './sanity';
import type { SanityImage } from './types';

interface ImageUrlOptions {
	width?: number;
	height?: number;
}

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

// Render-time `width`/`height` attributes for an <img>
export function imageDimensions(
	image: SanityImage | null | undefined,
	targetWidth: number,
): { width: number; height: number } | null {
	if (!image) return null;
	const { aspectRatio } = getImageDimensions(image as AssetUtilsImageSource);
	return { width: targetWidth, height: Math.round(targetWidth / aspectRatio) };
}
