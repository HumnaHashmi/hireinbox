import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_MAX_AGE } from "@/config";
import type { Session, User } from "@/types";

export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length < 2) return null;

    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
    if (!payload?.user) return null;

    const expiresAt = payload.expiresAt ?? (payload.exp ? new Date(payload.exp * 1000).toISOString() : null);
    if (!expiresAt || new Date(expiresAt) < new Date()) return null;

    return { user: payload.user, accessToken: token, expiresAt } as Session;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user ?? null;
}

export function createSessionCookie(token: string) {
  return {
    name: AUTH_COOKIE_NAME,
    value: token,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: AUTH_COOKIE_MAX_AGE,
      path: "/",
    },
  };
}

export function clearSessionCookie() {
  return {
    name: AUTH_COOKIE_NAME,
    value: "",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      maxAge: 0,
      path: "/",
    },
  };
}
