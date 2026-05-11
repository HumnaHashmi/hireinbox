import type { ReactNode } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { AppShell } from "@/components/app-shell";
import { siteConfig } from "@/config";

export const metadata: Metadata = {
  title: { template: `%s — ${siteConfig.name}`, default: siteConfig.name },
};

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <AppShell initialUser={{ user: session.user, session }}>
      {children}
    </AppShell>
  );
}
