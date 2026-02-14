import { SignIn } from "@/features/sign-in";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <SignIn />
    </section>
  );
}
