import { createServerFn } from "@tanstack/react-start";
import { schema } from "../model/schema";
import { apiClient } from "@/lib/api-client";
import { typeSafeRequest } from "@/lib/http";
import { Payload, Response } from "../model/types";

export const mutationFn = createServerFn({ method: "POST" })
	.inputValidator(schema)
	.handler(async ({ data }) => {
		const result = await typeSafeRequest<Payload, null, Response>({
			method: "post",
			url: "/api/v1/auth/login",
			options: {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
			payload: {
				body: data,
			},
		});
		if (result.isErr()) {
			return {
				success: false,
				error: result.error.message,
			};
		}
		return {
			success: true,
			data: result.value,
		};
	});
