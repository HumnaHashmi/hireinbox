"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";

/* ── Mock data (replace with Supabase queries) ── */
const STATS = [
  { label: "Total Campaigns", value: "12", color: "#0F172A", iconColor: "#94A3B8", icon: "briefcase" },
  { label: "Emails Generated", value: "48", color: "#4F46E5", iconColor: "#4F46E5", icon: "mail"     },
  { label: "Emails Sent",      value: "31", color: "#0D9488", iconColor: "#0D9488", icon: "send"     },
  { label: "Failed",           value: "3",  color: "#E11D48", iconColor: "#E11D48", icon: "alert"    },
];

const CAMPAIGNS = [
  {
    id: "1", name: "May Applications",
    meta: "12 emails · 8 sent · Created May 10",
    pct: 67, strip: "#4F46E5", progressColor: "#0D9488",
    status: "Active", statusBg: "#EEF2FF", statusColor: "#4F46E5",
  },
  {
    id: "2", name: "Saudi Companies",
    meta: "45 emails · 12 sent · Created May 8",
    pct: 27, strip: "#0D9488", progressColor: "#0D9488",
    status: "Active", statusBg: "#EEF2FF", statusColor: "#4F46E5",
  },
  {
    id: "3", name: "Tech Startups",
    meta: "8 emails · 2 sent · Created May 5",
    pct: 25, strip: "#D97706", progressColor: "#D97706",
    status: "Draft", statusBg: "#FFFBEB", statusColor: "#D97706",
  },
];

/* ── Icons ── */
function BriefcaseIcon() {
  return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" /></svg>;
}
function MailIcon() {
  return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>;
}
function SendIcon() {
  return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" /></svg>;
}
function AlertIcon() {
  return <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>;
}
function CalendarIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" /></svg>;
}
function PlusIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
}
function BulbIcon() {
  return <svg width="24" height="24" fill="none" stroke="#4F46E5" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>;
}
function LargePlusIcon() {
  return <svg width="24" height="24" fill="none" stroke="white" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>;
}

const STAT_ICON: Record<string, React.ReactNode> = {
  briefcase: <BriefcaseIcon />,
  mail:      <MailIcon />,
  send:      <SendIcon />,
  alert:     <AlertIcon />,
};

function greeting(name: string) {
  const h = new Date().getHours();
  const salutation = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return `${salutation}, ${name.split(" ")[0]}! 👋`;
}

function todayLabel() {
  return new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

export default function DashboardPage() {
  const { user } = useAuth();
  /* Toggle this to false to preview the empty state */
  const hasCampaigns = CAMPAIGNS.length > 0;

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", padding: "36px 40px", position: "relative" }}>

      {/* ── Top bar ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>
            {greeting(user?.name ?? "Humna")}
          </h1>
          <p style={{ fontSize: 14, color: "#475569", marginTop: 4 }}>
            {hasCampaigns ? "Here's your application overview" : "Let's get your job search started"}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: "#94A3B8" }}><CalendarIcon /></span>
            <span style={{ fontSize: 13, color: "#94A3B8" }}>{todayLabel()}</span>
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
            <PlusIcon />
            New Campaign
          </Link>
        </div>
      </div>

      {/* ── Empty state ── */}
      {!hasCampaigns && (
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", textAlign: "center",
          paddingTop: 80, paddingBottom: 80,
        }}>
          {/* Envelope illustration */}
          <div style={{
            width: 80, height: 80, borderRadius: 20,
            background: "#EEF2FF",
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 24,
          }}>
            <svg width="40" height="40" fill="none" stroke="#4F46E5" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>
            No campaigns yet
          </h2>
          <p style={{ fontSize: 14, color: "#475569", maxWidth: 360, lineHeight: 1.6, marginBottom: 8 }}>
            Upload your CV on your profile, then create a campaign to start sending AI-powered job application emails.
          </p>
          <p style={{ fontSize: 13, color: "#94A3B8", marginBottom: 28 }}>Takes less than 2 minutes to set up.</p>
          <div style={{ display: "flex", gap: 10 }}>
            <Link
              href="/dashboard/profile"
              style={{
                height: 42, padding: "0 20px", lineHeight: "42px",
                background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 8,
                fontSize: 13, fontWeight: 600, color: "#475569",
                textDecoration: "none",
              }}
            >
              Upload CV first
            </Link>
            <Link
              href="/dashboard/new-campaign"
              style={{
                display: "flex", alignItems: "center", gap: 6,
                height: 42, padding: "0 20px",
                background: "#4F46E5", borderRadius: 8,
                fontSize: 13, fontWeight: 600, color: "#FFFFFF",
                textDecoration: "none",
              }}
            >
              <PlusIcon /> Create first campaign
            </Link>
          </div>
        </div>
      )}

      {/* ── Stats cards (only when data exists) ── */}
      {hasCampaigns && (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
        {STATS.map(({ label, value, color, iconColor, icon }) => (
          <div key={label} style={{
            background: "#FFFFFF",
            borderRadius: 12,
            border: "0.5px solid #E2E8F0",
            padding: "20px 24px",
            height: 96,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "#94A3B8" }}>{label}</span>
              <span style={{ color: iconColor }}>{STAT_ICON[icon]}</span>
            </div>
            <p style={{ fontSize: 32, fontWeight: 700, color, lineHeight: 1 }}>{value}</p>
          </div>
        ))}
      </div>
      )}

      {/* ── Recent campaigns (only when data exists) ── */}
      {hasCampaigns && (
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#0F172A" }}>Recent Campaigns</h2>
          <Link href="/dashboard/history" style={{ fontSize: 13, color: "#4F46E5", textDecoration: "none" }}>
            View all →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CAMPAIGNS.map((c) => (
            <div key={c.id} style={{
              background: "#FFFFFF",
              borderRadius: 12,
              border: "0.5px solid #E2E8F0",
              height: 68,
              display: "flex", alignItems: "center",
              overflow: "hidden",
            }}>
              {/* Color strip */}
              <div style={{ width: 4, height: "100%", background: c.strip, flexShrink: 0, borderRadius: "2px 0 0 2px" }} />

              {/* Name + meta */}
              <div style={{ marginLeft: 16, flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#0F172A" }}>{c.name}</p>
                <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{c.meta}</p>
              </div>

              {/* Progress bar */}
              <div style={{ width: 180, flexShrink: 0, marginRight: 24 }}>
                <p style={{ fontSize: 11, color: "#94A3B8", marginBottom: 4 }}>{c.pct}% sent</p>
                <div style={{ height: 4, background: "#E2E8F0", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${c.pct}%`, background: c.progressColor, borderRadius: 2 }} />
                </div>
              </div>

              {/* Status pill */}
              <div style={{ marginRight: 20, flexShrink: 0 }}>
                <span style={{
                  fontSize: 11, fontWeight: 500,
                  background: c.statusBg, color: c.statusColor,
                  borderRadius: 99, padding: "3px 10px",
                  whiteSpace: "nowrap",
                }}>
                  {c.status}
                </span>
              </div>

              {/* View link */}
              <Link
                href={`/dashboard/campaign/${c.id}`}
                style={{ fontSize: 13, color: "#4F46E5", textDecoration: "none", marginRight: 20, flexShrink: 0 }}
              >
                View →
              </Link>
            </div>
          ))}
        </div>
      </div>
      )}

      {/* ── Quick tips ── */}
      <div style={{
        background: "#EEF2FF",
        border: "0.5px solid #C7D2FE",
        borderRadius: 12,
        padding: "20px 24px",
        display: "flex", alignItems: "flex-start", gap: 16,
      }}>
        <div style={{ flexShrink: 0, marginTop: 2 }}><BulbIcon /></div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#4F46E5" }}>Pro tip</p>
          <p style={{ fontSize: 13, color: "#3730A3", marginTop: 4 }}>
            Add a job description per company email to get 3× more personalised emails from AI.
          </p>
          <Link
            href="/dashboard/new-campaign"
            style={{ display: "inline-block", fontSize: 13, fontWeight: 600, color: "#4F46E5", marginTop: 8, textDecoration: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "underline"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.textDecoration = "none"; }}
          >
            Add job descriptions →
          </Link>
        </div>
      </div>

      {/* ── FAB ── */}
      <div style={{ position: "fixed", bottom: 32, right: 40, zIndex: 50 }}>
        <div style={{ position: "relative" }}>
          <Link
            href="/dashboard/new-campaign"
            title="New Campaign"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 56, height: 56,
              background: "#4F46E5",
              borderRadius: "50%",
              textDecoration: "none",
            }}
          >
            <LargePlusIcon />
          </Link>
        </div>
      </div>

    </div>
  );
}
