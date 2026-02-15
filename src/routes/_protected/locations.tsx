import { createFileRoute } from "@tanstack/react-router";

import { useState, useMemo } from "react";
import { SearchBarWidget } from "@/components/widgets/search-bar";
import { LocationCardWidget } from "@/components/widgets/location-card";
import { Places } from "@/entities/place";
import { SidebarFilterWidget } from "@/components/widgets/sidebar-filter";

export const Route = createFileRoute("/_protected/locations")({
	component: RouteComponent,
});

const LOCATIONS: Places[] = [
	{
		id: "1",
		name: "Mountain Peak Retreat",
		category: "Hiking",
		rating: 4.8,
		reviews: 342,
		image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		price: "$$",
		distance: "12 km",
		tags: ["Scenic", "Adventure", "Nature"],
	},
	{
		id: "2",
		name: "Urban Art Gallery",
		category: "Culture",
		rating: 4.6,
		reviews: 218,
		image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
		price: "$",
		distance: "2 km",
		tags: ["Art", "Culture", "Urban"],
	},
	{
		id: "3",
		name: "Coastal Beach Paradise",
		category: "Beach",
		rating: 4.9,
		reviews: 521,
		image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
		price: "$$$",
		distance: "45 km",
		tags: ["Beach", "Relaxation", "Water"],
	},
	{
		id: "4",
		name: "Historic Old Town",
		category: "Heritage",
		rating: 4.5,
		reviews: 289,
		image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
		price: "$",
		distance: "8 km",
		tags: ["Historical", "Architecture", "Walking"],
	},
	{
		id: "5",
		name: "Forest Camping Site",
		category: "Camping",
		rating: 4.7,
		reviews: 156,
		image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
		price: "$$",
		distance: "35 km",
		tags: ["Camping", "Nature", "Wildlife"],
	},
	{
		id: "6",
		name: "Modern Shopping District",
		category: "Shopping",
		rating: 4.4,
		reviews: 412,
		image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
		price: "$$",
		distance: "5 km",
		tags: ["Shopping", "Dining", "Entertainment"],
	},
	{
		id: "7",
		name: "Botanical Garden Oasis",
		category: "Parks",
		rating: 4.8,
		reviews: 267,
		image: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
		price: "$",
		distance: "3 km",
		tags: ["Gardens", "Peaceful", "Photography"],
	},
	{
		id: "8",
		name: "Adventure Sports Complex",
		category: "Sports",
		rating: 4.6,
		reviews: 134,
		image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
		price: "$$$",
		distance: "20 km",
		tags: ["Sports", "Adrenaline", "Activity"],
	},
	{
		id: "9",
		name: "Culinary Food Market",
		category: "Food",
		rating: 4.7,
		reviews: 445,
		image: "linear-gradient(135deg, #f5576c 0%, #f093fb 100%)",
		price: "$$",
		distance: "4 km",
		tags: ["Food", "Local", "Market"],
	},
	{
		id: "10",
		name: "Wellness Spa Resort",
		category: "Wellness",
		rating: 4.9,
		reviews: 298,
		image: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
		price: "$$$",
		distance: "15 km",
		tags: ["Relaxation", "Spa", "Wellness"],
	},
	{
		id: "11",
		name: "Tech Innovation Hub",
		category: "Business",
		rating: 4.5,
		reviews: 87,
		image: "linear-gradient(135deg, #fee140 0%, #fa709a 100%)",
		price: "$$",
		distance: "6 km",
		tags: ["Technology", "Innovation", "Startup"],
	},
	{
		id: "12",
		name: "Night Market Entertainment",
		category: "Entertainment",
		rating: 4.6,
		reviews: 356,
		image: "linear-gradient(135deg, #330867 0%, #30cfd0 100%)",
		price: "$$",
		distance: "7 km",
		tags: ["Entertainment", "Nightlife", "Fun"],
	},
];

const CATEGORIES = [
	"Hiking",
	"Culture",
	"Beach",
	"Heritage",
	"Camping",
	"Shopping",
	"Parks",
	"Sports",
	"Food",
	"Wellness",
	"Business",
	"Entertainment",
];
const PRICE_RANGES = ["$", "$$", "$$$"];

function RouteComponent() {
	const [search, setSearch] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
	const [minRating, setMinRating] = useState(0);

	const filteredLocations = useMemo(() => {
		return LOCATIONS.filter((location) => {
			const matchesSearch =
				location.name.toLowerCase().includes(search.toLowerCase()) ||
				location.tags.some((tag) =>
					tag.toLowerCase().includes(search.toLowerCase()),
				);

			const matchesCategory =
				selectedCategories.length === 0 ||
				selectedCategories.includes(location.category);

			const matchesPrice =
				selectedPrices.length === 0 || selectedPrices.includes(location.price);

			const matchesRating = location.rating >= minRating;

			return matchesSearch && matchesCategory && matchesPrice && matchesRating;
		});
	}, [search, selectedCategories, selectedPrices, minRating]);

	const toggleCategory = (category: string) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((c) => c !== category)
				: [...prev, category],
		);
	};

	const togglePrice = (price: string) => {
		setSelectedPrices((prev) =>
			prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price],
		);
	};

	const clearFilters = () => {
		setSearch("");
		setSelectedCategories([]);
		setSelectedPrices([]);
		setMinRating(0);
	};

	return (
		<div className="min-h-screen bg-background text-foreground">
			{/* Header */}
			<header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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
						<SearchBarWidget value={search} onChange={setSearch} />
					</div>
				</div>
			</header>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				<div className="grid gap-8 lg:grid-cols-4">
					{/* Sidebar */}
					<div className="lg:col-span-1">
						<SidebarFilterWidget
							categories={CATEGORIES}
							selectedCategories={selectedCategories}
							onCategoryToggle={toggleCategory}
							priceRanges={PRICE_RANGES}
							selectedPrices={selectedPrices}
							onPriceToggle={togglePrice}
							minRating={minRating}
							onRatingChange={setMinRating}
							onClearFilters={clearFilters}
							activeFiltersCount={
								selectedCategories.length +
								selectedPrices.length +
								(minRating > 0 ? 1 : 0)
							}
						/>
					</div>

					{/* Main Content */}
					<div className="lg:col-span-3">
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
							<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
								{filteredLocations.map((location) => (
									<LocationCardWidget key={location.id} location={location} />
								))}
							</div>
						) : (
							<div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card/50 py-16">
								<div className="mb-4 text-4xl">🔍</div>
								<h3 className="mb-2 text-lg font-semibold">
									No locations found
								</h3>
								<p className="mb-6 text-center text-sm text-muted-foreground max-w-xs">
									Try adjusting your filters or search terms to find what you
									are looking for
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
			</div>
		</div>
	);
}
