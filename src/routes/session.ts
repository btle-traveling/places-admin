import { useAppSession } from "@/lib/session-client";
import { SessionPayload } from "@/types/session";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/session")({
  server: {
    handlers: {
      GET: async () => {
        const session = await useAppSession();
        if ("accessToken" in session.data === false) {
          return new Response(JSON.stringify({ data: null }));
        }
        return new Response(
          JSON.stringify({
            data: session,
          }),
        );
      },
      POST: async ({ request }) => {
        const body: SessionPayload = await request.json();
        const session = await useAppSession();
        const result = await session.update({
          ...body,
        });
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              ...result.data,
            },
          }),
        );
      },
      DELETE: async () => {
        const session = await useAppSession();
        const result = await session.clear();
        return new Response(
          JSON.stringify({
            success: true,
            data: {
              ...result.data,
            },
          }),
        );
      },
    },
  },
});
