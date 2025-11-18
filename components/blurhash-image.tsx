"use client";

import { useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";
import type { ISrcSet } from "@/types/blurhash-image";

interface BlurhashImageProps {
	src: string;
	blurhash: string;
	alt: string;
	width: number;
	height: number;
	className?: string;

	srcSet?: ISrcSet;
}

export function BlurhashImage(props: BlurhashImageProps) {
	const { src, blurhash, alt, srcSet, className = "" } = props;
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const imgRef = useRef<HTMLImageElement>(null);
	const hasSrcSet = srcSet?.avif && srcSet?.webp && srcSet?.jpg;

	useEffect(() => {
		if (imgRef.current?.complete) {
			setIsImageLoaded(true);
		}
	});

	return (
		<div className={`relative overflow-hidden ${className}`}>
			{/* Blurhash placeholder */}
			<div
				className="absolute inset-0 transition-opacity duration-300"
				style={{ opacity: isImageLoaded ? 0 : 1 }}
			>
				<Blurhash
					hash={blurhash}
					width="100%"
					height="100%"
					resolutionX={32}
					resolutionY={32}
					punch={1}
				/>
			</div>

			{/* Actual image */}
			{hasSrcSet && (
				<picture>
					<source
						srcSet={`${srcSet.avif?.["0"]} 1x, ${srcSet.avif?.["1"]} 2x, ${srcSet.avif?.["2"]} 3x`}
						type="image/avif"
					/>
					<source
						srcSet={`${srcSet.webp?.["0"]} 1x, ${srcSet.webp?.["1"]} 2x, ${srcSet.webp?.["2"]} 3x`}
						type="image/webp"
					/>
					<img
						ref={imgRef}
						src={srcSet.jpg?.["0"] || "/placeholder.svg"}
						alt={alt}
						onLoad={() => setIsImageLoaded(true)}
						srcSet={`${srcSet.jpg?.["0"]} 1x, ${srcSet.jpg?.["1"]} 2x, ${srcSet.jpg?.["2"]} 3x`}
						className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
						style={{ opacity: isImageLoaded ? 1 : 0 }}
					/>
				</picture>
			)}

			{!hasSrcSet && (
				// biome-ignore lint/performance/noImgElement: No needs to use Nextjs image element here.
				<img
					ref={imgRef}
					src={src || "/placeholder.svg"}
					alt={alt}
					onLoad={() => setIsImageLoaded(true)}
					className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
					style={{ opacity: isImageLoaded ? 1 : 0 }}
				/>
			)}
		</div>
	);
}
