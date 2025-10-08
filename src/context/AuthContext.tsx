"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiClient } from '@/lib/api';
import { jwtDecode } from 'jwt-decode';

interface IUser {
  id: string;
  username: string;
  role: string;
}

interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  error: string | null;
  loginWithTwitter: () => void;
  handleAuthentication: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedUser = jwtDecode<IUser>(token);
        setUser(decodedUser);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (e) {
        console.error("Invalid token:", e);
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  const loginWithTwitter = () => {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    window.location.href = `${backendUrl}/auth/twitter`;
  };

  const handleAuthentication = (token: string) => {
    try {
      const decodedUser = jwtDecode<IUser>(token);
      localStorage.setItem('authToken', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(decodedUser);
    } catch (e) {
      console.error("Failed to decode token:", e);
      setError("Received an invalid token from the server.");
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, loginWithTwitter, handleAuthentication, logout }}>
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