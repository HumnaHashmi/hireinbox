"use client";

import { useState } from "react";

function CheckIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>;
}
function ZapIcon() {
  return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>;
}

const FREE_FEATURES = [
  "3 emails per day",
  "Unlimited campaigns",
  "AI-generated emails",
  "Basic personalisation",
];

const PRO_FEATURES = [
  "50 emails per day",
  "Unlimited campaigns",
  "Advanced AI personalisation",
  "Job description matching",
  "Priority email delivery",
  "Email tracking & open rates",
  "Priority support",
];

export default function UpgradePage() {
  const [yearly,  setYearly]  = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUpgrade() {
    setLoading(true);
    try {
      const res  = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ billing: yearly ? "yearly" : "monthly" }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "36px 40px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>
            Choose your plan
          </h1>
          <p style={{ fontSize: 14, color: "#475569", marginTop: 8, maxWidth: 400, margin: "8px auto 0" }}>
            Upgrade to send more emails and land more interviews.
          </p>

          {/* Monthly / Yearly toggle */}
          <div style={{
            display: "inline-flex", gap: 2, padding: 4,
            background: "#F1F5F9", borderRadius: 10,
            marginTop: 24,
          }}>
            <button
              onClick={() => setYearly(false)}
              style={{
                padding: "7px 20px",
                borderRadius: 7,
                fontSize: 13, fontWeight: 500,
                border: "none", cursor: "pointer",
                background: !yearly ? "#FFFFFF" : "transparent",
                color: !yearly ? "#0F172A" : "#64748B",
                transition: "all 0.12s",
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 20px",
                borderRadius: 7,
                fontSize: 13, fontWeight: 500,
                border: "none", cursor: "pointer",
                background: yearly ? "#FFFFFF" : "transparent",
                color: yearly ? "#0F172A" : "#64748B",
                transition: "all 0.12s",
              }}
            >
              Yearly
              <span style={{
                fontSize: 10, fontWeight: 700,
                background: "#D97706", color: "#FFFFFF",
                borderRadius: 4, padding: "1px 6px",
              }}>
  −22%
              </span>
            </button>
          </div>
        </div>

        {/* ── Plan cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

          {/* Free card */}
          <div style={{
            background: "#FFFFFF",
            border: "0.5px solid #E2E8F0",
            borderRadius: 16,
            padding: 28,
            display: "flex", flexDirection: "column",
          }}>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}>Free</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginTop: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>$0</span>
                <span style={{ fontSize: 13, color: "#94A3B8", marginBottom: 4 }}>/month</span>
              </div>
              <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>No credit card required</p>
            </div>

            <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, padding: 0, listStyle: "none" }}>
              {FREE_FEATURES.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569" }}>
                  <span style={{ color: "#94A3B8", flexShrink: 0 }}><CheckIcon /></span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              disabled
              style={{
                width: "100%", height: 42,
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: 8,
                fontSize: 13, fontWeight: 600, color: "#94A3B8",
                cursor: "not-allowed",
              }}
            >
              Current plan
            </button>
          </div>

          {/* Pro card */}
          <div style={{
            background: "linear-gradient(145deg, #4F46E5 0%, #6D28D9 100%)",
            borderRadius: 16,
            padding: 28,
            display: "flex", flexDirection: "column",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Badge */}
            <div style={{
              position: "absolute", top: 16, right: 16,
              fontSize: 10, fontWeight: 700,
              background: "#D97706", color: "#FFFFFF",
              borderRadius: 4, padding: "3px 8px",
            }}>
              MOST POPULAR
            </div>

            {/* Decorative circle */}
            <div style={{
              position: "absolute", top: -40, right: -40,
              width: 140, height: 140, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              pointerEvents: "none",
            }} />

            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "rgba(255,255,255,0.7)" }}><ZapIcon /></span>
                <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>Pro</p>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginTop: 8 }}>
                <span style={{ fontSize: 40, fontWeight: 800, color: "#FFFFFF", lineHeight: 1 }}>
                  ${yearly ? "7" : "9"}
                </span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>/month</span>
              </div>
              {yearly && (
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 4 }}>
                  Billed $84/year — save $24
                </p>
              )}
            </div>

            <ul style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, marginBottom: 24, padding: 0, listStyle: "none" }}>
              {PRO_FEATURES.map((f) => (
                <li key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.88)" }}>
                  <span style={{ color: "rgba(255,255,255,0.65)", flexShrink: 0 }}><CheckIcon /></span>
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={handleUpgrade}
              disabled={loading}
              style={{
                width: "100%", height: 42,
                background: "#FFFFFF",
                border: "none",
                borderRadius: 8,
                fontSize: 13, fontWeight: 700, color: "#4F46E5",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.75 : 1,
                transition: "opacity 0.15s",
              }}
            >
              {loading ? "Redirecting…" : yearly ? "Upgrade to Pro — $84/yr" : "Upgrade to Pro"}
            </button>
          </div>

        </div>

        {/* ── Footer note ── */}
        <p style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "#94A3B8" }}>
          Cancel anytime. Secure payment via Stripe.
        </p>

      </div>
    </div>
  );
}
