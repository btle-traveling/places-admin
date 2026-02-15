import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useMemo } from "react";
import { SearchBarWidget } from "@/components/widgets/search-bar";
import { LocationCardWidget } from "@/components/widgets/location-card";
import { FilterDropdownWidget } from "@/components/widgets/filter-dropdown";
import { LOCATIONS, CATEGORIES, PRICE_RANGES } from "@/data/locations";

const locationSearchSchema = z.object({
	search: z.string().optional().default(""),
	categories: z.array(z.string()).optional().default([]),
	prices: z.array(z.string()).optional().default([]),
	minRating: z.number().optional().default(0),
});

export const Route = createFileRoute("/_protected/locations")({
	component: RouteComponent,
	validateSearch: (search) => locationSearchSchema.parse(search),
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const { search, categories, prices, minRating } = Route.useSearch();

	const setSearch = (value: string) => {
		navigate({
			search: (prev) => ({ ...prev, search: value }),
		});
	};

	const setMinRating = (value: number) => {
		navigate({
			search: (prev) => ({ ...prev, minRating: value }),
		});
	};

	const filteredLocations = useMemo(() => {
		return LOCATIONS.filter((location) => {
			const matchesSearch =
				location.name.toLowerCase().includes(search.toLowerCase()) ||
				location.tags.some((tag) =>
					tag.toLowerCase().includes(search.toLowerCase()),
				);

			const matchesCategory =
				categories.length === 0 || categories.includes(location.category);

			const matchesPrice =
				prices.length === 0 || prices.includes(location.price);

			const matchesRating = location.rating >= (minRating ?? 0);

			return matchesSearch && matchesCategory && matchesPrice && matchesRating;
		});
	}, [search, categories, prices, minRating]);

	const toggleCategory = (category: string) => {
		navigate({
			search: (prev) => {
				const current = prev.categories || [];
				const next = current.includes(category)
					? current.filter((c) => c !== category)
					: [...current, category];
				return { ...prev, categories: next };
			},
		});
	};

	const togglePrice = (price: string) => {
		navigate({
			search: (prev) => {
				const current = prev.prices || [];
				const next = current.includes(price)
					? current.filter((p) => p !== price)
					: [...current, price];
				return { ...prev, prices: next };
			},
		});
	};

	const clearFilters = () => {
		navigate({
			search: {
				search: "",
				categories: [],
				prices: [],
				minRating: 0,
			},
		});
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Header */}
			<header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
				<div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
					<div className="space-y-4">
						<div>
							<h1 className="text-3xl font-bold text-balance">
								Explore Locations
							</h1>
							<p className="text-sm text-muted-foreground">
								Discover amazing places personalized just for you
							</p>
						</div>
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
							<div className="flex-1">
								<SearchBarWidget value={search} onChange={setSearch} />
							</div>
							<FilterDropdownWidget
								categories={CATEGORIES}
								selectedCategories={categories}
								onCategoryToggle={toggleCategory}
								priceRanges={PRICE_RANGES}
								selectedPrices={prices}
								onPriceToggle={togglePrice}
								minRating={minRating}
								onRatingChange={setMinRating}
								onClearFilters={clearFilters}
								activeFiltersCount={
									categories.length + prices.length + (minRating > 0 ? 1 : 0)
								}
							/>
						</div>
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="mb-6 flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						Showing{" "}
						<span className="font-semibold text-foreground">
							{filteredLocations.length}
						</span>{" "}
						locations
					</p>
				</div>

				{filteredLocations.length > 0 ? (
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{filteredLocations.map((location) => (
							<LocationCardWidget key={location.id} location={location} />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card/50 py-16">
						<div className="mb-4 text-4xl">🔍</div>
						<h3 className="mb-2 text-lg font-semibold">No locations found</h3>
						<p className="mb-6 text-center text-sm text-muted-foreground max-w-xs">
							Try adjusting your filters or search terms to find what you are
							looking for
						</p>
						<button
							onClick={clearFilters}
							type="button"
							className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
						>
							Clear Filters
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
