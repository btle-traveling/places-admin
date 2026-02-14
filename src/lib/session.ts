// utils/session.ts
import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "./session-client";

export const logOut = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useAppSession();
  session.clear();
});

export const getSession = createServerFn({ method: "GET" }).handler(
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
