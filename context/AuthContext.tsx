"use client";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { NAV_ACCESS } from "@/lib/users";
import type { CurrentUser, NavView } from "@/lib/types";

interface AuthContextValue {
  currentUser: CurrentUser | null;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  canEdit: () => boolean;
  isSuperAdmin: () => boolean;
  getAllowedViews: () => NavView[];
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then(({ user }) => {
        if (user) setCurrentUser(user);
      })
      .catch(() => {})
      .finally(() => setHydrated(true));
  }, []);

  const login = useCallback(
    async (username: string, password: string): Promise<string | null> => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) return data.error ?? "Error al iniciar sesión";
      setCurrentUser(data.user);
      return null;
    },
    [],
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setCurrentUser(null);
  }, []);

  const isSuperAdmin = useCallback(() => {
    return currentUser?.role === "super_admin";
  }, [currentUser]);

  const canEdit = useCallback(() => {
    if (!currentUser) return false;
    if (currentUser.role === "super_admin") return true;
    if (currentUser.canEdit !== undefined) return !!currentUser.canEdit;
    return currentUser.role === "admin" || currentUser.role === "manager";
  }, [currentUser]);

  const getAllowedViews = useCallback((): NavView[] => {
    if (!currentUser) return [];
    if (currentUser.allowedViews) return currentUser.allowedViews as NavView[];
    return NAV_ACCESS[currentUser.role as keyof typeof NAV_ACCESS] ?? [];
  }, [currentUser]);

  if (!hydrated) return null;

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, canEdit, isSuperAdmin, getAllowedViews }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
