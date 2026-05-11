"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/store/auth-store";
import { UiProvider } from "@/store/ui-store";
import { Sidebar } from "@/components/layout/sidebar";
import type { User, Session } from "@/types";

interface AppShellProps {
  children: ReactNode;
  initialUser: { user: User; session: Session } | null;
}

export function AppShell({ children, initialUser }: AppShellProps) {
  return (
    <AuthProvider initialUser={initialUser}>
      <UiProvider>
        <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
          <Sidebar />
          <main style={{ marginLeft: 240, minHeight: "100vh", overflowY: "auto" }}>
            {children}
          </main>
        </div>
      </UiProvider>
    </AuthProvider>
  );
}
