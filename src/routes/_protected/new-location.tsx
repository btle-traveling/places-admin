import { AddLocationForm } from "@/features/add-location";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/new-location")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<AddLocationForm />
		</div>
	);
}
