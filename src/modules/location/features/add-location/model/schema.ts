import z from "zod";

export const schema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters long"),
	description: z
		.string()
		.min(10, "Description must be at least 10 characters long"),
	images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
	latitude: z.number().min(-90).max(90).or(z.undefined()),
	longitude: z.number().min(-180).max(180).or(z.undefined()),
	google_maps_url: z.url("Invalid URL"),
	yandex_maps_url: z.url("Invalid URL"),
	apple_maps_url: z.url("Invalid URL"),
	category_ids: z.array(z.string()),
});
