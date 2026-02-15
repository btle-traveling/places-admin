import { getCurrentUser } from "@/services/user";
import { SessionPayload } from "@/types/session";
import { createServerFn } from "@tanstack/react-start";
import { useAppSession } from "./session-client";

// Get current user
export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();
    const userId = session.data.userId;

    if (!userId) {
      return null;
    }
    const result = await getCurrentUser();
    if (result.isErr()) return null;

    return result.value;
  },
);

export const signInFn = createServerFn({ method: "POST" })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const newSessionPayload: SessionPayload = {
      accessToken: "some-token",
      email: data.username,
      userId: 1,
    };
    return {
      success: true,
      data: newSessionPayload,
    };
  });
