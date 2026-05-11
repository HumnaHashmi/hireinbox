"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { EmailStatus } from "@/types/campaign";

const STATUS_CFG: Record<EmailStatus, { label: string; color: string; strip: string; bg: string }> = {
  ready:      { label: "Ready",      color: "#4F46E5", strip: "#4F46E5", bg: "#EEF2FF" },
  sent:       { label: "Sent",       color: "#0D9488", strip: "#0D9488", bg: "#F0FDFA" },
  generating: { label: "Generating", color: "#D97706", strip: "#D97706", bg: "#FFFBEB" },
  failed:     { label: "Failed",     color: "#E11D48", strip: "#E11D48", bg: "#FFF1F2" },
};

interface Draft {
  id: string;
  hrEmail: string;
  subject: string;
  body: string;
  status: EmailStatus;
}

const INITIAL_DRAFTS: Draft[] = [
  {
    id: "e1", hrEmail: "hr@google.com",
    subject: "Software Engineer — Experienced in React & TypeScript",
    body: "Hi,\n\nI came across the Software Engineer role at Google and would love to apply. I have 4 years of experience building scalable React applications with TypeScript.\n\nI've attached my CV for your review. Happy to connect at your convenience.\n\nBest,\nHumna Hashmi",
    status: "ready",
  },
  {
    id: "e2", hrEmail: "recruit@stripe.com",
    subject: "Frontend Engineer Application — Humna Hashmi",
    body: "Hello,\n\nI'm very interested in the Frontend Engineer position at Stripe. My background in payments UI and design systems aligns well with what your team is building.\n\nPlease find my CV attached.\n\nKind regards,\nHumna Hashmi",
    status: "sent",
  },
  {
    id: "e3", hrEmail: "jobs@openai.com",
    subject: "Applying for ML Product Role",
    body: "Generating personalised email…",
    status: "generating",
  },
  {
    id: "e4", hrEmail: "careers@notion.so",
    subject: "Product Designer Application",
    body: "Failed to generate. Please retry.",
    status: "failed",
  },
];

/* ── Icons ── */
function BackIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>;
}
function ChevronDownIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>;
}
function ChevronUpIcon2() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>;
}
function SendIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>;
}
function SparklesIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>;
}
function PencilIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" /></svg>;
}

/* ── Shimmer skeleton bars (for "generating" state) ── */
function SkeletonBars() {
  return (
    <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
      <div className="shimmer" style={{ height: 10, borderRadius: 5, width: "88%" }} />
      <div className="shimmer" style={{ height: 10, borderRadius: 5, width: "72%" }} />
      <div className="shimmer" style={{ height: 10, borderRadius: 5, width: "60%" }} />
    </div>
  );
}

/* ── Send confirmation tooltip (above the card) ── */
function SendTooltip({ email, onConfirm, onCancel, sending }: {
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
  sending: boolean;
}) {
  return (
    <div style={{
      position: "absolute",
      bottom: "calc(100% + 10px)",
      right: 16,
      zIndex: 20,
      background: "#1E2A45",
      borderRadius: 10,
      padding: "12px 16px",
      minWidth: 260,
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      {/* Arrow */}
      <div style={{
        position: "absolute",
        bottom: -6, right: 28,
        width: 12, height: 12,
        background: "#1E2A45",
        transform: "rotate(45deg)",
        borderRadius: 2,
      }} />

      <p style={{ fontSize: 13, color: "#FFFFFF", lineHeight: 1.4, margin: 0 }}>
        Send to <span style={{ fontWeight: 600, color: "#818CF8" }}>{email}</span>?
      </p>
      <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>
        This will send via your connected Gmail account.
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={onConfirm}
          disabled={sending}
          style={{
            flex: 1, height: 32,
            background: sending ? "#475569" : "#4F46E5",
            border: "none", borderRadius: 6,
            fontSize: 12, fontWeight: 600, color: "#FFFFFF",
            cursor: sending ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
          }}
        >
          {sending ? "Sending…" : <><SendIcon /> Send now</>}
        </button>
        <button
          onClick={onCancel}
          style={{
            flex: 1, height: 32,
            background: "transparent",
            border: "1px solid #334155",
            borderRadius: 6,
            fontSize: 12, fontWeight: 500, color: "#94A3B8",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#475569"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "#334155"; }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function EmailCard({ draft, onSend, onRegenerate, onEdit }: {
  draft: Draft;
  onSend: (id: string) => void;
  onRegenerate: (id: string) => void;
  onEdit: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmSend, setConfirmSend] = useState(false);
  const [sending, setSending] = useState(false);
  const cfg = STATUS_CFG[draft.status];

  async function handleSend() {
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setConfirmSend(false);
    onSend(draft.id);
  }

  return (
    /* Outer wrapper — position:relative so tooltip can escape overflow:hidden */
    <div style={{ position: "relative" }}>

      {/* ── Send confirmation tooltip ── */}
      {confirmSend && (
        <SendTooltip
          email={draft.hrEmail}
          onConfirm={handleSend}
          onCancel={() => setConfirmSend(false)}
          sending={sending}
        />
      )}

      {/* ── Card ── */}
      <div style={{
        background: "#FFFFFF",
        border: confirmSend ? "0.5px solid #4F46E5" : "0.5px solid #E2E8F0",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        transition: "border-color 0.15s",
      }}>
        {/* Color strip */}
        <div style={{ width: 4, flexShrink: 0, background: cfg.strip }} />

        {/* Content — more breathing room */}
        <div style={{ flex: 1, padding: "20px 24px" }}>

          {/* Top row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
            {/* Left: email + status + subject */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{draft.hrEmail}</span>
                <span style={{
                  fontSize: 11, fontWeight: 500,
                  background: cfg.bg, color: cfg.color,
                  borderRadius: 99, padding: "3px 10px",
                  display: "inline-flex", alignItems: "center", gap: 4,
                }}>
                  {draft.status === "generating" && (
                    <span style={{
                      display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                      background: cfg.color, animation: "pulse 1.5s ease-in-out infinite",
                    }} />
                  )}
                  {cfg.label}
                </span>
              </div>
              <p style={{
                fontSize: 12, color: "#94A3B8", marginTop: 4,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              }}>
                {draft.subject}
              </p>
            </div>

            {/* Right: action buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              {draft.status === "failed" && (
                <button
                  onClick={() => onRegenerate(draft.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: 12, fontWeight: 500, color: "#475569",
                    background: "none", border: "1px solid #E2E8F0",
                    borderRadius: 6, padding: "5px 12px", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}
                >
                  <SparklesIcon /> Regenerate
                </button>
              )}

              {(draft.status === "ready" || draft.status === "sent") && (
                <button
                  onClick={() => onEdit(draft.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: 12, fontWeight: 500, color: "#475569",
                    background: "none", border: "1px solid #E2E8F0",
                    borderRadius: 6, padding: "5px 12px", cursor: "pointer",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}
                >
                  <PencilIcon /> Edit
                </button>
              )}

              {draft.status === "ready" && (
                <>
                  <button
                    onClick={() => setConfirmSend((v) => !v)}
                    style={{
                      display: "flex", alignItems: "center", gap: 4,
                      fontSize: 12, fontWeight: 600, color: "#FFFFFF",
                      background: confirmSend ? "#4338CA" : "#4F46E5", border: "none",
                      borderRadius: 6, padding: "5px 12px", cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#4338CA"; }}
                    onMouseLeave={(e) => {
                      if (!confirmSend) (e.currentTarget as HTMLElement).style.background = "#4F46E5";
                    }}
                  >
                    <SendIcon /> Send
                  </button>
                  <button
                    onClick={() => onRegenerate(draft.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 4,
                      fontSize: 12, fontWeight: 500, color: "#475569",
                      background: "none", border: "1px solid #E2E8F0",
                      borderRadius: 6, padding: "5px 12px", cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}
                  >
                    <SparklesIcon /> Regenerate
                  </button>
                </>
              )}

              <button
                onClick={() => setExpanded(!expanded)}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  fontSize: 12, fontWeight: 500, color: "#475569",
                  background: "none", border: "1px solid #E2E8F0",
                  borderRadius: 6, padding: "5px 12px", cursor: "pointer",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#F8FAFC"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; }}
              >
                {expanded ? <ChevronUpIcon2 /> : <ChevronDownIcon />}
                {expanded ? "Collapse" : "Preview"}
              </button>
            </div>
          </div>

          {/* Shimmer skeleton — generating state */}
          {draft.status === "generating" && !expanded && <SkeletonBars />}

          {/* Body preview — collapsed (non-generating) */}
          {!expanded && draft.status !== "generating" && (
            <p style={{
              marginTop: 12,
              fontSize: 12, color: "#64748B", lineHeight: 1.75,
              maxHeight: "3.5em", overflow: "hidden",
            }}>
              {draft.body}
            </p>
          )}

          {/* Full body — expanded */}
          {expanded && (
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid #F1F5F9" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#64748B", marginBottom: 10 }}>
                Subject: {draft.subject}
              </p>
              {draft.status === "generating" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div className="shimmer" style={{ height: 10, borderRadius: 5, width: "90%" }} />
                  <div className="shimmer" style={{ height: 10, borderRadius: 5, width: "78%" }} />
                  <div className="shimmer" style={{ height: 10, borderRadius: 5, width: "85%" }} />
                  <div className="shimmer" style={{ height: 10, borderRadius: 5, width: "55%" }} />
                </div>
              ) : (
                <pre style={{
                  fontSize: 13, color: "#334155", lineHeight: 1.75,
                  whiteSpace: "pre-wrap", fontFamily: "inherit", margin: 0,
                }}>
                  {draft.body}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CampaignPage() {
  const router = useRouter();
  const [drafts, setDrafts] = useState<Draft[]>(INITIAL_DRAFTS);

  const ready      = drafts.filter((d) => d.status === "ready").length;
  const sent       = drafts.filter((d) => d.status === "sent").length;
  const generating = drafts.filter((d) => d.status === "generating").length;
  const failed     = drafts.filter((d) => d.status === "failed").length;
  const total      = drafts.length;
  const sentPct    = Math.round((sent / total) * 100);

  function handleSend(id: string) {
    setDrafts((prev) => prev.map((d) => d.id === id ? { ...d, status: "sent" } : d));
  }

  function handleRegenerate(id: string) {
    setDrafts((prev) => prev.map((d) => d.id === id ? { ...d, status: "generating" } : d));
    setTimeout(() => {
      setDrafts((prev) => prev.map((d) => d.id === id
        ? { ...d, status: "ready", body: "Hi,\n\nRegenerated email content here…\n\nBest,\nHumna Hashmi" }
        : d));
    }, 2000);
  }

  function handleSendAll() {
    setDrafts((prev) => prev.map((d) => d.status === "ready" ? { ...d, status: "sent" } : d));
  }

  const SUMMARY = [
    { label: "Ready",      value: ready,      color: "#4F46E5", bg: "#EEF2FF" },
    { label: "Sent",       value: sent,        color: "#0D9488", bg: "#F0FDFA" },
    { label: "Generating", value: generating,  color: "#D97706", bg: "#FFFBEB" },
    { label: "Failed",     value: failed,      color: "#E11D48", bg: "#FFF1F2" },
  ];

  return (
    <>
      {/* ── Global animation styles ── */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        .shimmer {
          background: linear-gradient(90deg, #F1F5F9 25%, #E8EDF5 50%, #F1F5F9 75%);
          background-size: 400px 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
      `}</style>

      <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "36px 40px" }}>
        <div style={{ maxWidth: 740, margin: "0 auto" }}>

          {/* ── Back button ── */}
          <button
            onClick={() => router.back()}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "none", border: "none", cursor: "pointer",
              fontSize: 13, color: "#94A3B8", padding: 0, marginBottom: 12,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748B"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#94A3B8"; }}
          >
            <BackIcon /> Back
          </button>

          {/* ── Header ── */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>
                May Applications 2025
              </h1>
              <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>
                {total} emails · Created May 10, 2025
              </p>
            </div>
            {ready > 0 && (
              <button
                onClick={handleSendAll}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  height: 38, padding: "0 18px",
                  background: "#4F46E5", border: "none", borderRadius: 8,
                  fontSize: 13, fontWeight: 600, color: "#FFFFFF", cursor: "pointer",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#4338CA"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#4F46E5"; }}
              >
                <SendIcon /> Send all ready ({ready})
              </button>
            )}
          </div>

          {/* ── Progress indicator ── */}
          <div style={{
            background: "#FFFFFF",
            border: "0.5px solid #E2E8F0",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 16,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0F172A" }}>
                  {sent} / {total}
                </span>
                <span style={{ fontSize: 13, color: "#475569" }}>emails sent</span>
              </div>
              <span style={{
                fontSize: 12, fontWeight: 600,
                background: sentPct === 100 ? "#F0FDFA" : "#EEF2FF",
                color: sentPct === 100 ? "#0D9488" : "#4F46E5",
                borderRadius: 99, padding: "2px 10px",
              }}>
                {sentPct}%
              </span>
            </div>
            <div style={{ height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${sentPct}%`,
                background: sentPct === 100 ? "#0D9488" : "#4F46E5",
                borderRadius: 3,
                transition: "width 0.4s ease",
              }} />
            </div>
            {/* Mini status row below bar */}
            <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
              {SUMMARY.filter((s) => s.value > 0).map(({ label, value, color }) => (
                <span key={label} style={{ fontSize: 11, color, fontWeight: 500 }}>
                  {value} {label.toLowerCase()}
                </span>
              ))}
            </div>
          </div>

          {/* ── Email cards ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {drafts.map((draft) => (
              <EmailCard
                key={draft.id}
                draft={draft}
                onSend={handleSend}
                onRegenerate={handleRegenerate}
                onEdit={(id) => console.log("edit", id)}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
