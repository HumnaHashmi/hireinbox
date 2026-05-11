"use client";

import { useState, useRef, useCallback } from "react";

/* ── Types ─────────────────────────────────────────── */
interface HrEntry {
  id: string;
  email: string;
  jd: string;
  jdOpen: boolean;
}

interface GeneratedEmail {
  id: string;
  hrEmail: string;
  subject: string;
  body: string;
  status: "ready" | "sent";
  editing: boolean;
  editSubject: string;
  editBody: string;
}

type Phase = "input" | "generating" | "done";

/* ── Icons ─────────────────────────────────────────── */
function PlusIcon() {
  return <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
}
function TrashIcon() {
  return <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>;
}
function SparklesIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" /></svg>;
}
function SendIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>;
}
function PencilIcon() {
  return <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" /></svg>;
}
function UploadIcon() {
  return <svg width="28" height="28" fill="none" stroke="#6366F1" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>;
}
function CheckIcon() {
  return <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>;
}
function RefreshIcon() {
  return <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>;
}

/* ── Helpers ────────────────────────────────────────── */
function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/* ── Step timeline dot ──────────────────────────────── */
const STEP_COLORS = ["#6366F1", "#0D9488", "#F97316", "#8B5CF6", "#22C55E"];

function StepDot({ n, active }: { n: number; active: boolean }) {
  const color = STEP_COLORS[n - 1];
  return (
    <div style={{
      width: 36, height: 36, borderRadius: "50%",
      background: active ? color : "rgba(255,255,255,0.06)",
      border: active ? "none" : "1.5px solid rgba(255,255,255,0.12)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
      transition: "background 0.2s",
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: active ? "#fff" : "rgba(255,255,255,0.3)" }}>
        {n}
      </span>
    </div>
  );
}

/* ── Section card wrapper ───────────────────────────── */
function SectionCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 14,
      padding: "24px 28px",
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", marginBottom: 16 }}>
        {label}
      </p>
      {children}
    </div>
  );
}

/* ── HR entry row ───────────────────────────────────── */
function HrEntryRow({
  entry, onChange, onRemove, canRemove,
}: {
  entry: HrEntry;
  onChange: (id: string, patch: Partial<HrEntry>) => void;
  onRemove: (id: string) => void;
  canRemove: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type="email"
          value={entry.email}
          onChange={(e) => onChange(entry.id, { email: e.target.value })}
          placeholder="hr@company.com"
          style={{
            flex: 1, height: 42,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "0 14px",
            fontSize: 14, color: "#F1F5F9",
            outline: "none",
          }}
          onFocus={(e) => { e.currentTarget.style.border = "1px solid #6366F1"; }}
          onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; }}
        />
        <button
          onClick={() => onChange(entry.id, { jdOpen: !entry.jdOpen })}
          style={{
            height: 42, padding: "0 14px",
            background: entry.jdOpen ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.06)",
            border: entry.jdOpen ? "1px solid rgba(99,102,241,0.4)" : "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            fontSize: 12, fontWeight: 600,
            color: entry.jdOpen ? "#818CF8" : "rgba(255,255,255,0.5)",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {entry.jdOpen ? "− JD" : "+ Add JD"}
        </button>
        {canRemove && (
          <button
            onClick={() => onRemove(entry.id)}
            style={{
              width: 36, height: 36,
              background: "none", border: "none",
              color: "rgba(255,255,255,0.25)",
              cursor: "pointer", borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F87171"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.25)"; }}
          >
            <TrashIcon />
          </button>
        )}
      </div>

      {entry.jdOpen && (
        <textarea
          value={entry.jd}
          onChange={(e) => onChange(entry.id, { jd: e.target.value })}
          placeholder={`Paste the job description for ${entry.email.split("@")[1]?.split(".")[0] || "this company"}…`}
          rows={3}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(99,102,241,0.3)",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 13, color: "#CBD5E1", lineHeight: 1.6,
            resize: "vertical",
            outline: "none",
          }}
          onFocus={(e) => { e.currentTarget.style.border = "1px solid #6366F1"; }}
          onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(99,102,241,0.3)"; }}
        />
      )}
    </div>
  );
}

/* ── Email card ─────────────────────────────────────── */
function EmailCard({
  email, onSend, onEdit, onSave, onCancelEdit,
}: {
  email: GeneratedEmail;
  onSend: (id: string) => void;
  onEdit: (id: string) => void;
  onSave: (id: string, subject: string, body: string) => void;
  onCancelEdit: (id: string) => void;
}) {
  const [sending, setSending] = useState(false);

  async function handleSend() {
    setSending(true);
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draftId: email.id, to: email.hrEmail, subject: email.subject, body: email.body }),
      });
    } finally {
      setSending(false);
      onSend(email.id);
    }
  }

  const isSent = email.status === "sent";

  return (
    <div style={{
      background: isSent ? "rgba(13,148,136,0.06)" : "rgba(255,255,255,0.04)",
      border: isSent ? "1px solid rgba(13,148,136,0.2)" : "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "18px 20px",
      transition: "all 0.2s",
    }}>
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#F1F5F9" }}>{email.hrEmail}</span>
            {isSent ? (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
                background: "rgba(13,148,136,0.15)", color: "#34D399",
              }}>
                Sent ✓
              </span>
            ) : (
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 99,
                background: "rgba(99,102,241,0.15)", color: "#818CF8",
              }}>
                Ready
              </span>
            )}
          </div>
          {!email.editing && (
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {email.subject}
            </p>
          )}
        </div>

        {!isSent && !email.editing && (
          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
            <button
              onClick={() => onEdit(email.id)}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                height: 32, padding: "0 12px",
                background: "none", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6, fontSize: 12, color: "rgba(255,255,255,0.6)", cursor: "pointer",
              }}
            >
              <PencilIcon /> Edit
            </button>
            <button
              onClick={handleSend}
              disabled={sending}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                height: 32, padding: "0 14px",
                background: sending ? "rgba(99,102,241,0.4)" : "#6366F1",
                border: "none", borderRadius: 6,
                fontSize: 12, fontWeight: 600, color: "#fff", cursor: sending ? "not-allowed" : "pointer",
              }}
            >
              <SendIcon /> {sending ? "Sending…" : "Send"}
            </button>
          </div>
        )}

        {isSent && (
          <button
            onClick={() => onEdit(email.id)}
            style={{
              display: "flex", alignItems: "center", gap: 4,
              height: 32, padding: "0 12px",
              background: "none", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6, fontSize: 12, color: "rgba(255,255,255,0.4)", cursor: "pointer",
            }}
          >
            Read full
          </button>
        )}
      </div>

      {/* Body / edit area */}
      {!email.editing && (
        <p style={{
          marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.45)",
          lineHeight: 1.7, maxHeight: "3.4em", overflow: "hidden",
        }}>
          {email.body}
        </p>
      )}

      {email.editing && (
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
          <input
            type="text"
            defaultValue={email.editSubject}
            id={`subj-${email.id}`}
            style={{
              width: "100%", height: 40,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: 8, padding: "0 12px",
              fontSize: 13, color: "#F1F5F9", outline: "none",
            }}
            placeholder="Subject"
          />
          <textarea
            defaultValue={email.editBody}
            id={`body-${email.id}`}
            rows={7}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(99,102,241,0.4)",
              borderRadius: 8, padding: "10px 12px",
              fontSize: 13, color: "#CBD5E1", lineHeight: 1.7,
              resize: "vertical", outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              onClick={() => onCancelEdit(email.id)}
              style={{
                height: 34, padding: "0 14px",
                background: "none", border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 6, fontSize: 12, color: "rgba(255,255,255,0.5)", cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const subj = (document.getElementById(`subj-${email.id}`) as HTMLInputElement).value;
                const body = (document.getElementById(`body-${email.id}`) as HTMLTextAreaElement).value;
                onSave(email.id, subj, body);
              }}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                height: 34, padding: "0 16px",
                background: "#6366F1", border: "none",
                borderRadius: 6, fontSize: 12, fontWeight: 600,
                color: "#fff", cursor: "pointer",
              }}
            >
              <CheckIcon /> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page ──────────────────────────────────────── */
export default function HireInboxPage() {
  const [entries, setEntries] = useState<HrEntry[]>([
    { id: uid(), email: "", jd: "", jdOpen: false },
  ]);
  const [cvFile,      setCvFile]      = useState<File | null>(null);
  const [cvWordCount, setCvWordCount] = useState<number | null>(null);
  const [cvUploading, setCvUploading] = useState(false);
  const [portfolio,   setPortfolio]   = useState("");
  const [phase,       setPhase]       = useState<Phase>("input");
  const [progress,    setProgress]    = useState(0);
  const [emails,      setEmails]      = useState<GeneratedEmail[]>([]);
  const [genError,    setGenError]    = useState("");
  const [isDragging,  setIsDragging]  = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── Entry helpers ── */
  function addEntry() {
    setEntries((prev) => [...prev, { id: uid(), email: "", jd: "", jdOpen: false }]);
  }

  function updateEntry(id: string, patch: Partial<HrEntry>) {
    setEntries((prev) => prev.map((e) => e.id === id ? { ...e, ...patch } : e));
  }

  function removeEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  /* ── CV upload ── */
  const uploadCv = useCallback(async (file: File) => {
    setCvUploading(true);
    setCvFile(file);
    try {
      const fd = new FormData();
      fd.append("cv", file);
      const res = await fetch("/api/upload-cv", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setCvWordCount(data.wordCount ?? null);
    } finally {
      setCvUploading(false);
    }
  }, []);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadCv(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadCv(file);
  }

  /* ── Generate ── */
  const validEntries = entries.filter((e) => isValidEmail(e.email));

  async function handleGenerate() {
    if (validEntries.length === 0) return;
    setPhase("generating");
    setProgress(0);
    setGenError("");
    setEmails([]);

    try {
      const res = await fetch("/api/generate-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          drafts: validEntries.map((e) => ({ hrEmail: e.email.trim(), jd: e.jd || undefined })),
          portfolioUrl: portfolio || undefined,
        }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setGenError(d.error ?? "Something went wrong.");
        setPhase("input");
        return;
      }

      const data = await res.json();
      const generated: GeneratedEmail[] = (data.generated ?? []).map((g: {
        hrEmail: string; subject: string; body: string;
      }) => ({
        id: uid(),
        hrEmail: g.hrEmail,
        subject: g.subject,
        body: g.body,
        status: "ready" as const,
        editing: false,
        editSubject: g.subject,
        editBody: g.body,
      }));

      /* Reveal cards one by one for the "streaming" feel */
      for (let i = 0; i < generated.length; i++) {
        await new Promise((r) => setTimeout(r, 320));
        setEmails((prev) => [...prev, generated[i]]);
        setProgress(Math.round(((i + 1) / generated.length) * 100));
      }

      setPhase("done");
    } catch {
      setGenError("Network error. Please try again.");
      setPhase("input");
    }
  }

  /* ── Email card handlers ── */
  function handleSend(id: string) {
    setEmails((prev) => prev.map((e) => e.id === id ? { ...e, status: "sent" } : e));
  }

  function handleEdit(id: string) {
    setEmails((prev) => prev.map((e) =>
      e.id === id ? { ...e, editing: true, editSubject: e.subject, editBody: e.body } : e
    ));
  }

  function handleSave(id: string, subject: string, body: string) {
    setEmails((prev) => prev.map((e) =>
      e.id === id ? { ...e, subject, body, editSubject: subject, editBody: body, editing: false } : e
    ));
  }

  function handleCancelEdit(id: string) {
    setEmails((prev) => prev.map((e) => e.id === id ? { ...e, editing: false } : e));
  }

  function handleReset() {
    setEntries([{ id: uid(), email: "", jd: "", jdOpen: false }]);
    setCvFile(null);
    setCvWordCount(null);
    setPortfolio("");
    setPhase("input");
    setProgress(0);
    setEmails([]);
    setGenError("");
  }

  /* ── Derived ── */
  const sentCount  = emails.filter((e) => e.status === "sent").length;
  const allSent    = emails.length > 0 && sentCount === emails.length;
  const withJd     = entries.filter((e) => e.jd.trim()).length;
  const isGenerating = phase === "generating";

  const canGenerate = validEntries.length > 0 && !isGenerating;

  /* ── Step active states ── */
  const step1Active = true;
  const step2Active = true;
  const step3Active = validEntries.length > 0;
  const step4Active = emails.length > 0;
  const step5Active = allSent;

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .gen-pulse { animation: pulse-dot 1.2s ease-in-out infinite; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.22); }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#0F1117",
        padding: "48px 24px 80px",
        fontFamily: "inherit",
      }}>
        {/* ── Page title ── */}
        <div style={{ maxWidth: 720, margin: "0 auto 40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <SparklesIcon size={20} />
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#F1F5F9", margin: 0 }}>HireInbox</h1>
          </div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            Add HR emails → upload CV → generate → send. Done.
          </p>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0 }}>

          {/* ═══════════════════════════════════════════ */}
          {/* STEP 1 — HR Emails                         */}
          {/* ═══════════════════════════════════════════ */}
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            {/* Timeline */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 0 }}>
              <StepDot n={1} active={step1Active} />
              <div style={{ width: 2, flexGrow: 1, minHeight: 32, background: "rgba(255,255,255,0.06)", marginTop: 4 }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingBottom: 28 }}>
              <div style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#F1F5F9", margin: "0 0 2px" }}>
                  Add HR emails + job descriptions
                </h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                  Each row = one company. Paste their HR email and optionally add the JD.
                </p>
              </div>

              <SectionCard label="HR EMAILS SECTION">
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {entries.map((entry) => (
                    <HrEntryRow
                      key={entry.id}
                      entry={entry}
                      onChange={updateEntry}
                      onRemove={removeEntry}
                      canRemove={entries.length > 1}
                    />
                  ))}
                </div>

                <button
                  onClick={addEntry}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    marginTop: 14, background: "none", border: "none",
                    cursor: "pointer", fontSize: 13, fontWeight: 500,
                    color: "#818CF8", padding: 0,
                  }}
                >
                  <PlusIcon /> Add another company
                </button>

                {(validEntries.length > 0 || withJd > 0) && (
                  <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                    {validEntries.length > 0 && (
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                        {validEntries.length} email{validEntries.length !== 1 ? "s" : ""} added
                      </span>
                    )}
                    {withJd > 0 && (
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                        {withJd} with JD
                      </span>
                    )}
                  </div>
                )}
              </SectionCard>
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* STEP 2 — Upload CV                         */}
          {/* ═══════════════════════════════════════════ */}
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <StepDot n={2} active={step2Active} />
              <div style={{ width: 2, flexGrow: 1, minHeight: 32, background: "rgba(255,255,255,0.06)", marginTop: 4 }} />
            </div>

            <div style={{ flex: 1, paddingBottom: 28 }}>
              <div style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#F1F5F9", margin: "0 0 2px" }}>
                  Upload CV
                  <span style={{
                    marginLeft: 8, fontSize: 11, fontWeight: 500,
                    color: "rgba(255,255,255,0.3)",
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 99, padding: "2px 8px",
                  }}>+ portfolio optional</span>
                </h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                  Simple drag and drop. Portfolio link is optional.
                </p>
              </div>

              <SectionCard label="CV UPLOAD">
                {/* Drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: isDragging ? "2px dashed #6366F1" : cvFile ? "2px solid rgba(34,197,94,0.4)" : "2px dashed rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    padding: "32px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: cvFile ? "rgba(34,197,94,0.05)" : isDragging ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)",
                    transition: "all 0.2s",
                  }}
                >
                  {cvUploading ? (
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0 }}>Uploading…</p>
                  ) : cvFile ? (
                    <>
                      <div style={{ fontSize: 28, marginBottom: 6 }}>✅</div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#34D399", margin: "0 0 2px" }}>
                        {cvFile.name} uploaded
                        {cvWordCount !== null ? ` — ${cvWordCount.toLocaleString()} words extracted` : ""}
                      </p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", margin: 0 }}>Click to replace</p>
                    </>
                  ) : (
                    <>
                      <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                        <UploadIcon />
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.6)", margin: "0 0 4px" }}>
                        Drop your CV here or click to browse
                      </p>
                      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", margin: 0 }}>
                        PDF, DOC, DOCX · max 5 MB
                      </p>
                    </>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={handleFileInput}
                />

                {/* Portfolio */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Portfolio link</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)", borderRadius: 99, padding: "1px 8px" }}>optional</span>
                  </div>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://yourportfolio.dev"
                    style={{
                      width: "100%", height: 42,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8, padding: "0 14px",
                      fontSize: 14, color: "#F1F5F9", outline: "none",
                    }}
                    onFocus={(e) => { e.currentTarget.style.border = "1px solid #6366F1"; }}
                    onBlur={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"; }}
                  />
                </div>
              </SectionCard>
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* STEP 3 — Generate                          */}
          {/* ═══════════════════════════════════════════ */}
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <StepDot n={3} active={step3Active} />
              <div style={{ width: 2, flexGrow: 1, minHeight: 32, background: "rgba(255,255,255,0.06)", marginTop: 4 }} />
            </div>

            <div style={{ flex: 1, paddingBottom: 28 }}>
              <div style={{ marginBottom: 14 }}>
                <h2 style={{ fontSize: 16, fontWeight: 600, color: "#F1F5F9", margin: "0 0 2px" }}>Click Generate</h2>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                  One big button. Cards appear one by one as they finish.
                </p>
              </div>

              {(isGenerating || phase === "done") && (
                <SectionCard label="GENERATING...">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
                      {phase === "done" ? `${emails.length} / ${emails.length} done` : `${emails.length} / ${validEntries.length} done`}
                    </span>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${progress}%`,
                      background: phase === "done" ? "#22C55E" : "#6366F1",
                      borderRadius: 3,
                      transition: "width 0.3s ease",
                    }} />
                  </div>

                  {isGenerating && (
                    <button disabled style={{
                      width: "100%", marginTop: 16, height: 48,
                      background: "rgba(99,102,241,0.5)",
                      border: "none", borderRadius: 10,
                      fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.7)",
                      cursor: "not-allowed",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    }}>
                      <span className="gen-pulse"><SparklesIcon /></span>
                      Generating emails… please wait
                    </button>
                  )}
                </SectionCard>
              )}

              {phase === "input" && (
                <>
                  {genError && (
                    <div style={{
                      marginBottom: 12, padding: "10px 14px",
                      background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: 8, fontSize: 13, color: "#FCA5A5",
                    }}>
                      {genError}
                    </div>
                  )}
                  <button
                    onClick={handleGenerate}
                    disabled={!canGenerate}
                    style={{
                      width: "100%", height: 52,
                      background: canGenerate ? "#6366F1" : "rgba(99,102,241,0.25)",
                      border: "none", borderRadius: 12,
                      fontSize: 15, fontWeight: 700, color: canGenerate ? "#fff" : "rgba(255,255,255,0.3)",
                      cursor: canGenerate ? "pointer" : "not-allowed",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { if (canGenerate) (e.currentTarget as HTMLElement).style.background = "#4F46E5"; }}
                    onMouseLeave={(e) => { if (canGenerate) (e.currentTarget as HTMLElement).style.background = "#6366F1"; }}
                  >
                    <SparklesIcon size={18} />
                    Generate Emails
                  </button>
                  {validEntries.length === 0 && (
                    <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: 8 }}>
                      Add at least one valid HR email above first
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════ */}
          {/* STEP 4 — Read & Edit                       */}
          {/* ═══════════════════════════════════════════ */}
          {emails.length > 0 && (
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <StepDot n={4} active={step4Active} />
                <div style={{ width: 2, flexGrow: 1, minHeight: 32, background: "rgba(255,255,255,0.06)", marginTop: 4 }} />
              </div>

              <div style={{ flex: 1, paddingBottom: 28 }}>
                <div style={{ marginBottom: 14 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 600, color: "#F1F5F9", margin: "0 0 2px" }}>
                    Read and edit each email
                  </h2>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                    Click Edit to change anything, then Save. No modals.
                  </p>
                </div>

                <SectionCard label="GENERATED EMAILS">
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {emails.map((email) => (
                      <EmailCard
                        key={email.id}
                        email={email}
                        onSend={handleSend}
                        onEdit={handleEdit}
                        onSave={handleSave}
                        onCancelEdit={handleCancelEdit}
                      />
                    ))}
                  </div>
                </SectionCard>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════ */}
          {/* STEP 5 — Done                              */}
          {/* ═══════════════════════════════════════════ */}
          {(phase === "done" || emails.length > 0) && (
            <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <StepDot n={5} active={step5Active} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 14 }}>
                  <h2 style={{ fontSize: 16, fontWeight: 600, color: "#F1F5F9", margin: "0 0 2px" }}>
                    Click Send on each card
                  </h2>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", margin: 0 }}>
                    Email goes directly to the HR. Badge turns green "Sent ✓".
                  </p>
                </div>

                {allSent && (
                  <SectionCard label="ALL DONE!">
                    <div style={{ textAlign: "center", padding: "24px 0" }}>
                      <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
                      <p style={{ fontSize: 18, fontWeight: 700, color: "#F1F5F9", margin: "0 0 4px" }}>
                        {sentCount} email{sentCount !== 1 ? "s" : ""} sent successfully!
                      </p>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: "0 0 24px" }}>
                        Your applications are on their way.
                      </p>
                      <button
                        onClick={handleReset}
                        style={{
                          display: "inline-flex", alignItems: "center", gap: 6,
                          height: 42, padding: "0 24px",
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          borderRadius: 8, fontSize: 13, fontWeight: 600,
                          color: "#F1F5F9", cursor: "pointer",
                        }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
                      >
                        <RefreshIcon /> Start a new batch
                      </button>
                    </div>
                  </SectionCard>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
