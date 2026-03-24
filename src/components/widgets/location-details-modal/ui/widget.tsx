import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import type { Place } from "@/entities/place";
import { ExternalLink, Tag, User, Info, Calendar } from "lucide-react";
import { PlaceImages } from "./place-images";

interface LocationDetailsModalProps {
	location: Place | null;
	isOpen: boolean;
	onClose: () => void;
	onUpdate?: (location: Place) => void;
}

const STATUS_COLORS: Record<string, string> = {
	approved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
	pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
	rejected: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export function LocationDetailsModalWidget({
	location,
	isOpen,
	onClose,
	onUpdate,
}: LocationDetailsModalProps) {
	if (!location) return null;

	const mapsUrl =
		location.google_maps_url ??
		location.yandex_maps_url ??
		location.apple_maps_url;

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-2xl overflow-hidden p-0 gap-0 max-h-[90vh] overflow-y-auto">
				<div className="relative h-64 w-full">
					{location.images && location.images.length > 0 ? (
						<img
							src={location.images[0].url}
							alt={location.name}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="h-full w-full bg-linear-to-br from-primary/20 via-accent/10 to-secondary/20" />
					)}
					<div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

					<div
						className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-medium capitalize backdrop-blur-md ${STATUS_COLORS[location.status] ?? ""}`}
					>
						{location.status}
					</div>
				</div>

				<div className="p-6 space-y-6">
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold">
							{location.name}
						</DialogTitle>
					</DialogHeader>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<div>
								<h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
									<Info className="h-4 w-4 text-primary" />
									Description
								</h4>
								<p className="text-sm text-muted-foreground leading-relaxed">
									{location.description ||
										"No description provided for this location."}
								</p>
							</div>

							<div>
								<h4 className="flex items-center gap-2 text-sm font-semibold mb-2">
									<Tag className="h-4 w-4 text-primary" />
									Categories
								</h4>
								<div className="flex flex-wrap gap-2">
									{location.categories.length > 0 ? (
										location.categories.map((cat) => (
											<span
												key={cat.id}
												className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
											>
												{cat.name}
											</span>
										))
									) : (
										<span className="text-xs text-muted-foreground italic">
											No categories
										</span>
									)}
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<div className="rounded-lg border bg-muted/30 p-4 space-y-3">
								<h4 className="text-sm font-semibold flex items-center gap-2">
									Details
								</h4>
								<div className="space-y-2">
									<div className="flex items-center justify-between text-xs">
										<span className="text-muted-foreground flex items-center gap-2">
											<User className="h-3 w-3" /> Created BY
										</span>
										<span className="font-mono">
											{location.created_by?.slice(0, 8) || "System"}
										</span>
									</div>
									<div className="flex items-center justify-between text-xs">
										<span className="text-muted-foreground flex items-center gap-2">
											<Calendar className="h-3 w-3" /> Suggested By
										</span>
										<span className="font-mono">
											{location.suggested_by?.slice(0, 8) || "Anonymous"}
										</span>
									</div>
								</div>
							</div>

							{mapsUrl && (
								<div className="space-y-2">
									<h4 className="text-sm font-semibold">Location Links</h4>
									<div className="grid grid-cols-1 gap-2">
										{location.google_maps_url && (
											<a
												href={location.google_maps_url}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent hover:text-accent-foreground transition-colors text-xs"
											>
												<span>Google Maps</span>
												<ExternalLink className="h-3 w-3" />
											</a>
										)}
										{location.yandex_maps_url && (
											<a
												href={location.yandex_maps_url}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent hover:text-accent-foreground transition-colors text-xs"
											>
												<span>Yandex Maps</span>
												<ExternalLink className="h-3 w-3" />
											</a>
										)}
										{location.apple_maps_url && (
											<a
												href={location.apple_maps_url}
												target="_blank"
												rel="noopener noreferrer"
												className="flex items-center justify-between p-2 rounded-md border bg-card hover:bg-accent hover:text-accent-foreground transition-colors text-xs"
											>
												<span>Apple Maps</span>
												<ExternalLink className="h-3 w-3" />
											</a>
										)}
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Images Section */}
					<div className="border-t pt-6">
						<PlaceImages
							place={location}
							onUpdate={(updatedLocation) => {
								onUpdate?.(updatedLocation);
							}}
						/>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
