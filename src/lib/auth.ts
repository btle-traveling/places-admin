import { getCurrentUser } from "@/services/user";
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
