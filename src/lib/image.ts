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
export function imageSrcSet(
	image: SanityImage | null | undefined,
	widths: number[],
	// Pass this when the <img> forces a specific crop (e.g. width/height both
	// set) — otherwise each srcset candidate would come back at the source
	// image's natural ratio instead of the crop the component asked for.
	aspectRatio?: number,
): string | null {
	if (!image) return null;
	return widths
		.map((width) => {
			const height = aspectRatio ? Math.round(width / aspectRatio) : undefined;
			return `${imageUrl(image, { width, height })} ${width}w`;
		})
		.join(', ');
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
