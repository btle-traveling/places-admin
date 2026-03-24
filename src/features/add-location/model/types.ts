import type z from "zod";
import type { schema } from "./schema";

export type Payload = z.infer<typeof schema>;
export type Response = {
	name: string;
	description: string;
	images: string[];
	latitude: number;
	longitude: number;
	google_maps_url: string;
	yandex_maps_url: string;
	apple_maps_url: string;
	id: string;
	status: string;
	created_by: string;
	suggested_by: string;
	updated_by: string;
	categories: { id: string; name: string; description: string | null }[];
};
