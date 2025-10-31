
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import { apiClient } from "@/lib/api";

interface IAdminStats {
  pendingEvents: number;
  approvedToday: number;
  rejectedToday: number;
}

interface IAdminContext {
  stats: IAdminStats | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const AdminContext = createContext<IAdminContext | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<IAdminStats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/admin/stats');
      setStats(response.data.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch admin stats.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = {
    stats,
    loading,
    error,
    refetch: fetchData,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
