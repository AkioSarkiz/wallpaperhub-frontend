/**
 * Blurhash utility functions for Next.js
 * Converts blurhash strings to base64 data URLs for use with next/image
 */

import { decode } from "blurhash";

/**
 * Converts a blurhash string to a base64 data URL (client-side only)
 * Requires canvas API, so must be used in useEffect or client component
 *
 * @param blurhash - The blurhash string from your backend
 * @param width - Width for decoding (default: 32px)
 * @param height - Height for decoding (default: 32px)
 * @returns Base64 data URL string
 */
export function blurhashToBase64(
	blurhash: string,
	width = 32,
	height = 32,
): string {
	const pixels = decode(blurhash, width, height);

	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("Could not get canvas context");

	const imageData = ctx.createImageData(width, height);
	imageData.data.set(pixels);
	ctx.putImageData(imageData, 0, 0);

	return canvas.toDataURL();
}

/**
 * Type for image data with blurhash
 */
export interface ImageWithBlurhash {
	src: string;
	blurhash: string;
	alt: string;
	width?: number;
	height?: number;
}
