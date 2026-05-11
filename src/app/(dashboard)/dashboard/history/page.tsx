"use client";

import { useState } from "react";
import Link from "next/link";

const MOCK_HISTORY = [
  { id: "1", name: "May Applications 2025",    total: 12, sent: 3,  ready: 8, failed: 1, createdAt: "2025-05-10T10:00:00Z" },
  { id: "2", name: "Saudi Companies Batch",    total: 6,  sent: 6,  ready: 0, failed: 0, createdAt: "2025-05-08T14:30:00Z" },
  { id: "3", name: "Tech Startups Outreach",   total: 20, sent: 20, ready: 0, failed: 0, createdAt: "2025-05-07T09:00:00Z" },
  { id: "4", name: "Design Lead Applications", total: 8,  sent: 5,  ready: 2, failed: 1, createdAt: "2025-05-05T11:15:00Z" },
  { id: "5", name: "FinTech Roles — May",      total: 15, sent: 15, ready: 0, failed: 0, createdAt: "2025-05-01T08:00:00Z" },
];

const FILTERS = ["All", "Sent", "Draft", "Failed"] as const;
type Filter = typeof FILTERS[number];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ChevronRightIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>;
}
function PlusIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
}

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = MOCK_HISTORY.filter((c) => {
    if (activeFilter === "Sent")   return c.sent > 0 && c.ready === 0 && c.failed === 0;
    if (activeFilter === "Draft")  return c.ready > 0;
    if (activeFilter === "Failed") return c.failed > 0;
    return true;
  });

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "36px 40px" }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>History</h1>
            <p style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>All your past campaigns and email drafts.</p>
          </div>
          <Link
            href="/dashboard/new-campaign"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              height: 38, padding: "0 18px",
              background: "#4F46E5", borderRadius: 8,
              fontSize: 13, fontWeight: 600, color: "#FFFFFF",
              textDecoration: "none",
            }}
          >
            <PlusIcon /> New Campaign
          </Link>
        </div>

        {/* ── Filter tabs ── */}
        <div style={{
          display: "inline-flex", gap: 2, padding: 4,
          background: "#F1F5F9", borderRadius: 10,
          marginBottom: 20,
        }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: "6px 16px",
                borderRadius: 7,
                fontSize: 13, fontWeight: 500,
                border: "none", cursor: "pointer",
                background: activeFilter === f ? "#FFFFFF" : "transparent",
                color: activeFilter === f ? "#0F172A" : "#64748B",
                transition: "all 0.12s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ── Campaign list ── */}
        {filtered.length === 0 ? (
          <div style={{
            background: "#FFFFFF",
            border: "0.5px solid #E2E8F0",
            borderRadius: 12,
            padding: "60px 24px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: 14, color: "#94A3B8" }}>No campaigns match this filter.</p>
            <Link
              href="/dashboard/new-campaign"
              style={{ display: "inline-block", marginTop: 12, fontSize: 13, fontWeight: 600, color: "#4F46E5", textDecoration: "none" }}
            >
              Create your first campaign →
            </Link>
          </div>
        ) : (
          <div style={{
            background: "#FFFFFF",
            border: "0.5px solid #E2E8F0",
            borderRadius: 12,
            overflow: "hidden",
          }}>
            {filtered.map((c, i) => (
              <Link
                key={c.id}
                href={`/dashboard/campaign/${c.id}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 20px",
                  borderTop: i === 0 ? "none" : "1px solid #F1F5F9",
                  textDecoration: "none",
                  transition: "background 0.1s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                {/* Name + pills */}
                <div style={{ flex: 1, minWidth: 0, marginRight: 20 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{c.name}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                    {c.sent > 0 && (
                      <span style={{ fontSize: 11, fontWeight: 500, background: "#F0FDFA", color: "#0D9488", borderRadius: 99, padding: "2px 8px" }}>
                        {c.sent} sent
                      </span>
                    )}
                    {c.ready > 0 && (
                      <span style={{ fontSize: 11, fontWeight: 500, background: "#EEF2FF", color: "#4F46E5", borderRadius: 99, padding: "2px 8px" }}>
                        {c.ready} ready
                      </span>
                    )}
                    {c.failed > 0 && (
                      <span style={{ fontSize: 11, fontWeight: 500, background: "#FFF1F2", color: "#E11D48", borderRadius: 99, padding: "2px 8px" }}>
                        {c.failed} failed
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: date + total + chevron */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
                  <span style={{ fontSize: 12, color: "#94A3B8" }}>{formatDate(c.createdAt)}</span>
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#64748B" }}>{c.total} emails</span>
                  <span style={{ color: "#CBD5E1" }}><ChevronRightIcon /></span>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
