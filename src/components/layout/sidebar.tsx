"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { apiClient } from "@/lib";

function HomeIcon() {
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75" /></svg>;
}
function PlusCircleIcon() {
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
}
function ClockIcon() {
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>;
}
function UserIcon() {
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>;
}
function StarIcon() {
  return <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" /></svg>;
}
function LogOutIcon() {
  return <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" /></svg>;
}

const NAV = [
  { label: "Dashboard",    href: "/dashboard",              icon: "home"  },
  { label: "New Campaign", href: "/dashboard/new-campaign", icon: "plus"  },
  { label: "History",      href: "/dashboard/history",      icon: "clock" },
  { label: "Profile",      href: "/dashboard/profile",      icon: "user"  },
  { label: "Upgrade",      href: "/dashboard/upgrade",      icon: "star"  },
] as const;

const ICON: Record<string, React.ReactNode> = {
  home:  <HomeIcon />,
  plus:  <PlusCircleIcon />,
  clock: <ClockIcon />,
  user:  <UserIcon />,
  star:  <StarIcon />,
};

const DAILY_USED  = 1;
const DAILY_LIMIT = 3;

export function Sidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const { user, clearUser } = useAuthStore();

  const initials = user?.name
    ? user.name.split(" ").map((p) => p[0]).join("").toUpperCase().slice(0, 2)
    : "HH";

  async function handleSignOut() {
    try { await apiClient.post("/api/auth/logout", {}); } catch {}
    clearUser();
    router.push("/login");
  }

  return (
    <aside style={{
      position: "fixed", left: 0, top: 0, zIndex: 40,
      width: 240, height: "100vh",
      background: "#1E2A45",
      borderRight: "1px solid #253353",
      display: "flex", flexDirection: "column",
    }}>

      {/* ── Logo ── */}
      <div style={{ padding: "24px 20px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#FFFFFF", lineHeight: 1 }}>HireInbox</span>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4F46E5", flexShrink: 0 }} />
        </div>
      </div>

      {/* ── User ── */}
      <div style={{ padding: "12px 20px 16px", borderBottom: "1px solid #253353" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "#4F46E5",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#FFFFFF",
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ marginLeft: 12, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.name ?? "Humna Hashmi"}
            </p>
            <p style={{ fontSize: 11, fontWeight: 400, color: "#94A3B8", marginTop: 2 }}>Free Plan</p>
          </div>
        </div>
      </div>

      {/* ── Usage bar ── */}
      <div style={{ padding: "12px 20px 16px", borderBottom: "1px solid #253353" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: "#94A3B8" }}>Emails today</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#FFFFFF" }}>{DAILY_USED} / {DAILY_LIMIT}</span>
        </div>
        <div style={{ height: 6, background: "#2D3A50", borderRadius: 3, overflow: "hidden" }}>
          <div style={{
            height: "100%",
            width: `${Math.round((DAILY_USED / DAILY_LIMIT) * 100)}%`,
            background: "#4F46E5",
            borderRadius: 3,
          }} />
        </div>
        <p style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>Resets at midnight UTC</p>
      </div>

      {/* ── Navigation ── */}
      <nav style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 2, overflowY: "auto" }}>
        {NAV.map(({ label, href, icon }) => {
          const isActive  = href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);
          const isUpgrade = icon === "star";
          const color     = isUpgrade ? "#D97706" : isActive ? "#FFFFFF" : "#94A3B8";

          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex", alignItems: "center",
                height: 40, borderRadius: 8,
                padding: "0 12px", gap: 10,
                textDecoration: "none",
                background: isActive ? "#4F46E5" : "transparent",
                borderLeft: isActive ? "3px solid #818CF8" : "3px solid transparent",
                color,
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                transition: "background 0.12s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "#253353"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <span style={{ color, display: "flex", flexShrink: 0 }}>{ICON[icon]}</span>
              <span style={{ whiteSpace: "nowrap" }}>{label}{isUpgrade ? " ✦" : ""}</span>
            </Link>
          );
        })}
      </nav>

      {/* ── Sign Out ── */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid #253353" }}>
        <button
          onClick={handleSignOut}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            width: "100%", background: "none", border: "none",
            cursor: "pointer", fontSize: 13, color: "#64748B",
            padding: 0,
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#94A3B8"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748B"; }}
        >
          <LogOutIcon />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
