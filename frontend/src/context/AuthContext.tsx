// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "@/api/axios";

export type Role = "customer" | "vendor" | "admin";

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
  vendorId?: string | null;
  customerId?: string | null;
};

type AuthCtx = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshMe: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("saapaadu_token"));
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshMe = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(data);
    } catch {
      setUser(null);
      localStorage.removeItem("saapaadu_token");
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (jwt: string) => {
    localStorage.setItem("saapaadu_token", jwt);
    setToken(jwt);
    await refreshMe();
  };

  const logout = () => {
    localStorage.removeItem("saapaadu_token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    refreshMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const value = useMemo(
    () => ({ user, token, loading, login, logout, refreshMe }),
    [user, token, loading]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
