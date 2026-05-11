"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useAuthActions } from "@/hooks/use-auth";
import { ApiClientError } from "@/lib";

export function RegisterForm() {
  const { register } = useAuthActions();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    const errs: Record<string, string> = {};
    if (!fd.name || String(fd.name).trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!fd.email) errs.email = "Email is required";
    if (!fd.password || String(fd.password).length < 8) errs.password = "Password must be at least 8 characters";
    if (!fd.role) errs.role = "Please select a role";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    try {
      await register({ name: fd.name as string, email: fd.email as string, password: fd.password as string, role: fd.role as "candidate" | "recruiter" });
    } catch (err) {
      setServerError(err instanceof ApiClientError ? err.message : "Something went wrong. Try again.");
    } finally { setLoading(false); }
  }

  const field = (label: string, name: string, type = "text", placeholder = "") => (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium" style={{ color: "#475569" }}>{label}</label>
      <input name={name} type={type} placeholder={placeholder} autoComplete={name}
        className="w-full px-3 py-2.5 text-sm rounded-lg border transition-all"
        style={{ borderColor: errors[name] ? "#E11D48" : "#E2E8F0", outline: "none" }} />
      {errors[name] && <p className="text-xs" style={{ color: "#E11D48" }}>{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <button type="button" className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border text-sm font-medium" style={{ borderColor: "#E2E8F0", color: "#0F172A" }}>
        <svg width="18" height="18" viewBox="0 0 18 18"><path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/><path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/><path fill="#FBBC05" d="M3.964 10.71C3.784 10.17 3.682 9.592 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z"/><path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/></svg>
        Continue with Google
      </button>
      <div className="flex items-center gap-3"><div className="flex-1 h-px" style={{ background: "#E2E8F0" }} /><span className="text-xs" style={{ color: "#94A3B8" }}>or</span><div className="flex-1 h-px" style={{ background: "#E2E8F0" }} /></div>
      {field("Full name", "name", "text", "Jane Smith")}
      {field("Email", "email", "email", "you@example.com")}
      {field("Password", "password", "password", "••••••••")}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" style={{ color: "#475569" }}>I am a</label>
        <div className="grid grid-cols-2 gap-2">
          {(["candidate", "recruiter"] as const).map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all" style={{ borderColor: "#E2E8F0" }}>
              <input type="radio" name="role" value={r} className="accent-[#4F46E5]" />
              <span className="capitalize" style={{ color: "#475569" }}>{r}</span>
            </label>
          ))}
        </div>
        {errors.role && <p className="text-xs" style={{ color: "#E11D48" }}>{errors.role}</p>}
      </div>
      {serverError && <p className="text-sm px-3 py-2 rounded-lg" style={{ background: "#FFF1F2", color: "#E11D48" }}>{serverError}</p>}
      <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-60" style={{ background: "#4F46E5" }}>
        {loading ? "Creating account…" : "Create account"}
      </button>
      <p className="text-center text-sm" style={{ color: "#94A3B8" }}>
        Already have an account?{" "}
        <Link href="/login" className="font-semibold" style={{ color: "#4F46E5" }}>Sign in</Link>
      </p>
    </form>
  );
}
