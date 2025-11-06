"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import { ISignup } from "@/modules/auth/model";
import { toast } from "sonner";

interface IUser {
  id: string;
  username: string;
  role: string;
  email: string
}

import { NextRouter } from "next/router";

interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  loginWithTwitter: () => void;
  login: (payload: { username: string; pass: string }) => Promise<void>;
  register: (payload: ISignup) => Promise<void>;
  handleAuthentication: (token: string) => void;
  logout: (router: NextRouter) => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedUser = jwtDecode<IUser>(token);
        setUser(decodedUser);
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  const login = async (payload: { username: string; pass: string }) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", payload);
      if (response?.data?.success) {
        const token = response.data.token;
        handleAuthentication(token);
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: ISignup) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/auth/register", payload);
      if (response?.data?.success) {
        const token = response.data.token;
        handleAuthentication(token);
        toast.success("Signup successful!");
      }
    } catch (error) {
      toast.error("Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loginWithTwitter = () => {
    setLoading(true);
    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:12000";
      window.location.href = `${backendUrl}/auth/twitter`;
    } catch (e: any) {
      console.error("Failed to login with Twitter:", e);
      toast.error("Failed to login with Twitter. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuthentication = (token: string) => {
    try {
      const decodedUser = jwtDecode<IUser>(token);
      localStorage.setItem("authToken", token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(decodedUser);
    } catch (e: any) {
      console.error("Failed to decode token:", e);
      return e?.message || "Failed to decode token.";
    }
  };

  const logout = (router: NextRouter) => {
    localStorage.removeItem("authToken");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithTwitter,
        login,
        register,
        handleAuthentication,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
