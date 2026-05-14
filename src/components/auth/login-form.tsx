"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAuthActions } from "@/hooks/use-auth";
import { ApiClientError } from "@/lib";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const { login } = useAuthActions();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleGoogleLogin() {
    setGoogleLoading(true);
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    setGoogleLoading(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const errs: Record<string, string> = {};
    if (!fd.email) errs.email = "Email is required";
    if (!fd.password) errs.password = "Password is required";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await login({ email: fd.email as string, password: fd.password as string });
    } catch (err) {
      setServerError(err instanceof ApiClientError ? err.message : "Something went wrong. Try again.");
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Google OAuth */}
      <button type="button" onClick={handleGoogleLogin} disabled={googleLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border text-sm font-medium transition-all hover:bg-gray-50 disabled:opacity-60"
        style={{ borderColor: "#E2E8F0", color: "#0F172A" }}>
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/><path fill="#FBBC05" d="M3.964 10.71C3.784 10.17 3.682 9.592 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/></svg>
        {googleLoading ? "Redirecting…" : "Continue with Google"}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
        <span className="text-xs" style={{ color: "#94A3B8" }}>or</span>
        <div className="flex-1 h-px" style={{ background: "#E2E8F0" }} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" style={{ color: "#475569" }}>Email</label>
        <input name="email" type="email" placeholder="you@example.com" autoComplete="email"
          className="w-full px-3 py-2.5 text-sm rounded-lg border transition-all"
          style={{ borderColor: errors.email ? "#E11D48" : "#E2E8F0", outline: "none" }} />
        {errors.email && <p className="text-xs" style={{ color: "#E11D48" }}>{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" style={{ color: "#475569" }}>Password</label>
        <div className="relative">
          <input name="password" type={showPass ? "text" : "password"} placeholder="••••••••" autoComplete="current-password"
            className="w-full px-3 py-2.5 pr-10 text-sm rounded-lg border transition-all"
            style={{ borderColor: errors.password ? "#E11D48" : "#E2E8F0", outline: "none" }} />
          <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }}>
            {showPass ? <EyeOff /> : <Eye />}
          </button>
        </div>
        {errors.password && <p className="text-xs" style={{ color: "#E11D48" }}>{errors.password}</p>}
      </div>

      {serverError && (
        <p className="text-sm px-3 py-2 rounded-lg" style={{ background: "#FFF1F2", color: "#E11D48" }}>{serverError}</p>
      )}

      <button type="submit" disabled={loading}
        className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60"
        style={{ background: "#4F46E5" }}>
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-sm" style={{ color: "#94A3B8" }}>
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold" style={{ color: "#4F46E5" }}>Sign up</Link>
      </p>
    </form>
  );
}

function Eye() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>;
}
function EyeOff() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>;
}
