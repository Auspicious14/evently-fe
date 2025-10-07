"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import{apiClient } from '@/lib/api';

interface IUser {
  id: string;
  username: string;
  email: string;
  // Add other user fields as per backend
}

interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  loginWithTwitter: () => void;
  logout: () => void;
  getUserProfile: () => Promise<void>;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      getUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.post<{ access_token: string }>("/auth/login", { email, password });
      localStorage.setItem('authToken', data.access_token);
      await getUserProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.post<{ access_token: string }>("/auth/register", { username, email, password });
      localStorage.setItem('authToken', data.access_token);
      await getUserProfile();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const loginWithTwitter = () => {
    window.location.href = `${apiClient.defaults.baseURL}/auth/twitter`;
  };

  const getUserProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await apiClient.get<IUser>("/users/me");
      setUser(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, loginWithTwitter, logout, getUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};