import type { schema } from "./schema";
import type z from "zod";

export type Payload = z.infer<typeof schema>;

export type Response = {
	access_token: string;
	user: {
		email: string;
		first_name: string;
		last_name: string;
		role: "admin" | "user";
		status: "active" | "inactive";
		id: string;
	};
};
