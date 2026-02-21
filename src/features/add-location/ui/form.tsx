import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, MapPin, Plus, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { mutationFn } from "../api/mutation";
import { schema } from "../model/schema";

export function Form() {
	const navigate = useNavigate();
	const categoryInputRef = useRef<HTMLInputElement>(null);

	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			image_url: "",
			latitude: undefined as number | undefined,
			longitude: undefined as number | undefined,
			google_maps_url: "",
			yandex_maps_url: "",
			apple_maps_url: "",
			category_ids: [] as string[],
		},
		validators: {
			onSubmit: schema,
		},
		onSubmit: async ({ value }) => {
			const response = await mutationFn({ data: value });
			if (response.success === false) {
				toast.error(response.error ?? "Failed to add location.");
				return;
			}
			toast.success("Location added successfully!");
			navigate({
				to: "/locations",
				search: {
					categories: [],
					minRating: 0,
					prices: [],
					search: "",
				},
			});
		},
	});

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<MapPin className="h-5 w-5" />
					Add New Location
				</CardTitle>
				<CardDescription>
					Fill in the details below to add a new location to the directory.
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					id="add-location-form"
					onSubmit={(e) => {
						e.preventDefault();
						form.handleSubmit();
					}}
				>
					<FieldGroup>
						{/* Name */}
						<form.Field
							name="name"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Name</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="Amir Timur Square"
											autoComplete="off"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Description */}
						<form.Field
							name="description"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Description</FieldLabel>
										<Textarea
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="A brief description of the location..."
											rows={4}
											className="resize-none"
										/>
										<FieldDescription>
											Provide a meaningful description (minimum 10 characters).
										</FieldDescription>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Image URL */}
						<form.Field
							name="image_url"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											type="url"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="https://example.com/image.jpg"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Coordinates row */}
						<div className="grid grid-cols-2 gap-4">
							<form.Field
								name="latitude"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>
												Latitude{" "}
												<span className="text-muted-foreground font-normal">
													(optional)
												</span>
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="number"
												step="any"
												value={field.state.value ?? ""}
												onBlur={field.handleBlur}
												onChange={(e) =>
													field.handleChange(
														e.target.value === ""
															? undefined
															: parseFloat(e.target.value),
													)
												}
												aria-invalid={isInvalid}
												placeholder="41.2995"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>

							<form.Field
								name="longitude"
								children={(field) => {
									const isInvalid =
										field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>
												Longitude{" "}
												<span className="text-muted-foreground font-normal">
													(optional)
												</span>
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												type="number"
												step="any"
												value={field.state.value ?? ""}
												onBlur={field.handleBlur}
												onChange={(e) =>
													field.handleChange(
														e.target.value === ""
															? undefined
															: parseFloat(e.target.value),
													)
												}
												aria-invalid={isInvalid}
												placeholder="69.2401"
											/>
											{isInvalid && (
												<FieldError errors={field.state.meta.errors} />
											)}
										</Field>
									);
								}}
							/>
						</div>

						{/* Google Maps URL */}
						<form.Field
							name="google_maps_url"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Google Maps URL
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											type="url"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="https://maps.google.com/..."
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Yandex Maps URL */}
						<form.Field
							name="yandex_maps_url"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Yandex Maps URL
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											type="url"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="https://yandex.com/maps/..."
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Apple Maps URL */}
						<form.Field
							name="apple_maps_url"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Apple Maps URL</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											type="url"
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											placeholder="https://maps.apple.com/..."
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>

						{/* Category IDs — tag input */}
						<form.Field
							name="category_ids"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;

								function addCategory() {
									const input = categoryInputRef.current;
									if (!input) return;
									const value = input.value.trim();
									if (!value) return;
									if (field.state.value.includes(value)) {
										input.value = "";
										return;
									}
									field.handleChange([...field.state.value, value]);
									input.value = "";
								}

								function removeCategory(id: string) {
									field.handleChange(field.state.value.filter((c) => c !== id));
								}

								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor="category-input">
											Category IDs
										</FieldLabel>

										{/* Tag chips */}
										{field.state.value.length > 0 && (
											<div className="flex flex-wrap gap-2">
												{field.state.value.map((id) => (
													<span
														key={id}
														className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-secondary-foreground"
													>
														{id}
														<button
															type="button"
															onClick={() => removeCategory(id)}
															className="text-muted-foreground hover:text-foreground transition-colors"
															aria-label={`Remove category ${id}`}
														>
															<X className="h-3 w-3" />
														</button>
													</span>
												))}
											</div>
										)}

										<div className="flex gap-2">
											<Input
												id="category-input"
												ref={categoryInputRef}
												placeholder="Enter a category ID"
												autoComplete="off"
												onBlur={field.handleBlur}
												onKeyDown={(e) => {
													if (e.key === "Enter") {
														e.preventDefault();
														addCategory();
													}
												}}
											/>
											<Button
												type="button"
												variant="outline"
												size="icon"
												onClick={addCategory}
												aria-label="Add category"
											>
												<Plus className="h-4 w-4" />
											</Button>
										</div>

										<FieldDescription>
											Type a category ID and press{" "}
											<kbd className="rounded border bg-muted px-1 py-0.5 text-xs font-mono">
												Enter
											</kbd>{" "}
											or click <span className="font-medium">+</span> to add. At
											least one category is required.
										</FieldDescription>

										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
				</form>
			</CardContent>

			<CardFooter className="flex justify-end gap-3">
				<Button
					type="button"
					variant="outline"
					onClick={() => {
						form.reset();
						if (categoryInputRef.current) {
							categoryInputRef.current.value = "";
						}
					}}
				>
					Reset
				</Button>

				<form.Subscribe
					selector={(state) => [state.isSubmitting]}
					children={([isSubmitting]) => (
						<Button
							type="submit"
							form="add-location-form"
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Saving...
								</>
							) : (
								<>
									<MapPin className="mr-2 h-4 w-4" />
									Add Location
								</>
							)}
						</Button>
					)}
				/>
			</CardFooter>
		</Card>
	);
}
