import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth";

export const metadata: Metadata = { title: "Create account" };

export default function SignupPage() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-1" style={{ color: "#0F172A" }}>Create your account</h2>
      <p className="text-sm mb-8" style={{ color: "#94A3B8" }}>Start hiring smarter today</p>
      <RegisterForm />
    </>
  );
}
