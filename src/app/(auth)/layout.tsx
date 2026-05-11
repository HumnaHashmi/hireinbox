import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { template: "%s — HireInbox", default: "HireInbox" },
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex flex-col justify-between p-12 w-[40%]" style={{ background: "#1E2A45" }}>
        <div>
          <p className="text-2xl font-bold text-white">HireInbox</p>
          <p className="mt-2 text-sm" style={{ color: "#94A3B8" }}>AI-Powered Job Application Email Platform</p>
        </div>
        <blockquote>
          <p className="text-white/80 text-lg italic leading-relaxed">&quot;I sent 40 applications in one afternoon. Got 3 interviews within a week.&quot;</p>
          <p className="mt-3 text-sm font-semibold" style={{ color: "#94A3B8" }}>— Fatima, Software Engineer</p>
        </blockquote>
        <p className="text-xs" style={{ color: "#475569" }}>© 2025 HireInbox</p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-[360px]">
          <p className="text-xl font-bold mb-6 lg:hidden" style={{ color: "#4F46E5" }}>HireInbox</p>
          {children}
        </div>
      </div>
    </div>
  );
}
