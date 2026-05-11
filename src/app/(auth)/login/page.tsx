import type { Metadata } from "next";
import { LoginForm } from "@/components/auth";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-1" style={{ color: "#0F172A" }}>Welcome back</h2>
      <p className="text-sm mb-8" style={{ color: "#94A3B8" }}>Sign in to your account</p>
      <LoginForm />
    </>
  );
}
