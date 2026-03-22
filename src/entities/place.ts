export type PlaceStatus = "pending" | "approved" | "rejected";

export interface Category {
	id: string;
	name: string;
}

export interface Place {
	id: string;
	name: string;
	description: string | null;
	images: string[];
	latitude: number | null;
	longitude: number | null;
	google_maps_url: string | null;
	yandex_maps_url: string | null;
	apple_maps_url: string | null;
	status: PlaceStatus;
	created_by: string | null;
	suggested_by: string | null;
	updated_by: string | null;
	categories: Category[];
}

/** @deprecated Use Place instead */
export interface Places {
	id: string;
	name: string;
	category: string;
	rating: number;
	reviews: number;
	image: string;
	price: string;
	distance: string;
	tags: string[];
}
