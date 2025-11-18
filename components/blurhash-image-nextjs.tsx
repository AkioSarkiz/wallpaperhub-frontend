"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { blurhashToBase64 } from "@/lib/blurhash";

interface BlurhashImageProps {
	src: string;
	blurhash: string;
	alt: string;
	width: number;
	height: number;
	className?: string;
	priority?: boolean;
}

export function BlurhashImage({
	src,
	blurhash,
	alt,
	width,
	height,
	className,
	priority = false,
}: BlurhashImageProps) {
	const [blurDataURL, setBlurDataURL] = useState<string>("");

	useEffect(() => {
		try {
			const dataURL = blurhashToBase64(blurhash, 32, 32);
			setBlurDataURL(dataURL);
		} catch (error) {
			console.error("Failed to decode blurhash:", error);
		}
	}, [blurhash]);

	return (
		<Image
			src={src || "/placeholder.svg"}
			alt={alt}
			width={width}
			height={height}
			placeholder={blurDataURL ? "blur" : "empty"}
			blurDataURL={blurDataURL}
			className={className}
			priority={priority}
		/>
	);
}
