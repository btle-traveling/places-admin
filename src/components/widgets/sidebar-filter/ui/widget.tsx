import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FilterSidebarProps {
	categories: string[];
	selectedCategories: string[];
	onCategoryToggle: (category: string) => void;
	priceRanges: string[];
	selectedPrices: string[];
	onPriceToggle: (price: string) => void;
	minRating: number;
	onRatingChange: (rating: number) => void;
	onClearFilters: () => void;
	activeFiltersCount: number;
}

export function Widget({
	categories,
	selectedCategories,
	onCategoryToggle,
	priceRanges,
	selectedPrices,
	onPriceToggle,
	minRating,
	onRatingChange,
	onClearFilters,
	activeFiltersCount,
}: FilterSidebarProps) {
	return (
		<div className="sticky top-20 space-y-6 rounded-lg border border-border bg-card p-4">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h2 className="font-semibold text-foreground">Filters</h2>
				{activeFiltersCount > 0 && (
					<button
						type="button"
						onClick={onClearFilters}
						className="inline-flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
					>
						<X className="h-3 w-3" />
						Clear
					</button>
				)}
			</div>

			{/* Categories */}
			<div className="space-y-3">
				<h3 className="text-sm font-semibold text-foreground">Category</h3>
				<div className="space-y-2 max-h-48 overflow-y-auto">
					{categories.map((category) => (
						<div key={category} className="flex items-center gap-3">
							<Checkbox
								id={category}
								checked={selectedCategories.includes(category)}
								onCheckedChange={() => onCategoryToggle(category)}
								className="border-border"
							/>
							<Label
								htmlFor={category}
								className="text-sm text-foreground font-normal cursor-pointer"
							>
								{category}
							</Label>
						</div>
					))}
				</div>
			</div>

			{/* Price Range */}
			<div className="space-y-3 border-t border-border pt-4">
				<h3 className="text-sm font-semibold text-foreground">Price Range</h3>
				<div className="space-y-2">
					{priceRanges.map((price) => (
						<div key={price} className="flex items-center gap-3">
							<Checkbox
								id={`price-${price}`}
								checked={selectedPrices.includes(price)}
								onCheckedChange={() => onPriceToggle(price)}
								className="border-border"
							/>
							<Label
								htmlFor={`price-${price}`}
								className="text-sm text-foreground font-normal cursor-pointer"
							>
								{price}
							</Label>
						</div>
					))}
				</div>
			</div>

			{/* Rating */}
			<div className="space-y-3 border-t border-border pt-4">
				<div className="flex items-center justify-between">
					<h3 className="text-sm font-semibold text-foreground">
						Minimum Rating
					</h3>
					<span className="text-sm font-medium text-accent">
						{minRating.toFixed(1)}
					</span>
				</div>
				<Slider
					value={[minRating]}
					onValueChange={([value]) => onRatingChange(value)}
					max={5}
					min={0}
					step={0.5}
					className="w-full"
				/>
				<p className="text-xs text-muted-foreground">
					Drag to filter by rating
				</p>
			</div>
		</div>
	);
}
