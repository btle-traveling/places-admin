import { SessionPayload } from "@/types/session";
import { useSession } from "@tanstack/react-start/server";

export function useAppSession() {
  return useSession<SessionPayload>({
    // Session configuration
    name: "sky-search-web-app-session",
    password: process.env.SESSION_SECRET!, // At least 32 characters
    // Optional: customize cookie settings
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60, // 1 days
    },
  });
}
