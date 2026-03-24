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

export async function addPlaceImages(placeId: string, images: File[]) {
	const formData = new FormData();
	images.forEach((image) => {
		formData.append("images", image);
	});

	return await typeSafeRequest<FormData, null, Place>({
		method: "post",
		url: `/api/v1/places/${placeId}/images`,
		payload: {
			body: formData,
			headers: {
				"Content-Type": "multipart/form-data",
			},
		},
	});
}

export async function deletePlaceImage(placeId: string, fileId: string) {
	return await typeSafeRequest<null, null, Place>({
		method: "delete",
		url: `/api/v1/places/${placeId}/images/${fileId}`,
	});
}
