import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createOrUpdateSessionFn } from "@/lib/session";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { type SubmitEvent, useRef, useState } from "react";
import { mutationFn } from "../api/mutation";
import { toast } from "sonner";
import { Loader2, LogIn } from "lucide-react";

export function Form({ className, ...props }: React.ComponentProps<"div">) {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const usernameInputRef = useRef<HTMLInputElement>(null);
	const passwordInputRef = useRef<HTMLInputElement>(null);

	async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!usernameInputRef.current || !passwordInputRef.current) return;

		setIsLoading(true);

		const payload = {
			username: usernameInputRef.current.value,
			password: passwordInputRef.current.value,
		};

		const response = await mutationFn({
			data: payload,
		});
		if (response.success === false) {
			setIsLoading(false);
			toast.error(response.error);
			return;
		}
		await createOrUpdateSessionFn({
			data: {
				accessToken: response.data.access_token,
				email: response.data.user.email,
				userId: response.data.user.id,
			},
		});
		setIsLoading(false);
		toast.success("Successfully logged in!");
		navigate({
			to: "/",
		});
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>
						Enter your credentials below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="username">Username</FieldLabel>
								<Input
									id="username"
									type="email"
									placeholder="m@example.com"
									ref={usernameInputRef}
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="password">Password</FieldLabel>
								<Input
									id="password"
									type="password"
									ref={passwordInputRef}
									required
								/>
							</Field>
							<Field>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? (
										<>
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
											Please wait
										</>
									) : (
										<>
											<LogIn className="mr-2 h-4 w-4" />
											Login
										</>
									)}
								</Button>
							</Field>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
