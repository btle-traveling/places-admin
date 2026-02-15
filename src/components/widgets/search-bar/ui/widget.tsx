import { Search, X } from "lucide-react";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
}

export function Widget({ value, onChange }: SearchBarProps) {
	return (
		<div className="relative w-full">
			<Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
			<input
				type="text"
				placeholder="Search locations, tags, or anything..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="w-full h-10 rounded-lg border border-border bg-secondary/50 pl-10 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
			/>
			{value && (
				<button
					type="button"
					onClick={() => onChange("")}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
				>
					<X className="h-5 w-5" />
				</button>
			)}
		</div>
	);
}
