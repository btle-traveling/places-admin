import type { Place } from "@/entities/place";
import { ExternalLink, MapPin, Tag } from "lucide-react";

interface LocationCardProps {
	location: Place;
	onClick?: (location: Place) => void;
}

const STATUS_COLORS: Record<string, string> = {
	approved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
	pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
	rejected: "bg-rose-500/20 text-rose-400 border-rose-500/30",
};

export function Widget({ location, onClick }: LocationCardProps) {
	const mapsUrl =
		location.google_maps_url ??
		location.yandex_maps_url ??
		location.apple_maps_url;

	return (
		<button
			type="button"
			onClick={() => onClick?.(location)}
			className="group block w-full text-left cursor-pointer overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/20"
		>
			{/* Image / Placeholder */}
			<div className="relative h-48 overflow-hidden">
				{location.images && location.images.length > 0 ? (
					<img
						src={location.images[0]}
						alt={location.name}
						className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					/>
				) : (
					<div className="h-full w-full bg-linear-to-br from-primary/20 via-accent/10 to-secondary/20 transition-transform duration-300 group-hover:scale-105" />
				)}
				<div className="absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />

				{/* Status badge */}
				<div
					className={`absolute right-3 top-3 rounded-full border px-3 py-1 text-xs font-medium capitalize backdrop-blur ${STATUS_COLORS[location.status] ?? ""}`}
				>
					{location.status}
				</div>
			</div>

			{/* Content */}
			<div className="space-y-3 p-4">
				<div>
					<h3 className="line-clamp-1 font-semibold text-foreground transition-colors">
						{location.name}
					</h3>
					{location.description && (
						<p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
							{location.description}
						</p>
					)}
				</div>

				{/* Categories */}
				{location.categories.length > 0 && (
					<div className="flex flex-wrap gap-1">
						<Tag className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
						{location.categories.map((cat) => (
							<span
								key={cat.id}
								className="inline-block rounded-full bg-secondary/50 px-2 py-0.5 text-xs text-secondary-foreground"
							>
								{cat.name}
							</span>
						))}
					</div>
				)}

				{/* Maps link */}
				{mapsUrl && (
					<a
						href={mapsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 mt-2"
					>
						<ExternalLink className="h-4 w-4" />
						Open in Maps
					</a>
				)}

				{!mapsUrl && (
					<div className="mt-2 w-full rounded-lg bg-secondary/30 py-2 text-center text-xs text-muted-foreground">
						No map link available
					</div>
				)}
			</div>
		</button>
	);
}
