"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { apiClient } from "@/lib";
import type { LoginCredentials, RegisterCredentials } from "@/types";

/**
 * For auth pages (login / register).
 * No store dependency — just calls the API (which sets the session cookie)
 * then redirects. The dashboard layout reads the cookie server-side on next render.
 */
export function useAuthActions() {
  const router = useRouter();

  async function login(credentials: LoginCredentials) {
    await apiClient.post("/api/auth/login", credentials);
    router.push("/dashboard");
  }

  async function register(credentials: RegisterCredentials) {
    await apiClient.post("/api/auth/register", credentials);
    router.push("/dashboard");
  }

  return { login, register };
}

/**
 * For dashboard components (inside AppShell / AuthProvider).
 * Reads from the store and provides logout.
 */
export function useAuth() {
  const { user, session, isLoading, isAuthenticated, clearUser } = useAuthStore();
  const router = useRouter();

  async function logout() {
    await apiClient.post("/api/auth/logout", {});
    clearUser();
    router.push("/login");
  }

  return { user, session, isLoading, isAuthenticated, logout };
}
