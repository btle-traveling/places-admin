import type { Place, PlaceStatus } from "@/entities/place";
import { typeSafeRequest } from "@/lib/http";

export interface ListPlacesParams {
	skip?: number;
	limit?: number;
	status?: PlaceStatus | null;
}

export async function getPlaces(params?: ListPlacesParams) {
	return await typeSafeRequest<null, ListPlacesParams, Place[]>({
		method: "get",
		url: "/api/v1/places",
		payload: {
			params,
		},
	});
}
