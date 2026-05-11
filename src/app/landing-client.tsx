"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib";

/* ── Inline product mockup ── */
function ProductMockup() {
  const INPUTS = [
    { email: "hr@arabianfal.com",       jdOpen: true  },
    { email: "recruitment@sraco.com.sa", jdOpen: false },
  ];
  const CARDS = [
    { email: "hr@arabianfal.com",        subject: "React Native Developer Application", sent: false },
    { email: "recruitment@sraco.com.sa", subject: "Software Engineer Application",      sent: true  },
  ];

  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14,
      overflow: "hidden", background: "#0F1117",
      maxWidth: 660, margin: "0 auto",
      boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
    }}>
      {/* Browser chrome */}
      <div style={{
        background: "#1a1d27", padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 6,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FC5F57", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />
        <div style={{
          flex: 1, margin: "0 10px",
          background: "rgba(255,255,255,0.05)", borderRadius: 5,
          padding: "4px 10px", fontSize: 11, color: "rgba(255,255,255,0.3)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}>
          app.hireinbox.com/dashboard
        </div>
      </div>

      {/* App content */}
      <div style={{ padding: "18px 22px" }}>
        <div style={{ marginBottom: 18 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9", margin: 0 }}>✦ HireInbox</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>Add HR emails → upload CV → generate → send. Done.</p>
        </div>

        {/* Step 1 */}
        <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#6366F1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>1</div>
            <div style={{ width: 2, flexGrow: 1, background: "rgba(255,255,255,0.06)", marginTop: 4 }} />
          </div>
          <div style={{ flex: 1, paddingBottom: 14 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#F1F5F9", margin: "0 0 8px" }}>Add HR emails + job descriptions</p>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 12px" }}>
              {INPUTS.map((r) => (
                <div key={r.email} style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                  <div style={{ flex: 1, height: 30, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, display: "flex", alignItems: "center", padding: "0 10px" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{r.email}</span>
                  </div>
                  <div style={{ height: 30, padding: "0 10px", background: r.jdOpen ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.05)", border: r.jdOpen ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.08)", borderRadius: 6, display: "flex", alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: r.jdOpen ? "#818CF8" : "rgba(255,255,255,0.35)" }}>{r.jdOpen ? "− JD" : "+ JD"}</span>
                  </div>
                </div>
              ))}
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", margin: "4px 0 0" }}>2 emails added &nbsp;·&nbsp; 1 with JD</p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#8B5CF6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>4</div>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#F1F5F9", margin: "0 0 8px" }}>Read and edit each email</p>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
              {CARDS.map((card) => (
                <div key={card.email} style={{
                  background: card.sent ? "rgba(13,148,136,0.06)" : "rgba(255,255,255,0.03)",
                  border: card.sent ? "1px solid rgba(13,148,136,0.2)" : "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 8, padding: "9px 12px",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#F1F5F9" }}>{card.email}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, padding: "1px 7px", borderRadius: 99, background: card.sent ? "rgba(13,148,136,0.2)" : "rgba(99,102,241,0.15)", color: card.sent ? "#34D399" : "#818CF8" }}>
                        {card.sent ? "Sent ✓" : "Ready"}
                      </span>
                    </div>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{card.subject}</p>
                  </div>
                  {!card.sent && (
                    <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
                      <div style={{ height: 24, padding: "0 9px", background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 5, display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>Edit</span>
                      </div>
                      <div style={{ height: 24, padding: "0 9px", background: "#6366F1", borderRadius: 5, display: "flex", alignItems: "center" }}>
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#fff" }}>Send →</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── FAQ accordion item ── */
function FaqItem({ question, answer, isLast }: { question: string; answer: string; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: isLast ? "none" : "1px solid #F1F5F9" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 16,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 600, color: "#0F172A" }}>{question}</span>
        <span style={{
          flexShrink: 0, width: 24, height: 24, borderRadius: "50%",
          background: open ? "#4F46E5" : "#F1F5F9",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.15s",
        }}>
          <svg width="12" height="12" fill="none" stroke={open ? "#fff" : "#64748B"} strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={open ? "m4.5 15.75 7.5-7.5 7.5 7.5" : "m19.5 8.25-7.5 7.5-7.5-7.5"} />
          </svg>
        </span>
      </button>
      {open && (
        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, paddingBottom: 20, marginTop: -4 }}>
          {answer}
        </p>
      )}
    </div>
  );
}

/* ── Main landing page ── */
export function LandingClient({ userName }: { userName: string | null }) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function handleSignOut() {
    await apiClient.post("/api/auth/logout", {});
    router.push("/login");
  }

  const price = billing === "yearly" ? 7 : 9;
  const isLoggedIn = !!userName;

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, -apple-system, sans-serif" }}>

      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
        style={{ background: scrolled ? "#fff" : "transparent", borderBottom: scrolled ? "1px solid #E2E8F0" : "none" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold" style={{ color: "#4F46E5" }}>HireInbox</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium" style={{ color: "#475569" }}>Features</a>
            <a href="#pricing" className="text-sm font-medium" style={{ color: "#475569" }}>Pricing</a>
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleSignOut}
                  className="text-sm font-medium"
                  style={{ color: "#475569", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  Sign Out
                </button>
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
                  style={{ background: "#4F46E5" }}
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium" style={{ color: "#475569" }}>Sign In</Link>
                <Link href="/signup" className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "#4F46E5" }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 px-6 text-center" style={{ background: "#F8FAFC" }}>
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-sm" style={{ background: "#EEF2FF", color: "#4F46E5", border: "1px solid #C7D2FE" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4F46E5", display: "inline-block" }} />
            Join 0 job seekers already using HireInbox — be one of the first
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-4" style={{ color: "#0F172A" }}>
            Send 50 job emails<br />in 5 minutes
          </h1>
          <p className="text-lg mb-8" style={{ color: "#475569" }}>
            Upload your CV, paste HR emails — AI writes a personalised email for each company. You review, you send.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
            {isLoggedIn ? (
              <Link href="/dashboard" className="px-6 py-3 rounded-lg text-base font-semibold text-white" style={{ background: "#4F46E5" }}>
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link href="/signup" className="px-6 py-3 rounded-lg text-base font-semibold text-white" style={{ background: "#4F46E5" }}>
                  Start for Free
                </Link>
                <a href="#how-it-works" className="px-6 py-3 rounded-lg text-base font-semibold border" style={{ color: "#4F46E5", borderColor: "#4F46E5", background: "#fff" }}>
                  How it works
                </a>
              </>
            )}
          </div>
          <p className="text-sm mb-12" style={{ color: "#94A3B8" }}>
            Free forever &nbsp;•&nbsp; No credit card &nbsp;•&nbsp; Works with Gmail
          </p>

          <ProductMockup />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>Five steps to 50 applications</h2>
          <p className="mb-16" style={{ color: "#94A3B8" }}>One screen. No navigation. No confusion.</p>
          <div className="flex items-start justify-center flex-wrap md:flex-nowrap">
            {[
              { n: "01", title: "Add HR emails",     sub: "One row per company. Paste their HR email and optionally add the job description." },
              { n: "02", title: "Upload your CV",     sub: "Drop your PDF once. Add a portfolio link if you have one." },
              { n: "03", title: "Click Generate",     sub: "Groq AI reads your CV and writes a tailored email for every company." },
              { n: "04", title: "Review & edit",      sub: "Read each email inline. Change anything before it goes out." },
              { n: "05", title: "Click Send — done",  sub: "Email goes from your own Gmail. Badge turns green. That's the whole flow." },
            ].map((step, i) => (
              <div key={step.n} className="flex items-center">
                <div className="flex flex-col items-center px-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold mb-4" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
                    {step.n}
                  </div>
                  <p className="font-semibold text-sm text-center" style={{ color: "#0F172A" }}>{step.title}</p>
                  <p className="text-xs mt-2 max-w-[140px] text-center" style={{ color: "#94A3B8", lineHeight: 1.5 }}>{step.sub}</p>
                </div>
                {i < 4 && <div className="hidden md:block w-8 border-t-2 border-dashed mt-[-48px] flex-shrink-0" style={{ borderColor: "#E2E8F0" }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6" style={{ background: "#F8FAFC" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>Built for speed, not complexity</h2>
            <p style={{ color: "#94A3B8" }}>Every feature on this list exists in the app today.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: <svg width="22" height="22" fill="none" stroke="#4F46E5" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>,
                iconBg: "#EEF2FF",
                title: "Groq AI generation",
                body: "Llama 3 reads your CV and writes a unique email for each company. Not a template — a real personalised pitch.",
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="#0D9488" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>,
                iconBg: "#F0FDFA",
                title: "CV parsing",
                body: "Drop your PDF once. Skills, experience, and projects are extracted automatically and used in every email.",
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="#D97706" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>,
                iconBg: "#FFFBEB",
                title: "Send via Gmail",
                body: "Sent from your own Gmail account — not a bulk-mail server. Lands in inboxes, not spam.",
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="#8B5CF6" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12v-2.25m-4.5 2.25v-4.5M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
                iconBg: "#F5F3FF",
                title: "Job description matching",
                body: "Add a JD per company. The AI matches your experience to what they specifically asked for — more callbacks.",
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="#4F46E5" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" /></svg>,
                iconBg: "#EEF2FF",
                title: "Edit before send",
                body: "Every email is editable inline. Change the subject, rewrite the body, then send. No modals, no separate pages.",
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="#22C55E" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" /></svg>,
                iconBg: "#F0FDF4",
                title: "One screen, zero confusion",
                body: "Everything happens on a single page. No campaigns, no sidebar, no navigation. Land → fill → generate → send.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6" style={{ border: "0.5px solid #E2E8F0" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: f.iconBg, border: "0.5px solid #E2E8F0" }}>
                  {f.icon}
                </div>
                <p className="font-semibold text-base mb-2" style={{ color: "#0F172A" }}>{f.title}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>Simple, honest pricing</h2>
          <p className="mb-8" style={{ color: "#94A3B8" }}>Start free. Upgrade when you need more.</p>

          <div className="inline-flex items-center mb-10 p-1 rounded-full" style={{ background: "#F1F5F9" }}>
            {(["monthly", "yearly"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2"
                style={{ background: billing === b ? "#fff" : "transparent", color: billing === b ? "#0F172A" : "#94A3B8" }}
              >
                {b === "monthly" ? "Monthly" : (
                  <>Yearly <span className="text-xs px-1.5 py-0.5 rounded font-bold" style={{ background: "#D97706", color: "#fff" }}>−22%</span></>
                )}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="rounded-2xl p-8 bg-white" style={{ border: "1px solid #E2E8F0" }}>
              <p className="font-bold text-lg mb-1" style={{ color: "#0F172A" }}>Free</p>
              <p className="text-sm mb-4" style={{ color: "#94A3B8" }}>Get started, no cost</p>
              <p className="text-4xl font-bold mb-1" style={{ color: "#0F172A" }}>$0</p>
              <p className="text-sm mb-6" style={{ color: "#94A3B8" }}>forever free</p>
              {["3 emails per day", "Edit before send", "Send via Gmail", "Groq AI generation"].map((f) => (
                <div key={f} className="flex items-center gap-2 mb-2">
                  <span style={{ color: "#0D9488" }}>✓</span>
                  <span className="text-sm" style={{ color: "#475569" }}>{f}</span>
                </div>
              ))}
              <Link href="/signup" className="mt-8 w-full py-3 rounded-lg text-sm font-semibold text-center block" style={{ background: "#F8FAFC", color: "#4F46E5", border: "1px solid #E2E8F0" }}>
                Get started free
              </Link>
            </div>

            <div className="rounded-2xl p-8 relative" style={{ background: "linear-gradient(135deg, #4F46E5, #4338CA)", color: "#fff" }}>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold" style={{ background: "#D97706" }}>Most Popular</span>
              <p className="font-bold text-lg mb-1">Pro</p>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>For serious job seekers</p>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-bold">${price}</span>
                <span className="text-sm mb-1.5" style={{ color: "rgba(255,255,255,0.7)" }}>/month</span>
              </div>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
                {billing === "yearly" ? "Billed $84/year — save $24" : "Billed monthly, cancel anytime"}
              </p>
              {["50 emails per day", "Everything in Free", "Priority support", "Unlimited history", "Early features"].map((f) => (
                <div key={f} className="flex items-center gap-2 mb-2">
                  <span>✓</span>
                  <span className="text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{f}</span>
                </div>
              ))}
              <Link href="/signup" className="mt-8 w-full py-3 rounded-lg text-sm font-semibold text-center block" style={{ background: "#fff", color: "#4F46E5" }}>
                Upgrade to Pro
              </Link>
            </div>
          </div>
          <p className="mt-6 text-sm" style={{ color: "#94A3B8" }}>7-day refund if you are not happy — no questions asked</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>Common questions</h2>
            <p style={{ color: "#94A3B8" }}>Answers before you have to ask.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              {
                q: "Does it really send emails?",
                a: "Yes — emails go out from your own Gmail account via Gmail's API. They're not sent from a bulk-mail server, so they land in real inboxes and look like you wrote them personally. You review every email before it sends, and nothing goes out without your click.",
              },
              {
                q: "Is my CV data safe?",
                a: "Your CV text is stored in your account only and is never shared, sold, or used to train AI models. It's only passed to the AI at the moment of email generation, and only to write your email. You can delete it from your profile at any time.",
              },
              {
                q: "What if I hit the free limit?",
                a: "The free plan includes 3 emails per day, which resets at midnight UTC. If you need more, you can upgrade to Pro for $7/month (billed yearly at $84) or $9/month on the monthly plan and get 50 emails per day. You can also wait for the reset — there's no pressure.",
              },
            ].map((item, i, arr) => (
              <FaqItem key={item.q} question={item.q} answer={item.a} isLast={i === arr.length - 1} />
            ))}
          </div>
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
            <a href="#how-it-works" className="text-sm" style={{ color: "#94A3B8" }}>Features</a>
            <a href="#pricing" className="text-sm" style={{ color: "#94A3B8" }}>Pricing</a>
            <Link href="/login" className="text-sm" style={{ color: "#94A3B8" }}>Sign In</Link>
            <Link href="/signup" className="text-sm" style={{ color: "#94A3B8" }}>Sign Up</Link>
          </div>
          <p className="text-sm" style={{ color: "#94A3B8" }}>Made by Humna Hashmi</p>
        </div>
      </footer>
    </div>
  );
}
