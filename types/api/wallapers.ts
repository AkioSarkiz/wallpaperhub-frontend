interface IUserAPI {
	id: number;
	name: string;
}

interface ITagAPI {
	id: number;
	title: string;
}

export interface IWallpaperAPI {
	id: number;
	title: string;
	description: string;

	total_downloads: number;
	total_views: number;
	total_likes: number;

	user: IUserAPI;
	tags: ITagAPI[];

	wallpaper_thumbnails?: {
		url: string;
		format: string;
		index: number;
	}[];

	wallpaper_previews?: {
		url: string;
		format: string;
		index: number;
	}[];

	wallpaper: {
		id: number;
		url: string;

		metadata: {
			width: number;
			height: number;
			size: number;
			placeholder_blurhash: string;
		};
	};
}
