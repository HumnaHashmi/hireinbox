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
        <div>
          <p className="text-2xl font-bold text-white leading-snug">Built for job seekers.</p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
            Upload your CV once, paste HR emails, and let AI write a personalised email for every company — in seconds.
          </p>
        </div>
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
