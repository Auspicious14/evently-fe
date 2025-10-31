
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
import {
  DashboardOverviewDto,
  DashboardStatsResponseDto,
  ActivityTimelineDto,
  EventPerformanceDto,
  CategoryBreakdownDto,
  ActivityTrendDto
} from "./model";

interface IDashboardContext {
  overview: DashboardOverviewDto | null;
  loading: boolean;
  error: string | null;
  fetchData: () => void;
}

const DashboardContext = createContext<IDashboardContext | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [overview, setOverview] = useState<DashboardOverviewDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    };
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/dashboard/overview');
      setOverview(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch dashboard data.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);


  const value = {
    overview,
    loading,
    error,
    fetchData,
    
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
