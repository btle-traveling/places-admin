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
import { signInFn } from "@/lib/auth";
import { createOrUpdateSessionFn } from "@/lib/session";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { type SubmitEvent, useRef } from "react";

export function Form({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!usernameInputRef.current || !passwordInputRef.current) return;

    const payload = {
      username: usernameInputRef.current.value,
      password: passwordInputRef.current.value,
    };

    const response = await signInFn({
      data: payload,
    });
    await createOrUpdateSessionFn({
      data: response.data,
    });
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
                <Button type="submit">Login</Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
