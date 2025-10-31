
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
import { useAuth } from "@/context/AuthContext";

interface IDashboardStats {
  eventsSubmitted: number;
  eventsApproved: number;
  upvotesReceived: number;
  upvotedEvents: number;
}

interface IActivity {
  _id: string;
  type: "upvote" | "submission" | "approval";
  message: string;
  createdAt: string;
}

interface IDashboardContext {
  stats: IDashboardStats | null;
  activities: IActivity[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const DashboardContext = createContext<IDashboardContext | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const [statsRes, activitiesRes] = await Promise.all([
        apiClient.get(`/users/${user.id}/dashboard-stats`),
        apiClient.get(`/users/${user.id}/activities`),
      ]);
      setStats(statsRes.data.data);
      setActivities(activitiesRes.data.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch dashboard data.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = {
    stats,
    activities,
    loading,
    error,
    refetch: fetchData,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
