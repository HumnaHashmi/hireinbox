"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, -apple-system, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{ background: scrolled ? "#fff" : "transparent", boxShadow: scrolled ? "0 1px 0 #E2E8F0" : "none" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold" style={{ color: "#4F46E5" }}>HireInbox</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium" style={{ color: "#475569" }}>Features</a>
            <a href="#pricing" className="text-sm font-medium" style={{ color: "#475569" }}>Pricing</a>
            <Link href="/login" className="text-sm font-medium" style={{ color: "#475569" }}>Sign In</Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background: "#4F46E5" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6 text-center" style={{ background: "#F8FAFC" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold leading-tight mb-4" style={{ color: "#0F172A" }}>
            Send 50 job emails<br />in 5 minutes
          </h1>
          <p className="text-lg mb-8" style={{ color: "#475569" }}>
            Upload your CV, paste HR emails — AI writes personalised emails, you send.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/signup"
              className="px-6 py-3 rounded-lg text-base font-semibold text-white transition-all"
              style={{ background: "#4F46E5" }}
            >
              Start for Free
            </Link>
            <a
              href="#how-it-works"
              className="px-6 py-3 rounded-lg text-base font-semibold border transition-all"
              style={{ color: "#4F46E5", borderColor: "#4F46E5", background: "#fff" }}
            >
              How it works
            </a>
          </div>
          <p className="mt-5 text-sm" style={{ color: "#94A3B8" }}>
            Free forever &nbsp;•&nbsp; No credit card &nbsp;•&nbsp; Works with Gmail
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-6 bg-white" >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>Three steps to 50 applications</h2>
          <p className="mb-16" style={{ color: "#94A3B8" }}>No fuss. No templates. Just results.</p>
          <div className="flex items-start justify-center gap-0 flex-wrap md:flex-nowrap">
            {[
              { n: "01", title: "Upload CV", sub: "PDF parsed automatically" },
              { n: "02", title: "Paste HR emails", sub: "One per line, add JD" },
              { n: "03", title: "AI writes + you send", sub: "Review, edit, send" },
            ].map((step, i) => (
              <div key={step.n} className="flex items-center">
                <div className="flex flex-col items-center px-8">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mb-4"
                    style={{ background: "#EEF2FF", color: "#4F46E5" }}
                  >
                    {step.n}
                  </div>
                  <p className="font-semibold text-base" style={{ color: "#0F172A" }}>{step.title}</p>
                  <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>{step.sub}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block w-16 border-t-2 border-dashed mt-[-24px]" style={{ borderColor: "#E2E8F0" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20 px-6" style={{ background: "#F8FAFC" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>Simple, honest pricing</h2>
          <p className="mb-8" style={{ color: "#94A3B8" }}>Start free. Upgrade when you need more.</p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 mb-10 p-1 rounded-full" style={{ background: "#E2E8F0" }}>
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: billing === b ? "#fff" : "transparent",
                  color: billing === b ? "#0F172A" : "#94A3B8",
                  boxShadow: billing === b ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {b === "monthly" ? "Monthly" : "Yearly  −27%"}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="rounded-2xl border p-8 text-left bg-white" style={{ borderColor: "#E2E8F0" }}>
              <p className="font-bold text-lg mb-1" style={{ color: "#0F172A" }}>Free</p>
              <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>Get started, no cost</p>
              <p className="text-4xl font-bold mb-1" style={{ color: "#0F172A" }}>$0</p>
              <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>forever free</p>
              {["3 emails per day", "Email dashboard", "Edit before send", "Application history"].map((f) => (
                <div key={f} className="flex items-center gap-2 mb-2">
                  <span style={{ color: "#0D9488" }}>✓</span>
                  <span className="text-sm" style={{ color: "#475569" }}>{f}</span>
                </div>
              ))}
              <div className="mt-8 w-full py-3 rounded-lg text-sm font-semibold text-center" style={{ background: "#F8FAFC", color: "#94A3B8", border: "1px solid #E2E8F0" }}>
                Current Plan
              </div>
            </div>

            {/* Pro */}
            <div className="rounded-2xl p-8 text-left relative" style={{ background: "linear-gradient(135deg,#4F46E5,#4338CA)", color: "#fff" }}>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#D97706", color: "#fff" }}>Most Popular</span>
              <p className="font-bold text-lg mb-1">Pro</p>
              <p className="text-sm mb-4 text-white/70">For serious job seekers</p>
              <p className="text-4xl font-bold mb-1">${billing === "yearly" ? "7" : "9"}</p>
              <p className="text-sm mb-6 text-white/70">per month{billing === "yearly" ? ", billed yearly" : ""}</p>
              {["50 emails per day", "Everything in Free", "Priority support", "Unlimited history", "Early features"].map((f) => (
                <div key={f} className="flex items-center gap-2 mb-2">
                  <span className="text-white">✓</span>
                  <span className="text-sm text-white/90">{f}</span>
                </div>
              ))}
              <Link
                href="/signup"
                className="mt-8 w-full py-3 rounded-lg text-sm font-semibold text-center block transition-all hover:opacity-90"
                style={{ background: "#fff", color: "#4F46E5" }}
              >
                Upgrade Now
              </Link>
            </div>
          </div>
          <p className="mt-6 text-sm" style={{ color: "#94A3B8" }}>7-day refund if you are not happy — no questions asked</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 px-6" style={{ background: "#1E2A45" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white">HireInbox</p>
            <p className="text-sm mt-1" style={{ color: "#94A3B8" }}>AI-Powered Job Application Email Platform</p>
          </div>
          <div className="flex gap-6">
            {["Features", "Pricing", "Login", "Sign Up"].map((l) => (
              <a key={l} href="#" className="text-sm" style={{ color: "#94A3B8" }}>{l}</a>
            ))}
          </div>
          <p className="text-sm" style={{ color: "#94A3B8" }}>Made by Humna Hashmi</p>
        </div>
      </footer>
    </div>
  );
}
