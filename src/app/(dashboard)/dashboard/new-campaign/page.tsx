"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function parseEmails(text: string): string[] {
  return text.split(/[\n,;]+/).map((e) => e.trim()).filter((e) => e.includes("@"));
}

/* ── Icons ── */
function AlertTriangleIcon() {
  return <svg width="18" height="18" fill="none" stroke="#D97706" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.008v.008H12v-.008Z" /></svg>;
}
function AlertCircleIcon() {
  return <svg width="14" height="14" fill="none" stroke="#D97706" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>;
}
function SparklesIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>;
}
function ChevronDownIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>;
}
function ChevronUpIcon() {
  return <svg width="16" height="16" fill="none" stroke="#0D9488" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" /></svg>;
}
function PlusSmIcon() {
  return <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
}

/* ── Step indicator ── */
function StepIndicator({ step }: { step: 1 | 2 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: 24 }}>
      {/* Step 1 */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: step === 1 ? "#4F46E5" : "#E2E8F0",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: step === 1 ? "#FFFFFF" : "#94A3B8" }}>1</span>
        </div>
        <span style={{ marginLeft: 10, fontSize: 13, fontWeight: step === 1 ? 600 : 400, color: step === 1 ? "#4F46E5" : "#94A3B8" }}>
          Campaign details
        </span>
      </div>
      {/* Connector */}
      <div style={{ width: 40, height: 2, background: "#E2E8F0", margin: "0 12px", flexShrink: 0 }} />
      {/* Step 2 */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
          background: step === 2 ? "#4F46E5" : "#FFFFFF",
          border: step === 2 ? "none" : "1.5px solid #E2E8F0",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 13, fontWeight: step === 2 ? 700 : 400, color: step === 2 ? "#FFFFFF" : "#94A3B8" }}>2</span>
        </div>
        <span style={{ marginLeft: 10, fontSize: 13, fontWeight: step === 2 ? 600 : 400, color: step === 2 ? "#4F46E5" : "#94A3B8" }}>
          HR Emails
        </span>
      </div>
    </div>
  );
}

/* ── Focusable input helper ── */
function focusBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.border = "2px solid #4F46E5";
}
function blurBorder(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.currentTarget.style.border = "1px solid #E2E8F0";
}

const DAILY_LIMIT = 3;

export default function NewCampaignPage() {
  const router = useRouter();

  const [name,        setName]        = useState("");
  const [emailsText,  setEmailsText]  = useState("");
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [limitHit,    setLimitHit]    = useState(false);
  const [showJd,      setShowJd]      = useState(false);
  const [jdMap,       setJdMap]       = useState<Record<string, string>>({});
  const [hasCv]                       = useState(true); // TODO: read from user profile

  const emails     = parseEmails(emailsText);
  const overLimit  = emails.length > DAILY_LIMIT;
  const canGenerate = name.trim().length >= 2 && emails.length > 0 && !limitHit;

  async function handleGenerate() {
    if (!canGenerate) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/generate-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignName: name.trim(),
          drafts: emails.map((e) => ({ hrEmail: e, jd: jdMap[e] || undefined })),
        }),
      });
      if (res.status === 429) { setLimitHit(true); setLoading(false); return; }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error ?? "Something went wrong. Try again.");
        setLoading(false);
        return;
      }
      router.push("/dashboard/campaign/1");
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "40px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        {/* ── Page header ── */}
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>New Campaign</h1>
        <p style={{ fontSize: 14, color: "#475569", marginTop: 6, maxWidth: 560, lineHeight: 1.6 }}>
          Set up your campaign details and paste HR emails — AI will write a personalised email for each company.
        </p>

        {/* ── Step indicator ── */}
        <StepIndicator step={1} />

        {/* ── CV warning banner ── */}
        {!hasCv && (
          <div style={{
            marginTop: 20,
            background: "#FFFBEB",
            border: "1px solid #FCD34D",
            borderLeft: "4px solid #D97706",
            borderRadius: 10,
            padding: "14px 18px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ flexShrink: 0 }}><AlertTriangleIcon /></div>
            <span style={{ flex: 1, fontSize: 13, color: "#92400E", lineHeight: 1.5 }}>
              Upload your CV first for better personalised emails.
            </span>
            <Link href="/dashboard/profile" style={{ fontSize: 13, fontWeight: 600, color: "#D97706", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
              Go to Profile →
            </Link>
          </div>
        )}

        {/* ── Limit hit banner ── */}
        {limitHit && (
          <div style={{
            marginTop: 20,
            background: "#FFFBEB",
            border: "1px solid #FCD34D",
            borderLeft: "4px solid #D97706",
            borderRadius: 10,
            padding: "14px 18px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ flexShrink: 0 }}><AlertTriangleIcon /></div>
            <span style={{ flex: 1, fontSize: 13, color: "#92400E" }}>
              You&apos;ve used all <strong>{DAILY_LIMIT}</strong> free emails today. Resets at midnight UTC.
            </span>
            <Link href="/dashboard/upgrade" style={{ fontSize: 13, fontWeight: 600, color: "#D97706", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>
              Upgrade to Pro →
            </Link>
          </div>
        )}

        {/* ── Main form card ── */}
        <div style={{
          marginTop: 20,
          background: "#FFFFFF",
          border: "0.5px solid #E2E8F0",
          borderRadius: 16,
          padding: 32,
        }}>

          {/* ── Section 1: Campaign name ── */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>Campaign name</label>
              <span style={{
                fontSize: 10, fontWeight: 500,
                background: "#EEF2FF", color: "#4F46E5",
                borderRadius: 99, padding: "2px 8px",
              }}>Required</span>
            </div>
            <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4, lineHeight: 1.5 }}>
              This is just for your reference — users won&apos;t see it.
            </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Software Engineer Applications — May 2025"
              style={{
                display: "block", width: "100%", height: 44,
                marginTop: 10, padding: "0 14px",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 8,
                fontSize: 14, color: "#0F172A",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={focusBorder}
              onBlur={blurBorder}
            />
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "#F1F5F9", margin: "24px 0" }} />

          {/* ── Section 2: HR emails ── */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: "#0F172A" }}>HR email addresses</label>
              {emails.length > 0 && (
                <span style={{
                  fontSize: 11, fontWeight: 600,
                  background: "#EEF2FF", color: "#4F46E5",
                  borderRadius: 99, padding: "3px 10px",
                }}>
                  {emails.length} email{emails.length !== 1 ? "s" : ""} added
                </span>
              )}
            </div>
            <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4, lineHeight: 1.5 }}>
              Paste one email per line — or add them one by one below.
            </p>
            <div style={{ position: "relative", marginTop: 10 }}>
              <textarea
                value={emailsText}
                onChange={(e) => setEmailsText(e.target.value)}
                rows={8}
                placeholder={"hr@company.com\nrecruiter@startup.io\ncareers@tech.com\n\nOne per line, comma, or semicolon separated."}
                style={{
                  display: "block", width: "100%", minHeight: 180,
                  padding: 14,
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 13, lineHeight: 1.8, color: "#0F172A",
                  fontFamily: "ui-monospace, 'Cascadia Code', monospace",
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={focusBorder}
                onBlur={blurBorder}
              />
              {emails.length > 0 && (
                <span style={{
                  position: "absolute", bottom: 10, right: 12,
                  fontSize: 10, color: "#CBD5E1",
                  pointerEvents: "none",
                }}>
                  {emails.length} total
                </span>
              )}
            </div>

            {/* Below textarea row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
              <button
                onClick={() => setShowJd((v) => !v)}
                style={{
                  display: "flex", alignItems: "center", gap: 4,
                  background: "none", border: "none", cursor: "pointer",
                  fontSize: 13, color: "#0D9488", padding: 0,
                }}
              >
                {showJd ? "− Hide job descriptions" : "+ Add job description per company"}
                <span style={{ color: "#0D9488" }}>
                  {showJd ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </span>
              </button>
              {emailsText.trim() && (
                <button
                  onClick={() => { setEmailsText(""); setJdMap({}); }}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#94A3B8", padding: 0 }}
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* ── JD accordion ── */}
          {showJd && (
            <div>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 0",
                borderTop: "1px solid #F1F5F9",
                marginTop: 12,
              }}>
                <ChevronUpIcon />
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0D9488" }}>Job descriptions (optional)</span>
                <span style={{ fontSize: 12, color: "#94A3B8", marginLeft: 6 }}>Helps AI personalise each email to the exact role</span>
              </div>

              {emails.length === 0 ? (
                <p style={{ fontSize: 13, color: "#94A3B8", fontStyle: "italic" }}>
                  Add HR emails above first.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                  {emails.slice(0, 8).map((email) => (
                    <div key={email} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{
                        fontSize: 12, color: "#475569",
                        minWidth: 180, maxWidth: 180,
                        paddingTop: 10,
                        wordBreak: "break-all",
                        lineHeight: 1.4,
                        flexShrink: 0,
                      }}>
                        {email}
                      </span>
                      <textarea
                        value={jdMap[email] || ""}
                        onChange={(e) => setJdMap((prev) => ({ ...prev, [email]: e.target.value }))}
                        placeholder={`Paste job description for ${email.split("@")[1]?.split(".")[0] ?? "company"}…`}
                        rows={2}
                        style={{
                          flex: 1, height: 56,
                          border: "1px solid #E2E8F0",
                          borderRadius: 8,
                          padding: "8px 12px",
                          fontSize: 12, color: "#0F172A", lineHeight: 1.5,
                          resize: "none",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => { e.currentTarget.style.border = "2px solid #4F46E5"; }}
                        onBlur={(e) => { e.currentTarget.style.border = "1px solid #E2E8F0"; }}
                      />
                    </div>
                  ))}
                  {emails.length > 8 && (
                    <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>
                      + {emails.length - 8} more emails (JD optional for all)
                    </p>
                  )}
                  <button style={{
                    display: "flex", alignItems: "center", gap: 4,
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: 12, color: "#94A3B8", padding: 0, marginTop: 4,
                  }}>
                    <PlusSmIcon />
                    Add more
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div style={{ height: 1, background: "#F1F5F9", margin: "24px 0" }} />

          {/* ── Error ── */}
          {error && (
            <div style={{
              marginBottom: 16, padding: "10px 14px",
              background: "#FFF1F2", border: "1px solid #FECDD3",
              borderRadius: 8, fontSize: 13, color: "#E11D48",
            }}>
              {error}
            </div>
          )}

          {/* ── Action row ── */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            {/* Cancel */}
            <button
              onClick={() => router.back()}
              style={{
                height: 44, padding: "0 20px",
                background: "transparent",
                border: "1px solid #E2E8F0",
                borderRadius: 8,
                fontSize: 14, color: "#475569",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            {/* Right side */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Limit warning inline */}
                {overLimit && !limitHit && (
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <AlertCircleIcon />
                    <span style={{ fontSize: 12, color: "#D97706" }}>
                      Uses {emails.length} of your {DAILY_LIMIT} daily emails
                    </span>
                  </div>
                )}

                {/* Generate / Disabled button */}
                {limitHit ? (
                  <button
                    disabled
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      height: 44, padding: "0 24px",
                      background: "#CBD5E1",
                      border: "none", borderRadius: 8,
                      fontSize: 14, fontWeight: 600, color: "#FFFFFF",
                      cursor: "not-allowed",
                    }}
                  >
                    <SparklesIcon />
                    Upgrade to generate more
                  </button>
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate || loading}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      height: 44, padding: "0 24px",
                      background: canGenerate && !loading ? "#4F46E5" : "#CBD5E1",
                      border: "none", borderRadius: 8,
                      fontSize: 14, fontWeight: 600, color: "#FFFFFF",
                      cursor: canGenerate && !loading ? "pointer" : "not-allowed",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { if (canGenerate && !loading) (e.currentTarget as HTMLElement).style.background = "#4338CA"; }}
                    onMouseLeave={(e) => { if (canGenerate && !loading) (e.currentTarget as HTMLElement).style.background = "#4F46E5"; }}
                  >
                    <SparklesIcon />
                    {loading ? "Generating…" : "Generate Emails with AI"}
                  </button>
                )}
              </div>

              {/* Sub-caption for limit hit */}
              {limitHit && (
                <p style={{ fontSize: 12, color: "#94A3B8", textAlign: "right" }}>
                  You&apos;ve reached your {DAILY_LIMIT}/day limit. Resets at midnight.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
