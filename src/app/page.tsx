"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Inline product mockup ── */
function ProductMockup() {
  const CARDS = [
    { email: "hr@google.com",      subject: "Software Engineer — React & TypeScript", status: "Ready",      color: "#4F46E5", bg: "#EEF2FF", strip: "#4F46E5" },
    { email: "recruit@stripe.com", subject: "Frontend Engineer Application",          status: "Sent",       color: "#0D9488", bg: "#F0FDFA", strip: "#0D9488" },
    { email: "jobs@openai.com",    subject: "ML Product Role Application",            status: "Generating", color: "#D97706", bg: "#FFFBEB", strip: "#D97706" },
  ];

  return (
    <div style={{
      border: "1px solid #E2E8F0", borderRadius: 14,
      overflow: "hidden", background: "#F8FAFC",
      maxWidth: 660, margin: "0 auto",
    }}>
      {/* Browser chrome */}
      <div style={{
        background: "#F1F5F9", padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 6,
        borderBottom: "1px solid #E2E8F0",
      }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FC5F57", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840", flexShrink: 0 }} />
        <div style={{
          flex: 1, margin: "0 10px",
          background: "#FFFFFF", borderRadius: 5,
          padding: "4px 10px", fontSize: 11, color: "#94A3B8",
          border: "1px solid #E2E8F0",
        }}>
          app.hireinbox.com/dashboard/campaign/1
        </div>
      </div>

      {/* App content */}
      <div style={{ padding: "16px 20px" }}>
        {/* Campaign header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>May Applications 2025</p>
            <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>3 emails · Created May 10</p>
          </div>
          <div style={{
            background: "#4F46E5", color: "#fff",
            fontSize: 11, fontWeight: 600, borderRadius: 6,
            padding: "5px 12px", display: "flex", alignItems: "center", gap: 4,
          }}>
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>
            Send all ready (1)
          </div>
        </div>

        {/* Progress */}
        <div style={{
          background: "#FFFFFF", border: "0.5px solid #E2E8F0",
          borderRadius: 8, padding: "10px 14px", marginBottom: 10,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#0F172A" }}>1 / 3 sent</span>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>33%</span>
          </div>
          <div style={{ height: 4, background: "#F1F5F9", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ width: "33%", height: "100%", background: "#4F46E5", borderRadius: 2 }} />
          </div>
        </div>

        {/* Email cards */}
        {CARDS.map((c) => (
          <div key={c.email} style={{
            display: "flex", background: "#FFFFFF",
            border: "0.5px solid #E2E8F0", borderRadius: 8,
            overflow: "hidden", marginBottom: 6,
          }}>
            <div style={{ width: 3, background: c.strip, flexShrink: 0 }} />
            <div style={{ flex: 1, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#0F172A" }}>{c.email}</p>
                <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.subject}</p>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 500,
                background: c.bg, color: c.color,
                borderRadius: 99, padding: "2px 8px",
                whiteSpace: "nowrap", flexShrink: 0,
              }}>
                {c.status}
              </span>
            </div>
          </div>
        ))}
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

export default function LandingPage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const price = billing === "yearly" ? 7 : 9;

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
            <a href="#features" className="text-sm font-medium" style={{ color: "#475569" }}>Features</a>
            <a href="#pricing" className="text-sm font-medium" style={{ color: "#475569" }}>Pricing</a>
            <Link href="/login" className="text-sm font-medium" style={{ color: "#475569" }}>Sign In</Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "#4F46E5" }}>
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-16 px-6 text-center" style={{ background: "#F8FAFC" }}>
        <div className="max-w-3xl mx-auto">
          {/* Social proof pill */}
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
            <Link href="/signup" className="px-6 py-3 rounded-lg text-base font-semibold text-white" style={{ background: "#4F46E5" }}>
              Start for Free
            </Link>
            <a href="#how-it-works" className="px-6 py-3 rounded-lg text-base font-semibold border" style={{ color: "#4F46E5", borderColor: "#4F46E5", background: "#fff" }}>
              How it works
            </a>
          </div>
          <p className="text-sm mb-12" style={{ color: "#94A3B8" }}>
            Free forever &nbsp;•&nbsp; No credit card &nbsp;•&nbsp; Works with Gmail
          </p>

          {/* Product mockup */}
          <ProductMockup />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>Three steps to 50 applications</h2>
          <p className="mb-16" style={{ color: "#94A3B8" }}>No fuss. No templates. Just results.</p>
          <div className="flex items-start justify-center flex-wrap md:flex-nowrap">
            {[
              { n: "01", title: "Upload your CV",         sub: "PDF parsed automatically. Done once." },
              { n: "02", title: "Paste HR emails",         sub: "One per line. Add a job description to personalise further." },
              { n: "03", title: "AI writes, you send",     sub: "Review each email, edit if needed, send with one click." },
            ].map((step, i) => (
              <div key={step.n} className="flex items-center">
                <div className="flex flex-col items-center px-8">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold mb-4" style={{ background: "#EEF2FF", color: "#4F46E5" }}>
                    {step.n}
                  </div>
                  <p className="font-semibold text-base" style={{ color: "#0F172A" }}>{step.title}</p>
                  <p className="text-sm mt-2 max-w-[180px]" style={{ color: "#94A3B8", lineHeight: 1.5 }}>{step.sub}</p>
                </div>
                {i < 2 && <div className="hidden md:block w-16 border-t-2 border-dashed mt-[-40px]" style={{ borderColor: "#E2E8F0" }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 px-6" style={{ background: "#F8FAFC" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2" style={{ color: "#0F172A" }}>Everything you need to apply faster</h2>
            <p style={{ color: "#94A3B8" }}>Built specifically for job seekers, not recruiters.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: <svg width="22" height="22" fill="none" stroke="#4F46E5" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>,
                title: "AI-personalised emails",
                body: "Groq AI reads your CV and the job description to write a unique, tailored email for each company — not a template.",
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="#0D9488" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>,
                title: "One-click CV parsing",
                body: "Upload your PDF once. The AI extracts your skills, experience, and projects automatically — no re-entering data.",
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="#D97706" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>,
                title: "Send via your Gmail",
                body: "Emails go out from your own Gmail account — not a bulk-mail service. They land in inboxes, not spam folders.",
              },
              {
                icon: <svg width="22" height="22" fill="none" stroke="#4F46E5" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" /></svg>,
                title: "Full application history",
                body: "Every campaign, every email, every status in one place. Know exactly who you've applied to and what was sent.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6" style={{ border: "0.5px solid #E2E8F0" }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: "#F8FAFC", border: "0.5px solid #E2E8F0" }}>
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

          {/* Toggle */}
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
            {/* Free */}
            <div className="rounded-2xl p-8 bg-white" style={{ border: "1px solid #E2E8F0" }}>
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
              <Link href="/signup" className="mt-8 w-full py-3 rounded-lg text-sm font-semibold text-center block" style={{ background: "#F8FAFC", color: "#4F46E5", border: "1px solid #E2E8F0" }}>
                Get started free
              </Link>
            </div>

            {/* Pro */}
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
                a: "The free plan includes 3 emails per day, which resets at midnight UTC. If you need more, you can upgrade to Pro for $9/month (or $7/month billed yearly) and get 50 emails per day. You can also wait for the reset — there's no pressure.",
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
            <a href="#features"  className="text-sm" style={{ color: "#94A3B8" }}>Features</a>
            <a href="#pricing"   className="text-sm" style={{ color: "#94A3B8" }}>Pricing</a>
            <Link href="/login"  className="text-sm" style={{ color: "#94A3B8" }}>Sign In</Link>
            <Link href="/signup" className="text-sm" style={{ color: "#94A3B8" }}>Sign Up</Link>
          </div>
          <p className="text-sm" style={{ color: "#94A3B8" }}>Made by Humna Hashmi</p>
        </div>
      </footer>
    </div>
  );
}
