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
  ActivityTrendDto,
  IUpvotedEvent
} from "./model";

interface IDashboardContext {
  overview: DashboardOverviewDto | null;
  upvotedEvents: IUpvotedEvent[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
  fetchUpvotedEvents: () => Promise<void>;
}

const DashboardContext = createContext<IDashboardContext | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [overview, setOverview] = useState<DashboardOverviewDto | null>(null);
  const [upvotedEvents, setUpvotedEvents] = useState<IUpvotedEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    
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

  const fetchUpvotedEvents = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await apiClient.get<IUpvotedEvent[]>('/dashboard/upvoted-events');
      setUpvotedEvents(data);
    } catch (error) {
      console.error(error);
      setError("Unable to fetch upvoted events");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user]); 

  const value = {
    overview,
    upvotedEvents,
    loading,
    error,
    fetchData,
    fetchUpvotedEvents,
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
