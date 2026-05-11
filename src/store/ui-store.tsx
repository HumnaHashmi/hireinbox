"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

interface UiState {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: "success" | "error" | "info" | "warning";
  title: string;
  message?: string;
}

type UiAction =
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "SET_SIDEBAR"; payload: boolean }
  | { type: "SET_THEME"; payload: UiState["theme"] }
  | { type: "ADD_NOTIFICATION"; payload: Omit<Notification, "id"> }
  | { type: "REMOVE_NOTIFICATION"; payload: string };

const initialState: UiState = {
  sidebarOpen: true,
  theme: "system",
  notifications: [],
};

function uiReducer(state: UiState, action: UiAction): UiState {
  switch (action.type) {
    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case "SET_SIDEBAR":
      return { ...state, sidebarOpen: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { ...action.payload, id: crypto.randomUUID() },
        ],
      };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    default:
      return state;
  }
}

interface UiContextValue extends UiState {
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  setTheme: (theme: UiState["theme"]) => void;
  notify: (notification: Omit<Notification, "id">) => void;
  dismissNotification: (id: string) => void;
}

const UiContext = createContext<UiContextValue | null>(null);

export function UiProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  return (
    <UiContext.Provider
      value={{
        ...state,
        toggleSidebar: () => dispatch({ type: "TOGGLE_SIDEBAR" }),
        setSidebar: (open) => dispatch({ type: "SET_SIDEBAR", payload: open }),
        setTheme: (theme) => dispatch({ type: "SET_THEME", payload: theme }),
        notify: (n) => dispatch({ type: "ADD_NOTIFICATION", payload: n }),
        dismissNotification: (id) => dispatch({ type: "REMOVE_NOTIFICATION", payload: id }),
      }}
    >
      {children}
    </UiContext.Provider>
  );
}

export function useUiStore(): UiContextValue {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUiStore must be used inside UiProvider");
  return ctx;
}
