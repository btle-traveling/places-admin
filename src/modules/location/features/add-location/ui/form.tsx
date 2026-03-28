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
import { ImageUploader } from "@/modules/location/shared/ui/image-uploader";

export function Form() {
	const navigate = useNavigate();
	const categoryInputRef = useRef<HTMLInputElement>(null);

	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
			images: [] as File[],
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
			const result = await mutationFn({ data: value });
			result.match(
				() => {
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
				(error) => {
					toast.error(error.message ?? "Failed to add location.");
				},
			);
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

						{/* Images */}
						<form.Field
							name="images"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor="images-input">Images</FieldLabel>
										<ImageUploader
											maxFiles={5}
											maxSize={5 * 1024 * 1024}
											accept="image/*"
											multiple
											onFilesChange={(files) => {
												field.handleChange(
													files.map((file) => file.file as File),
												);
											}}
										/>
									</Field>
								);
							}}
						>
						</form.Field>

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
