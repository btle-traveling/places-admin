import { useState } from "react";
import type { Place } from "@/entities/place";
import { Image as ImageIcon, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addPlaceImages, deletePlaceImage } from "@/services/places";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface PlaceImagesProps {
	place: Place;
	onUpdate: (updatedPlace: Place) => void;
}

export function PlaceImages({ place, onUpdate }: PlaceImagesProps) {
	const [isUploading, setIsUploading] = useState(false);
	const [deletingFileId, setDeletingFileId] = useState<string | null>(null);

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (!files || files.length === 0) return;

		setIsUploading(true);
		const result = await addPlaceImages(place.id, Array.from(files));
		setIsUploading(false);

		if (result.isOk()) {
			onUpdate(result.value);
			toast.success("Images added successfully");
		} else {
			toast.error(result.error.message || "Failed to add images");
		}
		// Reset the input value so the same file can be selected again
		e.target.value = "";
	};

	const handleDelete = async (fileId: string) => {
		if (confirm("Are you sure you want to delete this image?")) {
			setDeletingFileId(fileId);
			const result = await deletePlaceImage(place.id, fileId);
			setDeletingFileId(null);

			if (result.isOk()) {
				onUpdate(result.value);
				toast.success("Image deleted successfully");
			} else {
				toast.error(result.error.message || "Failed to delete image");
			}
		}
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h4 className="flex items-center gap-2 text-sm font-semibold">
					<ImageIcon className="h-4 w-4 text-primary" />
					Images
					<Badge variant="secondary" className="ml-2">
						{place.images.length}
					</Badge>
				</h4>
				<div className="relative">
					<input
						type="file"
						multiple
						accept="image/*"
						onChange={handleFileChange}
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
						disabled={isUploading}
						id="image-upload-input"
					/>
					<Button
						variant="outline"
						size="sm"
						className="h-8 gap-2"
						disabled={isUploading}
					>
						{isUploading ? (
							<Loader2 className="h-4 w-4 animate-spin" />
						) : (
							<Plus className="h-4 w-4" />
						)}
						Add more images
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
				{place.images.map((img, index) => (
					<div
						key={img.file_id}
						className="group relative aspect-square overflow-hidden rounded-xl border bg-muted shadow-xs transition-all hover:ring-2 hover:ring-primary/50"
					>
						<img
							src={img.url}
							alt={`${place.name} ${index + 1}`}
							className="h-full w-full object-cover transition-transform group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
							<Button
								variant="destructive"
								size="icon"
								className="h-8 w-8 rounded-full"
								onClick={() => handleDelete(img.file_id)}
								disabled={deletingFileId === img.file_id}
							>
								{deletingFileId === img.file_id ? (
									<Loader2 className="h-4 w-4 animate-spin" />
								) : (
									<Trash2 className="h-4 w-4" />
								)}
							</Button>
						</div>
						{index === 0 && (
							<div className="absolute top-2 left-2">
								<Badge
									variant="secondary"
									className="bg-background/80 backdrop-blur-xs text-[10px] py-0 px-1.5 h-auto"
								>
									Cover
								</Badge>
							</div>
						)}
					</div>
				))}

				{place.images.length === 0 && (
					<div className="col-span-full py-8 text-center border-2 border-dashed rounded-xl bg-muted/30">
						<p className="text-sm text-muted-foreground">
							No images uploaded yet.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
