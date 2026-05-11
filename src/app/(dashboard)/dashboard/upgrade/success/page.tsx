"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function UpgradeSuccessPage() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 80); }, []);

  return (
    <div style={{
      background: "#F8FAFC", minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: "40px",
      textAlign: "center",
    }}>

      {/* Animated check circle */}
      <div style={{
        width: 64, height: 64, borderRadius: "50%",
        background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 24,
        opacity: show ? 1 : 0,
        transform: show ? "scale(1)" : "scale(0.5)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        <svg width="28" height="28" fill="none" stroke="#FFFFFF" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", lineHeight: 1.2, marginBottom: 8 }}>
        You&apos;re now Pro! 🎉
      </h1>
      <p style={{ fontSize: 14, color: "#64748B", maxWidth: 340 }}>
        Your plan has been upgraded. You can now send up to 50 emails per day.
      </p>

      {/* Badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        marginTop: 24, marginBottom: 32,
        background: "#EEF2FF", borderRadius: 8, padding: "8px 16px",
        fontSize: 13, fontWeight: 600, color: "#4F46E5",
        border: "0.5px solid #C7D2FE",
      }}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
        </svg>
        50 emails / day unlocked
      </div>

      {/* CTAs */}
      <Link
        href="/dashboard/new-campaign"
        style={{
          display: "inline-block",
          height: 42, padding: "0 28px", lineHeight: "42px",
          background: "#4F46E5", borderRadius: 8,
          fontSize: 14, fontWeight: 600, color: "#FFFFFF",
          textDecoration: "none",
        }}
      >
        Start a new campaign
      </Link>
      <Link
        href="/dashboard"
        style={{ display: "block", marginTop: 12, fontSize: 13, color: "#94A3B8", textDecoration: "none" }}
      >
        Go to dashboard
      </Link>

    </div>
  );
}
