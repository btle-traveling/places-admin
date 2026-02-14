import { SignIn } from "@/features/sign-in";
import { SessionPayload } from "@/types/session";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/sign-in")({
  component: RouteComponent,
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        const newSessionPayload: SessionPayload = {
          accessToken: "some-token",
          email: body.email,
          userId: 1,
        };
        return new Response(
          JSON.stringify({
            message: "Success!",
            data: { ...newSessionPayload },
          }),
        );
      },
    },
  },
});

function RouteComponent() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <SignIn />
    </section>
  );
}
