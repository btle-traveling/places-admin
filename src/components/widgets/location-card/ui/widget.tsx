import { Places } from "@/entities/place";
import { MapPin, Star } from "lucide-react";

interface LocationCardProps {
	location: Places;
}

export function Widget({ location }: LocationCardProps) {
	return (
		<div className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/20">
			{/* Image */}
			<div className="relative h-48 overflow-hidden bg-gradient-to-br">
				<div
					className="h-full w-full transition-transform duration-300 group-hover:scale-105"
					style={{ background: location.image }}
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
				<div className="absolute right-3 top-3 rounded-full bg-card/80 px-3 py-1 text-sm font-medium text-primary backdrop-blur">
					{location.price}
				</div>
			</div>

			{/* Content */}
			<div className="p-4 space-y-3">
				<div>
					<h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-1">
						{location.name}
					</h3>
					<p className="text-xs text-muted-foreground">{location.category}</p>
				</div>

				{/* Rating */}
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-1">
						<Star className="h-4 w-4 fill-primary text-primary" />
						<span className="font-semibold text-sm text-foreground">
							{location.rating}
						</span>
					</div>
					<span className="text-xs text-muted-foreground">
						({location.reviews} reviews)
					</span>
				</div>

				{/* Distance */}
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<MapPin className="h-4 w-4 text-accent" />
					<span>{location.distance}</span>
				</div>

				{/* Tags */}
				<div className="flex flex-wrap gap-2">
					{location.tags.map((tag) => (
						<span
							key={tag}
							className="inline-block rounded-full bg-secondary/50 px-2 py-1 text-xs text-secondary-foreground"
						>
							{tag}
						</span>
					))}
				</div>

				{/* Action Button */}
				<button
					className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 mt-2"
					type="button"
				>
					View Details
				</button>
			</div>
		</div>
	);
}
