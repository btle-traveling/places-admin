import { getSession } from "@/lib/session";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  async loader() {
    const result = await getSession();
    if (result.success === false)
      throw redirect({
        to: "/sign-in",
      });
    return {
      session: result.data,
    };
  },
});
