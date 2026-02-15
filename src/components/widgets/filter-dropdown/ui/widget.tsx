import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { X, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterDropdownProps {
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

export function FilterDropdownWidget({
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
}: FilterDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="gap-2 h-10 rounded-lg">
					<Filter className="h-4 w-4" />
					Filters
					{activeFiltersCount > 0 && (
						<Badge
							variant="secondary"
							className="rounded-sm px-1 font-normal lg:hidden"
						>
							{activeFiltersCount}
						</Badge>
					)}
					{activeFiltersCount > 0 && (
						<Badge
							variant="secondary"
							className="hidden rounded-sm px-1 font-normal lg:inline-flex"
						>
							{activeFiltersCount}
						</Badge>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80 p-0" align="start">
				<div className="p-4 space-y-4">
					<div className="flex items-center justify-between">
						<h4 className="font-medium leading-none">Filter Locations</h4>
						{activeFiltersCount > 0 && (
							<button
								type="button"
								onClick={onClearFilters}
								className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
							>
								<X className="h-3 w-3" />
								Clear all
							</button>
						)}
					</div>

					<DropdownMenuSeparator />

					{/* Categories */}
					<div className="space-y-3">
						<h5 className="text-sm font-medium">Category</h5>
						<div className="grid grid-cols-2 gap-2">
							{categories.map((category) => (
								<div key={category} className="flex items-center gap-2">
									<Checkbox
										id={`filter-category-${category}`}
										checked={selectedCategories.includes(category)}
										onCheckedChange={() => onCategoryToggle(category)}
										className="border-border"
									/>
									<Label
										htmlFor={`filter-category-${category}`}
										className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{category}
									</Label>
								</div>
							))}
						</div>
					</div>

					<DropdownMenuSeparator />

					{/* Price Range */}
					<div className="space-y-3">
						<h5 className="text-sm font-medium">Price Range</h5>
						<div className="flex gap-4">
							{priceRanges.map((price) => (
								<div key={price} className="flex items-center gap-2">
									<Checkbox
										id={`filter-price-${price}`}
										checked={selectedPrices.includes(price)}
										onCheckedChange={() => onPriceToggle(price)}
										className="border-border"
									/>
									<Label
										htmlFor={`filter-price-${price}`}
										className="text-sm font-normal cursor-pointer leading-none"
									>
										{price}
									</Label>
								</div>
							))}
						</div>
					</div>

					<DropdownMenuSeparator />

					{/* Rating */}
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<h5 className="text-sm font-medium">Minimum Rating</h5>
							<span className="text-xs text-muted-foreground">
								{minRating.toFixed(1)} stars
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
					</div>
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
