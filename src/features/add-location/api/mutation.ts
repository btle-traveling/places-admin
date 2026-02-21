import { createServerFn } from "@tanstack/react-start";
import { schema } from "../model/schema";
import { typeSafeRequest } from "@/lib/http";
import type { Payload, Response } from "../model/types";

export const mutationFn = createServerFn({ method: "POST" })
	.inputValidator(schema)
	.handler(async ({ data }) => {
		const response = await typeSafeRequest<Payload, null, Response>({
			method: "post",
			url: "/api/v1/places",
			payload: {
				body: data,
			},
		});
		if (response.isErr()) {
			return {
				success: false,
				error: response.error.message,
			};
		}
		return {
			success: true,
			data: response.value,
		};
	});
