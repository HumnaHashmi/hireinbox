"use client";

import type { ReactNode } from "react";
import { AuthProvider } from "@/store/auth-store";
import { UiProvider } from "@/store/ui-store";
import type { User, Session } from "@/types";

interface AppShellProps {
  children: ReactNode;
  initialUser: { user: User; session: Session } | null;
}

export function AppShell({ children, initialUser }: AppShellProps) {
  return (
    <AuthProvider initialUser={initialUser}>
      <UiProvider>
        {children}
      </UiProvider>
    </AuthProvider>
  );
}
