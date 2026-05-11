"use client";

import { useState, useRef } from "react";
import { useAuth } from "@/hooks/use-auth";

/* ── Icons ── */
function UploadIcon() {
  return <svg width="28" height="28" fill="none" stroke="#94A3B8" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>;
}
function DocumentIcon() {
  return <svg width="18" height="18" fill="none" stroke="#4F46E5" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>;
}
function CheckCircleIcon() {
  return <svg width="16" height="16" fill="none" stroke="#0D9488" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
}

function focusBorder(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.border = "2px solid #4F46E5";
}
function blurBorder(e: React.FocusEvent<HTMLInputElement>) {
  e.currentTarget.style.border = "1px solid #E2E8F0";
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [cvFile, setCvFile]           = useState<File | null>(null);
  const [cvWordCount, setCvWordCount]  = useState<number | null>(null);
  const [uploading, setUploading]      = useState(false);
  const [dragging, setDragging]        = useState(false);
  const [saving, setSaving]            = useState(false);
  const [saved, setSaved]              = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    name:      user?.name  ?? "",
    email:     user?.email ?? "",
    github:    "",
    portfolio: "",
  });

  async function handleFile(file: File | null) {
    if (!file) return;
    if (!file.name.match(/\.(pdf|doc|docx)$/i)) return;
    setCvFile(file);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("cv", file);
      const res  = await fetch("/api/upload-cv", { method: "POST", body: fd });
      const data = await res.json();
      if (data.wordCount) setCvWordCount(data.wordCount);
    } catch {
      // word count shows as null — acceptable
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  async function handleSave() {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const initials = (user?.name ?? "HH")
    .split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "36px 40px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>Profile</h1>
          <p style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>
            Your CV and details are used by AI to write personalised emails.
          </p>
        </div>

        {/* ── Avatar card ── */}
        <div style={{
          background: "#FFFFFF",
          border: "0.5px solid #E2E8F0",
          borderRadius: 12,
          padding: "20px 24px",
          display: "flex", alignItems: "center", gap: 16,
          marginBottom: 16,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "#4F46E5",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: "#FFFFFF",
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{user?.name ?? "Humna Hashmi"}</p>
            <p style={{ fontSize: 13, color: "#94A3B8", marginTop: 2 }}>{user?.email ?? "hashmihumna57@gmail.com"}</p>
            <span style={{
              display: "inline-block", marginTop: 6,
              fontSize: 11, fontWeight: 500,
              background: "#EEF2FF", color: "#4F46E5",
              borderRadius: 99, padding: "2px 10px",
            }}>
              Free Plan
            </span>
          </div>
        </div>

        {/* ── CV Upload card ── */}
        <div style={{
          background: "#FFFFFF",
          border: "0.5px solid #E2E8F0",
          borderRadius: 12,
          padding: "24px",
          marginBottom: 16,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 16 }}>CV / Resume</h2>

          {cvFile ? (
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              border: "1px solid #E2E8F0", borderRadius: 10, padding: "14px 16px",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 8,
                background: "#EEF2FF",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <DocumentIcon />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#0F172A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {cvFile.name}
                </p>
                <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>
                  {uploading
                    ? "Processing…"
                    : cvWordCount !== null
                      ? `${cvWordCount.toLocaleString()} words extracted`
                      : `${(cvFile.size / 1024).toFixed(0)} KB`}
                </p>
              </div>
              <button
                onClick={() => { setCvFile(null); setCvWordCount(null); }}
                style={{
                  fontSize: 12, color: "#E11D48",
                  background: "none", border: "1px solid #FECDD3",
                  borderRadius: 6, padding: "4px 12px", cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onClick={() => fileRef.current?.click()}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                padding: "40px 24px",
                border: `2px dashed ${dragging ? "#4F46E5" : "#E2E8F0"}`,
                borderRadius: 10,
                background: dragging ? "#EEF2FF" : "#FAFAFA",
                cursor: "pointer",
                transition: "all 0.12s",
              }}
            >
              <UploadIcon />
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#0F172A" }}>Drop your CV here</p>
                <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>PDF, DOC, or DOCX · Max 5 MB</p>
              </div>
              <button
                style={{
                  fontSize: 13, fontWeight: 500, color: "#4F46E5",
                  background: "#FFFFFF", border: "1px solid #E2E8F0",
                  borderRadius: 7, padding: "6px 18px", cursor: "pointer",
                }}
                onClick={(e) => e.stopPropagation()}
                onClickCapture={() => fileRef.current?.click()}
              >
                Browse file
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx"
            style={{ display: "none" }}
            onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          />
        </div>

        {/* ── Personal info card ── */}
        <div style={{
          background: "#FFFFFF",
          border: "0.5px solid #E2E8F0",
          borderRadius: 12,
          padding: "24px",
          marginBottom: 16,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 16 }}>Personal Information</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { label: "Full name",  key: "name",  type: "text",  placeholder: "Jane Smith" },
              { label: "Email",      key: "email", type: "email", placeholder: "you@example.com" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#475569", marginBottom: 6 }}>
                  {label}
                </label>
                <input
                  type={type}
                  value={(form as Record<string, string>)[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{
                    display: "block", width: "100%", height: 40,
                    padding: "0 12px",
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 13, color: "#0F172A",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Portfolio links card ── */}
        <div style={{
          background: "#FFFFFF",
          border: "0.5px solid #E2E8F0",
          borderRadius: 12,
          padding: "24px",
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 600, color: "#0F172A", marginBottom: 16 }}>Portfolio Links</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "GitHub",             key: "github",    placeholder: "https://github.com/yourusername" },
              { label: "Portfolio / Website", key: "portfolio", placeholder: "https://yoursite.com" },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#475569", marginBottom: 6 }}>
                  {label}
                </label>
                <input
                  type="url"
                  value={(form as Record<string, string>)[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                  placeholder={placeholder}
                  style={{
                    display: "block", width: "100%", height: 40,
                    padding: "0 12px",
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 13, color: "#0F172A",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={focusBorder}
                  onBlur={blurBorder}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Save button ── */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              height: 40, padding: "0 24px",
              background: saving ? "#94A3B8" : "#4F46E5",
              border: "none", borderRadius: 8,
              fontSize: 13, fontWeight: 600, color: "#FFFFFF",
              cursor: saving ? "not-allowed" : "pointer",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => { if (!saving) (e.currentTarget as HTMLElement).style.background = "#4338CA"; }}
            onMouseLeave={(e) => { if (!saving) (e.currentTarget as HTMLElement).style.background = "#4F46E5"; }}
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saved && (
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <CheckCircleIcon />
              <span style={{ fontSize: 13, fontWeight: 500, color: "#0D9488" }}>Saved</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
