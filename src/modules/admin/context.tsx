
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
import { IAdminEvent, IAdminStatsOverview } from "./model";

interface IAdminContext {
  stats: IAdminStatsOverview | null;
  events: IAdminEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const AdminContext = createContext<IAdminContext | null>(null);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<IAdminStatsOverview | null>(null);
  const [events, setEvents] = useState<IAdminEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [statsResponse, eventsResponse] = await Promise.all([
        apiClient.get('/admin/stats/overview'),
        apiClient.get('/admin/events'),
      ]);
      setStats(statsResponse.data);
      setEvents(eventsResponse.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch admin data.";
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
    events,
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
