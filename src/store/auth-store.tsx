"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { AuthState, User, Session } from "@/types";

type AuthAction =
  | { type: "SET_USER"; payload: { user: User; session: Session } }
  | { type: "CLEAR_USER" }
  | { type: "SET_LOADING"; payload: boolean };

const initialState: AuthState = {
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        session: action.payload.session,
        isAuthenticated: true,
        isLoading: false,
      };
    case "CLEAR_USER":
      return { ...initialState, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

interface AuthContextValue extends AuthState {
  setUser: (user: User, session: Session) => void;
  clearUser: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children, initialUser }: { children: ReactNode; initialUser?: { user: User; session: Session } | null }) {
  const [state, dispatch] = useReducer(authReducer, {
    ...initialState,
    user: initialUser?.user ?? null,
    session: initialUser?.session ?? null,
    isAuthenticated: !!initialUser,
    isLoading: false,
  });

  const setUser = (user: User, session: Session) =>
    dispatch({ type: "SET_USER", payload: { user, session } });

  const clearUser = () => dispatch({ type: "CLEAR_USER" });

  return (
    <AuthContext.Provider value={{ ...state, setUser, clearUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthStore(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthStore must be used inside AuthProvider");
  return ctx;
}
