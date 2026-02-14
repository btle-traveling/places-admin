// utils/session.ts
import { SessionPayload } from "@/types/session";
import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "./session-client";

export const clearSessionFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const session = await useAppSession();
    session.clear();
  },
);

export const getSessionFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();
    if (session.data === undefined || session.data === null)
      return {
        success: false,
        error: {
          type: "SESSION_NOT_FOUND",
        },
      };
    if (typeof session.data?.accessToken !== "string")
      return {
        success: false,
        error: {
          type: "TOKEN_NOT_FOUND",
        },
      };

    return {
      success: true,
      data: session.data,
    };
  },
);

export const createOrUpdateSessionFn = createServerFn({ method: "POST" })
  .inputValidator((data: SessionPayload) => data)
  .handler(async ({ data }) => {
    const session = await useAppSession();
    const result = await session.update({ ...data });
    return {
      success: true,
      data: result.data,
    };
  });
