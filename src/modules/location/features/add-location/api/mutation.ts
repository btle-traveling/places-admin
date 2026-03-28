import { apiClient } from "@/lib/api-client";
import type { ApiError } from "@/types/http";
import axios from "axios";
import { ResultAsync } from "neverthrow";
import type { z } from "zod";
import type { schema } from "../model/schema";
import type { Response } from "../model/types";

type Payload = z.infer<typeof schema>;

function buildFormData(data: Payload): FormData {
	const formData = new FormData();
	formData.append("name", data.name);
	formData.append("description", data.description);
	if (data.latitude !== undefined)
		formData.append("latitude", String(data.latitude));
	if (data.longitude !== undefined)
		formData.append("longitude", String(data.longitude));
	if (data.google_maps_url)
		formData.append("google_maps_url", data.google_maps_url);
	if (data.yandex_maps_url)
		formData.append("yandex_maps_url", data.yandex_maps_url);
	if (data.apple_maps_url)
		formData.append("apple_maps_url", data.apple_maps_url);
	data.category_ids.forEach((id) => {
		formData.append("category_ids", id);
	});
	data.images.forEach((file) => {
		formData.append("images", file);
	});
	return formData;
}

export async function mutationFn({
	data,
}: {
	data: Payload;
}): Promise<ResultAsync<Response, ApiError>> {
	return await ResultAsync.fromPromise(
		apiClient
			.post<Response>("/api/v1/places", buildFormData(data), {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			})
			.then((res) => res.data),
		(error): ApiError => {
			if (axios.isAxiosError(error)) {
				const detail = error.response?.data?.detail as ApiError["detail"];
				return {
					type:
						error.response?.status === 422 ? "VALIDATION_ERROR" : "HTTP_ERROR",
					status: error.response?.status ?? 500,
					message: error.message,
					detail,
				};
			}
			return {
				type: "UNKNOWN_ERROR",
				message:
					error instanceof Error ? error.message : "An unknown error occurred",
			};
		},
	);
}
